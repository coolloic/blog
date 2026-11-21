// Plan-driven sync: each plan item becomes content/<slug>/index.md, atomically and idempotently.
import { mkdir, readdir, readFile, rename, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { parse, stringify } from "yaml";
import { convertArticle, wechatShortUrl } from "./convert.mjs";
import { dimensions, webpVariants, wideCover, needsWide, WIDE, siteCover } from "./images.mjs";
import { bodyOf, readFrontMatter, renderArticle } from "./frontmatter.mjs";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+){0,5}$/;
const WECHAT_ID = /^\d+_\d+$/;
const MIN_BODY_CHARS = 50;
export const DEFAULT_IMAGE_WIDTHS = [480, 960, 1440];

// WebP copies for srcset (see themes/evo/layouts/_partials/picture.html). Uploaded next to the original.
async function uploadWebp(uploader, slug, name, bytes, widths, force, ext, quality) {
  for (const v of await webpVariants(bytes, name, widths, ext, quality)) {
    const key = `articles/${slug}/${v.file}`;
    if (force || !(await uploader.exists(key))) await uploader.put(key, v.bytes, "image/webp");
  }
}
const DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+08:00$/;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function existingArticles(contentDir) {
  const byId = new Map(), bySlug = new Map(), linkMap = new Map(), draftByTitle = new Map();
  if (!existsSync(contentDir)) return { byId, bySlug, linkMap, draftByTitle };
  for (const slug of await readdir(contentDir)) {
    if (slug.startsWith("_") || slug.startsWith(".")) continue;
    const file = join(contentDir, slug, "index.md");
    // Every existing folder is owned by someone: a synced article (its wechat_id) or a hand-written one.
    bySlug.set(slug, "(not synced)");
    if (!existsSync(file)) continue;
    const fm = readFrontMatter(await readFile(file, "utf8"));
    if (fm.wechat_id) { byId.set(String(fm.wechat_id), slug); bySlug.set(slug, String(fm.wechat_id)); }
    const short = wechatShortUrl(fm.wechat_url);
    if (short) linkMap.set(short, slug);
    if (fm.wechat_id) linkMap.set(String(fm.wechat_id), slug);
    if (fm.wechat_draft && fm.title) draftByTitle.set(String(fm.title).trim(), slug);
  }
  return { byId, bySlug, linkMap, draftByTitle };
}

function validate(item, categories) {
  if (!WECHAT_ID.test(String(item.wechat_id ?? ""))) return `invalid wechat_id ${JSON.stringify(item.wechat_id)} (expected <appmsgid>_<itemidx>)`;
  if (!SLUG.test(item.slug || "")) return `invalid slug ${JSON.stringify(item.slug)} (kebab-case, ≤ 6 words)`;
  if (!categories.includes(item.category)) return `unknown category ${JSON.stringify(item.category)}`;
  if (!DATE.test(item.date || "")) return `date must look like 2026-11-20T08:00:00+08:00, got ${JSON.stringify(item.date)}`;
  // Drafts have no public link yet: they are fetched from the backend's temporary preview link instead.
  if (item.preview_url) { if (!/^https?:\/\/mp\.weixin\.qq\.com\/s\?/.test(item.preview_url)) return "preview_url must be a mp.weixin.qq.com/s? preview link"; }
  else if (!wechatShortUrl(item.url)) return `url must be https://mp.weixin.qq.com/s/<id>`;
  if (!item.title) return "missing title";
  return null;
}

function summaryFrom(markdown) {
  const text = markdown.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/[#>*_`|\\[\]()-]/g, "").replace(/\s+/g, " ").trim();
  return text.length > 80 ? text.slice(0, 80) + "…" : text;
}

async function syncOne(item, slug, { uploader, fetchers, linkMap, dryRun, force, imageWidths, keep = {} }) {
  const html = await fetchers.fetchArticleHtml(item.preview_url || wechatShortUrl(item.url));
  const { markdown, images, coverUrl, description } = convertArticle(html, { linkMap });
  // Image-message, video and removed posts keep #js_content but render nothing without JavaScript.
  if (!images.length && summaryFrom(markdown).length < MIN_BODY_CHARS) throw new Error("article body is empty (JavaScript-rendered or removed?)");
  if (!coverUrl) throw new Error("no cover image found on the article page");
  const dims = {}, urlFor = {};
  const store = async (src, name) => {
    const img = await fetchers.downloadImage(src);
    const file = `${name}.${img.ext}`, key = `articles/${slug}/${file}`;
    dims[file] = dimensions(img.bytes);
    // Keys are positional (1.jpg, 2.jpg…): a resync must overwrite them, or edited articles keep old pictures.
    if (!dryRun && (force || !(await uploader.exists(key)))) await uploader.put(key, img.bytes, img.contentType);
    if (!dryRun) await uploadWebp(uploader, slug, name, img.bytes, imageWidths, force, img.ext);
    return uploader.url(key);
  };
  for (const im of images) urlFor[im.n] = await store(im.src, String(im.n));
  const cover = await store(coverUrl, "cover");
  const body = markdown.replace(/\(wximg:(\d+)/g, (_, n) => `(${urlFor[n]}`);
  return renderArticle({
    ...keep, // keys the owner added by hand to an existing article survive a resync
    title: item.title, date: item.date, summary: item.summary?.trim() || description || summaryFrom(body),
    categories: [item.category], tags: item.tags ?? [], cover,
    // A draft has no WeChat link yet (never store the temporary preview key); `wechat_draft` lets the next sync
    // link it by title once it is published.
    wechat_url: item.preview_url ? undefined : wechatShortUrl(item.url), wechat_id: item.wechat_id,
    wechat_draft: item.preview_url ? true : undefined, images: dims, webp: dryRun ? undefined : true, draft: false,
  }, body);
}

// Links were pointed at every planned article before fetching. Any target that did not end up on disk
// (it failed, or was skipped later) goes back to its WeChat URL, so the site never links to a missing page.
async function repairDeadLinks({ plan, contentDir, previewDir, dryRun, result }) {
  const exists = (slug) => existsSync(join(contentDir, slug, "index.md")) || (dryRun && existsSync(join(previewDir, slug, "index.md")));
  const wechatUrlOf = new Map(plan.items.filter((i) => i.slug && wechatShortUrl(i.url)).map((i) => [i.slug, wechatShortUrl(i.url)]));
  const dirs = dryRun ? [previewDir] : [contentDir];
  for (const dir of dirs) {
    if (!existsSync(dir)) continue;
    for (const slug of await readdir(dir)) {
      const file = join(dir, slug, "index.md");
      if (!existsSync(file)) continue;
      const text = await readFile(file, "utf8");
      const fixed = text.replace(/\]\(\.\.\/([a-z0-9-]+)\/index\.md\)/g, (m, target) =>
        exists(target) || !wechatUrlOf.has(target) ? m : `](${wechatUrlOf.get(target)})`);
      if (fixed !== text) { await writeFile(file, fixed); result.relinked = [...(result.relinked ?? []), slug]; }
    }
  }
}

/**
 * @returns {Promise<{added: string[], skipped: string[], failed: {slug: string, error: string}[], unchanged: string[]}>}
 */
export async function runSync({ plan, contentDir, skipFile, previewDir, uploader, fetchers, categories, dryRun = false, resync = null, forceResync = false, sleepMs = 1500, imageWidths = DEFAULT_IMAGE_WIDTHS, log = () => {} }) {
  const result = { added: [], skipped: [], failed: [], unchanged: [], linked: [] };
  const { byId, bySlug, linkMap, draftByTitle } = await existingArticles(contentDir);
  const skips = (existsSync(skipFile) ? parse(await readFile(skipFile, "utf8")) : null) ?? [];
  const skipIds = new Set(skips.map((s) => String(s.wechat_id)));
  for (const it of plan.items) if (!it.skip && !skipIds.has(String(it.wechat_id)) && wechatShortUrl(it.url)) {
    const target = byId.get(String(it.wechat_id)) ?? it.slug;
    linkMap.set(wechatShortUrl(it.url), target);
    linkMap.set(String(it.wechat_id), target);
  }
  let newSkips = false, first = true;

  for (const item of plan.items) {
    const id = String(item.wechat_id);
    if (!WECHAT_ID.test(id)) { result.failed.push({ slug: item.slug, error: `invalid wechat_id ${JSON.stringify(item.wechat_id)}` }); continue; }
    if (item.skip || skipIds.has(id)) {
      if (!skipIds.has(id)) { skips.push({ wechat_id: id, title: item.title, reason: String(item.skip) }); skipIds.add(id); newSkips = true; }
      result.skipped.push(id); continue;
    }
    // A draft synced earlier and now published under a new id: give it its WeChat link, keep the site's copy.
    const published = !item.preview_url && !byId.has(id) && draftByTitle.get(String(item.title ?? "").trim());
    if (published && wechatShortUrl(item.url)) {
      const file = join(contentDir, published, "index.md"), text = await readFile(file, "utf8");
      const { wechat_draft, ...fm } = readFrontMatter(text);
      if (!dryRun) await writeFile(file, renderArticle({ ...fm, wechat_url: wechatShortUrl(item.url), wechat_id: id }, bodyOf(text)));
      byId.set(id, published); draftByTitle.delete(String(item.title).trim());
      result.linked.push(published); log(`↔ ${published}: linked to its WeChat post`); continue;
    }
    const existing = byId.get(id);
    if (existing && resync !== existing) { result.unchanged.push(existing); continue; }
    const slug = existing ?? item.slug;
    const problem = validate({ ...item, slug }, categories)
      ?? (!existing && bySlug.has(slug) && bySlug.get(slug) !== id ? `slug ${slug} already belongs to wechat_id ${bySlug.get(slug)}` : null);
    if (problem) { result.failed.push({ slug: item.slug, error: problem }); log(`✗ ${item.slug}: ${problem}`); continue; }

    // A resync rebuilds the body from WeChat, which would undo corrections made on the site (see /corrections/).
    let keep = {};
    if (existing) {
      keep = readFrontMatter(await readFile(join(contentDir, existing, "index.md"), "utf8"));
      if (keep.corrections && !forceResync) {
        result.failed.push({ slug: existing, error: "has manual corrections (front matter `corrections`): re-apply them after resync, then pass --force-resync" });
        continue;
      }
    }
    if (!first && sleepMs) await sleep(sleepMs);
    first = false;
    try {
      const text = await syncOne(item, slug, { uploader, fetchers, linkMap, dryRun, imageWidths, keep, force: resync === existing && Boolean(existing) });
      const dir = join(dryRun ? previewDir : contentDir, slug);
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, "index.md.tmp"), text);
      await rename(join(dir, "index.md.tmp"), join(dir, "index.md")); // the article appears only when complete
      result.added.push(slug); bySlug.set(slug, id); byId.set(id, slug);
      log(`✓ ${slug}`);
    } catch (e) {
      result.failed.push({ slug, error: e.message }); log(`✗ ${slug}: ${e.message}`);
    }
  }
  await repairDeadLinks({ plan, contentDir, previewDir, dryRun, result });
  if (newSkips && !dryRun) await writeFile(skipFile, stringify(skips));
  return result;
}

/**
 * Add WebP versions to articles synced before WebP existed: download each original from R2 (via its public
 * URL), upload the variants, then mark the article `webp: true`. Articles already marked are skipped.
 * @returns {Promise<{optimized: string[], failed: {slug: string, error: string}[]}>}
 */
export async function optimizeExisting({ contentDir, uploader, downloadImage, imageWidths = DEFAULT_IMAGE_WIDTHS, dryRun = false, log = () => {} }) {
  const result = { optimized: [], failed: [] };
  for (const slug of await readdir(contentDir)) {
    const file = join(contentDir, slug, "index.md");
    if (!existsSync(file)) continue;
    const text = await readFile(file, "utf8");
    const fm = readFrontMatter(text);
    if (fm.webp || !fm.images || !fm.wechat_id) continue;
    try {
      for (const name of Object.keys(fm.images)) {
        const ext = (name.match(/\.([^.]+)$/) || [])[1] || "";
        if (dryRun) continue; // report only: no downloads, uploads or writes
        const img = await downloadImage(uploader.url(`articles/${slug}/${name}`));
        await uploadWebp(uploader, slug, name.replace(/\.[^.]+$/, ""), img.bytes, imageWidths, true, ext);
      }
      if (!dryRun) await writeFile(file, renderArticle({ ...fm, webp: true }, bodyOf(text)));
      result.optimized.push(slug); log(`✓ ${slug}`);
    } catch (e) {
      result.failed.push({ slug, error: e.message }); log(`✗ ${slug}: ${e.message}`);
    }
  }
  return result;
}

/**
 * Wide (2.35:1) covers for articles whose cover is square-ish: uploads `cover-wide.jpg` plus WebP versions and
 * sets `cover_wide` (the original `cover` stays, for sharing). Articles that already have one are skipped.
 * @returns {Promise<{added: string[], failed: {slug: string, error: string}[]}>}
 */
export async function addWideCovers({ contentDir, uploader, downloadImage, imageWidths = DEFAULT_IMAGE_WIDTHS, dryRun = false, log = () => {} }) {
  const result = { added: [], failed: [] };
  for (const slug of await readdir(contentDir)) {
    const file = join(contentDir, slug, "index.md");
    if (!existsSync(file)) continue;
    const text = await readFile(file, "utf8");
    const fm = readFrontMatter(text);
    const name = fm.cover && String(fm.cover).split("/").pop();
    const dims = name && fm.images?.[name];
    if (fm.cover_wide || !Array.isArray(dims) || !needsWide(dims)) continue;
    try {
      if (!dryRun) {
        const wide = await wideCover((await downloadImage(fm.cover)).bytes);
        await uploader.put(`articles/${slug}/cover-wide.jpg`, wide, "image/jpeg");
        await uploadWebp(uploader, slug, "cover-wide", wide, imageWidths, true, "jpg");
        const images = { ...fm.images, "cover-wide.jpg": [WIDE.width, WIDE.height] };
        await writeFile(file, renderArticle({ ...fm, cover_wide: uploader.url(`articles/${slug}/cover-wide.jpg`), images }, bodyOf(text)));
      }
      result.added.push(slug); log(`✓ ${slug}`);
    } catch (e) {
      result.failed.push({ slug, error: e.message }); log(`✗ ${slug}: ${e.message}`);
    }
  }
  return result;
}

/**
 * Site-only covers (see .claude/skills/site-cover): for each <dir>/<slug>.png, upload a 1280×544 crop as
 * `cover-site.jpg` (+ WebP) and point `cover_wide` at it. `cover` (the WeChat cover) stays for sharing.
 * @returns {Promise<{added: string[], unknown: string[], failed: {slug: string, error: string}[]}>}
 */
export async function addSiteCovers({ dir, contentDir, uploader, imageWidths = DEFAULT_IMAGE_WIDTHS, name = "cover-site", quality, dryRun = false, log = () => {} }) {
  const result = { added: [], unknown: [], failed: [] };
  for (const f of (await readdir(dir)).filter((n) => /\.(png|jpe?g|webp)$/i.test(n)).sort()) {
    const slug = f.replace(/\.[^.]+$/, "");
    const file = join(contentDir, slug, "index.md");
    if (!existsSync(file)) { result.unknown.push(slug); log(`? ${slug}: no such article`); continue; }
    try {
      if (!dryRun) {
        const text = await readFile(file, "utf8");
        const fm = readFrontMatter(text);
        const cover = await siteCover(await readFile(join(dir, f)));
        await uploader.put(`articles/${slug}/${name}.jpg`, cover, "image/jpeg");
        await uploadWebp(uploader, slug, name, cover, imageWidths, true, "jpg", quality);
        const images = { ...fm.images, [`${name}.jpg`]: [WIDE.width, WIDE.height] };
        await writeFile(file, renderArticle({ ...fm, cover_wide: uploader.url(`articles/${slug}/${name}.jpg`), images }, bodyOf(text)));
      }
      result.added.push(slug); log(`✓ ${slug}`);
    } catch (e) {
      result.failed.push({ slug, error: e.message }); log(`✗ ${slug}: ${e.message}`);
    }
  }
  return result;
}

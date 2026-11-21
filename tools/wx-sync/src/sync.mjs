// Plan-driven sync: each plan item becomes content/<slug>/index.md, atomically and idempotently.
import { mkdir, readdir, readFile, rename, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { parse, stringify } from "yaml";
import { convertArticle, wechatShortUrl } from "./convert.mjs";
import { dimensions } from "./images.mjs";
import { readFrontMatter, renderArticle } from "./frontmatter.mjs";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+){0,5}$/;
const DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+08:00$/;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function existingArticles(contentDir) {
  const byId = new Map(), bySlug = new Map(), linkMap = new Map();
  if (!existsSync(contentDir)) return { byId, bySlug, linkMap };
  for (const slug of await readdir(contentDir)) {
    const file = join(contentDir, slug, "index.md");
    if (!existsSync(file)) continue;
    const fm = readFrontMatter(await readFile(file, "utf8"));
    if (fm.wechat_id) { byId.set(String(fm.wechat_id), slug); bySlug.set(slug, String(fm.wechat_id)); }
    const short = wechatShortUrl(fm.wechat_url);
    if (short) linkMap.set(short, slug);
  }
  return { byId, bySlug, linkMap };
}

function validate(item, categories) {
  if (!SLUG.test(item.slug || "")) return `invalid slug ${JSON.stringify(item.slug)} (kebab-case, ≤ 6 words)`;
  if (!categories.includes(item.category)) return `unknown category ${JSON.stringify(item.category)}`;
  if (!DATE.test(item.date || "")) return `date must look like 2026-11-20T08:00:00+08:00, got ${JSON.stringify(item.date)}`;
  if (!wechatShortUrl(item.url)) return `url must be https://mp.weixin.qq.com/s/<id>`;
  if (!item.title) return "missing title";
  return null;
}

function summaryFrom(markdown) {
  const text = markdown.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/[#>*_`|\\[\]()-]/g, "").replace(/\s+/g, " ").trim();
  return text.length > 80 ? text.slice(0, 80) + "…" : text;
}

async function syncOne(item, slug, { uploader, fetchers, linkMap, dryRun }) {
  const html = await fetchers.fetchArticleHtml(wechatShortUrl(item.url));
  const { markdown, images, coverUrl, description } = convertArticle(html, { linkMap });
  if (!coverUrl) throw new Error("no cover image found on the article page");
  const dims = {}, urlFor = {};
  const store = async (src, name) => {
    const img = await fetchers.downloadImage(src);
    const file = `${name}.${img.ext}`, key = `articles/${slug}/${file}`;
    dims[file] = dimensions(img.bytes);
    if (!dryRun && !(await uploader.exists(key))) await uploader.put(key, img.bytes, img.contentType);
    return uploader.url(key);
  };
  for (const im of images) urlFor[im.n] = await store(im.src, String(im.n));
  const cover = await store(coverUrl, "cover");
  const body = markdown.replace(/\(wximg:(\d+)/g, (_, n) => `(${urlFor[n]}`);
  return renderArticle({
    title: item.title, date: item.date, summary: item.summary?.trim() || description || summaryFrom(body),
    categories: [item.category], tags: item.tags ?? [], cover,
    wechat_url: wechatShortUrl(item.url), wechat_id: item.wechat_id, images: dims, draft: false,
  }, body);
}

/**
 * @returns {Promise<{added: string[], skipped: string[], failed: {slug: string, error: string}[], unchanged: string[]}>}
 */
export async function runSync({ plan, contentDir, skipFile, previewDir, uploader, fetchers, categories, dryRun = false, resync = null, sleepMs = 1500, log = () => {} }) {
  const result = { added: [], skipped: [], failed: [], unchanged: [] };
  const { byId, bySlug, linkMap } = await existingArticles(contentDir);
  const skips = (existsSync(skipFile) ? parse(await readFile(skipFile, "utf8")) : null) ?? [];
  const skipIds = new Set(skips.map((s) => String(s.wechat_id)));
  for (const it of plan.items) if (!it.skip && !skipIds.has(String(it.wechat_id)) && wechatShortUrl(it.url)) {
    linkMap.set(wechatShortUrl(it.url), byId.get(String(it.wechat_id)) ?? it.slug);
  }
  let newSkips = false, first = true;

  for (const item of plan.items) {
    const id = String(item.wechat_id);
    if (item.skip || skipIds.has(id)) {
      if (!skipIds.has(id)) { skips.push({ wechat_id: id, title: item.title, reason: String(item.skip) }); skipIds.add(id); newSkips = true; }
      result.skipped.push(id); continue;
    }
    const existing = byId.get(id);
    if (existing && resync !== existing) { result.unchanged.push(existing); continue; }
    const slug = existing ?? item.slug;
    const problem = validate({ ...item, slug }, categories)
      ?? (!existing && bySlug.has(slug) && bySlug.get(slug) !== id ? `slug ${slug} already belongs to wechat_id ${bySlug.get(slug)}` : null);
    if (problem) { result.failed.push({ slug: item.slug, error: problem }); log(`✗ ${item.slug}: ${problem}`); continue; }

    if (!first && sleepMs) await sleep(sleepMs);
    first = false;
    try {
      const text = await syncOne(item, slug, { uploader, fetchers, linkMap, dryRun });
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
  if (newSkips && !dryRun) await writeFile(skipFile, stringify(skips));
  return result;
}

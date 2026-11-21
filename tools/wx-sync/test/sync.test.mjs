import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, mkdir, stat, readdir } from "node:fs/promises";
import { readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parse } from "yaml";
import { runSync, optimizeExisting } from "../src/sync.mjs";
import { readFrontMatter } from "../src/frontmatter.mjs";

const ARTICLE = readFileSync(new URL("./fixtures/article.html", import.meta.url), "utf8");
import sharp from "sharp";
// A valid 3×2 PNG made by sharp itself (a hand-written base64 PNG made libspng fail intermittently).
const PNG = await sharp({ create: { width: 3, height: 2, channels: 4, background: "#336699" } }).png().toBuffer();
const CATEGORIES = ["work", "education", "life", "frontier", "tools"];

function item(n, over = {}) {
  return { wechat_id: `100${n}_1`, url: `https://mp.weixin.qq.com/s/ID${n}`, title: `标题 ${n}`, date: "2026-11-20T08:00:00+08:00",
    summary: `摘要 ${n}`, slug: `article-${n}`, category: "work", tags: ["裁员"], skip: null, ...over };
}

async function setup({ failImage = null } = {}) {
  const root = await mkdtemp(join(tmpdir(), "wx-sync-test-"));
  const contentDir = join(root, "content"), previewDir = join(root, "preview"), skipFile = join(root, "skip.yaml");
  await mkdir(contentDir); await writeFile(skipFile, "[]\n");
  const calls = { fetch: 0, put: [] };
  const uploaded = new Set();
  const uploader = {
    url: (k) => `https://img.example/${k}`,
    exists: async (k) => uploaded.has(k),
    put: async (k) => { calls.put.push(k); uploaded.add(k); },
  };
  const fetchers = {
    fetchArticleHtml: async () => { calls.fetch++; return ARTICLE; },
    downloadImage: async (url) => {
      if (failImage && url.includes(failImage)) throw new Error("HTTP 404");
      return { bytes: PNG, ext: url.includes("wx_fmt=png") ? "png" : "jpg", contentType: "image/png" };
    },
  };
  const run = (plan, opts = {}) => runSync({ plan, contentDir, skipFile, previewDir, uploader, fetchers, categories: CATEGORIES, sleepMs: 0, ...opts });
  return { root, contentDir, previewDir, skipFile, calls, run };
}

test("writes a complete article with R2 image URLs and dimensions", async () => {
  const s = await setup();
  const r = await s.run({ items: [item(1)] });
  assert.deepEqual(r.added, ["article-1"]);
  const text = await readFile(join(s.contentDir, "article-1/index.md"), "utf8");
  const fm = readFrontMatter(text);
  for (const k of ["title", "date", "summary", "categories", "tags", "cover", "wechat_url", "wechat_id", "images"]) assert.ok(fm[k] !== undefined, k);
  assert.deepEqual(fm.categories, ["work"]);
  assert.equal(fm.draft, false);
  assert.equal(fm.cover, "https://img.example/articles/article-1/cover.jpg");
  assert.deepEqual(fm.images["1.jpg"], [3, 2]);
  assert.deepEqual(fm.images["2.png"], [3, 2]);
  assert.deepEqual(fm.images["cover.jpg"], [3, 2]);
  assert.match(text, /!\[[^\]]*\]\(https:\/\/img\.example\/articles\/article-1\/1\.jpg/);
  assert.doesNotMatch(text, /wximg:/);
});

test("Review Focus 1: a failed image download fails only that article, atomically", async () => {
  const s = await setup({ failImage: "fake/2" });
  const plan = { items: [item(1)] };
  const r = await s.run(plan);
  assert.equal(r.failed.length, 1);
  assert.equal(r.failed[0].slug, "article-1");
  assert.equal(existsSync(join(s.contentDir, "article-1")), false);
  assert.deepEqual(await readdir(s.contentDir), []);
});

test("other articles still complete when one fails", async () => {
  const s = await setup();
  let n = 0;
  const r = await s.run({ items: [item(1), item(2)] }, {
    fetchers: { fetchArticleHtml: async () => { if (n++ === 0) throw new Error("blocked"); return ARTICLE; }, downloadImage: async () => ({ bytes: PNG, ext: "jpg", contentType: "image/jpeg" }) },
  });
  assert.deepEqual(r.failed.map((f) => f.slug), ["article-1"]);
  assert.deepEqual(r.added, ["article-2"]);
});

test("Review Focus 2: re-running the same plan changes nothing", async () => {
  const s = await setup();
  const plan = { items: [item(1), item(2)] };
  await s.run(plan);
  const before = (await stat(join(s.contentDir, "article-1/index.md"))).mtimeMs;
  const puts = s.calls.put.length, fetches = s.calls.fetch;
  const r = await s.run(plan);
  assert.deepEqual(r.added, []);
  assert.deepEqual(r.unchanged.sort(), ["article-1", "article-2"]);
  assert.equal(s.calls.put.length, puts);
  assert.equal(s.calls.fetch, fetches);
  assert.equal((await stat(join(s.contentDir, "article-1/index.md"))).mtimeMs, before);
});

test("Review Focus 4: a slug owned by another article is refused", async () => {
  const s = await setup();
  await s.run({ items: [item(1)] });
  const original = await readFile(join(s.contentDir, "article-1/index.md"), "utf8");
  const r = await s.run({ items: [item(9, { slug: "article-1" })] });
  assert.equal(r.failed.length, 1);
  assert.match(r.failed[0].error, /slug/);
  assert.equal(await readFile(join(s.contentDir, "article-1/index.md"), "utf8"), original);
});

test("invalid slug or category is refused before fetching", async () => {
  const s = await setup();
  const r = await s.run({ items: [item(1, { slug: "Bad Slug" }), item(2, { category: "nope" })] });
  assert.equal(r.failed.length, 2);
  assert.equal(s.calls.fetch, 0);
});

test("skip items go to the skip file and are never fetched; known skips stay skipped", async () => {
  const s = await setup();
  const r = await s.run({ items: [item(1, { skip: "招募令" })] });
  assert.deepEqual(r.skipped, ["1001_1"]);
  assert.equal(s.calls.fetch, 0);
  const skips = parse(await readFile(s.skipFile, "utf8"));
  assert.deepEqual(skips, [{ wechat_id: "1001_1", title: "标题 1", reason: "招募令" }]);
  const r2 = await s.run({ items: [item(1)] });
  assert.deepEqual(r2.skipped, ["1001_1"]);
  assert.equal(s.calls.fetch, 0);
});

test("resync overwrites an existing article but keeps its slug and image keys", async () => {
  const s = await setup();
  await s.run({ items: [item(1)] });
  const r = await s.run({ items: [item(1, { slug: "renamed-in-plan", title: "新标题" })] }, { resync: "article-1" });
  assert.deepEqual(r.added, ["article-1"]);
  assert.equal(existsSync(join(s.contentDir, "renamed-in-plan")), false);
  const fm = readFrontMatter(await readFile(join(s.contentDir, "article-1/index.md"), "utf8"));
  assert.equal(fm.title, "新标题");
  assert.equal(fm.cover, "https://img.example/articles/article-1/cover.jpg");
});

test("dry-run writes previews only and uploads nothing", async () => {
  const s = await setup();
  const r = await s.run({ items: [item(1)] }, { dryRun: true });
  assert.deepEqual(r.added, ["article-1"]);
  assert.equal(s.calls.put.length, 0);
  assert.deepEqual(await readdir(s.contentDir), []);
  assert.ok(existsSync(join(s.previewDir, "article-1/index.md")));
});

test("links to other articles in the same plan become site links", async () => {
  const s = await setup();
  await s.run({ items: [item(1, { url: "https://mp.weixin.qq.com/s/OTHER123", slug: "other-slug" }), item(2)] });
  const text = await readFile(join(s.contentDir, "article-2/index.md"), "utf8");
  assert.match(text, /\]\(\.\.\/other-slug\/index\.md\)/);
});

test("empty summary falls back to the page's og:description", async () => {
  const s = await setup();
  await s.run({ items: [item(1, { summary: "" })] });
  const fm = readFrontMatter(await readFile(join(s.contentDir, "article-1/index.md"), "utf8"));
  assert.equal(fm.summary, "作者写的摘要：这一篇讲的是示例。");
});

test("without og:description, summary falls back to the start of the body", async () => {
  const s = await setup();
  const noDesc = ARTICLE.replace(/<meta property="og:description"[^>]*>/, "");
  await s.run({ items: [item(1, { summary: "" })] }, { fetchers: { fetchArticleHtml: async () => noDesc, downloadImage: async () => ({ bytes: PNG, ext: "jpg", contentType: "image/jpeg" }) } });
  const fm = readFrontMatter(await readFile(join(s.contentDir, "article-1/index.md"), "utf8"));
  assert.match(fm.summary, /开头段落/);
  assert.ok(fm.summary.length <= 81);
});


test("links to a plan article that failed fall back to its WeChat URL", async () => {
  const s = await setup({ failImage: "fake/2" });
  const linking = ARTICLE.replace("https://mp.weixin.qq.com/s/OTHER123", "https://mp.weixin.qq.com/s/ID2");
  let n = 0;
  const r = await s.run({ items: [item(1), item(2)] }, { fetchers: {
    fetchArticleHtml: async () => (n++ === 0 ? linking.replace(/fake\/2/g, "fake/two") : ARTICLE),
    downloadImage: async (url) => { if (url.includes("fake/2")) throw new Error("HTTP 404"); return { bytes: PNG, ext: "jpg", contentType: "image/jpeg" }; },
  } });
  assert.deepEqual(r.added, ["article-1"]);
  const text = await readFile(join(s.contentDir, "article-1/index.md"), "utf8");
  assert.doesNotMatch(text, /\.\.\/article-2\/index\.md/);
  assert.match(text, /\]\(https:\/\/mp\.weixin\.qq\.com\/s\/ID2\)/);
});

test("resync re-uploads every image even when the key exists", async () => {
  const s = await setup();
  await s.run({ items: [item(1)] });
  const before = s.calls.put.length;
  await s.run({ items: [item(1)] }, { resync: "article-1" });
  assert.equal(s.calls.put.length - before, before);
});

test("a hand-written article folder is never overwritten", async () => {
  const s = await setup();
  await mkdir(join(s.contentDir, "article-1"));
  await writeFile(join(s.contentDir, "article-1/index.md"), "---\ntitle: mine\n---\nhand written\n");
  const r = await s.run({ items: [item(1)] });
  assert.equal(r.failed.length, 1);
  assert.equal(await readFile(join(s.contentDir, "article-1/index.md"), "utf8"), "---\ntitle: mine\n---\nhand written\n");
});

test("an item without a valid wechat_id is refused", async () => {
  const s = await setup();
  const r = await s.run({ items: [item(1, { wechat_id: undefined }), item(2, { wechat_id: "abc" })] });
  assert.equal(r.failed.length, 2);
  assert.equal(s.calls.fetch, 0);
});

test("an article page with no body text and no images fails instead of writing an empty article", async () => {
  const s = await setup();
  const empty = '<html><head><meta property="og:image" content="https://mmbiz.qpic.cn/c/0?wx_fmt=jpeg"></head><body><div id="js_content"><p> </p></div></body></html>';
  const r = await s.run({ items: [item(1)] }, { fetchers: { fetchArticleHtml: async () => empty, downloadImage: async () => ({ bytes: PNG, ext: "jpg", contentType: "image/jpeg" }) } });
  assert.equal(r.failed.length, 1);
  assert.match(r.failed[0].error, /empty/);
  assert.deepEqual(await readdir(s.contentDir), []);
});


test("sync uploads WebP versions of every image and marks the article webp: true", async () => {
  const s = await setup();
  await s.run({ items: [item(1)] }, { imageWidths: [480, 960] });
  for (const k of ["articles/article-1/1.webp", "articles/article-1/2.webp", "articles/article-1/3.webp", "articles/article-1/cover.webp"]) assert.ok(s.calls.put.includes(k), k);
  const fm = readFrontMatter(await readFile(join(s.contentDir, "article-1/index.md"), "utf8"));
  assert.equal(fm.webp, true);
});

test("optimizeExisting adds WebP versions to already-synced articles once", async () => {
  const s = await setup();
  await s.run({ items: [item(1)] });
  // simulate an article synced before WebP existed
  const file = join(s.contentDir, "article-1/index.md");
  await writeFile(file, (await readFile(file, "utf8")).replace(/^webp: true\n/m, ""));
  const puts = [];
  const uploader = { url: (k) => `https://img.example/${k}`, exists: async () => false, put: async (k) => puts.push(k) };
  const download = async () => ({ bytes: PNG, ext: "png", contentType: "image/png" });
  const r1 = await optimizeExisting({ contentDir: s.contentDir, uploader, downloadImage: download, imageWidths: [480] });
  assert.deepEqual(r1.optimized, ["article-1"]);
  assert.ok(puts.includes("articles/article-1/cover.webp"));
  assert.equal(readFrontMatter(await readFile(file, "utf8")).webp, true);
  const before = puts.length;
  const r2 = await optimizeExisting({ contentDir: s.contentDir, uploader, downloadImage: download, imageWidths: [480] });
  assert.deepEqual(r2.optimized, []);
  assert.equal(puts.length, before);
});


test("optimizeExisting --dry-run uploads nothing and changes no file", async () => {
  const s = await setup();
  await s.run({ items: [item(1)] });
  const file = join(s.contentDir, "article-1/index.md");
  await writeFile(file, (await readFile(file, "utf8")).replace(/^webp: true\n/m, ""));
  const before = await readFile(file, "utf8");
  const puts = [];
  const uploader = { url: (k) => `https://img.example/${k}`, exists: async () => false, put: async (k) => puts.push(k) };
  const r = await optimizeExisting({ contentDir: s.contentDir, uploader, downloadImage: async () => ({ bytes: PNG, ext: "png" }), dryRun: true });
  assert.deepEqual(r.optimized, ["article-1"]);
  assert.equal(puts.length, 0);
  assert.equal(await readFile(file, "utf8"), before);
});

test("rewriting an article keeps front matter the owner added by hand", async () => {
  const s = await setup();
  await s.run({ items: [item(1)] });
  const file = join(s.contentDir, "article-1/index.md");
  const t = (await readFile(file, "utf8")).replace(/^webp: true\n/m, "").replace("draft: false", 'draft: false\nfeatured: true\ncover_alt: "封面说明"');
  await writeFile(file, t);
  const uploader = { url: (k) => `https://img.example/${k}`, exists: async () => false, put: async () => {} };
  await optimizeExisting({ contentDir: s.contentDir, uploader, downloadImage: async () => ({ bytes: PNG, ext: "png" }) });
  const fm = readFrontMatter(await readFile(file, "utf8"));
  assert.equal(fm.featured, true);
  assert.equal(fm.cover_alt, "封面说明");
  assert.equal(fm.webp, true);
});

test("resync refuses an article with manual corrections unless forced", async () => {
  const s = await setup();
  await s.run({ items: [item(1)] });
  const file = join(s.contentDir, "article-1/index.md");
  await writeFile(file, (await readFile(file, "utf8")).replace("draft: false", 'draft: false\ncorrections:\n  - {date: "2026-12-01", note: "改正了一个数字"}'));
  const before = await readFile(file, "utf8");
  const r = await s.run({ items: [item(1)] }, { resync: "article-1" });
  assert.equal(r.failed.length, 1);
  assert.match(r.failed[0].error, /corrections/);
  assert.equal(await readFile(file, "utf8"), before);
  const r2 = await s.run({ items: [item(1)] }, { resync: "article-1", forceResync: true });
  assert.deepEqual(r2.added, ["article-1"]);
});

const PREVIEW = "http://mp.weixin.qq.com/s?__biz=MzA&tempkey=abc&chksm=1";
function draft(n, over = {}) {
  const { url, ...rest } = item(n, over);
  return { ...rest, wechat_id: `50253300${n}_1`, preview_url: PREVIEW, ...over };
}

test("a draft syncs from its preview link like any article, with no WeChat link yet", async () => {
  const s = await setup();
  let fetched;
  const orig = s.run;
  const r = await runSync({ plan: { items: [draft(1)] }, contentDir: s.contentDir, skipFile: s.skipFile, previewDir: s.previewDir, categories: CATEGORIES, sleepMs: 0,
    uploader: { url: (k) => `https://img.example/${k}`, exists: async () => false, put: async () => {} },
    fetchers: { fetchArticleHtml: async (u) => { fetched = u; return ARTICLE; }, downloadImage: async () => ({ bytes: PNG, ext: "png", contentType: "image/png" }) } });
  assert.deepEqual(r.added, ["article-1"]);
  assert.equal(fetched, PREVIEW);
  const fm = readFrontMatter(await readFile(join(s.contentDir, "article-1/index.md"), "utf8"));
  assert.equal(fm.wechat_url, undefined);
  assert.equal(fm.wechat_draft, true);
  assert.equal(fm.wechat_id, "502533001_1");
  assert.equal(fm.draft, false); // a normal, public article on the site
  assert.ok(!JSON.stringify(fm).includes("tempkey")); // the temporary preview key is never written
});

test("when a synced draft is published, the next sync links it by title instead of duplicating it", async () => {
  const s = await setup();
  await s.run({ items: [draft(1, { title: "同一个标题" })] });
  const r = await s.run({ items: [item(9, { title: "同一个标题", slug: "some-other-slug" })] });
  assert.deepEqual(r.added, []);
  assert.deepEqual(r.linked, ["article-1"]);
  const fm = readFrontMatter(await readFile(join(s.contentDir, "article-1/index.md"), "utf8"));
  assert.equal(fm.wechat_url, "https://mp.weixin.qq.com/s/ID9");
  assert.equal(fm.wechat_id, "1009_1");
  assert.equal(fm.wechat_draft, undefined);
  assert.ok(!existsSync(join(s.contentDir, "some-other-slug")));
});

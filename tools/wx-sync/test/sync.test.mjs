import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, mkdir, stat, readdir } from "node:fs/promises";
import { readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parse } from "yaml";
import { runSync } from "../src/sync.mjs";
import { readFrontMatter } from "../src/frontmatter.mjs";

const ARTICLE = readFileSync(new URL("./fixtures/article.html", import.meta.url), "utf8");
const PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAEUlEQVR4nGP4z8DwHxkzEC4AAJS1E+3cJd2wAAAAAElFTkSuQmCC", "base64");
const CATEGORIES = ["work", "education", "life", "tools"];

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

test("empty summary falls back to the start of the body", async () => {
  const s = await setup();
  await s.run({ items: [item(1, { summary: "" })] });
  const fm = readFrontMatter(await readFile(join(s.contentDir, "article-1/index.md"), "utf8"));
  assert.match(fm.summary, /开头段落/);
  assert.ok(fm.summary.length <= 81);
});

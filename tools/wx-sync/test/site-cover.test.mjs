import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { siteCover } from "../src/images.mjs";
import { addSiteCovers } from "../src/sync.mjs";
import { readFrontMatter } from "../src/frontmatter.mjs";

const photo = await sharp({ create: { width: 1536, height: 1024, channels: 3, background: "#557799" } }).png().toBuffer();

test("siteCover crops a generated photo to a 1280×544 JPEG", async () => {
  const { width, height, format } = await sharp(await siteCover(photo)).metadata();
  assert.deepEqual([width, height, format], [1280, 544, "jpeg"]);
});

test("addSiteCovers sets the site cover from <dir>/<slug>.png and keeps the WeChat cover", async () => {
  const root = await mkdtemp(join(tmpdir(), "site-cover-"));
  const content = join(root, "articles"), covers = join(root, "covers");
  await mkdir(join(content, "a"), { recursive: true }); await mkdir(join(content, "b")); await mkdir(covers);
  for (const s of ["a", "b"]) await writeFile(join(content, s, "index.md"), `---\ntitle: "T"\ncover: "https://img.example/articles/${s}/cover.jpg"\ncover_wide: "https://img.example/articles/${s}/cover-wide.jpg"\nimages:\n  cover.jpg:\n    - 459\n    - 459\nwebp: true\n---\n\nbody\n`);
  await writeFile(join(covers, "a.png"), photo);
  await writeFile(join(covers, "unknown-slug.png"), photo);
  const puts = [];
  const uploader = { url: (k) => `https://img.example/${k}`, exists: async () => false, put: async (k) => puts.push(k) };
  const r = await addSiteCovers({ dir: covers, contentDir: content, uploader, imageWidths: [480, 960] });
  assert.deepEqual(r.added, ["a"]);
  assert.deepEqual(r.unknown, ["unknown-slug"]);
  assert.ok(puts.includes("articles/a/cover-site.jpg") && puts.includes("articles/a/cover-site-480.webp") && puts.includes("articles/a/cover-site.webp"));
  const fm = readFrontMatter(await readFile(join(content, "a/index.md"), "utf8"));
  assert.equal(fm.cover_wide, "https://img.example/articles/a/cover-site.jpg");
  assert.deepEqual(fm.images["cover-site.jpg"], [1280, 544]);
  assert.equal(fm.cover, "https://img.example/articles/a/cover.jpg");
  assert.equal(readFrontMatter(await readFile(join(content, "b/index.md"), "utf8")).cover_wide, "https://img.example/articles/b/cover-wide.jpg");
});

test("addSiteCovers can upload under another name (a fresh URL beats CDN caches)", async () => {
  const root = await mkdtemp(join(tmpdir(), "site-cover-name-"));
  const content = join(root, "articles"), covers = join(root, "covers");
  await mkdir(join(content, "a"), { recursive: true }); await mkdir(covers);
  await writeFile(join(content, "a", "index.md"), `---\ntitle: "T"\ncover: "https://img.example/articles/a/cover.jpg"\nimages:\n  cover.jpg:\n    - 900\n    - 383\n---\n\nbody\n`);
  await writeFile(join(covers, "a.png"), photo);
  const puts = [];
  const uploader = { url: (k) => `https://img.example/${k}`, exists: async () => false, put: async (k) => puts.push(k) };
  await addSiteCovers({ dir: covers, contentDir: content, uploader, imageWidths: [480], name: "cover-poster" });
  assert.ok(puts.includes("articles/a/cover-poster.jpg") && puts.includes("articles/a/cover-poster-480.webp"));
  const fm = readFrontMatter(await readFile(join(content, "a/index.md"), "utf8"));
  assert.equal(fm.cover_wide, "https://img.example/articles/a/cover-poster.jpg");
  assert.deepEqual(fm.images["cover-poster.jpg"], [1280, 544]);
});

test("addSiteCovers takes a WebP quality (posters ship lighter)", async () => {
  const noisy = await sharp(Buffer.from(Array.from({ length: 1536 * 1024 * 3 }, (_, i) => (i * 2654435761) % 256)), { raw: { width: 1536, height: 1024, channels: 3 } }).png().toBuffer();
  const run = async (quality) => {
    const root = await mkdtemp(join(tmpdir(), "q-"));
    const content = join(root, "articles"), covers = join(root, "covers");
    await mkdir(join(content, "a"), { recursive: true }); await mkdir(covers);
    await writeFile(join(content, "a", "index.md"), `---\ntitle: "T"\ncover: "https://img.example/articles/a/cover.jpg"\n---\n\nbody\n`);
    await writeFile(join(covers, "a.png"), noisy);
    const sizes = {};
    const uploader = { url: (k) => `https://img.example/${k}`, exists: async () => false, put: async (k, b) => { sizes[k] = b.length; } };
    await addSiteCovers({ dir: covers, contentDir: content, uploader, imageWidths: [480], name: "p", quality });
    return sizes["articles/a/p-480.webp"];
  };
  assert.ok((await run(60)) < (await run(90)));
});

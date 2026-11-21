import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { wideCover, needsWide, WIDE } from "../src/images.mjs";
import { addWideCovers } from "../src/sync.mjs";
import { readFrontMatter } from "../src/frontmatter.mjs";

const square = await sharp({ create: { width: 400, height: 400, channels: 3, background: "#ff0000" } }).jpeg().toBuffer();

test("needsWide: square and near-square covers yes, WeChat 2.35:1 covers no", () => {
  assert.equal(needsWide([459, 459]), true);
  assert.equal(needsWide([1076, 459]), false);
  assert.equal(needsWide([1280, 544]), false);
});

test("wideCover keeps the whole image centred on a 1280×544 canvas", async () => {
  const out = await wideCover(square);
  const { width, height, format } = await sharp(out).metadata();
  assert.deepEqual([width, height, format], [WIDE.width, WIDE.height, "jpeg"]);
  const { data, info } = await sharp(out).raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => [...data.subarray((y * info.width + x) * info.channels, (y * info.width + x) * info.channels + 3)];
  const [r, g, b] = px(640, 272); // centre: the original, sharp
  assert.ok(r > 200 && g < 60 && b < 60, `centre should stay red, got ${[r, g, b]}`);
  const [er] = px(20, 272); // far side: a dimmed backdrop, not bright red
  assert.ok(er < 160, `side should be darker than the original, got ${er}`);
});

async function article(dir, slug, cover, extra = "") {
  await mkdir(join(dir, slug));
  await writeFile(join(dir, slug, "index.md"), `---\ntitle: "T"\ncover: "https://img.example/articles/${slug}/cover.jpg"\nwechat_id: "1_1"\nimages:\n  cover.jpg:\n    - ${cover[0]}\n    - ${cover[1]}\nwebp: true\n${extra}---\n\nbody\n`);
}

test("addWideCovers adds a wide cover to square-cover articles only, once", async () => {
  const dir = await mkdtemp(join(tmpdir(), "wide-")); 
  await article(dir, "sq", [459, 459]);
  await article(dir, "wide", [1280, 544]);
  const puts = [];
  const uploader = { url: (k) => `https://img.example/${k}`, exists: async () => false, put: async (k) => puts.push(k) };
  const downloadImage = async () => ({ bytes: square, ext: "jpg" });
  const r1 = await addWideCovers({ contentDir: dir, uploader, downloadImage, imageWidths: [480, 960, 1440] });
  assert.deepEqual(r1.added, ["sq"]);
  assert.ok(puts.includes("articles/sq/cover-wide.jpg"));
  assert.ok(puts.includes("articles/sq/cover-wide-480.webp") && puts.includes("articles/sq/cover-wide.webp"));
  const fm = readFrontMatter(await readFile(join(dir, "sq/index.md"), "utf8"));
  assert.equal(fm.cover_wide, "https://img.example/articles/sq/cover-wide.jpg");
  assert.deepEqual(fm.images["cover-wide.jpg"], [1280, 544]);
  assert.equal(fm.cover, "https://img.example/articles/sq/cover.jpg"); // original kept for sharing
  assert.equal(readFrontMatter(await readFile(join(dir, "wide/index.md"), "utf8")).cover_wide, undefined);
  const r2 = await addWideCovers({ contentDir: dir, uploader, downloadImage, imageWidths: [480] });
  assert.deepEqual(r2.added, []);
});

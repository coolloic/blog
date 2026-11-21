#!/usr/bin/env node
// Render an article's videos, upload them to R2 and write their URLs into its front matter.
//   npm run render -- <slug> [<slug>...] [--no-upload] [--only=cover|vertical]
// --no-upload renders into video/out/<slug>/ only (preview). Uploading uses wrangler like tools/wx-sync.
import { execFile } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { parse } from "yaml";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { validateStory, timeline } from "../lib/story.mjs";
import { videoKeys, withVideos } from "../lib/publish.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const BUCKET = "aijinhua-media";
const run = promisify(execFile);

const args = process.argv.slice(2);
const upload = !args.includes("--no-upload");
const only = args.find((a) => a.startsWith("--only="))?.slice(7);
const slugs = args.filter((a) => !a.startsWith("--"));
if (!slugs.length) { console.error("usage: npm run render -- <slug> [...] [--no-upload]"); process.exit(2); }

const yaml = (p) => parse(readFileSync(join(root, p), "utf8"));
const tokens = yaml("data/tokens.yaml");
const categories = yaml("data/categories.yaml");
const imageBase = String(yaml("hugo.yaml").params.imageBase).replace(/\/+$/, "");

const jobs = slugs.map((slug) => {
  const mdPath = join(root, "content/articles", slug, "index.md");
  const md = readFileSync(mdPath, "utf8");
  const fm = parse(md.match(/^---\n([\s\S]*?)\n---/)[1]);
  const story = JSON.parse(readFileSync(join(here, "../stories", `${slug}.json`), "utf8"));
  const errors = validateStory(story, { images: Object.keys(fm.images ?? {}) });
  if (errors.length) throw new Error(`stories/${slug}.json:\n  ${errors.join("\n  ")}`);
  return { slug, mdPath, fm, story, ...timeline(story) };
});

console.log("bundling…");
const serveUrl = await bundle({ entryPoint: join(here, "../src/index.jsx"), publicDir: join(root, "static") });

for (const job of jobs) {
  const out = join(here, "../out", job.slug);
  mkdirSync(out, { recursive: true });
  const base = `${imageBase}/articles/${job.slug}`;
  const renders = {
    cover: { id: "CoverLoop", file: join(out, "cover-loop.mp4"), crf: 28, props: { tokens, cover: job.fm.cover_wide || job.fm.cover } },
    vertical: { id: "Vertical", file: join(out, "vertical.mp4"), crf: 20, props: {
      tokens, scenes: job.scenes, durationInFrames: job.durationInFrames, title: job.fm.title, shortTitle: job.story.shortTitle,
      category: categories[job.fm.categories?.[0]]?.name, imageBase: base } },
  };
  for (const [kind, r] of Object.entries(renders)) {
    if (only && kind !== only) continue;
    const composition = await selectComposition({ serveUrl, id: r.id, inputProps: r.props });
    await renderMedia({ serveUrl, composition, inputProps: r.props, codec: "h264", crf: r.crf, muted: true, outputLocation: r.file,
      onProgress: ({ progress }) => process.stdout.write(`\r${job.slug} ${kind} ${Math.round(progress * 100)}%  `) });
    console.log(`\r${job.slug} ${kind}: ${(statSync(r.file).size / 1024).toFixed(0)} KB, ${(composition.durationInFrames / composition.fps).toFixed(1)} s`);
  }
  if (!upload) continue;
  const keys = videoKeys(job.slug);
  for (const [kind, key] of Object.entries(keys)) {
    if (only && kind !== only) continue;
    await run("npx", ["wrangler", "r2", "object", "put", `${BUCKET}/${key}`, "--file", renders[kind].file, "--content-type", "video/mp4", "--remote"]);
  }
  writeFileSync(job.mdPath, withVideos(readFileSync(job.mdPath, "utf8"), { cover_video: `${imageBase}/${keys.cover}`, video_vertical: `${imageBase}/${keys.vertical}` }));
  console.log(`${job.slug}: uploaded and front matter updated`);
}

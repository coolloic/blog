#!/usr/bin/env node
// Usage: node tools/wx-sync/bin/wx-sync.mjs --plan .wx-sync/plan.json [--dry-run] [--resync <slug>]
// The plan is written by Claude (see .claude/skills/wx-sync/SKILL.md).
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { parseArgs } from "node:util";
import { parse } from "yaml";
import { runSync, optimizeExisting, addWideCovers, addSiteCovers } from "../src/sync.mjs";
import { makeUploader, readImageBase } from "../src/r2.mjs";
import { fetchArticleHtml, downloadImage } from "../src/fetch.mjs";

const USAGE = `wx-sync — sync WeChat articles into content/articles/

  --plan <file>     plan written by Claude (default .wx-sync/plan.json)
  --dry-run         fetch and convert into .wx-sync/preview/; upload nothing, write nothing to content/
  --resync <slug>   re-fetch one already-synced article; its slug and image keys stay the same
  --optimize-existing  add WebP versions (params.imageWidths) to synced articles that lack them (honours --dry-run)
  --wide-covers     give square-cover articles a 2.35:1 cover (cover_wide) for the site's cover boxes (honours --dry-run)
  --webp-quality <n>   with --site-covers: WebP quality (default 78; posters use 68)
  --cover-name <name>  with --site-covers: R2 file name (default cover-site); use a new name to replace a cover past CDN caches
  --site-covers <dir>  set the site cover (cover_wide) from <dir>/<slug>.png, cropped to 2.35:1; WeChat cover kept (honours --dry-run)
  --force-resync    with --resync: proceed even if the article has manual corrections (they must be re-applied)
  --help            this text

Exit code 1 if any article failed.`;

const { values } = parseArgs({ options: {
  plan: { type: "string", default: ".wx-sync/plan.json" }, "dry-run": { type: "boolean", default: false },
  resync: { type: "string" }, "optimize-existing": { type: "boolean", default: false }, "wide-covers": { type: "boolean", default: false }, "site-covers": { type: "string" }, "cover-name": { type: "string", default: "cover-site" }, "webp-quality": { type: "string" }, "force-resync": { type: "boolean", default: false }, help: { type: "boolean", default: false } } });
if (values.help) { console.log(USAGE); process.exit(0); }

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const config = JSON.parse(readFileSync(resolve(root, "tools/wx-sync/config.json"), "utf8"));
const categories = Object.keys(parse(readFileSync(resolve(root, "data/categories.yaml"), "utf8")));
const imageWidths = parse(readFileSync(resolve(root, "hugo.yaml"), "utf8"))?.params?.imageWidths;
const dryRun = values["dry-run"];

if (values["optimize-existing"]) {
  const r = await optimizeExisting({
    contentDir: resolve(root, "content/articles"), imageWidths, downloadImage, dryRun,
    uploader: makeUploader({ bucket: config.bucket, imageBase: readImageBase(resolve(root, "hugo.yaml")) }),
    log: (line) => console.log(line),
  });
  console.log(`\noptimized ${r.optimized.length} · failed ${r.failed.length}`);
  for (const f of r.failed) console.log(`  failed ${f.slug}: ${f.error}`);
  process.exit(r.failed.length ? 1 : 0);
}

if (values["site-covers"]) {
  const r = await addSiteCovers({
    dir: resolve(values["site-covers"]), contentDir: resolve(root, "content/articles"), imageWidths, dryRun, name: values["cover-name"], quality: values["webp-quality"] ? Number(values["webp-quality"]) : undefined,
    uploader: makeUploader({ bucket: config.bucket, imageBase: readImageBase(resolve(root, "hugo.yaml")) }),
    log: (line) => console.log(line),
  });
  console.log(`\n${dryRun ? "[dry run] " : ""}site covers ${r.added.length} · unknown ${r.unknown.length} · failed ${r.failed.length}`);
  for (const f of r.failed) console.log(`  failed ${f.slug}: ${f.error}`);
  process.exit(r.failed.length ? 1 : 0);
}

if (values["wide-covers"]) {
  const r = await addWideCovers({
    contentDir: resolve(root, "content/articles"), imageWidths, downloadImage, dryRun,
    uploader: makeUploader({ bucket: config.bucket, imageBase: readImageBase(resolve(root, "hugo.yaml")) }),
    log: (line) => console.log(line),
  });
  console.log(`\n${dryRun ? "[dry run] " : ""}wide covers ${r.added.length} · failed ${r.failed.length}`);
  for (const f of r.failed) console.log(`  failed ${f.slug}: ${f.error}`);
  process.exit(r.failed.length ? 1 : 0);
}

const plan = JSON.parse(readFileSync(resolve(root, values.plan), "utf8"));

const result = await runSync({
  plan, categories, dryRun, imageWidths, resync: values.resync ?? null, forceResync: values["force-resync"],
  contentDir: resolve(root, "content/articles"),
  skipFile: resolve(root, "data/wechat-skip.yaml"),
  previewDir: resolve(root, ".wx-sync/preview"),
  uploader: makeUploader({ bucket: config.bucket, imageBase: readImageBase(resolve(root, "hugo.yaml")), dryRun }),
  fetchers: { fetchArticleHtml, downloadImage },
  log: (line) => console.log(line),
});

console.log(`\n${dryRun ? "[dry run] " : ""}added ${result.added.length} · unchanged ${result.unchanged.length} · skipped ${result.skipped.length} · failed ${result.failed.length}`);
for (const f of result.failed) console.log(`  failed ${f.slug}: ${f.error}`);
process.exit(result.failed.length ? 1 : 0);

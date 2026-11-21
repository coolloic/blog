#!/usr/bin/env node
// "Real photo + 大字报" site cover: overlay a headline on a generated photo (no text in the photo).
//   node bin/poster.mjs <slug> --photo <png> --line1 "被 AI 裁员了" --line2 "怎么办？" --sub "失业后的{30 天}…" [--focus right|center|left]
//   node bin/poster.mjs --jobs <file.json> --photos <dir>   (batch: [{slug, line1, line2, sub}], photo <dir>/<slug>.png)
// Writes video/out/<slug>/cover-site.png; upload it with: node tools/wx-sync/bin/wx-sync.mjs --site-covers <dir>
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { parse } from "yaml";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";

const here = dirname(fileURLToPath(import.meta.url));
const { values, positionals } = parseArgs({ allowPositionals: true, options: {
  jobs: { type: "string" }, photos: { type: "string" }, photo: { type: "string" }, line1: { type: "string" }, line2: { type: "string" }, sub: { type: "string" }, focus: { type: "string", default: "right" } } });
const tokens = parse(readFileSync(resolve(here, "../../data/tokens.yaml"), "utf8"));
const jobs = values.jobs
  ? JSON.parse(readFileSync(resolve(values.jobs), "utf8")).map((j) => ({ ...j, photo: join(resolve(values.photos), `${j.slug}.png`) }))
  : [{ slug: positionals[0], photo: values.photo, line1: values.line1, line2: values.line2, sub: values.sub, focus: values.focus }];
for (const j of jobs) if (!j.slug || !j.photo || !j.line1 || !j.line2) { console.error("usage: poster.mjs <slug> --photo <png> --line1 … --line2 … [--sub …] | --jobs <json> --photos <dir>"); process.exit(2); }
const serveUrl = await bundle({ entryPoint: join(here, "../src/index.jsx"), publicDir: resolve(here, "../../static") });
for (const j of jobs) {
  const photo = `data:image/png;base64,${readFileSync(resolve(j.photo)).toString("base64")}`;
  const inputProps = { photo, line1: j.line1, line2: j.line2, sub: j.sub, focus: j.focus ?? "right", tokens };
  const composition = await selectComposition({ serveUrl, id: "CoverPoster", inputProps });
  const out = join(here, "../out", j.slug); mkdirSync(out, { recursive: true });
  await renderStill({ serveUrl, composition, inputProps, output: join(out, "cover-site.png"), imageFormat: "png" });
  console.log(join(out, "cover-site.png"));
}

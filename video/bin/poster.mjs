#!/usr/bin/env node
// "Real photo + 大字报" site cover: overlay a headline on a generated photo (no text in the photo).
//   node bin/poster.mjs <slug> --photo <png> --line1 "被 AI 裁员了" --line2 "怎么办？" --sub "失业后的{30 天}…" [--focus right|center|left]
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
  photo: { type: "string" }, line1: { type: "string" }, line2: { type: "string" }, sub: { type: "string" }, focus: { type: "string", default: "right" } } });
const slug = positionals[0];
if (!slug || !values.photo || !values.line1 || !values.line2) { console.error("usage: poster.mjs <slug> --photo <png> --line1 … --line2 … [--sub …]"); process.exit(2); }
const tokens = parse(readFileSync(resolve(here, "../../data/tokens.yaml"), "utf8"));
const photo = `data:image/png;base64,${readFileSync(resolve(values.photo)).toString("base64")}`;
const inputProps = { photo, line1: values.line1, line2: values.line2, sub: values.sub, focus: values.focus, tokens };
const serveUrl = await bundle({ entryPoint: join(here, "../src/index.jsx"), publicDir: resolve(here, "../../static") });
const composition = await selectComposition({ serveUrl, id: "CoverPoster", inputProps });
const out = join(here, "../out", slug); mkdirSync(out, { recursive: true });
await renderStill({ serveUrl, composition, inputProps, output: join(out, "cover-site.png"), imageFormat: "png" });
console.log(join(out, "cover-site.png"));

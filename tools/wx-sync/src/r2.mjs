// Upload images to Cloudflare R2 through the wrangler CLI (the owner logs in once with `npx wrangler login`;
// no keys are stored). Existence is checked with a HEAD on the public URL, so re-runs never re-upload.
import { execFile } from "node:child_process";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { parse } from "yaml";

const run = promisify(execFile);

export function readImageBase(hugoYamlPath) {
  const base = parse(readFileSync(hugoYamlPath, "utf8"))?.params?.imageBase;
  if (!base) throw new Error(`${hugoYamlPath}: params.imageBase is not set`);
  return String(base).replace(/\/+$/, "");
}

export function makeUploader({ bucket, imageBase, dryRun = false, exec = run, fetchImpl = fetch }) {
  const base = String(imageBase).replace(/\/+$/, "");
  const uploaded = [];
  return {
    uploaded,
    url: (key) => `${base}/${key}`,
    async exists(key) {
      if (dryRun) return false;
      const res = await fetchImpl(`${base}/${key}`, { method: "HEAD" });
      return res.ok;
    },
    async put(key, bytes, contentType) {
      uploaded.push(key);
      if (dryRun) return;
      const dir = await mkdtemp(join(tmpdir(), "wx-sync-"));
      const file = join(dir, key.replace(/\//g, "_"));
      try {
        await writeFile(file, bytes);
        await exec("npx", ["wrangler", "r2", "object", "put", `${bucket}/${key}`, "--file", file, "--content-type", contentType, "--remote"]);
      } finally {
        await rm(dir, { recursive: true, force: true });
      }
    },
  };
}

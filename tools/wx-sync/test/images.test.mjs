import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dimensions } from "../src/images.mjs";
import { makeUploader, readImageBase } from "../src/r2.mjs";

// 3×2 PNG
const PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAEUlEQVR4nGP4z8DwHxkzEC4AAJS1E+3cJd2wAAAAAElFTkSuQmCC", "base64");

test("dimensions reads width and height", () => {
  assert.deepEqual(dimensions(PNG), [3, 2]);
});

test("dry-run uploader never runs wrangler", async () => {
  const calls = [];
  const up = makeUploader({ bucket: "b", imageBase: "https://img.example", dryRun: true, exec: async (...a) => calls.push(a) });
  await up.put("articles/x/1.jpg", PNG, "image/png");
  assert.equal(calls.length, 0);
  assert.deepEqual(up.uploaded, ["articles/x/1.jpg"]);
});

test("real uploader calls wrangler r2 object put --remote", async () => {
  const calls = [];
  const up = makeUploader({ bucket: "aijinhua-media", imageBase: "https://img.example", exec: async (cmd, args) => { calls.push([cmd, args]); return { stdout: "" }; } });
  await up.put("articles/x/1.jpg", PNG, "image/jpeg");
  assert.equal(calls.length, 1);
  const [cmd, args] = calls[0];
  assert.equal(cmd, "npx");
  const line = args.join(" ");
  assert.match(line, /wrangler r2 object put aijinhua-media\/articles\/x\/1\.jpg/);
  assert.match(line, /--content-type image\/jpeg/);
  assert.match(line, /--remote/);
  assert.match(line, /--file \S+/);
});

test("url joins imageBase and key", () => {
  const up = makeUploader({ bucket: "b", imageBase: "https://img.example/", exec: async () => {} });
  assert.equal(up.url("articles/x/1.jpg"), "https://img.example/articles/x/1.jpg");
});

test("exists is a HEAD request on the public URL", async () => {
  const seen = [];
  const fetchImpl = async (url, init) => { seen.push([url, init.method]); return new Response(null, { status: url.endsWith("1.jpg") ? 200 : 404 }); };
  const up = makeUploader({ bucket: "b", imageBase: "https://img.example", exec: async () => {}, fetchImpl });
  assert.equal(await up.exists("articles/x/1.jpg"), true);
  assert.equal(await up.exists("articles/x/2.jpg"), false);
  assert.deepEqual(seen[0], ["https://img.example/articles/x/1.jpg", "HEAD"]);
});

test("readImageBase reads params.imageBase from hugo.yaml", () => {
  const base = readImageBase(fileURLToPath(new URL("../../../hugo.yaml", import.meta.url)));
  assert.match(base, /^https:\/\//);
  assert.doesNotMatch(base, /\/$/);
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fetchArticleHtml, downloadImage, FetchError } from "../src/fetch.mjs";

const fixture = (name) => readFileSync(new URL(`./fixtures/${name}`, import.meta.url), "utf8");
const fakeFetch = (body, { status = 200, type = "text/html" } = {}) => async () =>
  new Response(body, { status, headers: { "content-type": type } });

test("article page with #js_content is returned", async () => {
  const html = await fetchArticleHtml("https://mp.weixin.qq.com/s/x", { fetchImpl: fakeFetch(fixture("tiny-article.html")) });
  assert.match(html, /js_content/);
});

test("WeChat verification page is an error, not an empty article", async () => {
  await assert.rejects(
    fetchArticleHtml("https://mp.weixin.qq.com/s/x", { fetchImpl: fakeFetch(fixture("verify-page.html")) }),
    (e) => e instanceof FetchError && /not an article page/.test(e.message),
  );
});

test("non-2xx article response is an error", async () => {
  await assert.rejects(fetchArticleHtml("https://mp.weixin.qq.com/s/x", { fetchImpl: fakeFetch("x", { status: 503 }) }), FetchError);
});

test("image extension comes from wx_fmt", async () => {
  const img = await downloadImage("https://mmbiz.qpic.cn/a/0?wx_fmt=png&from=appmsg", { fetchImpl: fakeFetch(new Uint8Array([1, 2, 3]), { type: "image/png" }) });
  assert.equal(img.ext, "png");
  assert.equal(img.contentType, "image/png");
  assert.equal(img.bytes.length, 3);
});

test("image extension falls back to content-type", async () => {
  const img = await downloadImage("https://mmbiz.qpic.cn/a/0", { fetchImpl: fakeFetch(new Uint8Array([1]), { type: "image/jpeg" }) });
  assert.equal(img.ext, "jpg");
});

test("image 404 is an error", async () => {
  await assert.rejects(downloadImage("https://mmbiz.qpic.cn/a/0?wx_fmt=jpeg", { fetchImpl: fakeFetch("no", { status: 404 }) }), FetchError);
});

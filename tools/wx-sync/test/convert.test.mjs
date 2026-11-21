import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { convertArticle } from "../src/convert.mjs";

const html = readFileSync(new URL("./fixtures/article.html", import.meta.url), "utf8");
const linkMap = new Map([["https://mp.weixin.qq.com/s/OTHER123", "other-slug"]]);
const { markdown: md, images, coverUrl } = convertArticle(html, { linkMap });

test("WeChat widgets and everything from 往期推荐 on are dropped", () => {
  assert.doesNotMatch(md, /名片签名不该出现|示例公众号/);
  assert.doesNotMatch(md, /往期推荐|往期文章一|之后的内容不该出现/);
  assert.match(md, /结尾段落/);
});

test("the trailing 招募令 promo block is dropped", () => {
  assert.doesNotMatch(md, /招募令|招募内容不该出现/);
});

test("bold ending in CJK punctuation before text gets an escaped space (goldmark cjk.escapedSpace)", () => {
  assert.match(md, /\*\*1\\\. 确认补偿。\*\*\\ 按照规定办理/);
  assert.match(md, /前文「\*\*引号开头\*\*」后文/);
});

test("headings: h1 and h2 become ##, h3 becomes ###", () => {
  assert.match(md, /^## 一级标题$/m);
  assert.match(md, /^## 二级标题$/m);
  assert.match(md, /^### 三级标题$/m);
});

test("inline formatting, lists, quotes and tables survive", () => {
  assert.match(md, /\*\*加粗\*\*/);
  assert.match(md, /\*斜体\*|_斜体_/);
  assert.match(md, /^- 无序一$/m);
  assert.match(md, /^1\. 有序一$/m);
  assert.match(md, /^> 一段引用$/m);
  assert.match(md, /^\| 列一 \| 列二 \|$/m);
  assert.match(md, /带样式的提示框内容/);
});

test("angle-bracket text stays text and emoji survive", () => {
  assert.match(md, /\\<think\\?>|&lt;think&gt;/);
  assert.doesNotMatch(md, /(^|[^\\])<think>/);
  assert.match(md, /🤖/);
});

test("images become ordered placeholders; decorative dividers are dropped; caption becomes title", () => {
  assert.deepEqual(images.map((i) => i.n), [1, 2, 3]);
  assert.equal(images[0].src, "https://mmbiz.qpic.cn/fake/1?wx_fmt=jpeg");
  assert.match(md, /!\[[^\]]*\]\(wximg:1 "图 1：第一张图的图注"\)/);
  assert.match(md, /!\[[^\]]*\]\(wximg:2\)/);
  assert.match(md, /!\[[^\]]*\]\(wximg:3\)/);
  assert.doesNotMatch(md, /divider/);
  assert.doesNotMatch(md, /^图 1：第一张图的图注$/m);
});

test("links to synced WeChat articles become site links; others stay", () => {
  assert.match(md, /\[站内文章链接\]\(\.\.\/other-slug\/index\.md\)/);
  assert.match(md, /\[外部链接\]\(https:\/\/example\.com\/page\)/);
});

test("cover comes from og:image", () => {
  assert.equal(coverUrl, "https://mmbiz.qpic.cn/fake_cover/0?wx_fmt=jpeg");
});

test("no runs of blank lines or trailing spaces", () => {
  assert.doesNotMatch(md, /\n{3,}/);
  assert.doesNotMatch(md, /[ \t]+$/m);
});

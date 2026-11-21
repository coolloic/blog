import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { convertArticle } from "../src/convert.mjs";

const html = readFileSync(new URL("./fixtures/article.html", import.meta.url), "utf8");
const linkMap = new Map([["https://mp.weixin.qq.com/s/OTHER123", "other-slug"]]);
const { markdown: md, images, coverUrl, description } = convertArticle(html, { linkMap });

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

test("description comes from og:description", () => {
  assert.equal(description, "作者写的摘要：这一篇讲的是示例。");
});

test("cover comes from og:image", () => {
  assert.equal(coverUrl, "https://mmbiz.qpic.cn/fake_cover/0?wx_fmt=jpeg");
});

test("no runs of blank lines or trailing spaces", () => {
  assert.doesNotMatch(md, /\n{3,}/);
  assert.doesNotMatch(md, /[ \t]+$/m);
});

const tail = convertArticle(readFileSync(new URL("./fixtures/article-tail.html", import.meta.url), "utf8"), {
  linkMap: new Map([["2650016552_1", "ai-video-guide"]]),
});

test("📚 往期推荐 and the 📌 合集 footer are cut, whatever emoji leads them", () => {
  assert.match(tail.markdown, /正文最后一段/);
  assert.doesNotMatch(tail.markdown, /往期|合集|某篇旧文/);
});

test("long-form WeChat links (mid/idx) map to synced articles by wechat_id", () => {
  assert.match(tail.markdown, /\[另一篇长链接文章\]\(\.\.\/ai-video-guide\/index\.md\)/);
  assert.match(tail.markdown, /\[外部长链接\]\(https:\/\/mp\.weixin\.qq\.com\/s\?/);
});

const tbl = convertArticle(readFileSync(new URL("./fixtures/article-table.html", import.meta.url), "utf8"));

test("WeChat tables with block content in cells become one-line Markdown rows", () => {
  const rows = tbl.markdown.split("\n").filter((l) => l.startsWith("|"));
  assert.match(tbl.markdown, /^\| 题型 \| 用途 \| 返回 \|$/m);
  assert.match(tbl.markdown, /^\| `noul` （是\/否） \| 有没有违规？ 需不需要工具？ \| "是"的概率 \+ 置信度 \|$/m);
  assert.doesNotMatch(tbl.markdown, /^\|\s*$/m);
  assert.ok(rows.every((r) => r.trim().endsWith("|")), "every table line is a complete row");
});

test("a table without header cells uses its first row as the header", () => {
  assert.match(tbl.markdown, /^\| 甲 \| 乙 \|$/m);
  assert.match(tbl.markdown, /^\| 1 \| 2 \|$/m);
});

test("og:description is decoded (JS \\x escapes and HTML entities)", () => {
  assert.equal(tbl.description, "AI 能做的事\"越来越多\"，也有做不到的");
});

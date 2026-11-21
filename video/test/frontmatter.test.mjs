import { test } from "node:test";
import assert from "node:assert/strict";
import { withVideos, videoKeys } from "../lib/publish.mjs";

const article = `---
title: "标题"
date: "2026-11-18T03:12:49+08:00"
cover: "https://aitanyan.com/img/articles/demo/cover.jpg"
wechat_url: "https://mp.weixin.qq.com/s/x"
featured: true
draft: false
---

正文第一段。
`;

test("R2 keys for an article's videos", () => {
  assert.deepEqual(videoKeys("demo"), { cover: "videos/demo/cover-loop.mp4", vertical: "videos/demo/vertical.mp4" });
});

test("writes cover_video and video_vertical, keeps every other key and the body", () => {
  const out = withVideos(article, { cover_video: "https://aitanyan.com/img/videos/demo/cover-loop.mp4", video_vertical: "https://aitanyan.com/img/videos/demo/vertical.mp4" });
  assert.match(out, /cover_video: "https:\/\/aitanyan\.com\/img\/videos\/demo\/cover-loop\.mp4"/);
  assert.match(out, /video_vertical: "https:\/\/aitanyan\.com\/img\/videos\/demo\/vertical\.mp4"/);
  assert.match(out, /featured: true/);
  assert.match(out, /title: "标题"/);
  assert.ok(out.endsWith("正文第一段。\n"));
});

test("re-running replaces the values instead of duplicating keys", () => {
  const once = withVideos(article, { cover_video: "a.mp4", video_vertical: "b.mp4" });
  const twice = withVideos(once, { cover_video: "c.mp4", video_vertical: "d.mp4" });
  assert.equal((twice.match(/cover_video:/g) || []).length, 1);
  assert.match(twice, /cover_video: "c\.mp4"/);
});

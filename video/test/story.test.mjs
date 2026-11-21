import { test } from "node:test";
import assert from "node:assert/strict";
import { validateStory, timeline, FPS } from "../lib/story.mjs";

const good = () => ({
  slug: "demo",
  hook: "3 秒声音就能克隆你",
  points: [
    { text: "只需约 3 秒音频，AI 就能克隆你的声音", image: "2.jpg" },
    { text: "70% 的人分不清克隆声音和真人" },
    { text: "设一个只有家人知道的暗号" },
  ],
  takeaway: "最着急的时候，挂断，再打回去",
});
const images = ["1.jpg", "2.jpg"];

test("a well-formed story has no errors", () => {
  assert.deepEqual(validateStory(good(), { images }), []);
});

test("needs 3 to 5 points", () => {
  const s = good(); s.points = s.points.slice(0, 2);
  assert.match(validateStory(s, { images }).join(), /3–5 points/);
  const t = good(); t.points = Array(6).fill({ text: "要点" });
  assert.match(validateStory(t, { images }).join(), /3–5 points/);
});

test("enforces per-screen length limits", () => {
  const s = good(); s.hook = "字".repeat(31);
  assert.match(validateStory(s, { images }).join(), /hook.*30/);
  const p = good(); p.points[1].text = "字".repeat(41);
  assert.match(validateStory(p, { images }).join(), /points\[1\].*40/);
  const k = good(); k.takeaway = "";
  assert.match(validateStory(k, { images }).join(), /takeaway/);
});

test("an image must be one of the article's own images", () => {
  const s = good(); s.points[0].image = "9.jpg";
  assert.match(validateStory(s, { images }).join(), /9\.jpg/);
});

test("timeline: hook, points, takeaway, outro, back to back, 30–60 s", () => {
  const { scenes, durationInFrames } = timeline(good());
  assert.deepEqual(scenes.map((s) => s.kind), ["hook", "point", "point", "point", "takeaway", "outro"]);
  let at = 0;
  for (const s of scenes) { assert.equal(s.from, at); assert.ok(s.durationInFrames >= 2 * FPS); at += s.durationInFrames; }
  assert.equal(durationInFrames, at);
  assert.ok(at >= 30 * FPS && at <= 60 * FPS, `got ${at / FPS}s`);
  assert.equal(scenes[1].image, "2.jpg");
  assert.equal(scenes[1].index, 1);
});

test("longer text gets more time", () => {
  const { scenes } = timeline(good());
  assert.ok(scenes[1].durationInFrames > scenes[3].durationInFrames);
});

test("timeline pads a short story up to 30 s", () => {
  const s = good(); s.hook = "AI"; s.points = [{ text: "一" }, { text: "二" }, { text: "三" }]; s.takeaway = "完";
  assert.equal(timeline(s).durationInFrames, 30 * FPS);
});

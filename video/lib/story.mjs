// Storyboards for the vertical video: video/stories/<slug>.json, written from the article's own text.
export const FPS = 30;
export const LIMITS = { hook: 30, point: 40, takeaway: 30 };
const MIN_S = 30, MAX_S = 60, OUTRO_S = 4;

const len = (s) => [...String(s ?? "").trim()].length;

/** Problems with a storyboard, as readable strings; [] when it is fine. `images` = the article's image file names. */
export function validateStory(story, { images = [] } = {}) {
  const errors = [];
  const check = (name, text, max) => {
    if (!len(text)) errors.push(`${name} is empty`);
    else if (len(text) > max) errors.push(`${name} is ${len(text)} characters (max ${max})`);
  };
  check("hook", story.hook, LIMITS.hook);
  const points = Array.isArray(story.points) ? story.points : [];
  if (points.length < 3 || points.length > 5) errors.push(`needs 3–5 points (has ${points.length})`);
  points.forEach((p, i) => {
    check(`points[${i}]`, p?.text, LIMITS.point);
    if (p?.image && !images.includes(p.image)) errors.push(`points[${i}].image ${p.image} is not one of the article's images`);
  });
  check("takeaway", story.takeaway, LIMITS.takeaway);
  return errors;
}

// Reading time: about 4.5 Chinese characters a second, plus a beat to settle.
const seconds = (text) => Math.max(2.5, 1.2 + len(text) * 0.22);

/** Scenes back to back (hook, points, takeaway, outro), padded up to 30 s; throws past 60 s. */
export function timeline(story) {
  const content = [
    { kind: "hook", text: story.hook },
    ...story.points.map((p, i) => ({ kind: "point", text: p.text, image: p.image, index: i + 1 })),
    { kind: "takeaway", text: story.takeaway },
  ].map((s) => ({ ...s, secs: seconds(s.text) }));
  const total = content.reduce((a, s) => a + s.secs, 0) + OUTRO_S;
  if (total > MAX_S) throw new Error(`${story.slug}: video would be ${total.toFixed(1)} s (max ${MAX_S}); shorten the text`);
  const pad = Math.max(0, MIN_S - total) / content.length;
  const scenes = [...content.map((s) => ({ ...s, secs: s.secs + pad })), { kind: "outro", secs: OUTRO_S }];
  let from = 0;
  const out = scenes.map(({ secs, ...s }) => {
    const durationInFrames = Math.round(secs * FPS);
    const scene = { ...s, from, durationInFrames };
    from += durationInFrames;
    return scene;
  });
  // Rounding can leave the total a frame short of the 30 s floor.
  if (from < MIN_S * FPS) { out[out.length - 2].durationInFrames += MIN_S * FPS - from; out[out.length - 1].from += MIN_S * FPS - from; from = MIN_S * FPS; }
  return { scenes: out, durationInFrames: from };
}

// Where an article's videos live on R2, and writing their URLs back into its front matter.
export const videoKeys = (slug) => ({ cover: `videos/${slug}/cover-loop.mp4`, vertical: `videos/${slug}/vertical.mp4` });

/** Sets (or replaces) top-level front matter keys, leaving every other line and the body as they are. */
export function withVideos(text, values) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error("no front matter");
  let fm = m[1];
  for (const [key, value] of Object.entries(values)) {
    const line = `${key}: ${JSON.stringify(String(value))}`;
    const re = new RegExp(`^${key}:.*$`, "m");
    fm = re.test(fm) ? fm.replace(re, line) : `${fm}\n${line}`;
  }
  return `---\n${fm}\n---\n${text.slice(m[0].length)}`;
}

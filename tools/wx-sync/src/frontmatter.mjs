import { parse, stringify } from "yaml";

const ORDER = ["title", "date", "summary", "categories", "tags", "cover", "wechat_url", "wechat_id", "images", "webp", "draft"];

/** Front matter + body for content/articles/<slug>/index.md. Keys in a stable order so re-syncs diff cleanly. */
// Known keys first in a fixed order; any other key (featured, cover_alt, corrections… added by hand) is kept after them.
export function renderArticle(fields, body) {
  const known = ORDER.filter((k) => fields[k] !== undefined).map((k) => [k, fields[k]]);
  const extra = Object.entries(fields).filter(([k, v]) => !ORDER.includes(k) && v !== undefined);
  const ordered = Object.fromEntries([...known, ...extra]);
  const yaml = stringify(ordered, { lineWidth: 0, defaultStringType: "QUOTE_DOUBLE", defaultKeyType: "PLAIN" });
  return `---\n${yaml}---\n\n${body.trim()}\n`;
}

/** The Markdown body after the front matter. */
export function bodyOf(text) {
  const m = text.match(/^---\n[\s\S]*?\n---\n?/);
  return m ? text.slice(m[0].length) : text;
}

export function readFrontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  return m ? parse(m[1]) ?? {} : {};
}

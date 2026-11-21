import { parse, stringify } from "yaml";

const ORDER = ["title", "date", "summary", "categories", "tags", "cover", "wechat_url", "wechat_id", "images", "draft"];

/** Front matter + body for content/articles/<slug>/index.md. Keys in a stable order so re-syncs diff cleanly. */
export function renderArticle(fields, body) {
  const ordered = Object.fromEntries(ORDER.filter((k) => fields[k] !== undefined).map((k) => [k, fields[k]]));
  const yaml = stringify(ordered, { lineWidth: 0, defaultStringType: "QUOTE_DOUBLE", defaultKeyType: "PLAIN" });
  return `---\n${yaml}---\n\n${body.trim()}\n`;
}

export function readFrontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  return m ? parse(m[1]) ?? {} : {};
}

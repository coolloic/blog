// WeChat article HTML → Markdown for the blog.
// Images become placeholders `![alt](wximg:<n> "caption")`; the sync step swaps in R2 URLs.
import { parseHTML } from "linkedom";
import TurndownService from "turndown";
import { tables } from "turndown-plugin-gfm";

const WECHAT_ARTICLE = /^https?:\/\/mp\.weixin\.qq\.com\/s\/([A-Za-z0-9_-]+)/;
const DECORATIVE_MAX_WIDTH = 100; // dividers and emoji-sized GIFs
const CAPTION_MAX_CHARS = 60;

/** Short canonical form of a WeChat article URL, or null. */
export function wechatShortUrl(href) {
  const m = String(href || "").match(WECHAT_ARTICLE);
  return m ? `https://mp.weixin.qq.com/s/${m[1]}` : null;
}

/** "<mid>_<idx>" (the wechat_id) for long-form links like /s?__biz=…&mid=…&idx=…, or null. */
export function wechatIdFromUrl(href) {
  try {
    const u = new URL(String(href || ""));
    if (u.hostname !== "mp.weixin.qq.com" || !u.pathname.startsWith("/s")) return null;
    const mid = u.searchParams.get("mid"), idx = u.searchParams.get("idx");
    return mid && idx ? `${mid}_${idx}` : null;
  } catch { return null; }
}

function findCover(document, html) {
  const og = document.querySelector('meta[property="og:image"]')?.getAttribute("content");
  if (og) return og;
  const m = html.match(/msg_cdn_url\s*=\s*"([^"]+)"/);
  return m ? m[1] : null;
}

// Everything from the first boilerplate block on is dropped: "往期推荐" (links to older posts), the recurring
// "📣 招募令" call for reader stories and the "📌 想找往期…合集" WeChat-collection hint. Matched only at the
// start of a top-level block, after any leading emoji or symbols.
const BOILERPLATE = /^[\p{Extended_Pictographic}\p{S}\uFE0F\s]*(往期推荐|推荐阅读|招募令|想找往期)/u;
function dropFromRecommended(root) {
  const kids = [...root.children];
  const i = kids.findIndex((el) => BOILERPLATE.test(el.textContent.trim()));
  if (i >= 0) kids.slice(i).forEach((el) => el.remove());
}

function isCaption(el) {
  if (!el || el.tagName !== "P" || el.querySelector("img")) return false;
  const text = el.textContent.trim();
  if (!text || text.length > CAPTION_MAX_CHARS) return false;
  const style = (el.getAttribute("style") || "").replace(/\s/g, "");
  const small = /font-size:(1[0-4]|[0-9])px/.test(style);
  const grey = /color:(#(888|999|aaa|8[0-9a-f]{5}|9[0-9a-f]{5}|a[0-9a-f]{5})|gray|grey|rgb\(1[2-6]\d)/i.test(style);
  return small || grey || /^图\s*\d*[：:]/.test(text);
}

function prepare(root, linkMap) {
  [...root.querySelectorAll("*")].filter((el) => el.tagName.startsWith("MP-")).forEach((el) => el.remove());
  dropFromRecommended(root);

  const images = [];
  for (const img of [...root.querySelectorAll("img")]) {
    const src = img.getAttribute("data-src") || img.getAttribute("src") || "";
    const width = Number(img.getAttribute("data-w") || 0);
    if (!src || (width && width < DECORATIVE_MAX_WIDTH)) { img.remove(); continue; }
    const n = images.length + 1;
    const alt = (img.getAttribute("alt") || "").trim();
    images.push({ n, src, alt });
    const out = root.ownerDocument.createElement("img");
    out.setAttribute("src", `wximg:${n}`);
    out.setAttribute("alt", alt);
    const block = img.closest("p, section, figure") || img.parentElement;
    const next = block?.nextElementSibling;
    if (block && !block.textContent.trim() && isCaption(next)) {
      out.setAttribute("title", next.textContent.trim());
      next.remove();
    }
    img.replaceWith(out);
  }

  for (const a of [...root.querySelectorAll("a[href]")]) {
    const href = a.getAttribute("href");
    const slug = linkMap.get(wechatShortUrl(href)) ?? linkMap.get(wechatIdFromUrl(href));
    if (slug) a.setAttribute("href", `../${slug}/index.md`);
  }

  // Empty paragraphs/sections (spacers like <p><br></p>) carry nothing.
  for (const el of [...root.querySelectorAll("p, section")].reverse()) {
    if (!el.textContent.trim() && !el.querySelector("img, table")) el.remove();
  }
  return images;
}

function makeTurndown() {
  const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", emDelimiter: "*", strongDelimiter: "**", codeBlockStyle: "fenced", br: "\\" });
  td.use(tables);
  // Goldmark would treat "<think>" as raw HTML and drop it: escape "<" in text.
  const escape = td.escape.bind(td);
  td.escape = (s) => escape(s).replace(/</g, "\\<");
  // CommonMark won't close **…。** when the next character is a letter (common in Chinese), so the
  // delimiter needs an escaped space, which goldmark's cjk.escapedSpace renders as nothing (hugo.yaml).
  const PUNCT = /[\p{P}\p{S}]$/u, PUNCT_START = /^[\p{P}\p{S}]/u, WORDISH = /^[^\s\p{P}\p{S}]/u, WORDISH_END = /[^\s\p{P}\p{S}]$/u;
  const textAfter = (node) => { for (let n = node.nextSibling; n; n = n.nextSibling) { const t = n.textContent; if (t) return t; } return ""; };
  const textBefore = (node) => { for (let n = node.previousSibling; n; n = n.previousSibling) { const t = n.textContent; if (t) return t; } return ""; };
  const delimited = (mark) => (content, node) => {
    if (!content.trim()) return content;
    const pre = PUNCT_START.test(content) && WORDISH_END.test(textBefore(node)) ? "\\ " : "";
    const post = PUNCT.test(content) && WORDISH.test(textAfter(node)) ? "\\ " : "";
    return `${pre}${mark}${content}${mark}${post}`;
  };
  td.addRule("strong-cjk", { filter: ["strong", "b"], replacement: delimited("**") });
  td.addRule("em-cjk", { filter: ["em", "i"], replacement: delimited("*") });
  td.addRule("h1-as-h2", { filter: "h1", replacement: (content) => `\n\n## ${content.trim()}\n\n` });
  td.addRule("tight-list-item", {
    filter: "li",
    replacement(content, node) {
      const parent = node.parentNode;
      const items = Array.from(parent.childNodes).filter((n) => n.nodeName === "LI"); // turndown's own DOM: no .children
      const marker = parent.nodeName === "OL" ? `${items.indexOf(node) + 1}. ` : "- ";
      const body = content.trim().replace(/\n+/g, "\n").replace(/\n/g, "\n" + " ".repeat(marker.length));
      return marker + body + (node.nextSibling ? "\n" : "");
    },
  });
  return td;
}

/**
 * @param {string} html  full article page HTML
 * @param {{linkMap?: Map<string, string>}} opts  WeChat short URL or wechat_id → blog slug, for synced articles
 * @returns {{markdown: string, images: {n: number, src: string, alt: string}[], coverUrl: string|null, description: string|null}}
 */
export function convertArticle(html, { linkMap = new Map() } = {}) {
  const { document } = parseHTML(html);
  const root = document.querySelector("#js_content");
  if (!root) throw new Error("no #js_content in article HTML");
  const images = prepare(root, linkMap);
  const markdown = makeTurndown()
    .turndown(root.innerHTML)
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim() + "\n";
  const description = document.querySelector('meta[property="og:description"]')?.getAttribute("content")?.trim() || null;
  return { markdown, images, coverUrl: findCover(document, html), description };
}

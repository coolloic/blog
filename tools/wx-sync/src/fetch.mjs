// Fetching WeChat article pages and images. Public article pages need no login.
export class FetchError extends Error {}

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const EXT = { "image/jpeg": "jpg", "image/png": "png", "image/gif": "gif", "image/webp": "webp", "image/svg+xml": "svg" };

export async function fetchArticleHtml(url, { fetchImpl = fetch } = {}) {
  const res = await fetchImpl(url, { headers: { "user-agent": UA, "accept-language": "zh-CN,zh;q=0.9" } });
  if (!res.ok) throw new FetchError(`${url}: HTTP ${res.status}`);
  const html = await res.text();
  // WeChat answers bots with a verification page ("环境异常") and status 200: treat it as a failure.
  if (!/id=["']?js_content/.test(html)) throw new FetchError(`${url}: not an article page (blocked or removed?)`);
  return html;
}

// No Referer header: mmbiz serves the "此图片来自微信公众平台" placeholder to foreign referers.
export async function downloadImage(url, { fetchImpl = fetch } = {}) {
  const res = await fetchImpl(url, { headers: { "user-agent": UA }, referrerPolicy: "no-referrer" });
  if (!res.ok) throw new FetchError(`${url}: HTTP ${res.status}`);
  const contentType = (res.headers.get("content-type") || "").split(";")[0].trim();
  const fmt = new URL(url).searchParams.get("wx_fmt");
  const ext = fmt ? (fmt === "jpeg" ? "jpg" : fmt) : EXT[contentType] || "jpg";
  const bytes = Buffer.from(await res.arrayBuffer());
  if (!bytes.length) throw new FetchError(`${url}: empty image`);
  return { bytes, ext, contentType: contentType || `image/${ext === "jpg" ? "jpeg" : ext}` };
}

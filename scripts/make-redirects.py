"""Build the redirect-only site for the old address (https://coolloic.github.io/blog/).

GitHub Pages cannot send HTTP 301s, so every page of the real site becomes a tiny page that declares the new
URL canonical and forwards to it at once (meta refresh + location.replace, keeping the #hash). The 404 page
maps any other old path. Search engines treat this pattern as a permanent move.

Usage: python3 scripts/make-redirects.py <built-site-dir> <out-dir> <new-origin>
"""
import html, os, sys

src, out, origin = sys.argv[1], sys.argv[2], sys.argv[3].rstrip("/")
OLD_PREFIX = "/blog"  # path the old site lived under

PAGE = """<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>已搬家：{title}</title>
<link rel="canonical" href="{url}">
<meta http-equiv="refresh" content="0; url={url}">
<script>location.replace({js_url} + location.hash)</script>
</head><body><p>本站已搬到 <a href="{url}">{url}</a></p></body></html>
"""

NOT_FOUND = """<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><title>已搬家</title>
<script>location.replace({origin_js} + location.pathname.replace(/^{prefix}(?=\\/|$)/, "") + location.search + location.hash)</script>
</head><body><p>本站已搬到 <a href="{origin}/">{origin}/</a></p></body></html>
"""

count = 0
for root, _, files in os.walk(src):
    for f in files:
        if f != "index.html":
            continue
        rel = os.path.relpath(root, src)
        path = "/" if rel == "." else f"/{rel}/"
        url = origin + path
        dest = os.path.join(out, rel)
        os.makedirs(dest, exist_ok=True)
        with open(os.path.join(dest, "index.html"), "w", encoding="utf-8") as fh:
            fh.write(PAGE.format(title=html.escape(path), url=html.escape(url, quote=True), js_url=repr(url)))
        count += 1
os.makedirs(out, exist_ok=True)
with open(os.path.join(out, "404.html"), "w", encoding="utf-8") as fh:
    fh.write(NOT_FOUND.format(origin=origin, origin_js=repr(origin), prefix=OLD_PREFIX.replace("/", "\\/")))
print(f"{count} redirect pages + 404 → {origin}")

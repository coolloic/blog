#!/usr/bin/env bash
# Checks for the evo theme (site redesign). Run from anywhere: bash scripts/check-site.sh
# Builds drafts (-D) into a temp dir so the sample articles are covered.
set -u
cd "$(dirname "$0")/.."
FAILS=0
pass() { echo "PASS $1"; }
fail() { echo "FAIL $1: $2"; FAILS=$((FAILS+1)); }
OUT=$(mktemp -d)
trap 'rm -rf "$OUT"' EXIT
BUILD_LOG=$(hugo -D --quiet --panicOnWarning -d "$OUT" 2>&1) || { echo "FAIL build: $(echo "$BUILD_LOG" | head -5)"; exit 1; }
nospace() { tr -d ' \n' < "$1"; }

check_theme_evo() {
  if grep -q '^theme: evo' hugo.yaml; then pass check_theme_evo; else fail check_theme_evo "hugo.yaml does not use theme evo"; fi
}

check_html_lang() {
  local bad=""
  grep -q '<html lang="\?en"\?' "$OUT/posts/hello-world/index.html" 2>/dev/null || bad+="posts/hello-world "
  grep -q '<html lang="\?zh-CN"\?' "$OUT/articles/sample-1/index.html" 2>/dev/null || bad+="articles/sample-1 "
  grep -q '<html lang="\?en"\?' "$OUT/wiki/concepts/agent-loop/index.html" 2>/dev/null || bad+="wiki/concepts/agent-loop "
  if [[ -z "$bad" ]]; then pass check_html_lang; else fail check_html_lang "wrong <html lang> on: $bad"; fi
}

check_tokens_css() {
  local accent; accent=$(python3 -c "import yaml;print(yaml.safe_load(open('data/tokens.yaml'))['color']['accent']['light'])")
  local css; css=$(nospace "$OUT/index.html" | tr 'A-F' 'a-f')
  local a; a=$(echo "$accent" | tr 'A-F' 'a-f')
  if [[ "$css" == *"--color-bg:light-dark("* && "$css" == *"$a"* ]]; then pass check_tokens_css
  else fail check_tokens_css "home page lacks --color-bg:light-dark( or the accent token $accent"; fi
}

check_light_dark_fallback() {
  local css; css=$(nospace "$OUT/index.html")
  if [[ "$css" == *"@supportsnot(color:light-dark("* && "$css" == *"[data-theme=dark]"* ]]; then pass check_light_dark_fallback
  else fail check_light_dark_fallback "no @supports not (color: light-dark(...)) fallback with [data-theme=dark]"; fi
}

check_theme_script_first() {
  local head s c
  head=$(tr -d '\n' < "$OUT/index.html" | sed 's|</head>.*||')
  s=$(echo "$head" | grep -bo '<script' | head -1 | cut -d: -f1)
  c=$(echo "$head" | grep -boE '<style|<link rel="?stylesheet' | head -1 | cut -d: -f1)
  if [[ -n "$s" && -n "$c" && "$s" -lt "$c" ]]; then pass check_theme_script_first
  else fail check_theme_script_first "theme script (at ${s:-none}) is not before the first stylesheet (at ${c:-none})"; fi
}

css_all() { cat "$OUT"/css/*.css "$OUT"/index.html 2>/dev/null | tr -d ' \n'; }

check_nav() {
  local f bad=""
  for f in index.html posts/hello-world/index.html; do
    local nav; nav=$(tr -d '\n' < "$OUT/$f" | grep -o '<nav[^>]*aria-label="\?[^>]*>.*</nav>' | head -1)
    for u in /blog/articles/ /blog/notes/ /blog/search/; do [[ "$nav" == *"href=\"$u\""* || "$nav" == *"href=$u"* ]] || bad+="$f:$u "; done
  done
  tr -d '\n' < "$OUT/index.html" | grep -q '>科普</a>' || bad+="index.html:科普-label "
  tr -d '\n' < "$OUT/posts/hello-world/index.html" | grep -q '>Articles</a>' || bad+="hello-world:Articles-label "
  if [[ -z "$bad" ]]; then pass check_nav; else fail check_nav "missing: $bad"; fi
}

check_skip_link() {
  local f bad=""
  for f in index.html posts/hello-world/index.html articles/sample-1/index.html; do
    local body; body=$(tr -d '\n' < "$OUT/$f" | sed 's|.*<body[^>]*>||')
    local first; first=$(echo "$body" | grep -oE '<(a|button|input)[^>]*>' | head -1)
    [[ "$first" == *'href="#main"'* || "$first" == *'href=#main'* ]] || bad+="$f(first=$first) "
    grep -qE 'id="?main"?' "$OUT/$f" || bad+="$f(no #main) "
  done
  if [[ -z "$bad" ]]; then pass check_skip_link; else fail check_skip_link "$bad"; fi
}

check_wrap() {
  local css; css=$(css_all)
  if [[ "$css" == *"overflow-wrap:anywhere"* ]] && echo "$css" | grep -qE 'pre\{[^}]*overflow-x:auto'; then pass check_wrap
  else fail check_wrap "CSS lacks overflow-wrap:anywhere or pre{overflow-x:auto}"; fi
}

check_toggle_button() {
  if tr -d '\n' < "$OUT/index.html" | grep -qE '<button[^>]*aria-pressed'; then pass check_toggle_button
  else fail check_toggle_button "no theme toggle <button aria-pressed>"; fi
}

check_tokens_unescaped() {
  local style; style=$(tr -d '\n' < "$OUT/posts/hello-world/index.html" | grep -o '<style>.*</style>' | head -1)
  if [[ -n "$style" && "$style" != *"&#34"* && "$style" != *"&quot;"* && "$style" == *'--font-body:"PingFang SC"'* ]]; then pass check_tokens_unescaped
  else fail check_tokens_unescaped "token CSS is HTML-escaped or missing: $(echo "$style" | grep -o -- '--font-body:[^;]*')"; fi
}

# Build a variant of the site from a copy of content/ changed by a callback: build_variant <outdir> <fn>
build_variant() {
  local out=$1 fn=$2 cdir; cdir=$(mktemp -d)
  cp -R content/. "$cdir"/
  ( cd "$cdir" && $fn )
  hugo -D --quiet --panicOnWarning --contentDir "$cdir" -d "$out" >/dev/null 2>&1; local rc=$?
  rm -rf "$cdir"; return $rc
}
html1() { tr -d '\n' < "$1"; }
# The element carrying marker attribute $2 plus the following N chars (default 900). macOS grep caps {m,n} at 255.
after_attr() { perl -0777 -ne 'print $1 if /(<[a-z]+[^>]*'"$2"'[^>]*>.{0,'"${3:-900}"'})/s' "$1"; }

check_home_featured() {
  local card; card=$(after_attr "$OUT/index.html" data-featured)
  if [[ "$card" =~ href=\"?/blog/articles/sample-2/ ]]; then pass check_home_featured
  else fail check_home_featured "featured card does not link to sample-2: ${card:0:200}"; fi
}

unfeature() { sed -i '' 's/^featured: true/featured: false/' articles/sample-2/index.md; }
check_home_featured_fallback() {
  local o; o=$(mktemp -d)
  build_variant "$o" unfeature || { fail check_home_featured_fallback "variant build failed"; rm -rf "$o"; return; }
  local card; card=$(after_attr "$o/index.html" data-featured)
  if [[ "$card" =~ href=\"?/blog/articles/sample-3/ ]]; then pass check_home_featured_fallback
  else fail check_home_featured_fallback "without featured, hero should be the newest (sample-3): ${card:0:200}"; fi
  rm -rf "$o"
}

check_home_lists_articles_not_wiki() {
  local h; h=$(html1 "$OUT/index.html")
  if [[ "$h" == *"/blog/articles/sample-1/"* ]] && ! echo "$h" | grep -qE 'href="?/blog/wiki/[^" >]+'; then pass check_home_lists_articles_not_wiki
  else fail check_home_lists_articles_not_wiki "home must list articles and no wiki pages"; fi
}

noarticles() { rm -rf articles/sample-*; }
check_home_empty() {
  local o; o=$(mktemp -d)
  if build_variant "$o" noarticles && grep -qE 'data-empty="?no_articles' "$o/index.html"; then pass check_home_empty
  else fail check_home_empty "home without articles fails to build or lacks data-empty=no_articles"; fi
  rm -rf "$o"
}

check_cover_box() {
  local h bad=""; h=$(html1 "$OUT/index.html")
  local hero; hero=$(after_attr "$OUT/index.html" data-featured | grep -oE '<img[^>]*>' | head -1)
  [[ "$hero" == *fetchpriority=*high* && "$hero" == *width=* && "$hero" == *height=* ]] || bad+="hero-img($hero) "
  local card; card=$(after_attr "$OUT/index.html" 'class="?card[ ">]' | grep -oE '<img[^>]*>' | head -1)
  [[ "$card" == *loading=*lazy* && "$card" == *width=* && "$card" == *height=* ]] || bad+="card-img($card) "
  echo "$(css_all)" | grep -qE '\.cover\{[^}]*aspect-ratio' || bad+="css(.cover aspect-ratio) "
  if [[ -z "$bad" ]]; then pass check_cover_box; else fail check_cover_box "$bad"; fi
}

addvideo() { sed -i '' 's|^featured: false|featured: false\ncover_video: "https://example.com/x.mp4"|' articles/sample-1/index.md; }
check_cover_video_slot() {
  local o; o=$(mktemp -d)
  build_variant "$o" addvideo || { fail check_cover_video_slot "variant build failed"; rm -rf "$o"; return; }
  local v; v=$(html1 "$o/index.html" | grep -oE '<video[^>]*>' | head -1)
  if [[ "$v" == *muted* && "$v" == *playsinline* && "$v" == *preload=*none* && "$v" == *poster=* && "$v" == *x.mp4* ]] && ! echo "$v" | grep -qE '[ "]autoplay([ =>]|$)'; then pass check_cover_video_slot
  else fail check_cover_video_slot "bad or missing <video>: $v"; fi
  rm -rf "$o"
}

check_follow_card() {
  local h; h=$(html1 "$OUT/index.html")
  if echo "$h" | grep -qE 'data-follow-card' && [[ "$h" == *wechat-qr.png* ]]; then pass check_follow_card
  else fail check_follow_card "home lacks data-follow-card with wechat-qr.png"; fi
}

check_no_format_errors() {
  local bad; bad=$(grep -rlE '%!\(?[a-z]' "$OUT" --include='*.html' | head -3)
  if [[ -z "$bad" ]]; then pass check_no_format_errors; else fail check_no_format_errors "printf verb errors (%!…) in: $bad"; fi
}

check_category_order() {
  local order; order=$(html1 "$OUT/index.html" | grep -oE 'href="?/blog/categories/[a-z]+/' | sed -E 's|.*/categories/||; s|/||' | awk '!s[$0]++' | tr '\n' ' ')
  if [[ "$order" == "models concepts tools industry " ]]; then pass check_category_order
  else fail check_category_order "category tiles in wrong order: $order"; fi
}

check_category_urls() {
  local f="$OUT/categories/concepts/index.html" h; h=$(html1 "$f" 2>/dev/null)
  if [[ -f "$f" && "$h" == *"/blog/articles/sample-1/"* && "$h" == *"/blog/articles/sample-3/"* && "$h" == *"<title>概念科普"* && ! -e "$OUT/categories/概念科普" ]]; then pass check_category_urls
  else fail check_category_urls "categories/concepts missing, wrong title, or missing samples"; fi
}

check_category_empty() {
  local h bad=""; h=$(html1 "$OUT/categories/index.html" 2>/dev/null)
  for c in models concepts tools industry; do [[ "$h" =~ href=\"?/blog/categories/$c/ ]] || bad+="index:$c "; done
  grep -qE 'data-empty="?no_category_articles' "$OUT/categories/tools/index.html" 2>/dev/null || bad+="tools:empty-state "
  if [[ -z "$bad" ]]; then pass check_category_empty; else fail check_category_empty "$bad"; fi
}

check_archives() {
  local h; h=$(html1 "$OUT/archives/index.html" 2>/dev/null)
  if [[ "$h" == *"/blog/articles/sample-1/"* && "$h" == *"/blog/posts/hello-world/"* && "$h" != *"/blog/wiki/concepts/"* ]]; then pass check_archives
  else fail check_archives "archive must list articles and posts, not wiki"; fi
}

check_old_urls() {
  local u bad=""
  for u in posts/hello-world posts/harness-engineering posts/modern-web-guidelines posts/anatomy-of-an-ai-agent tags about now archives search wiki; do
    [[ -f "$OUT/$u/index.html" ]] || bad+="$u "
  done
  if [[ -z "$bad" ]]; then pass check_old_urls; else fail check_old_urls "missing: $bad"; fi
}

check_internal_links() {
  local r; r=$(python3 scripts/check-links.py "$OUT" /blog/ 2>&1)
  if [[ $? -eq 0 ]]; then pass check_internal_links; else fail check_internal_links "$(echo "$r" | head -5 | tr '\n' ';')"; fi
}

check_article_page() {
  local f="$OUT/articles/sample-1/index.html" h bad=""; h=$(html1 "$f")
  [[ "$h" == *"<article"* ]] || bad+="article "
  echo "$h" | grep -qE 'class="?cover cover--hero' || bad+="hero-cover "
  echo "$h" | grep -qE 'href="?/blog/categories/concepts/"?[^>]*>概念科普' || bad+="category-link "
  [[ "$h" == *"阅读 "*" 分钟"* ]] || bad+="reading-time "
  echo "$h" | grep -qE '<nav[^>]*class="?toc' || bad+="toc "
  if [[ -z "$bad" ]]; then pass check_article_page; else fail check_article_page "missing: $bad"; fi
}

check_wechat_footer() {
  local h; h=$(html1 "$OUT/articles/sample-1/index.html")
  if [[ "$h" == *"https://mp.weixin.qq.com/s/placeholder"* && "$h" == *"wechat-qr.png"* && "$h" == *"原文发于公众号"* ]]; then pass check_wechat_footer
  else fail check_wechat_footer "article lacks WeChat footer (original link, QR, 原文发于公众号)"; fi
}

addvertical() { sed -i '' 's|^featured: false|featured: false\nvideo_vertical: "https://example.com/v.mp4"|' articles/sample-1/index.md; }
check_video_vertical() {
  local o; o=$(mktemp -d)
  build_variant "$o" addvertical || { fail check_video_vertical "variant build failed"; rm -rf "$o"; return; }
  local with without; with=$(html1 "$o/articles/sample-1/index.html"); without=$(html1 "$OUT/articles/sample-1/index.html")
  if [[ "$with" == *"看 60 秒视频版"* && "$with" == *"example.com/v.mp4"* && "$without" != *"看 60 秒视频版"* ]]; then pass check_video_vertical
  else fail check_video_vertical "vertical video link wrong (should appear only with video_vertical)"; fi
  rm -rf "$o"
}

check_video_shortcode() {
  local fig; fig=$(perl -0777 -ne 'print $1 if /(<figure class="?video.*?<\/figure>)/s' "$OUT/articles/sample-3/index.html")
  if [[ -n "$fig" && "$fig" == *preload=*none* && "$fig" == *"演示"* ]] && ! echo "$fig" | grep -qE '[ "]autoplay([ =>]|$)'; then pass check_video_shortcode
  else fail check_video_shortcode "bad video figure: ${fig:0:200}"; fi
}

addmissing() { mkdir -p articles/zz-missing; printf -- '---\ntitle: zz\ndate: 2026-11-01\ncover: "/images/placeholder-cover.svg"\ndraft: false\n---\nx\n' > articles/zz-missing/index.md; }
check_required_fields() {
  local o cdir log rc; o=$(mktemp -d); cdir=$(mktemp -d)
  cp -R content/. "$cdir"/; ( cd "$cdir" && addmissing )
  log=$(hugo --contentDir "$cdir" -d "$o" 2>&1); rc=$?
  rm -rf "$o" "$cdir"
  if [[ $rc -ne 0 && "$log" == *"missing wechat_url"* ]]; then pass check_required_fields
  else fail check_required_fields "build should fail with 'missing wechat_url' (rc=$rc)"; fi
}

check_jsonld() {
  local r; r=$(perl -0777 -ne 'print $1 if /<script type="?application\/ld\+json"?>(.*?)<\/script>/s' "$OUT/articles/sample-1/index.html" | python3 -c '
import json,sys
d=json.loads(sys.stdin.read()); items=d if isinstance(d,list) else d.get("@graph",[d])
a=[x for x in items if x.get("@type")=="Article"]
assert a, "no Article"; a=a[0]
for k in ("headline","datePublished","image"): assert a.get(k), k
img=a["image"] if isinstance(a["image"],str) else a["image"][0]
assert img.startswith("http"), "image must be absolute"
print("ok")' 2>&1)
  if [[ "$r" == ok ]]; then pass check_jsonld; else fail check_jsonld "$r"; fi
}

check_prev_next() {
  local nav; nav=$(perl -0777 -ne 'print $1 if /(<nav[^>]*class="?post-nav.*?<\/nav>)/s' "$OUT/articles/sample-2/index.html")
  local links; links=$(echo "$nav" | grep -oE 'href="?[^" >]+' | sed -E 's/href="?//')
  if [[ -n "$links" ]] && ! echo "$links" | grep -vq '^/blog/articles/'; then pass check_prev_next
  else fail check_prev_next "prev/next missing or leaves articles: $links"; fi
}

check_notes_page() {
  local h n bad=""; h=$(html1 "$OUT/notes/index.html" 2>/dev/null)
  n=$(echo "$h" | grep -oE 'href="?/blog/posts/[a-z0-9-]+/' | sort -u | wc -l | tr -d ' ')
  [[ "$n" -ge 4 ]] || bad+="posts=$n "
  echo "$h" | grep -qE 'href="?/blog/wiki/"?[ >]' || bad+="wiki-link "
  echo "$h" | grep -qE '<html lang="?en' || bad+="lang "
  if [[ -z "$bad" ]]; then pass check_notes_page; else fail check_notes_page "$bad"; fi
}

check_en_chrome() {
  local h; h=$(html1 "$OUT/posts/hello-world/index.html")
  if [[ "$h" == *"min read"* && "$h" != *"分钟"* && "$h" != *"目录"* ]]; then pass check_en_chrome
  else fail check_en_chrome "English post page should use English UI strings only"; fi
}

check_code_copy() {
  local f="$OUT/posts/modern-web-guidelines/index.html"
  local pres btns; pres=$(grep -oE '<pre[ >]' "$f" | wc -l | tr -d ' '); btns=$(grep -oE '<button[^>]*data-copy' "$f" | wc -l | tr -d ' ')
  local mer; mer=$(grep -oE '<pre class="?mermaid' "$f" | wc -l | tr -d ' ')
  if [[ $((pres - mer)) -gt 0 && "$btns" -eq $((pres - mer)) ]]; then pass check_code_copy
  else fail check_code_copy "code blocks=$((pres - mer)) copy buttons=$btns"; fi
}

check_wiki_body() {
  if html1 "$OUT/wiki/index.html" | grep -qE '<h2[^>]*>Concepts'; then pass check_wiki_body
  else fail check_wiki_body "wiki index does not render _index.md body"; fi
}

check_wiki_concept_page() {
  local h bad=""; h=$(html1 "$OUT/wiki/concepts/agent-loop/index.html")
  [[ "$h" == *'class="prose'* || "$h" == *"class=prose"* ]] || bad+="prose "
  echo "$h" | grep -qE 'href="?/blog/wiki/sources/' || bad+="sources-links "
  echo "$h" | grep -qiE 'Updated|lastmod' || bad+="updated-date "
  if [[ -z "$bad" ]]; then pass check_wiki_concept_page; else fail check_wiki_concept_page "$bad"; fi
}

CHECKS=(check_theme_evo check_html_lang check_tokens_css check_light_dark_fallback check_theme_script_first check_nav check_skip_link check_wrap check_toggle_button check_tokens_unescaped check_home_featured check_home_featured_fallback check_home_lists_articles_not_wiki check_home_empty check_cover_box check_cover_video_slot check_follow_card check_no_format_errors check_category_order check_category_urls check_category_empty check_archives check_old_urls check_internal_links check_article_page check_wechat_footer check_video_vertical check_video_shortcode check_required_fields check_jsonld check_prev_next check_notes_page check_en_chrome check_code_copy check_wiki_body check_wiki_concept_page)
for c in "${@:-${CHECKS[@]}}"; do $c; done
[[ $FAILS -eq 0 ]] && echo "SITE ALL PASS" || { echo "$FAILS SITE CHECKS FAILED"; exit 1; }

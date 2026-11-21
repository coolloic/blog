#!/usr/bin/env bash
# Checks for the evo theme (site redesign). Run from anywhere: bash scripts/check-site.sh
# Builds drafts (-D) into a temp dir so the sample articles are covered.
set -u
cd "$(dirname "$0")/.."
# Build under a sub-path on purpose (production is the site root): any link that forgets relURL breaks here.
export HUGO_BASEURL="https://coolloic.github.io/blog/"
FAILS=0
pass() { echo "PASS $1"; }
fail() { echo "FAIL $1: $2"; FAILS=$((FAILS+1)); }
OUT=$(mktemp -d)
CONTENT=$(mktemp -d)
trap 'rm -rf "$OUT" "$CONTENT"' EXIT
# Real content with its articles swapped for the test fixtures (scripts/fixtures/articles/sample-*), so the theme
# checks never depend on which real articles exist. Real articles are covered by check_real_content.
merge_content() {
  cp -R content/. "$1"/
  # real topics point at real articles, so they go too (fixtures bring their own)
  find "$1/articles" "$1/topics" "$1/quiz" -mindepth 1 -maxdepth 1 -type d -exec rm -rf {} + 2>/dev/null
  [[ -d scripts/fixtures ]] && cp -R scripts/fixtures/. "$1"/
  return 0
}
merge_content "$CONTENT"
BUILD_LOG=$(hugo -D --quiet --panicOnWarning --contentDir "$CONTENT" -d "$OUT" 2>&1) || { echo "FAIL build: $(echo "$BUILD_LOG" | head -5)"; exit 1; }
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
# The stylesheet is inlined into each page (<style>); write it to a file for the CSS-level checks.
css_file() { local f="$OUT/.inline.css"; [[ -f "$f" ]] || perl -0777 -ne 'print "$1\n" while /<style>(.*?)<\/style>/gs' "$OUT/index.html" > "$f"; echo "$f"; }

check_nav() {
  local f bad=""
  for f in index.html posts/hello-world/index.html; do
    local nav; nav=$(tr -d '\n' < "$OUT/$f" | grep -o '<nav[^>]*aria-label="\?[^>]*>.*</nav>' | head -1)
    for u in /blog/articles/ /blog/notes/ /blog/search/; do [[ "$nav" == *"href=\"$u\""* || "$nav" == *"href=$u"* ]] || bad+="$f:$u "; done
  done
  tr -d '\n' < "$OUT/index.html" | grep -q '>科普</a>' || bad+="index.html:科普-label "
  # Site chrome is always Chinese, even on English pages (marked lang=zh-CN inside an lang=en page).
  tr -d '\n' < "$OUT/posts/hello-world/index.html" | grep -q '>科普</a>' || bad+="hello-world:科普-label "
  tr -d '\n' < "$OUT/posts/hello-world/index.html" | grep -qE '<header[^>]*lang="?zh-CN' || bad+="hello-world:header-lang "
  tr -d '\n' < "$OUT/posts/hello-world/index.html" | grep -qE '<footer[^>]*lang="?zh-CN' || bad+="hello-world:footer-lang "
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
  if [[ -n "$style" && "$style" != *"&#34"* && "$style" != *"&quot;"* && "$style" == *'--font-body:'*'"PingFang SC"'* ]]; then pass check_tokens_unescaped
  else fail check_tokens_unescaped "token CSS is HTML-escaped or missing: $(echo "$style" | grep -o -- '--font-body:[^;]*')"; fi
}

# Build a variant of the site from a copy of content/ changed by a callback: build_variant <outdir> <fn>
build_variant() {
  local out=$1 fn=$2 cdir; cdir=$(mktemp -d)
  merge_content "$cdir"
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
  else fail check_home_featured_fallback "without featured, the first latest card should be the newest (sample-3): ${card:0:200}"; fi
  rm -rf "$o"
}

check_home_lists_articles_not_wiki() {
  local h; h=$(html1 "$OUT/index.html")
  if [[ "$h" == *"/blog/articles/sample-1/"* ]] && ! echo "$h" | grep -qE 'href="?/blog/wiki/[^" >]+'; then pass check_home_lists_articles_not_wiki
  else fail check_home_lists_articles_not_wiki "home must list articles and no wiki pages"; fi
}

noarticles() { rm -rf articles/sample-* topics/*/ quiz/*/ tools/_index.md; }  # topics and the tool list point at articles, so they go too
check_home_empty() {
  local o; o=$(mktemp -d)
  if build_variant "$o" noarticles && grep -qE 'data-empty="?no_articles' "$o/index.html"; then pass check_home_empty
  else fail check_home_empty "home without articles fails to build or lacks data-empty=no_articles"; fi
  rm -rf "$o"
}

check_cover_box() {
  local h bad=""; h=$(html1 "$OUT/index.html")
  local card; card=$(after_attr "$OUT/index.html" 'class="?card[ ">]' | grep -oE '<img[^>]*>' | head -1)
  [[ "$card" == *loading=*lazy* && "$card" == *width=* && "$card" == *height=* ]] || bad+="card-img($card) "
  echo "$(css_all)" | grep -qE '\.cover\{[^}]*aspect-ratio' || bad+="css(.cover aspect-ratio) "
  if [[ -z "$bad" ]]; then pass check_cover_box; else fail check_cover_box "$bad"; fi
}

addvideo() { sed -i '' 's|^featured: false|featured: false\ncover_video: "https://example.com/x.mp4"|' articles/sample-1/index.md; }
check_cover_video_slot() {
  # Performance: the cover image (WebP <picture>) is always what paints first; the loop video is added by
  # video-inview.js after load, only on the article page, never in cards, never with reduced motion or Save-Data.
  local o bad=""; o=$(mktemp -d)
  build_variant "$o" addvideo || { fail check_cover_video_slot "variant build failed"; rm -rf "$o"; return; }
  local art; art=$(html1 "$o/articles/sample-1/index.html")
  echo "$art" | grep -qE '<video' && bad+="video-in-article-html "
  echo "$art" | grep -qE 'data-video="?https://example\.com/x\.mp4' || bad+="article-data-video "
  echo "$art" | grep -qE 'class="?cover cover--hero[^>]*>[^<]*<(picture|img)' || bad+="article-picture-first "
  html1 "$o/index.html" | grep -qE 'data-video=|<video' && bad+="video-in-cards "
  local js; js=$(cat themes/evo/assets/js/video-inview.js)
  [[ "$js" == *"saveData"* && "$js" == *'createElement("video")'* && "$js" == *'"load"'* ]] || bad+="js-lazy-create "
  if [[ -z "$bad" ]]; then pass check_cover_video_slot; else fail check_cover_video_slot "$bad"; fi
  rm -rf "$o"
}

check_asset_cache_headers() {
  # Only hashed file names may be cached forever (static/js/mermaid-loader.js is not hashed).
  if grep -qF '"source": "/css/(.*)\\.([a-f0-9]{64})\\.css"' vercel.json && grep -qF '"source": "/js/(.*)\\.([a-f0-9]{64})\\.js"' vercel.json && grep -q immutable vercel.json; then pass check_asset_cache_headers
  else fail check_asset_cache_headers "vercel.json lacks immutable caching for fingerprinted /css and /js"; fi
}

check_follow_card() {
  local h; h=$(html1 "$OUT/index.html")
  if echo "$h" | grep -qE 'data-follow-card' && [[ "$h" == *"wechat-qr-"* ]]; then pass check_follow_card
  else fail check_follow_card "home lacks data-follow-card with wechat-qr.png"; fi
}

check_no_format_errors() {
  local bad; bad=$(grep -rlE '%!\(?[a-z]' "$OUT" --include='*.html' | head -3)
  if [[ -z "$bad" ]]; then pass check_no_format_errors; else fail check_no_format_errors "printf verb errors (%!…) in: $bad"; fi
}

check_category_order() {
  local order; order=$(html1 "$OUT/index.html" | grep -oE 'href="?/blog/categories/[a-z]+/' | sed -E 's|.*/categories/||; s|/||' | awk '!s[$0]++' | tr '\n' ' ')
  if [[ "$order" == "work education life frontier tools " ]]; then pass check_category_order
  else fail check_category_order "category tiles in wrong order: $order"; fi
}

check_category_urls() {
  local f="$OUT/categories/education/index.html" h; h=$(html1 "$f" 2>/dev/null)
  if [[ -f "$f" && "$h" == *"/blog/articles/sample-1/"* && "$h" == *"/blog/articles/sample-3/"* && "$h" == *"<title>教育与成长"* && ! -e "$OUT/categories/教育与成长" ]]; then pass check_category_urls
  else fail check_category_urls "categories/education missing, wrong title, or missing samples"; fi
}

# Keep only the fixture articles, so life and tools are empty whatever real content exists.
onlyfixtures() { find articles -mindepth 1 -maxdepth 1 -type d ! -name 'sample-*' -exec rm -rf {} +; }
check_category_empty() {
  local o h bad=""; o=$(mktemp -d)
  build_variant "$o" onlyfixtures || { fail check_category_empty "variant build failed"; rm -rf "$o"; return; }
  h=$(html1 "$o/categories/index.html" 2>/dev/null)
  for c in work education life frontier tools; do [[ "$h" =~ href=\"?/blog/categories/$c/ ]] || bad+="index:$c "; done
  for c in life frontier tools; do grep -qE 'data-empty="?no_category_articles' "$o/categories/$c/index.html" 2>/dev/null || bad+="$c:empty-state "; done
  rm -rf "$o"
  if [[ -z "$bad" ]]; then pass check_category_empty; else fail check_category_empty "$bad"; fi
}

badcategory() { sed -i.bak 's/^categories: .*/categories: ["nope"]/' articles/sample-1/index.md && rm -f articles/sample-1/index.md.bak; }
check_unknown_category() {
  local o cdir log rc; o=$(mktemp -d); cdir=$(mktemp -d)
  merge_content "$cdir"; ( cd "$cdir" && badcategory )
  log=$(hugo -D --contentDir "$cdir" -d "$o" 2>&1); rc=$?
  rm -rf "$o" "$cdir"
  if [[ $rc -ne 0 && "$log" == *"unknown category"* ]]; then pass check_unknown_category
  else fail check_unknown_category "an article with an unknown category slug must fail the build (rc=$rc)"; fi
}

check_fixtures_not_in_content() {
  if compgen -G "content/articles/sample-*" >/dev/null; then fail check_fixtures_not_in_content "sample articles must live in scripts/fixtures/, not content/"
  else pass check_fixtures_not_in_content; fi
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
  echo "$h" | grep -qE 'href="?/blog/categories/education/"?[^>]*>教育与成长' || bad+="category-link "
  [[ "$h" == *"阅读 "*" 分钟"* ]] || bad+="reading-time "
  echo "$h" | grep -qE '<nav[^>]*class="?toc' || bad+="toc "
  if [[ -z "$bad" ]]; then pass check_article_page; else fail check_article_page "missing: $bad"; fi
}

check_wechat_footer() {
  local h; h=$(html1 "$OUT/articles/sample-1/index.html")
  if [[ "$h" == *"https://mp.weixin.qq.com/s/placeholder"* && "$h" == *"wechat-qr-"* && "$h" == *"原文发于公众号"* ]]; then pass check_wechat_footer
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
  merge_content "$cdir"; ( cd "$cdir" && addmissing )
  log=$(hugo --contentDir "$cdir" -d "$o" 2>&1); rc=$?
  rm -rf "$o" "$cdir"
  if [[ $rc -ne 0 && "$log" == *"missing wechat_url"* ]]; then pass check_required_fields
  else fail check_required_fields "build should fail with 'missing wechat_url' (rc=$rc)"; fi
}

check_jsonld() {
  local r; r=$(perl -0777 -ne 'print "$1\n\x1e" while /<script type="?application\/ld\+json"?>(.*?)<\/script>/sg' "$OUT/articles/sample-1/index.html" | python3 -c '
import json,sys
items=[]
for block in sys.stdin.read().split("\x1e"):
    if block.strip(): d=json.loads(block); items+=d if isinstance(d,list) else d.get("@graph",[d])
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

check_search_index() {
  local f="$OUT/index.json" r
  if ! grep -q '/articles/sample-1/' "$f" 2>/dev/null || ! grep -q '/wiki/concepts/' "$f"; then fail check_search_index "index.json lacks articles or wiki concepts"; return; fi
  local kb; kb=$(( $(gzip -c "$f" | wc -c) / 1024 ))
  [[ $kb -le 400 ]] || { fail check_search_index "index.json is ${kb}KB gzipped (budget 400KB)"; return; }
  r=$(node scripts/test-search.mjs "$f" 2>&1)
  if [[ $? -eq 0 ]]; then pass check_search_index; else fail check_search_index "$(echo "$r" | grep -v '^ok' | tr '\n' ';')"; fi
}

check_search_page() {
  local h; h=$(html1 "$OUT/search/index.html")
  if echo "$h" | grep -qE '<input[^>]*type="?search' && echo "$h" | grep -qE '<noscript' && echo "$h" | grep -qE 'search[.a-f0-9]*\.js'; then pass check_search_page
  else fail check_search_page "search page needs a search input, a <noscript> notice and the search script"; fi
}

check_view_transitions() {
  local css; css=$(css_all)
  local card hero
  card=$(perl -0777 -ne 'print $1 if /view-transition-name:\s*(cover-sample-1)/' "$OUT/index.html")
  hero=$(perl -0777 -ne 'print $1 if /view-transition-name:\s*(cover-sample-1)/' "$OUT/articles/sample-1/index.html")
  if [[ "$css" == *"@view-transition{navigation:auto"* && -n "$card" && "$card" == "$hero" ]]; then pass check_view_transitions
  else fail check_view_transitions "need @view-transition{navigation:auto} and matching cover names (card=$card hero=$hero)"; fi
}

check_scroll_driven_guarded() {
  local css; css=$(css_file); local r
  if ! cat $css | tr -d ' \n' | grep -q 'animation-timeline'; then fail check_scroll_driven_guarded "no scroll-driven animations found"; return; fi
  r=$(python3 scripts/check-css-guard.py $css 2>&1)
  if [[ $? -eq 0 ]]; then pass check_scroll_driven_guarded; else fail check_scroll_driven_guarded "$(echo "$r" | head -3 | tr '\n' ';')"; fi
}

check_reduced_motion() {
  local css; css=$(css_all)
  local js; js=$(cat themes/evo/assets/js/video-inview.js 2>/dev/null)
  if [[ "$css" == *"@media(prefers-reduced-motion:reduce)"* && "$css" == *"navigation:none"* && "$js" == *"matchMedia(\"(prefers-reduced-motion: reduce)\")"* ]]; then pass check_reduced_motion
  else fail check_reduced_motion "need reduced-motion CSS (incl. @view-transition navigation:none) and a reduced-motion guard in video-inview.js"; fi
}

check_js_budget() {
  local r; r=$(python3 scripts/check-js-budget.py "$OUT" /blog/ 20480 2>&1)
  if [[ $? -eq 0 ]] && grep -rqE 'video-inview[.a-f0-9]*\.js' "$OUT/index.html"; then pass check_js_budget
  else fail check_js_budget "$(echo "$r" | tr '\n' ';') (video-inview loaded on home: $(grep -c video-inview "$OUT/index.html"))"; fi
}

check_progress_bar() {
  if html1 "$OUT/articles/sample-1/index.html" | grep -qE 'class="?progress' && ! html1 "$OUT/index.html" | grep -qE 'class="?progress'; then pass check_progress_bar
  else fail check_progress_bar "reading progress bar should be on articles only"; fi
}

check_seo() {
  local h bad=""; h=$(html1 "$OUT/articles/sample-1/index.html")
  echo "$h" | grep -qE '<link rel="?canonical"? href="?https://coolloic.github.io/blog/articles/sample-1/' || bad+="canonical "
  echo "$h" | grep -qE '<meta name="?description"? content="?示例文章' || bad+="description "
  echo "$h" | grep -qE 'property="?og:title"? content=' || bad+="og:title "
  echo "$h" | grep -qE 'property="?og:image"? content="?https://' || bad+="og:image(absolute) "
  echo "$h" | grep -qE 'property="?og:locale"? content="?zh_CN' || bad+="og:locale "
  echo "$h" | grep -qE 'property="?og:type"? content="?article' || bad+="og:type "
  echo "$h" | grep -qE 'name="?twitter:card"? content="?summary_large_image' || bad+="twitter:card "
  html1 "$OUT/posts/hello-world/index.html" | grep -qE 'property="?og:locale"? content="?en_US' || bad+="og:locale(en) "
  html1 "$OUT/index.html" | grep -qE 'property="?og:image"? content="?https://[^" >]+\.png' || bad+="home-og:image "
  html1 "$OUT/index.html" | grep -qE '<link rel="?alternate"? type="?application/rss\+xml' || bad+="rss-link "
  if [[ -z "$bad" ]]; then pass check_seo; else fail check_seo "missing: $bad"; fi
}

check_structured_data() {
  local r; r=$(python3 - "$OUT" 2>&1 <<'PY'
import json, re, sys
out = sys.argv[1]
def ld(path):
    html = open(f"{out}/{path}", encoding="utf-8").read()
    items = []
    for block in re.findall(r'<script type="?application/ld\+json"?>(.*?)</script>', html, re.S):
        d = json.loads(block); items += d if isinstance(d, list) else d.get("@graph", [d])
    return {i.get("@type"): i for i in items}
home = ld("index.html"); art = ld("articles/sample-1/index.html")
w = home.get("WebSite"); assert w, "home: no WebSite"
assert "{search_term_string}" in w["potentialAction"]["target"]["urlTemplate"], "home: no SearchAction"
b = art.get("BreadcrumbList"); assert b and len(b["itemListElement"]) >= 2, "article: no BreadcrumbList"
assert all(i["item"].startswith("http") for i in b["itemListElement"]), "breadcrumb items must be absolute"
print("ok")
PY
)
  if [[ "$r" == ok ]]; then pass check_structured_data; else fail check_structured_data "$r"; fi
}

check_sitemap() {
  local f="$OUT/sitemap.xml"
  if grep -q '/articles/sample-1/' "$f" && grep -q '/posts/hello-world/' "$f" && grep -q '<lastmod>' "$f" && grep -qE '^Sitemap: https://coolloic.github.io/blog/sitemap.xml' "$OUT/robots.txt"; then pass check_sitemap
  else fail check_sitemap "sitemap lacks pages/lastmod or robots.txt lacks the Sitemap line"; fi
}

check_rss_scope() {
  local f="$OUT/index.xml"
  if grep -q '/articles/sample-1/' "$f" && grep -q '/posts/hello-world/' "$f" && ! grep -qE '<link>[^<]*/wiki/' "$f"; then pass check_rss_scope
  else fail check_rss_scope "RSS must list articles and posts, not wiki"; fi
}

check_404() {
  if [[ -f "$OUT/404.html" ]] && html1 "$OUT/404.html" | grep -qE 'href="?/blog/"?[ >]' && html1 "$OUT/404.html" | grep -qE 'type="?search'; then pass check_404
  else fail check_404 "404 page missing, or without home link and search box"; fi
}

check_video_dir() {
  if git check-ignore -q video/out/x.mp4 && [[ -f video/README.md ]]; then pass check_video_dir; else fail check_video_dir "video/out not ignored or video/README.md missing"; fi
}

check_no_blocking_fonts() {
  local h; h=$(html1 "$OUT/index.html" | sed 's|</head>.*||' | perl -pe 's|<noscript>.*?</noscript>||g')
  if echo "$h" | grep -qE '<link rel="?stylesheet"? href="?https://fonts.googleapis.com'; then fail check_no_blocking_fonts "Google Fonts stylesheet is render-blocking"
  else pass check_no_blocking_fonts; fi
}

check_search_form_visible() {
  if html1 "$OUT/search/index.html" | grep -qE '<form[^>]*data-search[^>]*hidden'; then fail check_search_form_visible "search form ships hidden (late LCP, layout shift)"
  else pass check_search_form_visible; fi
}

check_rise_no_fade() {
  if perl -0777 -ne 'exit(/\@keyframes evo-rise\{[^}]*opacity/ ? 0 : 1)' "$(css_file)"; then fail check_rise_no_fade "card rise-in fades opacity (off-screen text fails contrast audits)"
  else pass check_rise_no_fade; fi
}

check_layout_375() {
  local port=$((20000 + RANDOM % 20000)) srv r
  mkdir -p "$OUT.srv" && ln -sfn "$OUT" "$OUT.srv/blog"
  python3 -m http.server "$port" -d "$OUT.srv" >/dev/null 2>&1 & srv=$!
  sleep 1
  hugo -D --quiet --panicOnWarning --contentDir "$CONTENT" -d "$OUT.layout" --baseURL "http://localhost:$port/blog/" >/dev/null 2>&1
  ln -sfn "$OUT.layout" "$OUT.srv/blog"
  r=$(node scripts/check-layout.mjs "http://localhost:$port/blog/" "" articles/sample-3/ articles/ posts/modern-web-guidelines/ posts/hello-world/ wiki/concepts/agent-loop/ wiki/ notes/ archives/ search/ about/ 2>&1); local rc=$?
  kill $srv 2>/dev/null; wait $srv 2>/dev/null; rm -rf "$OUT.srv" "$OUT.layout"
  if [[ $rc -eq 0 ]]; then pass check_layout_375; else fail check_layout_375 "$(echo "$r" | head -6 | tr '\n' ';')"; fi
}

manyarticles() { for i in $(seq 1 10); do mkdir -p articles/zz-many-$i; printf -- '---\ntitle: "分页测试 %s"\ndate: 2026-10-%02dT08:00:00+08:00\nsummary: "x"\ncategories: ["education"]\ncover: "/images/placeholder-cover.svg"\nwechat_url: "https://mp.weixin.qq.com/s/p"\ndraft: true\n---\nx\n' $i $i > articles/zz-many-$i/index.md; done; }
check_paged_canonical() {
  local o; o=$(mktemp -d)
  build_variant "$o" manyarticles || { fail check_paged_canonical "variant build failed"; rm -rf "$o"; return; }
  local c1 c2 t2; c1=$(grep -oE '<link rel="?canonical"? href="?[^" >]+' "$o/articles/page/2/index.html" | sed -E 's/.*href="?//')
  t2=$(grep -oE '<link rel="?canonical"? href="?[^" >]+' "$o/categories/education/page/2/index.html" | sed -E 's/.*href="?//')
  if [[ "$c1" == */articles/page/2/ && "$t2" == */categories/education/page/2/ ]]; then pass check_paged_canonical
  else fail check_paged_canonical "page 2 canonical: articles=$c1 education=$t2"; fi
  rm -rf "$o"
}

check_popover_fallback() {
  if css_all | grep -q '@supportsnotselector(:popover-open)'; then pass check_popover_fallback
  else fail check_popover_fallback "no fallback for browsers without popover (menu would show permanently)"; fi
}

check_no_double_entities() {
  local bad="" f
  for f in index.json index.xml notes/index.html posts/modern-web-guidelines/index.html articles/sample-1/index.html; do
    grep -qE '&amp;(r|l)(s|d)quo;|&amp;#[0-9]+;' "$OUT/$f" && bad+="$f "
  done
  grep -qE '(&|\\u0026)(amp;)?((r|l)(s|d)quo|#[0-9]+);' "$OUT/index.json" && bad+="index.json(entity text) "
  perl -0777 -ne 'while (/<script type="?application\/ld\+json"?>(.*?)<\/script>/sg) { exit 1 if $1 =~ /&(r|l)(s|d)quo;/ }' "$OUT/posts/modern-web-guidelines/index.html" "$OUT/articles/sample-1/index.html" || bad+="json-ld "
  if [[ -z "$bad" ]]; then pass check_no_double_entities; else fail check_no_double_entities "HTML entities leak into: $bad"; fi
}

tagsummary() { sed -i.bak 's|^summary: "示例文章（占位），用于开发主题。"|summary: "示例：<think> 标签和 a<b 的写法。"|' articles/sample-1/index.md && rm -f articles/sample-1/index.md.bak; }
check_summary_with_angle_brackets() {
  local o; o=$(mktemp -d)
  if build_variant "$o" tagsummary && grep -q 'think' "$o/articles/sample-1/index.html"; then pass check_summary_with_angle_brackets
  else fail check_summary_with_angle_brackets "a summary containing <tag> or < breaks the --panicOnWarning build"; fi
  rm -rf "$o"
}

check_image_dimensions() {
  local img; img=$(html1 "$OUT/articles/sample-1/index.html" | grep -oE '<img[^>]*articles/sample-1/1\.jpg[^>]*>' | head -1)
  local fig; fig=$(html1 "$OUT/articles/sample-1/index.html" | grep -oE '<figcaption[^>]*>示例图注' | head -1)
  if [[ "$img" == *width=*1280* && "$img" == *height=*720* && "$img" == *loading=*lazy* && -n "$fig" ]]; then pass check_image_dimensions
  else fail check_image_dimensions "body image lacks width/height/lazy or caption: $img"; fi
}

check_cjk_emphasis() {
  if html1 "$OUT/articles/sample-2/index.html" | grep -q '<strong>1. 确认补偿。</strong>按照规定办理'; then pass check_cjk_emphasis
  else fail check_cjk_emphasis "bold ending in CJK punctuation does not render (goldmark cjk.escapedSpace off?)"; fi
}

check_stitch_fonts() {
  # Performance first: one self-hosted web font (Crimson Pro, display headings), preloaded and small; body and
  # code use system fonts. Never Google Fonts (unreachable in mainland China).
  local bad="" css; css=$(cat "$OUT/index.html")
  grep -rlq 'fonts.googleapis.com\|fonts.gstatic.com' "$OUT" --include='*.html' && bad+="google-fonts-request "
  local pre; pre=$(html1 "$OUT/index.html" | grep -oE '<link rel="?preload"? href="?[^" >]+\.woff2' | sed -E 's/.*href="?//; s|^/blog/||'); [[ -n "$pre" && -f "$OUT/$pre" ]] || bad+="preloaded-font-missing($pre) "
  echo "$css" | grep -qiE '@font-face *\{ *font-family: *"?crimson pro' || bad+="no-@font-face:Crimson "
  echo "$css" | grep -qiE 'font-family: *"?(lato|source code pro)"?;' && bad+="extra-web-fonts "
  local n; n=$(ls "$OUT"/fonts/*.woff2 2>/dev/null | wc -l | tr -d ' '); [[ "$n" -eq 1 ]] || bad+="woff2-files=$n "
  local size; size=$(wc -c < "$OUT/$pre" 2>/dev/null || echo 999999); [[ "$size" -lt 30000 ]] || bad+="font-too-big($size) "
  if [[ -z "$bad" ]]; then pass check_stitch_fonts; else fail check_stitch_fonts "$bad"; fi
}

check_card_foot_split() {
  local foot; foot=$(perl -0777 -ne 'print $1 if /(<div class="?card__foot"?><time.*?<\/div>)/s' "$OUT/index.html")
  if echo "$foot" | grep -qE '<time[^>]*>2026-11-' && echo "$foot" | grep -qE 'class="?card__read'; then pass check_card_foot_split
  else fail check_card_foot_split "card footer should show the date and the reading time as separate items: ${foot:0:200}"; fi
}

check_real_content() {
  local o r n; o=$(mktemp -d)
  if ! r=$(hugo --gc --minify --panicOnWarning -d "$o" 2>&1); then fail check_real_content "real content does not build: $(echo "$r" | grep -E 'ERROR|WARN' | head -2)"; rm -rf "$o"; return; fi
  n=$(find "$o/articles" -mindepth 2 -maxdepth 2 -name index.html -not -path '*/page/*' | wc -l | tr -d ' ')
  # Sync artefacts: table rows broken into paragraphs, JS escapes leaking from WeChat metadata.
  local junk; junk=$(grep -rlE '<p>\|</p>|\\x26' "$o" --include='*.html' --include='*.xml' --include='*.json' 2>/dev/null | sed "s|$o/||" | head -5 | tr '\n' ' ')
  [[ -z "$junk" ]] || { fail check_real_content "sync artefacts (<p>|</p> or \\x26) in: $junk"; rm -rf "$o"; return; }
  r=$(python3 scripts/check-links.py "$o" /blog/ 2>&1); local rc=$?
  rm -rf "$o"
  if [[ $rc -eq 0 ]]; then pass "check_real_content ($n articles)"; else fail check_real_content "$(echo "$r" | head -3 | tr '\n' ';')"; fi
}

check_redirect_site() {
  local o r; o=$(mktemp -d); r=$(mktemp -d)
  HUGO_BASEURL=https://aitanyan.com/ hugo --quiet --panicOnWarning -d "$o" >/dev/null 2>&1
  python3 scripts/make-redirects.py "$o" "$r" https://aitanyan.com >/dev/null 2>&1
  local page="$r/articles/index.html" bad=""
  grep -q '<link rel="canonical" href="https://aitanyan.com/articles/">' "$page" 2>/dev/null || bad+="canonical "
  grep -q 'http-equiv="refresh" content="0; url=https://aitanyan.com/articles/"' "$page" 2>/dev/null || bad+="refresh "
  [[ -f "$r/index.html" && -f "$r/posts/modern-web-guidelines/index.html" ]] || bad+="pages "
  grep -q 'location.replace' "$r/404.html" 2>/dev/null && grep -q '/blog' "$r/404.html" || bad+="404-mapping "
  [[ ! -e "$r/sitemap.xml" ]] || bad+="old-sitemap "
  rm -rf "$o" "$r"
  if [[ -z "$bad" ]]; then pass check_redirect_site; else fail check_redirect_site "redirect site for the old address is wrong: $bad"; fi
}

check_sitemap_scope() {
  local f="$OUT/sitemap.xml" bad=""
  grep -qE '<loc>[^<]*/tags/' "$f" && bad+="tags "
  grep -qE '<loc>[^<]*/search/</loc>' "$f" && bad+="search "
  grep -qE '<loc>[^<]*/404' "$f" && bad+="404 "
  for u in /articles/sample-1/ /categories/education/ /posts/hello-world/ /wiki/concepts/agent-loop/ /notes/; do grep -q "<loc>[^<]*$u</loc>" "$f" || bad+="missing:$u "; done
  if [[ -z "$bad" ]]; then pass check_sitemap_scope; else fail check_sitemap_scope "sitemap scope wrong: $bad"; fi
}

check_noindex_thin() {
  local bad="" f
  for f in tags/index.html tags/agents/index.html search/index.html 404.html; do
    html1 "$OUT/$f" | grep -qE '<meta name="?robots"? content="?noindex,follow' || bad+="$f "
  done
  for f in index.html articles/sample-1/index.html categories/education/index.html posts/hello-world/index.html; do
    html1 "$OUT/$f" | grep -qE 'name="?robots"? content="?noindex' && bad+="indexable:$f "
  done
  if [[ -z "$bad" ]]; then pass check_noindex_thin; else fail check_noindex_thin "noindex wrong on: $bad"; fi
}

check_post_jsonld() {
  local r; r=$(perl -0777 -ne 'print "$1\n\x1e" while /<script type="?application\/ld\+json"?>(.*?)<\/script>/sg' "$OUT/posts/hello-world/index.html" | python3 -c '
import json,sys
items=[]
for b in sys.stdin.read().split("\x1e"):
    if b.strip(): d=json.loads(b); items+=d if isinstance(d,list) else [d]
t=[i for i in items if i.get("@type") in ("BlogPosting","Article")]
assert t, "no BlogPosting"
assert t[0].get("inLanguage")=="en", "inLanguage should be en"
print("ok")' 2>&1)
  if [[ "$r" == ok ]]; then pass check_post_jsonld; else fail check_post_jsonld "$r"; fi
}

check_company() {
  local h; h=$(html1 "$OUT/index.html")
  if echo "$h" | grep -qE 'site-footer__copy[^>]*>© [0-9]{4} AI调研员 · L\.J\.K Consultant Limited · 保留所有权利。' \
     && grep -q '"legalName":"L.J.K Consultant Limited"' "$OUT/articles/sample-1/index.html"; then pass check_company
  else fail check_company "footer or JSON-LD publisher lacks the company name"; fi
}

check_webp_srcset() {
  local body cover plain bad=""
  body=$(html1 "$OUT/articles/sample-1/index.html" | grep -oE '<picture><source type="?image/webp"? srcset="[^"]*1-480\.webp 480w, [^"]*1-960\.webp 960w, [^"]*1\.webp 1280w"[^>]*sizes=' | head -1)
  [[ -n "$body" ]] || bad+="body-srcset "
  perl -0777 -ne 'exit(/<picture>.{0,600}?<img[^>]*1\.jpg[^>]*width="?1280/s ? 0 : 1)' "$OUT/articles/sample-1/index.html" || bad+="body-fallback-img "
  cover=$(html1 "$OUT/index.html" | grep -oE 'srcset="[^"]*cover-480\.webp 480w, [^"]*cover\.webp 900w"' | head -1)
  [[ -n "$cover" ]] || bad+="cover-srcset "
  html1 "$OUT/articles/sample-3/index.html" | grep -q 'image/webp' && bad+="webp-without-flag "
  html1 "$OUT/articles/sample-1/index.html" | grep -qE '/2(-[0-9]+)?\.webp' && bad+="webp-for-gif "
  html1 "$OUT/articles/sample-1/index.html" | grep -qE '<img[^>]*2\.gif[^>]*width="?600' || bad+="gif-plain-img "
  if [[ -z "$bad" ]]; then pass check_webp_srcset; else fail check_webp_srcset "$bad"; fi
}

check_topics() {
  local h bad="" f="$OUT/topics/sample-topic/index.html"
  h=$(html1 "$f" 2>/dev/null)
  [[ -n "$h" ]] || bad+="no-topic-page "
  [[ "$h" == *"示例专题的导语"* ]] || bad+="intro "
  local order; order=$(echo "$h" | grep -oE 'href="?/blog/articles/sample-[0-9]/' | sed -E 's|.*sample-||; s|/||' | awk '!s[$0]++' | tr '\n' ' ')
  [[ "$order" == "3 1 "* ]] || bad+="order($order) "
  echo "$h" | grep -qE 'data-step="?1' || bad+="step-numbers "
  echo "$h" | grep -qE '<h2[^>]*>阅读路线</h2>' || bad+="h2-before-cards "
  html1 "$OUT/topics/index.html" 2>/dev/null | grep -qE 'href="?/blog/topics/sample-topic/' || bad+="topics-index "
  html1 "$OUT/index.html" | grep -qE 'aria-labelledby="?topics-heading' || bad+="home-row "
  perl -0777 -ne 'exit(/<nav class="?site-nav.{0,600}?href="?\/blog\/topics\/"?>专题<\/a>/s ? 0 : 1)' "$OUT/index.html" || bad+="nav "
  if [[ -z "$bad" ]]; then pass check_topics; else fail check_topics "$bad"; fi
}

badtopic() { sed -i.bak 's/^articles: .*/articles: ["sample-3", "no-such-article"]/' topics/sample-topic/index.md && rm -f topics/sample-topic/index.md.bak; }
check_topic_unknown_article() {
  local o cdir log rc; o=$(mktemp -d); cdir=$(mktemp -d)
  merge_content "$cdir"; ( cd "$cdir" && badtopic )
  log=$(hugo -D --contentDir "$cdir" -d "$o" 2>&1); rc=$?
  rm -rf "$o" "$cdir"
  if [[ $rc -ne 0 && "$log" == *"unknown article"* ]]; then pass check_topic_unknown_article
  else fail check_topic_unknown_article "a topic listing a missing article must fail the build (rc=$rc)"; fi
}

check_trust_pages() {
  local bad=""
  for p in methodology corrections; do [[ -f "$OUT/$p/index.html" ]] || bad+="missing:$p "; done
  local foot; foot=$(html1 "$OUT/index.html" | grep -oE '<footer.*</footer>')
  for p in methodology corrections; do [[ "$foot" =~ href=\"?/blog/$p/ ]] || bad+="footer:$p "; done
  perl -0777 -ne 'my $ok=0; while (/<script type="?application\/ld\+json"?>(.*?)<\/script>/sg) { my $j=$1; $ok=1 if $j =~ /"\@type":"Organization"/ && $j =~ /"legalName":"L\.J\.K Consultant Limited"/ } exit($ok ? 0 : 1)' "$OUT/about/index.html" || bad+="about-organization-jsonld "
  if [[ -z "$bad" ]]; then pass check_trust_pages; else fail check_trust_pages "$bad"; fi
}

check_corrections_note() {
  local h; h=$(html1 "$OUT/articles/sample-3/index.html")
  if echo "$h" | grep -qE 'class="?corrections' && [[ "$h" == *"2026-12-01"* && "$h" == *"第二节的示例数字由 3 改为 5。"* ]] && ! html1 "$OUT/articles/sample-2/index.html" | grep -q 'class="\?corrections'; then pass check_corrections_note
  else fail check_corrections_note "front matter corrections should render as a dated note at the end of the article (and only there)"; fi
}

check_glossary() {
  local bad="" e="$OUT/glossary/ai-agent/index.html" h
  h=$(html1 "$e" 2>/dev/null)
  [[ -n "$h" ]] || bad+="no-entry-page "
  [[ "$h" == *"<h1"*"智能体"* && "$h" == *"AI Agent"* ]] || bad+="title/english "
  echo "$h" | grep -qE 'href="?/blog/wiki/concepts/agent-loop/' || bad+="wiki-link "
  echo "$h" | grep -qE 'href="?/blog/articles/sample-1/' || bad+="mentioned-in "
  echo "$h" | grep -q '"@type":"DefinedTerm"' || bad+="jsonld "
  html1 "$OUT/glossary/index.html" 2>/dev/null | grep -qE 'href="?/blog/glossary/ai-agent/' || bad+="index "
  html1 "$OUT/articles/sample-1/index.html" | grep -qE 'class="?article-terms.{0,200}href="?/blog/glossary/ai-agent/' || bad+="article-terms "
  perl -0777 -ne 'exit(/<nav class="?site-nav.{0,800}?href="?\/blog\/glossary\/"?>名词<\/a>/s ? 0 : 1)' "$OUT/index.html" || bad+="nav "
  grep -q '/glossary/ai-agent/' "$OUT/index.json" && grep -q '/topics/sample-topic/' "$OUT/index.json" || bad+="search-index "
  if [[ -z "$bad" ]]; then pass check_glossary; else fail check_glossary "$bad"; fi
}

badwiki() { sed -i.bak 's/^wiki: .*/wiki: "no-such-concept"/' glossary/ai-agent/index.md && rm -f glossary/ai-agent/index.md.bak; }
check_glossary_bad_wiki() {
  local o cdir log rc; o=$(mktemp -d); cdir=$(mktemp -d)
  merge_content "$cdir"; ( cd "$cdir" && badwiki )
  log=$(hugo -D --contentDir "$cdir" -d "$o" 2>&1); rc=$?
  rm -rf "$o" "$cdir"
  if [[ $rc -ne 0 && "$log" == *"unknown wiki concept"* ]]; then pass check_glossary_bad_wiki
  else fail check_glossary_bad_wiki "a glossary entry pointing at a missing wiki page must fail the build (rc=$rc)"; fi
}

thintopic() { sed -i.bak 's/^articles: .*/articles: ["sample-3"]/' topics/sample-topic/index.md && rm -f topics/sample-topic/index.md.bak; }
check_topic_min_articles() {
  local o cdir log rc; o=$(mktemp -d); cdir=$(mktemp -d)
  merge_content "$cdir"; ( cd "$cdir" && thintopic )
  log=$(hugo -D --contentDir "$cdir" -d "$o" 2>&1); rc=$?
  rm -rf "$o" "$cdir"
  if [[ $rc -ne 0 && "$log" == *"at least 2 articles"* ]]; then pass check_topic_min_articles
  else fail check_topic_min_articles "a topic with fewer than 2 articles must fail the build (rc=$rc)"; fi
}

check_small_fixes() {
  local bad=""
  python3 -c "import json;h=json.load(open('vercel.json'))['headers'];assert any(x['source'].startswith('/fonts/') and 'immutable' in x['headers'][0]['value'] for x in h)" 2>/dev/null || bad+="fonts-cache "
  perl -0777 -ne 'exit(/class="?card topic-card.{0,300}?view-transition-name/s ? 0 : 1)' "$OUT/topics/index.html" && bad+="topic-card-vt-name "
  if [[ -z "$bad" ]]; then pass check_small_fixes; else fail check_small_fixes "$bad"; fi
}

check_tools() {
  local h bad=""; h=$(html1 "$OUT/tools/index.html" 2>/dev/null)
  [[ -n "$h" ]] || bad+="no-page "
  echo "$h" | grep -qE 'id="?demo-a"?' || bad+="anchor "
  perl -0777 -ne 'exit(/id="?demo-b.{0,1500}?href="?\/blog\/articles\/sample-3\/.{0,400}?href="?\/blog\/articles\/sample-2\//s ? 0 : 1)' "$OUT/tools/index.html" || bad+="article-links-in-order "
  [[ "$h" == *"非广告"* ]] || bad+="disclaimer "
  echo "$h" | grep -qE '<h2[^>]*>通用 AI 助手</h2>' || bad+="group-heading "
  perl -0777 -ne 'exit(/<nav class="?site-nav.{0,900}?href="?\/blog\/tools\/"?>工具<\/a>/s ? 0 : 1)' "$OUT/index.html" || bad+="nav "
  perl -0777 -ne 'exit(/<footer.{0,1500}?href="?\/blog\/archives\/"?/s ? 0 : 1)' "$OUT/index.html" || bad+="archive-in-footer "
  if [[ -z "$bad" ]]; then pass check_tools; else fail check_tools "$bad"; fi
}

badtool() { sed -i.bak 's/articles: \["sample-1"\]/articles: ["no-such-article"]/' tools/_index.md && rm -f tools/_index.md.bak; }
check_tools_unknown_article() {
  local o cdir log rc; o=$(mktemp -d); cdir=$(mktemp -d)
  merge_content "$cdir"; ( cd "$cdir" && badtool )
  log=$(hugo -D --contentDir "$cdir" -d "$o" 2>&1); rc=$?
  rm -rf "$o" "$cdir"
  if [[ $rc -ne 0 && "$log" == *"unknown article"* ]]; then pass check_tools_unknown_article
  else fail check_tools_unknown_article "a tool linking a missing article must fail the build (rc=$rc)"; fi
}

check_quiz() {
  local f="$OUT/quiz/job-check/index.html" bad="" h
  h=$(html1 "$f" 2>/dev/null)
  [[ -n "$h" ]] || bad+="no-page "
  local n; n=$(echo "$h" | grep -oE '<fieldset' | wc -l | tr -d ' '); [[ "$n" -ge 9 ]] || bad+="questions=$n "
  echo "$h" | grep -qE '<input type="?radio"?' || bad+="radios "
  echo "$h" | grep -qE '<noscript' || bad+="noscript "
  echo "$h" | grep -qE 'quiz[.a-f0-9]*\.js' || bad+="script "
  echo "$h" | grep -qE 'href="?/blog/articles/' || bad+="source-link "
  perl -0777 -ne 'exit(/<script type="?application\/json"? id="?quiz-data"?>(.*?)<\/script>/s ? 0 : 1)' "$f" || bad+="data "
  html1 "$OUT/index.html" | grep -qE 'href="?/blog/quiz/job-check/' || bad+="home-entry "
  node scripts/test-quiz.mjs >/dev/null 2>&1 || bad+="scoring-tests "
  if [[ -z "$bad" ]]; then pass check_quiz; else fail check_quiz "$bad"; fi
}

check_comments() {
  local h bad=""; h=$(html1 "$OUT/articles/sample-1/index.html")
  echo "$h" | grep -qE '<section[^>]*id="?comments' || bad+="section "
  echo "$h" | grep -qE 'data-waline-server="?https://comments\.aitanyan\.com' || bad+="server "
  echo "$h" | grep -qE 'data-waline-path="?/articles/sample-1/"?' || bad+="path "
  echo "$h" | grep -qE 'comments[.a-f0-9]*\.js' || bad+="loader "
  echo "$h" | grep -qE '<script[^>]*waline\.js' && bad+="eager-waline "
  echo "$h" | grep -qE '<noscript' || bad+="noscript "
  [[ -f "$OUT/vendor/waline/waline.js" && -f "$OUT/vendor/waline/waline.css" ]] || bad+="vendored-files "
  html1 "$OUT/posts/hello-world/index.html" | grep -qE 'id="?comments' && bad+="comments-on-posts "
  html1 "$OUT/index.html" | grep -qE 'id="?comments' && bad+="comments-on-home "
  if [[ -z "$bad" ]]; then pass check_comments; else fail check_comments "$bad"; fi
}

check_footer_no_personal_links() {
  local foot; foot=$(html1 "$OUT/index.html" | grep -oE '<footer.*</footer>')
  if [[ "$foot" == *"github.com"* || "$foot" =~ \>CV\< || "$foot" =~ \>Now\< ]]; then fail check_footer_no_personal_links "footer still links GitHub, CV or Now"
  else pass check_footer_no_personal_links; fi
}

check_home_banner() {
  local h bad=""; h=$(html1 "$OUT/index.html")
  local b; b=$(after_attr "$OUT/index.html" 'class="?banner"?[ >]' 4000)
  [[ -n "$b" ]] || bad+="no-banner "
  echo "$b" | grep -qE '<h1[^>]*class="?banner__title' || bad+="h1 "
  echo "$h" | grep -qE '<h1[^>]*visually-hidden' && bad+="hidden-h1-still-there "
  [[ "$b" == *"看懂变化"* && "$b" == *"拿来就用"* && "$b" == *"有据可查"* ]] || bad+="values "
  echo "$b" | grep -qE 'href="?/blog/articles/"?' || bad+="cta-read "
  echo "$b" | grep -qE 'href="?/blog/subscribe/"?' || bad+="cta-subscribe "
  echo "$b" | grep -qE '[0-9]+ 篇科普' || bad+="stats "
  echo "$b" | grep -qE 'href="?/blog/articles/sample-' || bad+="latest-list "
  echo "$h" | grep -qE 'class="?hero"? data-featured' && bad+="old-hero "
  if [[ -z "$bad" ]]; then pass check_home_banner; else fail check_home_banner "$bad"; fi
}

check_subscribe_page() {
  local f="$OUT/subscribe/index.html" bad=""
  [[ -f "$f" ]] || { fail check_subscribe_page "no /subscribe/ page"; return; }
  local h; h=$(html1 "$f")
  [[ "$h" == *"https://coolloic.github.io/blog/articles/index.xml"* ]] || bad+="articles-feed-url "
  [[ "$h" == *"https://coolloic.github.io/blog/index.xml"* ]] || bad+="all-feed-url "
  echo "$h" | grep -qE 'inoreader\.com/\?add_feed=https%3A%2F%2Fcoolloic\.github\.io%2Fblog%2Farticles%2Findex\.xml' || bad+="inoreader "
  echo "$h" | grep -qE 'feedly\.com/i/subscription/feed/https%3A%2F%2Fcoolloic\.github\.io%2Fblog%2Farticles%2Findex\.xml' || bad+="feedly "
  echo "$h" | grep -qE 'data-copy=' || bad+="copy-button "
  [[ "$h" == *"wechat-qr-"* ]] || bad+="qr "
  echo "$h" | grep -qE '<link rel="?alternate"? type="?application/rss\+xml' || bad+="feed-autodiscovery "
  grep -q '<item>' "$OUT/articles/index.xml" || bad+="articles-feed-empty "
  grep -q '/posts/' "$OUT/articles/index.xml" && bad+="articles-feed-has-posts "
  html1 "$OUT/index.html" | grep -oE '<footer.*</footer>' | grep -qE 'href="?/blog/subscribe/' || bad+="footer-link "
  if [[ -z "$bad" ]]; then pass check_subscribe_page; else fail check_subscribe_page "$bad"; fi
}

check_tech_feel() {
  local css bad=""; css=$(css_all)
  echo "$css" | grep -qE '\.banner::?before\{[^}]*linear-gradient' || bad+="grid-layer "
  echo "$css" | grep -qE '\.banner::?after\{[^}]*animation:[^}]*evo-scan' || bad+="scan-sweep "
  echo "$css" | grep -qE '\.banner__eyebrow\{[^}]*font-family:var\(--font-mono\)' || bad+="mono-eyebrow "
  echo "$css" | grep -qE '\.banner__eyebrow::?after\{[^}]*animation:[^}]*evo-blink' || bad+="cursor "
  echo "$css" | grep -qE '\.banner__stats\{[^}]*font-family:var\(--font-mono\)' || bad+="mono-stats "
  echo "$css" | grep -qE '\.card::?after\{[^}]*linear-gradient' || bad+="card-glow "
  local rm; rm=$(echo "$css" | grep -oE '@media \(prefers-reduced-motion:reduce\)\{.{0,600}' | head -1)
  [[ -z "$rm" ]] && rm=$(echo "$css" | perl -0777 -ne 'print $1 if /(\@media\s*\(prefers-reduced-motion:\s*reduce\)\{.{0,900})/s')
  echo "$rm" | grep -qE "\.banner::?after" && echo "$rm" | grep -qE "\.banner__eyebrow::?after" || bad+="reduced-motion "
  if [[ -z "$bad" ]]; then pass check_tech_feel; else fail check_tech_feel "$bad"; fi
}

check_cover_uncropped() {
  local css bad=""; css=$(css_all)
  echo "$css" | grep -qE '\.cover__media\{[^}]*object-fit:contain' || bad+="contain "
  echo "$css" | grep -qE '\.cover\{[^}]*aspect-ratio:(2\.35/1|47/20)' || bad+="card-ratio "
  # square covers come pre-composed as cover_wide; no runtime blur layer or second download per card
  [[ "$css" == *"--cover-src"* ]] && bad+="runtime-blur-layer "
  html1 "$OUT/articles/index.html" | grep -qE 'src="?https://example\.com/wide/cover-wide\.jpg' || bad+="cover_wide-not-used "
  html1 "$OUT/articles/sample-3/index.html" | grep -qE 'og:image"? content="?https://example\.com/square\.jpg' || bad+="og-should-keep-original "
  if [[ -z "$bad" ]]; then pass check_cover_uncropped; else fail check_cover_uncropped "$bad"; fi
}

check_dark_default() {
  local head bad=""; head=$(html1 "$OUT/index.html" | sed 's|</head>.*||')
  echo "$head" | grep -qE 'prefers-color-scheme: dark\)"\)\.matches' && bad+="script-follows-os "
  echo "$head" | grep -qE '[a-z]="dark"' || bad+="script-default "
  nospace "$OUT/index.html" | grep -qE ':root\{color-scheme:dark;' || bad+="css-default "
  if [[ -z "$bad" ]]; then pass check_dark_default; else fail check_dark_default "$bad"; fi
}

check_perf_basics() {
  local bad="" imgs; imgs=$(html1 "$OUT/articles/index.html" | grep -oE '<img class="?cover__media[^>]*>')
  local first; first=$(echo "$imgs" | head -1)
  [[ "$first" == *fetchpriority=*high* && "$first" != *loading=*lazy* ]] || bad+="first-card-eager "
  echo "$imgs" | sed -n '2,3p' | grep -q 'loading=' && bad+="row1-should-not-lazy "
  html1 "$OUT/index.html" | grep -qE '<link rel="?stylesheet"? href="?[^" >]*css/main' && bad+="css-not-inlined "
  html1 "$OUT/index.html" | grep -qE '<style>[^<]{2000,}' || perl -0777 -ne 'exit(/<style>[^<]{2000}/ ? 0 : 1)' "$OUT/index.html" || bad+="no-inline-css "
  grep -q 'logo-mark-128.webp' themes/evo/layouts/_partials/logo.html || bad+="logo-webp "
  [[ -f static/images/logo-mark-128.webp && $(wc -c < static/images/logo-mark-128.webp) -lt 12000 ]] || bad+="logo-size "
  if [[ -z "$bad" ]]; then pass check_perf_basics; else fail check_perf_basics "$bad"; fi
}

check_display_font_optional() {
  # The display font is the LCP text's font; "optional" means no late swap, so LCP happens at first paint.
  if html1 "$OUT/index.html" | grep -qiE 'font-family:"?crimson pro"?;[^}]*font-display:optional'; then pass check_display_font_optional
  else fail check_display_font_optional "Crimson Pro should use font-display: optional"; fi
}

check_follow_badge_zh() {
  local h; h=$(html1 "$OUT/index.html")
  if [[ "$h" == *"微信公众号"* && "$h" != *"WeChat Official Account"* ]]; then pass check_follow_badge_zh
  else fail check_follow_badge_zh "Chinese pages should say 微信公众号, not WeChat Official Account"; fi
}

check_category_icons() {
  local h bad="" slug; h=$(html1 "$OUT/index.html")
  for slug in work education life frontier tools; do
    echo "$h" | grep -qE "<img[^>]*src=\"?/blog/images/categories/$slug-96\.webp[^>]*srcset=\"?/blog/images/categories/$slug-192\.webp 2x" || bad+="tile:$slug "
    for w in 96 192; do f="static/images/categories/$slug-$w.webp"; [[ -f "$f" && $(wc -c < "$f") -lt 20000 ]] || bad+="file:$slug-$w "; done
  done
  echo "$h" | grep -oE '<img[^>]*categories/work-96[^>]*>' | grep -q 'width="\?48' || bad+="dims "
  if [[ -z "$bad" ]]; then pass check_category_icons; else fail check_category_icons "$bad"; fi
}

check_qr_webp() {
  local bad=""; grep -rlq 'wechat-qr\.png' "$OUT" --include='*.html' && bad+="png-still-used "
  html1 "$OUT/index.html" | grep -qE 'src="?/blog/images/qr/wechat-qr-96\.webp[^>]*srcset="?/blog/images/qr/wechat-qr-192\.webp 2x' || bad+="srcset "
  for w in 48 96 120 192 240; do [[ -f "static/images/qr/wechat-qr-$w.webp" ]] || bad+="file-$w "; done
  if [[ -z "$bad" ]]; then pass check_qr_webp; else fail check_qr_webp "$bad"; fi
}

check_back_to_top() {
  local bad="" f; for f in index.html articles/sample-1/index.html posts/hello-world/index.html; do
    html1 "$OUT/$f" | grep -qE '<a[^>]*class="?to-top[^>]*href="?#top|<a[^>]*href="?#top[^>]*class="?to-top' || bad+="link:$f "
    html1 "$OUT/$f" | grep -qE 'id="?top"?[ >]' || bad+="anchor:$f "
  done
  html1 "$OUT/index.html" | grep -oE '<a[^>]*to-top[^>]*>' | grep -q 'aria-label=' || bad+="label "
  local css; css=$(css_all)
  echo "$css" | grep -qE '\.to-top\{[^}]*position:fixed' || bad+="fixed "
  echo "$css" | grep -qE '@supports\(animation-timeline:scroll\(\)\)\{[^@]*\.to-top' || bad+="scroll-reveal "
  html1 "$OUT/index.html" | grep -qE '<body[^>]*><a class="?skip-link"? href="?#main' || bad+="skip-link-first "
  html1 "$OUT/index.html" | grep -qE 'id="?main"?[ >]' || bad+="main-target "
  if [[ -z "$bad" ]]; then pass check_back_to_top; else fail check_back_to_top "$bad"; fi
}

CHECKS=(check_theme_evo check_html_lang check_tokens_css check_light_dark_fallback check_theme_script_first check_nav check_skip_link check_wrap check_toggle_button check_tokens_unescaped check_home_featured check_home_featured_fallback check_home_lists_articles_not_wiki check_home_empty check_cover_box check_cover_video_slot check_follow_card check_no_format_errors check_category_order check_category_urls check_category_empty check_archives check_old_urls check_internal_links check_article_page check_wechat_footer check_video_vertical check_video_shortcode check_required_fields check_jsonld check_prev_next check_notes_page check_en_chrome check_code_copy check_wiki_body check_wiki_concept_page check_search_index check_search_page check_view_transitions check_scroll_driven_guarded check_reduced_motion check_js_budget check_progress_bar check_seo check_structured_data check_sitemap check_rss_scope check_404 check_video_dir check_no_blocking_fonts check_search_form_visible check_rise_no_fade check_layout_375 check_paged_canonical check_popover_fallback check_no_double_entities check_summary_with_angle_brackets check_unknown_category check_fixtures_not_in_content check_image_dimensions check_cjk_emphasis check_stitch_fonts check_card_foot_split check_real_content check_redirect_site check_sitemap_scope check_noindex_thin check_post_jsonld check_company check_webp_srcset check_topics check_topic_unknown_article check_trust_pages check_corrections_note check_glossary check_glossary_bad_wiki check_topic_min_articles check_small_fixes check_tools check_tools_unknown_article check_quiz check_comments check_footer_no_personal_links check_home_banner check_subscribe_page check_tech_feel check_cover_uncropped check_dark_default check_asset_cache_headers check_perf_basics check_display_font_optional check_follow_badge_zh check_category_icons check_qr_webp check_back_to_top)
for c in "${@:-${CHECKS[@]}}"; do $c; done
[[ $FAILS -eq 0 ]] && echo "SITE ALL PASS" || { echo "$FAILS SITE CHECKS FAILED"; exit 1; }

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
  find "$1/articles" -mindepth 1 -maxdepth 1 -type d -exec rm -rf {} +
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
  if [[ -n "$style" && "$style" != *"&#34"* && "$style" != *"&quot;"* && "$style" == *'--font-body:"'* ]]; then pass check_tokens_unescaped
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
  local css="$OUT"/css/*.css r
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
  if perl -0777 -ne 'exit(/\@keyframes evo-rise\{[^}]*opacity/ ? 0 : 1)' "$OUT"/css/*.css; then fail check_rise_no_fade "card rise-in fades opacity (off-screen text fails contrast audits)"
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
  local h; h=$(html1 "$OUT/index.html" | sed 's|</head>.*||' | perl -pe 's|<noscript>.*?</noscript>||g')
  local link; link=$(echo "$h" | grep -oE '<link[^>]*fonts.googleapis.com/css2[^>]*>' | head -1)
  if [[ "$link" == *Crimson+Pro* && "$link" == *Lato* && "$link" == *Source+Code+Pro* && "$link" == *rel=*preload* ]] && python3 scripts/check-contrast.py >/dev/null; then pass check_stitch_fonts
  else fail check_stitch_fonts "need one non-blocking Google Fonts link with Crimson Pro, Lato and Source Code Pro, and passing contrast incl. subtle: $link"; fi
}

check_card_foot_split() {
  local foot; foot=$(perl -0777 -ne 'print $1 if /(<div class="?card__foot.*?<\/div>)/s' "$OUT/index.html")
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

CHECKS=(check_theme_evo check_html_lang check_tokens_css check_light_dark_fallback check_theme_script_first check_nav check_skip_link check_wrap check_toggle_button check_tokens_unescaped check_home_featured check_home_featured_fallback check_home_lists_articles_not_wiki check_home_empty check_cover_box check_cover_video_slot check_follow_card check_no_format_errors check_category_order check_category_urls check_category_empty check_archives check_old_urls check_internal_links check_article_page check_wechat_footer check_video_vertical check_video_shortcode check_required_fields check_jsonld check_prev_next check_notes_page check_en_chrome check_code_copy check_wiki_body check_wiki_concept_page check_search_index check_search_page check_view_transitions check_scroll_driven_guarded check_reduced_motion check_js_budget check_progress_bar check_seo check_structured_data check_sitemap check_rss_scope check_404 check_video_dir check_no_blocking_fonts check_search_form_visible check_rise_no_fade check_layout_375 check_paged_canonical check_popover_fallback check_no_double_entities check_summary_with_angle_brackets check_unknown_category check_fixtures_not_in_content check_image_dimensions check_cjk_emphasis check_stitch_fonts check_card_foot_split check_real_content check_redirect_site check_sitemap_scope check_noindex_thin check_post_jsonld)
for c in "${@:-${CHECKS[@]}}"; do $c; done
[[ $FAILS -eq 0 ]] && echo "SITE ALL PASS" || { echo "$FAILS SITE CHECKS FAILED"; exit 1; }

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

CHECKS=(check_theme_evo check_html_lang check_tokens_css check_light_dark_fallback check_theme_script_first check_nav check_skip_link check_wrap check_toggle_button check_tokens_unescaped)
for c in "${@:-${CHECKS[@]}}"; do $c; done
[[ $FAILS -eq 0 ]] && echo "SITE ALL PASS" || { echo "$FAILS SITE CHECKS FAILED"; exit 1; }

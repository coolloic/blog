#!/usr/bin/env bash
# Checks for the LLM wiki. Run from anywhere: bash scripts/check-wiki.sh
set -u
cd "$(dirname "$0")/.."
FAILS=0
pass() { echo "PASS $1"; }
fail() { echo "FAIL $1: $2"; FAILS=$((FAILS+1)); }

check_build() {
  local out
  if out=$(hugo --gc --minify --panicOnWarning --quiet 2>&1); then pass check_build
  else fail check_build "$(echo "$out" | head -5)"; fi
}

check_wiki_section() {
  if [[ -f public/wiki/index.html && -f public/wiki/log/index.html ]]; then pass check_wiki_section
  else fail check_wiki_section "public/wiki/index.html or public/wiki/log/index.html missing"; fi
}

check_raw_ignored() {
  if ! git check-ignore -q raw/sample.pdf; then fail check_raw_ignored "raw/sample.pdf is not ignored"
  elif git check-ignore -q raw/README.md; then fail check_raw_ignored "raw/README.md should be tracked"
  else pass check_raw_ignored; fi
}

check_home_posts_only() {
  # The nav menu links to /wiki/ itself; any deeper /wiki/... link means a wiki page is listed.
  local f bad=""
  for f in public/index.html public/archives/index.html; do
    grep -Eo 'href="?[^" >]*/wiki/[^" >]+' "$f" 2>/dev/null | grep -q . && bad+="$f "
  done
  if [[ -n "$bad" ]]; then fail check_home_posts_only "wiki pages listed in: $bad"
  else pass check_home_posts_only; fi
}

check_broken_link_fails() {
  local fixture=content/wiki/zz-broken.md
  mkdir -p content/wiki
  printf -- '---\ntitle: zz\n---\n[x](does-not-exist.md)\n' > "$fixture"
  trap 'rm -f content/wiki/zz-broken.md' RETURN
  if hugo --panicOnWarning --quiet -d "$(mktemp -d)" >/dev/null 2>&1; then
    fail check_broken_link_fails "build succeeded despite a broken .md link"
  else pass check_broken_link_fails; fi
}

for c in check_build check_wiki_section check_raw_ignored check_home_posts_only check_broken_link_fails; do $c; done
# rebuild cleanly so later checks see real output
hugo --gc --minify --quiet >/dev/null 2>&1
[[ $FAILS -eq 0 ]] && echo "ALL PASS" || { echo "$FAILS FAILED"; exit 1; }

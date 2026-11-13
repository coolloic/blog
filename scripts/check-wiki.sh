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

check_index_complete() {
  local f missing=""
  for f in content/wiki/concepts/*.md content/wiki/sources/*.md; do
    [[ -e "$f" ]] || continue
    local rel=${f#content/wiki/}
    grep -qF "]($rel)" content/wiki/_index.md || missing+="$rel "
  done
  if [[ -n "$missing" ]]; then fail check_index_complete "not in _index.md: $missing"
  else pass check_index_complete; fi
}

check_search_includes_wiki() {
  if grep -q '/wiki/concepts/' public/index.json 2>/dev/null; then pass check_search_includes_wiki
  else fail check_search_includes_wiki "no /wiki/concepts/ pages in public/index.json"; fi
}

check_concepts_cite_sources() {
  local f bad=""
  for f in content/wiki/concepts/*.md; do
    [[ -e "$f" ]] || continue
    grep -q '](../sources/' "$f" || bad+="$f "
  done
  if [[ -n "$bad" ]]; then fail check_concepts_cite_sources "no source link in: $bad"
  else pass check_concepts_cite_sources; fi
}

check_rss_posts_only() {
  if grep -Eq '<link>[^<]*/wiki/' public/index.xml 2>/dev/null; then
    fail check_rss_posts_only "wiki pages listed in public/index.xml"
  else pass check_rss_posts_only; fi
}

check_ci_strict() {
  if grep -Eq 'hugo .*--panicOnWarning' .github/workflows/deploy.yml; then pass check_ci_strict
  else fail check_ci_strict "deploy workflow builds without --panicOnWarning (broken links would ship)"; fi
}

check_unsafe_link_neutralised() {
  local fixture=content/wiki/zz-unsafe.md out
  out=$(mktemp -d)
  printf -- '---\ntitle: zz\n---\n[x](javascript:alert(1))\n' > "$fixture"
  hugo --quiet -d "$out" >/dev/null 2>&1
  rm -f "$fixture"
  if grep -rqi 'href="\?javascript:' "$out/wiki/zz-unsafe/" 2>/dev/null; then
    fail check_unsafe_link_neutralised "javascript: link rendered as a live href"
  else pass check_unsafe_link_neutralised; fi
  rm -rf "$out"
}

check_mermaid_rendered() {
  local with=public/wiki/concepts/agent-design-patterns/index.html without=public/wiki/concepts/tools/index.html n
  n=$(grep -o 'mermaid@[0-9.]*/dist/mermaid.esm.min.mjs' "$with" 2>/dev/null | wc -l | tr -d ' ')
  if ! grep -Eq '<pre class="?mermaid' "$with" 2>/dev/null; then fail check_mermaid_rendered "no <pre class=mermaid> in agent-design-patterns"
  elif grep -Eq '&amp;(#34|gt|lt|quot);' "$with"; then fail check_mermaid_rendered "diagram source is double-escaped (Mermaid will show syntax errors)"
  elif [[ "$n" != 1 ]]; then fail check_mermaid_rendered "mermaid script included $n times (want 1)"
  elif grep -q 'mermaid.esm' "$without"; then fail check_mermaid_rendered "mermaid script loaded on a page without diagrams"
  else pass check_mermaid_rendered; fi
}

check_all_wiki_pages_rendered() {
  # A page whose date (or lastmod, which Hugo falls back to) is still in the future in UTC is silently skipped.
  local out missing=""
  out=$(mktemp -d)
  hugo --quiet -d "$out" >/dev/null 2>&1
  for f in content/wiki/concepts/*.md content/wiki/sources/*.md; do
    local d; d=$(basename "$(dirname "$f")")
    [[ -f "$out/wiki/$d/$(basename "$f" .md)/index.html" ]] || missing="$missing $d/$(basename "$f")"
  done
  rm -rf "$out"
  if [[ -n "$missing" ]]; then fail check_all_wiki_pages_rendered "$(echo $missing | wc -w | tr -d ' ') pages not rendered, e.g.$(echo $missing | cut -d' ' -f1-3)"
  else pass check_all_wiki_pages_rendered; fi
}

for c in check_build check_wiki_section check_raw_ignored check_home_posts_only check_broken_link_fails check_index_complete check_search_includes_wiki check_concepts_cite_sources check_rss_posts_only check_ci_strict check_unsafe_link_neutralised check_mermaid_rendered check_all_wiki_pages_rendered; do $c; done
# rebuild cleanly so later checks see real output
hugo --gc --minify --quiet >/dev/null 2>&1
[[ $FAILS -eq 0 ]] && echo "ALL PASS" || { echo "$FAILS FAILED"; exit 1; }

---
name: site-cover
description: Make real-photo website covers for articles with ChatGPT; the WeChat 公众号 covers stay unchanged. Use when new articles need site covers, or when asked to regenerate or replace site covers.
---

# Site covers: real photos on the website, WeChat unchanged

The website shows `cover_wide` (2.35:1, 1280×544). The owner wants these to be **documentary lifestyle photos**:
real, everyday, 接地气 (decided 2026-11-21). `cover` is the WeChat cover: never change it or anything on WeChat;
it stays for share previews. Prompts and scenes live in `design/cover-prompts.md`; generated originals live in
`~/Documents/aitanyan/covers/<slug>.png` (outside the public repo).

## Steps

1. **Pick articles.** Those whose `cover_wide` does not end in `cover-site.jpg`:
   `for s in $(ls content/articles | grep -v _index); do grep -q 'cover_wide: ".*cover-site.jpg"' content/articles/$s/index.md || echo $s; done`
   Done when you have the list (or it is empty: stop).

2. **Write one scene per article** into the table in `design/cover-prompts.md`: a real place and moment in
   everyday China that the article's reader lives (a parent at a kitchen table, a commuter, a market stall),
   not an abstract metaphor. Done when every picked slug has a row.

3. **Generate in ChatGPT** (Claude in Chrome, owner signed in at chatgpt.com; one chat for the batch). Per
   article: send "Next photo in the same Style A: " + the shared style from `design/cover-prompts.md` + "Scene: "
   + the row; wait about 40 s; open the newest image, click **Download**, close the viewer; then run
   `.claude/skills/site-cover/file-download.sh <slug>`. Exit 2 means the image was not ready: download again
   or regenerate. Done when `~/Documents/aitanyan/covers/<slug>.png` exists for every slug.

4. **Review** a 2.35:1 contact sheet (sharp, `fit: cover`, `position: sharp.strategy.attention`) of the new
   files. Regenerate any with text, logos, brand marks, a garbled face or hands, or a subject that does not fit
   the article. Done when every tile passes.

5. **Upload:** `node tools/wx-sync/bin/wx-sync.mjs --site-covers ~/Documents/aitanyan/covers --dry-run`, then
   without `--dry-run`. It crops, uploads `articles/<slug>/cover-site.jpg` plus WebP to R2 and sets `cover_wide`.
   A wrangler error on one file: re-run for that file alone (copy it into an empty folder). Done when step 1's
   command prints nothing.

6. **Cover videos:** `cd video && npm run render -- <slugs> --only=cover` (the loop is rendered from `cover_wide`).

7. **Check and commit:** `bash scripts/check-wiki.sh` reaches `ALL PASS`; stage the changed
   `content/articles/<slug>/index.md` files and `design/cover-prompts.md`; commit `content: site covers for N articles`.

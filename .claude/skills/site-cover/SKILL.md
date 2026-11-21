---
name: site-cover
description: Make article covers in the house style (real photo + 大字报 headline + logo watermark) with ChatGPT and video/bin/poster.mjs, for the website and for new WeChat 公众号 articles or drafts. Use when an article needs a cover, or when asked to regenerate or replace covers.
---

# Covers: real photo + 大字报 + watermark

The website shows `cover_wide` (2.35:1, 1280×544). The owner wants these to be **documentary lifestyle photos**:
real, everyday, 接地气 (decided 2026-11-21). `cover` is the WeChat cover: never change it or anything on WeChat;
it stays for share previews. Prompts and scenes live in `design/cover-prompts.md`; generated originals live in
`~/Documents/aitanyan/covers/<slug>.png` (outside the public repo).

## Style (owner's choice, 2026-11-21): real photo + 大字报 + logo watermark

Every cover, site and WeChat, is made this way. Reference: `~/Documents/aitanyan/covers/samples/reference-poster.png`
and `video/out/ai-layoff-30-day-plan/cover-site.png`.

- **Photo** (ChatGPT, no text in it): gritty realistic documentary photo, cinematic, dark warm tones, film grain,
  tension; one person in close-up on the right; the left ~55% darker and blurred to carry the text.
- **Headline (大字报):** two short lines (about 4–6 characters each) from the article's title or its own claims;
  line 1 white, line 2 orange (#F97316); heavy Noto Sans SC Black, slightly slanted, worn edges.
- **Subline:** one short line, white, `{braced}` words orange; only claims the article makes.
- **Watermark:** the horizontal logo (mark + 「AI调研员」 + tagline), light colours, top-left. On by default.
- **Text and logo are set by `video/bin/poster.mjs`** (Remotion still), never drawn by the image model, so every
  character is right:
  `cd video && node bin/poster.mjs <slug> --photo <png> --line1 "…" --line2 "…" --sub "…{…}…"` → `video/out/<slug>/cover-site.png`.
- **WeChat:** new articles and unpublished drafts use the same poster as their cover (2.35:1 for the lead
  article; a 1:1 crop with the text re-set for secondary articles), plus more realistic photos inside the body.
  Change a draft's cover only by saving the draft; never publish, and never touch published articles.

## Steps

1. **Pick articles.** Those whose `cover_wide` does not end in `cover-site.jpg`:
   `for s in $(ls content/articles | grep -v _index); do grep -q 'cover_wide: ".*cover-site.jpg"' content/articles/$s/index.md || echo $s; done`
   Done when you have the list (or it is empty: stop).

2. **Write one scene and one headline per article** into the table in `design/cover-prompts.md`: a real place
   and moment in everyday China that the article's reader lives (a parent at a kitchen table, a commuter, a
   market stall), not an abstract metaphor, plus the 大字报 headline and subline taken from the article's own
   title and claims. Done when every picked slug has a row.

3. **Generate the photo in ChatGPT** (Claude in Chrome, owner signed in at chatgpt.com; one chat for the batch).
   Per article: send the poster photo prompt from `design/cover-prompts.md` with the row's scene; wait about 40 s; open the newest image, click **Download**, close the viewer; then run
   `.claude/skills/site-cover/file-download.sh <slug> ~/Documents/aitanyan/covers/poster`. If ChatGPT reports an image error, send the prompt again. Exit 2 means the image was not ready: download again
   or regenerate. Done when `~/Documents/aitanyan/covers/<slug>.png` exists for every slug.

4. **Review** a 2.35:1 contact sheet (sharp, `fit: cover`, `position: sharp.strategy.attention`) of the new
   files. Regenerate any with text, logos, brand marks, a garbled face or hands, or a subject that does not fit
   the article. Done when every tile passes.

5. **Set text and watermark** with `video/bin/poster.mjs` for each slug (output `video/out/<slug>/cover-site.png`);
   copy the outputs into one folder as `<slug>.png`.

6. **Upload:** `node tools/wx-sync/bin/wx-sync.mjs --site-covers <that folder> --dry-run`, then
   without `--dry-run`. It crops, uploads `articles/<slug>/cover-site.jpg` plus WebP to R2 and sets `cover_wide`.
   A wrangler error on one file: re-run for that file alone (copy it into an empty folder). Done when step 1's
   command prints nothing.

7. **Cover videos:** `cd video && npm run render -- <slugs> --only=cover` (the loop is rendered from `cover_wide`).

8. **Check and commit:** `bash scripts/check-wiki.sh` reaches `ALL PASS`; stage the changed
   `content/articles/<slug>/index.md` files and `design/cover-prompts.md`; commit `content: site covers for N articles`.

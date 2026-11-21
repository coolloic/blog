---
name: wx-sync
description: Sync the owner's WeChat 公众号 articles into the blog (content/articles/, images on Cloudflare R2). Use when asked to sync, import or archive 公众号 / WeChat articles to the blog, or to re-sync one article.
---

# 公众号 → 博客同步

Claude reads the published list in the owner's logged-in WeChat backend and writes a **plan**. The local tool `tools/wx-sync` executes the plan: it fetches each public article page, converts it to Markdown, uploads images to R2 and writes `content/articles/<slug>/index.md`. Design: `docs/superpowers/specs/2026-11-21-wechat-sync-design.md`.

The WeChat backend is **read-only** for this skill: never click, edit, publish or delete anything there, and never print or save the backend `token`.

## Steps

1. **Preflight.** All four hold, or stop and tell the owner what to do:
   - Chrome (Claude in Chrome, the owner's "Browser 1") is on `mp.weixin.qq.com` with a `token=` in the URL, i.e. logged in.
   - `tools/wx-sync/node_modules` exists (else run `npm install --prefix tools/wx-sync`).
   - `npx wrangler whoami` shows a logged-in account (else the owner runs `! npx wrangler login`).
   - `params.imageBase` in `hugo.yaml` is the real R2 public URL, not `pub-PLACEHOLDER`.

2. **Read the list.** In the backend tab, page through `/cgi-bin/appmsgpublish?sub=list&begin=<0,10,…>&count=10&type=101_1&free_publish_type=1&sub_action=list_ex&token=<token>&lang=zh_CN&f=json&ajax=1` until a page is empty. From each `publish_info.appmsgex[]` keep only `title`, `create_time`, `digest`, `link`, `appmsgid`, `itemidx`. Fields with a query string (`cover`) are blocked by the browser tool; the tool finds covers itself. Done when the item count equals the backend total.

3. **Drop what is done.** Remove items whose `<appmsgid>_<itemidx>` is already a `wechat_id` in `content/articles/*/index.md` or listed in `data/wechat-skip.yaml`. If nothing is left, report "nothing new" and stop.

4. **Write the plan** to `.wx-sync/plan.json` (git-ignored):
   ```json
   { "items": [ { "wechat_id": "<appmsgid>_<itemidx>", "url": "https://mp.weixin.qq.com/s/<id>", "title": "…",
     "date": "2026-11-20T08:00:00+08:00", "summary": "<digest>", "slug": "…", "category": "…", "tags": ["…"], "skip": null } ] }
   ```
   - `date`: `create_time` (Unix seconds) in Beijing time, `+08:00`.
   - `summary`: the digest if you have it in full; otherwise `""` and the tool uses the article page's `og:description` (the same digest).
   - `slug`: English kebab-case, at most 6 words, unique across `content/articles/`, describing the topic (`ai-layoff-30-day-plan`). A slug is a permanent URL: choose it once.
   - `category`: exactly one, from `data/categories.yaml`:
     - `work`: layoffs, job hunting, careers, skills for work.
     - `education`: children and AI, exams, choosing a major, learning.
     - `life`: money, health, scams, society, AI video and other everyday topics.
     - `frontier`: new models, research, science and tech trends (world models, AI in the lab, GitHub trends).
     - `tools`: tutorials and app recommendations, including every 【AI 工具推荐】 and 【AI 手机应用推荐】 post.
     When title and digest leave it open, read the article before deciding.
   - `tags`: 2–4 short Chinese topic words. A series named at the start of the digest adds its tag: 【AI 脑洞实验室】 → `脑洞实验室`, 【AI 工具推荐】 → `工具推荐`, 【AI 手机应用推荐 …】 → `手机应用推荐`.
   - `skip`: a short reason for announcements (【招募令】, 征稿启事, notices) and for posts whose body is mostly someone else's work; otherwise `null`. Every article the owner wrote is synced, whether or not WeChat marks it 原创.
   Done when every remaining item has all fields.

5. **Dry run** on the first sync, or whenever the owner asks: `node tools/wx-sync/bin/wx-sync.mjs --plan .wx-sync/plan.json --dry-run`. Show the owner 3–5 previews from `.wx-sync/preview/` (different categories, at least one series post) and apply their corrections to the plan before going on.

6. **Sync:** `node tools/wx-sync/bin/wx-sync.mjs --plan .wx-sync/plan.json`. It prints `added · unchanged · skipped · failed`. Re-run the same command for failures after fixing their cause (articles that succeeded stay `unchanged`). A conversion bug gets a failing case in `tools/wx-sync/test/convert.test.mjs` before the fix.

7. **Covers and videos.** Make each new article's real-photo site cover with the `site-cover` skill (WeChat covers stay as they are). Then write `video/stories/<slug>.json` for each new article from its own text and run `cd video && npm run render -- <slug>...` (see `video/README.md`).

8. **Check and commit.** `bash scripts/check-wiki.sh` reaches `ALL PASS`. Stage exactly the new `content/articles/<slug>/` folders, their `video/stories/<slug>.json` and `data/wechat-skip.yaml`, and commit `content: sync N WeChat articles`. On `main`, push after the check passes (CLAUDE.md approval). Report added, skipped (with reasons) and failed counts.

## Re-syncing one article

Corrections made on the site are listed in the article's front matter `corrections` and shown at the end of the article. `--resync` refuses such an article: re-apply the body fix after resyncing, then run it with `--force-resync` (the `corrections` list itself is kept).

When the owner edited an article on WeChat: `node tools/wx-sync/bin/wx-sync.mjs --plan .wx-sync/plan.json --resync <slug>` with that article in the plan. The slug and image keys stay the same.

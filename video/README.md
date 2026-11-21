# video/ — Remotion videos (sub-project 3)

Renders, per article in `content/articles/`:

- a 3–6 s silent horizontal loop → uploaded to R2 → written back as the article's `cover_video`
- a 9:16, 30–60 s explainer for WeChat Channels / 小红书 → uploaded to R2 → written back as `video_vertical`
- optional in-article clips, embedded with `{{< video src="…" poster="…" caption="…" >}}`

Rules for whoever builds it:

- Read colors, fonts, radii and motion timings from `../data/tokens.yaml`, the same tokens the site uses. Do not hard-code brand values.
- Keep it a standalone Node package here. CI builds only Hugo and never touches `video/`.
- Rendered files go to `video/out/` (git-ignored) and are uploaded to R2. Videos are never committed.
- The site plays pre-rendered files only. It does not load `@remotion/player` (see the design spec, section 8.1).

## Use

```bash
cd video && npm install
npm test                                          # storyboard + front matter tests
npm run render -- <slug> --no-upload              # preview into video/out/<slug>/
npm run render -- <slug>                          # render, upload to R2, write cover_video / video_vertical
npm run studio                                    # Remotion Studio (default props only)
```

Each article needs `stories/<slug>.json` first: `hook`, 3–5 `points` (`text`, optional `image` = one of the
article's image file names), `takeaway`, optional `shortTitle` for the outro. Write it from the article's own
text and numbers only. Limits and timing are in `lib/story.mjs` (video lands at 30–60 s). Captions only, no audio:
music is added in the 视频号 / 小红书 editor. Design: `docs/superpowers/specs/2026-11-21-remotion-videos-design.md`.

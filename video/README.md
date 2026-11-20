# video/ — Remotion videos (sub-project 3, not built yet)

Renders, per article in `content/articles/`:

- a 3–6 s silent horizontal loop → uploaded to R2 → written back as the article's `cover_video`
- a 9:16, 30–60 s explainer for WeChat Channels / 小红书 → uploaded to R2 → written back as `video_vertical`
- optional in-article clips, embedded with `{{< video src="…" poster="…" caption="…" >}}`

Rules for whoever builds it:

- Read colors, fonts, radii and motion timings from `../data/tokens.yaml`, the same tokens the site uses. Do not hard-code brand values.
- Keep it a standalone Node package here. CI builds only Hugo and never touches `video/`.
- Rendered files go to `video/out/` (git-ignored) and are uploaded to R2. Videos are never committed.
- The site plays pre-rendered files only. It does not load `@remotion/player` (see the design spec, section 8.1).

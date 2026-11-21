# 子项目 3：Remotion 视频

- 日期：2026-11-21
- 状态：作者授权按推荐推进（"继续做 Remotion"；此前"你帮我看着推进就行""最好能应用 stitch 的 style"）
- 接口：`2026-11-21-blog-repositioning-design.md` 第 8.1 节（网站模板已就绪，本子项目不改模板）

## 1. 意图

每篇文章多两种形态：
- **竖版短视频**（9:16，30–60 秒）：作者手动发到视频号、小红书，把那边的读者引回公众号和 aitanyan.com。
- **横版封面循环**（无声，约 5 秒）：网站首页精选和文章页封面"动起来"，提高质感，不拖慢页面。

## 2. 做什么

### 竖版短视频 `Vertical`（1080×1920，30fps）
- 分镜：**开场钩子**（标题 + 一句"你可能不知道…"）→ **3–5 个要点**（每个一屏，大字，可配文章里的一张图）→ **一句结论** → **结尾**（关注「AI调研员」· aitanyan.com）。
- **只有字幕，没有配音和背景音乐**（我的决定）：配音要选 TTS 服务、费用和音色，先不做；音乐由作者在视频号/小红书编辑器里从平台曲库加，平台曲库有版权授权，网站这边不碰音乐版权。
- 视觉：Stitch 设计系统（`data/tokens.yaml`）——深海军蓝底、橙色强调、青/紫点缀、Crimson Pro 拉丁标题；中文用 Noto Sans SC / Noto Serif SC（OFL，渲染时加载）。
- 时长由分镜自动算（每屏按字数给阅读时间），落在 30–60 秒，超出则构建报错。

### 横版封面循环 `CoverLoop`（1280×544，与公众号封面同比例，5 秒，30fps）
- 封面图缓慢推拉（Ken Burns）+ 一道品牌色光带扫过，首尾帧相同，无缝循环。不加文字（封面图本身多已带标题）。
- 输出 H.264 MP4，目标 ≤ 800KB；海报帧仍是原封面，`prefers-reduced-motion` 时只显示海报（模板已实现）。

### 分镜文件 `video/stories/<slug>.json`
- 由 Claude 从文章正文提炼，**只用文章里已有的说法和数字**，不新增事实；作者可改。
- 字段：`slug`、`hook`、`points[]`（`text`，可选 `image`：文章里的图片文件名）、`takeaway`。
- 校验：要点 3–5 个；每屏字数上限（钩子 ≤ 30 字、要点 ≤ 40 字、结论 ≤ 30 字）；`image` 必须是该文章已有的图片。

### 渲染与发布 `npm run render -- <slug>`（在 `video/` 下）
1. 读 `content/articles/<slug>/index.md` 和分镜，渲染两条视频到 `video/out/<slug>/`（已 gitignore）。
2. 上传 R2：`videos/<slug>/cover-loop.mp4`、`videos/<slug>/vertical.mp4`（沿用 wx-sync 的 wrangler 方式）。
3. 写回 front matter：`cover_video`、`video_vertical`（`https://aitanyan.com/img/videos/<slug>/…`），其他字段原样保留。
4. `--no-upload` 只渲染、不上传不写回，用于预览。

## 3. 顺序
1. 先做 1 篇试点（`ai-voice-clone-scams`），作者看过样片再批量。
2. 批量：其余文章逐篇写分镜 → 渲染 → 上传。

## 4. 约束
- `video/` 是独立 Node 包；Hugo 构建和检查不依赖它（`check-wiki.sh` 在装了依赖时跑它的单测，与 wx-sync 一样）。
- 设计值只从 `data/tokens.yaml` 读，不写死品牌色。
- 视频不进 git；只上传 R2。网站不加载 `@remotion/player`。
- 部署仍只在作者要求时进行。
- **Remotion 许可：** 个人和 3 人以内的公司免费；超过需要买公司授权。L.J.K Consultant Limited 若超过 3 人，需作者确认。

## 5. 不做（本批）
- 配音（TTS）、背景音乐、正文内嵌讲解视频（shortcode 已就绪，以后按需做）。
- 自动发布到视频号/小红书（作者手动发）。

# 门户化与性能优化（第一批）设计

- 日期：2026-11-21
- 状态：作者授权按推荐方案推进（"你帮我看着推进就行，就按你推荐的 option 做"）
- 来源：2026-11-21 网站审查与 SWOT（对话中给出）。本批做其中 4 项；中文 AI 名词词典留作下一批。

## 1. 意图

让 aitanyan.com 更像一个专业的 AI 科普门户，同时让大陆手机读者打开得更快：
- 读者能按"我关心的问题"读一组文章（专题），而不只是按时间和分类。
- 网站讲清楚"谁在做、怎么做、错了怎么改"，建立信任（也是 Google E-E-A-T 信号）。
- 图片和字体不再拖慢页面，字体在大陆也能显示。

## 2. 范围（四项）

### A. 图片优化（同步时生成 WebP 多尺寸）
- 现状：正文和封面图都是公众号原图 JPEG/PNG（平均 172KB，最大 510KB），文章页约 1.7MB，Lighthouse 提示可省约 1.3MB。
- 做法：`tools/wx-sync` 为每张图额外生成 WebP 版本，宽度取 `params.imageWidths`（480、960、1440，且不超过原图宽度），再加一份原宽 WebP；R2 key 为 `articles/<slug>/<name>-<w>.webp` 与 `<name>.webp`。原图保留作兜底。
- 主题：正文图片钩子和封面输出 `<picture>`：`<source type="image/webp" srcset="…" sizes="…">` + 原图 `<img>`（保留 width/height、lazy）。卡片封面用小尺寸，首页大图和文章封面用大尺寸。
- 已同步的 29 篇：新增 `wx-sync --optimize-existing`，只为已有原图补生成 WebP，不改文章内容。
- front matter `images` 不变（仍记原图宽高）；新增 `webp: true` 表示该篇的 WebP 已生成，模板只在有此标记时输出 `<source>`，避免引用不存在的文件。

### B. 字体本地化
- 现状：Crimson Pro、Lato、Source Code Pro 从 fonts.googleapis.com 加载，大陆无法访问（只是退回系统字体，不阻塞）。
- 做法：下载这三款字体的拉丁子集 woff2（OFL 许可，可自托管）放到 `static/fonts/`，CSS 里 `@font-face`（`font-display: swap`），去掉 Google Fonts 链接，预加载标题字体。

### C. 专题页
- 新内容类型 `content/topics/<slug>/index.md`：`title`、`summary`、`articles`（文章 slug 的有序列表）、正文为导语。
- 页面：专题页（导语 + 按顺序编号的文章卡片 + 公众号关注卡）；专题列表页 `/topics/`；首页新增「热门专题」一排；导航新增「专题」（科普之后）。
- 校验：`articles` 里的 slug 必须是已存在的文章，否则构建失败。
- 首批 3 个专题（由现有文章组成）：
  - `ai-job-guide` AI 时代求职指南（工作与职业类 7 篇，按"看清形势 → 被裁怎么办 → 找工作 → 面试"排序）
  - `parents-ai-guide` 家长的 AI 指南（孩子作业、考试、学习 App、选专业、填志愿）
  - `ai-safety-guide` AI 防骗与安全（拟声诈骗、AI 视频、管钱 App）

### D. 可信度页面
- `/about/` 保留并补充；新增 `/methodology/`「我们怎么做调研」（选题、查证、引用来源、AI 工具的使用边界、非广告声明）和 `/corrections/`「更正与反馈」（发现错误如何反馈、如何更正、更正记录）。
- 页脚加这两页链接；关于页加 `Organization` 结构化数据（名称、法定名称、logo）。
- 联系方式只写"公众号后台留言"，不公开个人邮箱（作者未提供可公开的邮箱）。
- 文案只陈述已有做法与承诺，不虚构流程或数据。

## 3. 约束
- 部署只在作者要求时手动进行（CLAUDE.md）。本批只提交、推送，不部署。
- 兼容与性能目标不变：Lighthouse 四项 100；无横向滚动；所有新页面浅色、深色、375px 都可用。
- 所有改动先写检查（`scripts/check-site.sh` 或 `tools/wx-sync` 测试）再实现。

## 4. 不做（本批）
- 中文 AI 名词词典、AI 工具库、互动自测、邮件周报、评论区、视频：后续批次。
- 不另出 Stitch 稿：新页面复用现有组件（卡片、页头、关注卡）和设计令牌。

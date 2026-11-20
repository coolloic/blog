# 子项目 1 · 站点改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把博客从 PaperMod 英文技术博客改成中文 AI 科普归档站（自研 Hugo 主题 `evo`），技术笔记降为小栏目，并为公众号同步（子项目 2）和 Remotion 视频（子项目 3）预留接口。

**Architecture:** 先走 slack-off 式设计阶段（BA 图 → 功能说明书 → Stitch 设计稿，三个作者审阅关口），再实现主题。主题是纯 Hugo 模板 + 原生 CSS（由 `data/tokens.yaml` 生成设计令牌）+ 少量原生 JS 模块；所有动效渐进增强。测试是 shell 检查：构建到临时目录、对输出 HTML/CSS/JSON 做断言，沿用 `scripts/check-wiki.sh` 的写法。

**Tech Stack:** Hugo 0.169 extended、Hugo Pipes（css 打包/压缩/指纹）、原生 CSS（`light-dark()`、容器查询、`@layer`、View Transitions、scroll-driven animations）、Fuse.js（vendored）、Google Stitch、Claude in Chrome。

**Spec:** `docs/superpowers/specs/2026-11-21-blog-repositioning-design.md`

## Global Constraints

- 全部工作在分支 `redesign`；**不推送 `main`**，不合并（合并在子项目 2 首批同步之后）。
- 兼容目标：Baseline **Widely available**；Newly available 特性只作增强，不支持时页面完整可用。
- Core Web Vitals（移动端）：LCP < 2.5s、INP < 200ms、CLS < 0.1；无障碍 WCAG 2.2 AA。
- 无前端框架，页面不加载 React；JS 预算：搜索页之外每页 < 20KB（gzip，不含 Mermaid 加载器按需加载的 Mermaid 本体）。
- 正文中文系统字体栈 `"PingFang SC", "Noto Sans SC", "Microsoft YaHei", system-ui, sans-serif`；正文 17–18px、行高 1.8、最大行宽约 40 个汉字（`max-inline-size: 40em` 量级）。
- `prefers-reduced-motion: reduce` 时关闭所有非必要动效，且内容不缺失。
- URL 不变：`/posts/<slug>/`、`/wiki/...`、`/about/`、`/now/`、`/archives/`、`/search/`、`/tags/`。新增 `/articles/<slug>/`、`/categories/<slug>/`、`/notes/`。
- 不改：`layouts/_markup/render-link.html`、`layouts/_markup/render-codeblock-mermaid.html`、`static/js/mermaid-loader.js`（它用 `<html data-theme>` 判断深色，主题必须设置这个属性）。
- 构建必须 `--panicOnWarning` 无警告；wiki 页不进首页 / 归档 / RSS。
- 界面文字随页面语言：`lang: en` 的页面（posts、wiki、notes）用英文文案，其余中文。
- 科普文章 front matter 契约（子项目 2 会写入）：`title`、`date`、`summary`、`categories`（英文 slug）、`tags`、`cover`（必填）、`cover_video`、`video_vertical`、`wechat_url`（必填）、`wechat_id`、`featured`、`draft`。
- 分类 slug 固定：`models` 新模型速递、`concepts` 概念科普、`tools` 工具实测、`industry` 行业观察。
- 图片基址 `params.imageBase`，初值 `https://pub-PLACEHOLDER.r2.dev`（子项目 2 填真实值）。
- 示例文章只用占位文字、`draft: true`；检查脚本用 `-D` 构建到临时目录来测它们。

## Review Focus

1. **没有封面或封面链接 404（R2 未就绪）** → 卡片和文章页仍按固定宽高比留位，不塌陷、不产生 CLS，显示品牌色兜底底图。（Task 6、8 的测试）
2. **超长无空格中文标题 / 正文里超长英文 URL 或代码** → 375px 下无横向滚动。（Task 13 浏览器检查 + Task 5 的 CSS 断言 `overflow-wrap: anywhere`）
3. **关闭 JS 或旧浏览器**（无 View Transitions、无 `animation-timeline`、无 `light-dark()`）→ 所有内容可见；入场动画的初始 `opacity:0` 只能写在 `@supports` 里面。（Task 11 的测试）
4. **某分类 0 篇 / 没有任何 `featured` / 一篇科普都没有** → 渲染空状态，构建不报错。（Task 6、7 的测试）
5. **中英混合搜索**（如 `agent 记忆`、`MCP`）→ 科普与技术笔记都能命中。（Task 10 的测试）

---

## 阶段 A：BA 与设计（每个任务结尾是作者审阅关口，未通过不进入下一任务）

### Task 1: BA 图

**Files:**
- Create: `docs/ba/README.md`（产物索引 + 审阅状态表，格式同 slack-off `docs/ba/README.md`）
- Create: `docs/ba/01-reader-flow.mmd`（三类读者：微信来的、搜索引擎来的、技术读者；各自的入口页 → 路径 → 引回公众号的出口）
- Create: `docs/ba/06-ui-nav.mmd`（细化 spec 第 6 节的页面跳转图，标出 10 个页面编号与三个视频位）
- Create: `docs/ba/open-questions.md`

- [ ] **Step 1:** 写两张 `.mmd`，节点标签加引号。
- [ ] **Step 2:** 验证语法：`npx -y @mermaid-js/mermaid-cli@11.4.1 -i docs/ba/01-reader-flow.mmd -o /tmp/01.svg && npx -y @mermaid-js/mermaid-cli@11.4.1 -i docs/ba/06-ui-nav.mmd -o /tmp/06.svg`，Expected：两个 svg 生成、无报错。
- [ ] **Step 3:** 用 Excalidraw MCP（`mcp__claude_ai_Excalidraw__create_view`）各出一张可视图给作者看；README 状态标"待审"。
- [ ] **Step 4:** 作者审阅。改到作者通过，README 标 ✅ 和日期。
- [ ] **Step 5:** Commit `docs(ba): reader flow and page navigation`

### Task 2: 功能说明书

**Files:**
- Create: `docs/ba/functional-spec.md`

结构照搬 slack-off `docs/ba/functional-spec.md`：第 0 节全局设计要求（spec 第 7 节"全局设计要求"+ Global Constraints 中的排版/动效/兼容要求 + 三个视频位 + 浅/深、375/1280 两种宽度 + 每页"正常 / 空 / 无封面"状态），然后第 1 节全局框架（顶栏导航、页脚：CV、Now、RSS、GitHub），第 2–11 节对应页面 01–10（spec 第 7 节页面清单）。每页写：目的、展示、交互、状态、移动端差异、中/英界面语言。

- [ ] **Step 1:** 写说明书。
- [ ] **Step 2:** 自查：spec 第 7 节 10 个页面、8.1 节三个视频位、Review Focus 第 1、4 条的状态，在说明书里都有对应段落（逐条列在 commit message 里）。
- [ ] **Step 3:** 作者审阅，改到通过；README 更新状态。
- [ ] **Step 4:** Commit `docs(ba): functional spec for Stitch`

### Task 3: Stitch 设计稿 + 设计令牌

**Files:**
- Create: `design/README.md`（同 slack-off：目录说明、导出方式、本地修改记录）
- Create: `design/prompts/00-global.md`、`design/prompts/01-home.md` … `10-404.md`、`design/prompts/mobile/m01-home.md` …（英文提示词，界面文案按页面语言）
- Create: `design/screens/*.png`、`design/screens/mobile/*.png`
- Create: `design/code/*.html`、`design/code/mobile/*.html`（作者导出）
- Create: `design/DESIGN.md`（Stitch 生成的设计系统）
- Create: `data/tokens.yaml`

**Interfaces:**
- Produces: `data/tokens.yaml`，结构固定如下（值来自 Stitch 定稿），Task 4 和子项目 3 都读它：

```yaml
color:            # 每个颜色都给 light / dark
  bg:      {light: "#…", dark: "#…"}
  surface: {light: "#…", dark: "#…"}
  text:    {light: "#…", dark: "#…"}
  muted:   {light: "#…", dark: "#…"}
  accent:  {light: "#…", dark: "#…"}   # 橙
  accent2: {light: "#…", dark: "#…"}   # 青
  accent3: {light: "#…", dark: "#…"}   # 紫
  border:  {light: "#…", dark: "#…"}
font:
  body: '"PingFang SC", "Noto Sans SC", "Microsoft YaHei", system-ui, sans-serif'
  display: '…'      # 拉丁标题字体（Stitch 定）
  mono: '…'
size: {body: "17px", h1: "…", h2: "…", h3: "…", small: "…"}
radius: {card: "…", pill: "…"}
space: {xs: "…", s: "…", m: "…", l: "…", xl: "…"}
motion: {fast: "150ms", base: "250ms", slow: "450ms", ease: "cubic-bezier(…)"}
```

- [ ] **Step 1:** 写提示词（00-global 来自说明书第 0 节）。
- [ ] **Step 2:** 在作者的 Chrome（Browser 1）里用 Stitch 逐页出稿，桌面 1280 + 移动 390；按 slack-off README 的无界面 Chrome 命令截图存 `design/screens/`。
- [ ] **Step 3:** 每页定稿后请作者 Export → Code to Clipboard，`pbpaste > design/code/<page>.html`；没导出的页面在 README 注明"按提示词 + 说明书 + 截图实现"。
- [ ] **Step 4:** 作者审阅全部截图，改到通过。
- [ ] **Step 5:** 从 `DESIGN.md` 提取 `data/tokens.yaml`；验证：`python3 -c "import yaml,sys;d=yaml.safe_load(open('data/tokens.yaml'));assert all(set(v)=={'light','dark'} for v in d['color'].values());print('ok')"` Expected `ok`。
- [ ] **Step 6:** 对比度验证：每对 `text/bg`、`muted/bg`、`text/surface`、`accent/bg`（作为文字时）在 light 和 dark 下 ≥ 4.5:1（用一段 python 计算 WCAG 相对亮度），不达标的回 Stitch 或手调并记入 `design/README.md`。
- [ ] **Step 7:** Commit `design: Stitch screens, prompts and tokens`

---

## 阶段 B：主题实现

测试统一放在新文件 `scripts/check-site.sh`（风格同 `check-wiki.sh`：`pass`/`fail` 函数、每个检查一个函数）。它开头用 `hugo -D --quiet -d "$OUT"` 构建到临时目录 `$OUT`，所有断言读 `$OUT`。`check-wiki.sh` 末尾追加 `bash scripts/check-site.sh || FAILS=$((FAILS+1))`，保持"一个命令跑全部检查"。

每个任务的"运行"一步：`bash scripts/check-site.sh`，Expected：本任务新增的检查 PASS，之前任务的检查仍 PASS。从 Task 9 起 `bash scripts/check-wiki.sh` 必须 `ALL PASS`。

### Task 4: 主题骨架、配置、令牌、语言

**Files:**
- Create: `themes/evo/theme.toml`、`themes/evo/layouts/baseof.html`、`themes/evo/layouts/_partials/head.html`、`themes/evo/layouts/_partials/tokens.css.html`、`themes/evo/layouts/_partials/t.html`、`themes/evo/layouts/single.html`、`themes/evo/layouts/list.html`（后两者先最小可用）
- Create: `themes/evo/assets/css/main.css`（`@layer reset, tokens, base, layout, components, motion;`）
- Create: `data/i18n/zh-cn.yaml`、`data/i18n/en.yaml`、`data/categories.yaml`
- Create: `content/articles/_index.md`、`content/articles/sample-1/index.md`、`sample-2/index.md`、`sample-3/index.md`（`draft: true`，占位文字，正文都含"示例"和英文词 "agent"、各有 ≥2 个 `##` 标题，分别 `featured: false/true/false`，分类 `concepts`/`models`/`concepts`，`cover` 用 `/images/placeholder-cover.svg`，`wechat_url: "https://mp.weixin.qq.com/s/placeholder"`）
- Create: `static/images/placeholder-cover.svg`、`scripts/check-site.sh`
- Modify: `hugo.yaml`（`theme: evo`、`locale: zh-cn`、`title: "AI进化调研员"`、新 description、`mainSections: [articles, posts]`、`taxonomies: {category: categories, tag: tags}`、`params.imageBase`、菜单见 Task 5）
- Modify: `content/posts/_index.md`（新建，`cascade: {lang: en}`）、`content/wiki/_index.md`（cascade 增加 `lang: en`，保留 `hiddenInRss`）
- Modify: `scripts/check-wiki.sh`（末尾调用 check-site.sh）

**Interfaces:**
- Produces: partial `t.html`：`{{ partial "t.html" (dict "page" . "key" "reading_time") }}` → 按 `.page.Params.lang`（缺省 `zh-cn`）取 `index site.Data.i18n $lang $key`（不用 Hugo 的 `i18n/` 目录：站点单语言，`lang.Translate` 不能按页切换）；键缺失时 `errorf`。
- Produces: `data/categories.yaml`：`models: {name: 新模型速递, desc: …}` 等 4 项；Task 6–8 用 `index site.Data.categories $slug` 取显示名。
- Produces: CSS 自定义属性命名 `--color-<name>`（值为 `light-dark(<light>, <dark>)`）、`--font-<name>`、`--size-<name>`、`--radius-<name>`、`--space-<name>`、`--motion-<name>`；由 `tokens.css.html` 从 `data/tokens.yaml` 生成，内联在 `<head>` 的 `<style>` 里。
- Produces: `<html lang="zh-CN|en" data-theme="light|dark">`；`data-theme` 由 `<head>` 中第一个内联脚本按 localStorage（try/catch）→ `prefers-color-scheme` 设置，早于样式表，避免闪烁。

- [ ] **Step 1: 写失败的检查**（`scripts/check-site.sh`）
  - `check_theme_evo`：`grep -q '^theme: evo' hugo.yaml`
  - `check_html_lang`：`$OUT/posts/hello-world/index.html` 含 `<html lang="en"`；`$OUT/articles/sample-1/index.html` 含 `<html lang="zh-CN"`；`$OUT/wiki/concepts/agent-loop/index.html` 含 `<html lang="en"`
  - `check_tokens_css`：首页 HTML 含 `--color-bg:light-dark(`（minify 后无空格；断言前去空格）且 `data/tokens.yaml` 里 `color.accent.light` 的值出现在其中
  - `check_light_dark_fallback`：CSS 含 `@supports not (color: light-dark(` 回退块（用 `[data-theme=dark]` 选择器覆盖）
  - `check_theme_script_first`：首页 `<head>` 中第一个 `<script>` 出现在第一个 `<link rel="stylesheet"` / `<style>` 之前
- [ ] **Step 2:** 运行，Expected：以上全部 FAIL。
- [ ] **Step 3:** 实现本任务文件。
- [ ] **Step 4:** 运行，Expected：以上全部 PASS，构建无警告。
- [ ] **Step 5:** Commit `feat(theme): evo skeleton, tokens, per-page language`

### Task 5: 全局框架（顶栏、页脚、深色切换、基础排版）

**Files:**
- Create: `themes/evo/layouts/_partials/header.html`、`footer.html`、`theme-toggle.html`
- Create: `themes/evo/assets/css/base.css`、`layout.css`
- Create: `themes/evo/assets/js/theme-toggle.js`（模块，<1KB）
- Modify: `hugo.yaml` 菜单：`main` = 首页 `/`、科普 `/articles/`、技术笔记 `/notes/`、归档 `/archives/`、搜索 `/search/`、关于 `/about/`；`footer` = CV `https://coolloic.github.io/`、Now `/now/`、RSS `index.xml`、GitHub `https://github.com/coolloic`
- Modify: `scripts/check-wiki.sh` 的 `check_cv_linked` 保持不变（页脚满足）

- [ ] **Step 1: 写失败的检查**
  - `check_nav`：首页和 `posts/hello-world` 页的 `<nav>` 里都有指向 `/blog/articles/`、`/blog/notes/`、`/blog/search/` 的链接；英文页导航文字为英文（如 `Articles`），中文页为中文（如 `科普`）
  - `check_skip_link`：每页 `<body>` 后第一个可聚焦元素是 `href="#main"` 的跳转链接，且存在 `id="main"`
  - `check_wrap`：CSS 含 `overflow-wrap:anywhere`（作用于正文容器）和 `pre{` 块含 `overflow-x:auto`
  - `check_toggle_button`：存在 `<button` 带 `aria-pressed` 的主题切换按钮
- [ ] **Step 2:** 运行，Expected FAIL。
- [ ] **Step 3:** 按 Stitch 稿实现；深色切换写 `document.documentElement.dataset.theme` 并存 localStorage（try/catch）。
- [ ] **Step 4:** 运行，Expected PASS；再跑 `check-wiki.sh` 的 `check_cv_linked` PASS。
- [ ] **Step 5:** Commit `feat(theme): header, footer, dark mode`

### Task 6: 文章卡片与首页

**Files:**
- Create: `themes/evo/layouts/_partials/card.html`、`cover.html`、`follow-card.html`、`empty.html`
- Create: `themes/evo/layouts/home.html`
- Create: `static/images/wechat-qr.png`（占位图，作者后续替换；README 注明）
- Create: `themes/evo/assets/css/components/card.css`

**Interfaces:**
- Produces: `{{ partial "cover.html" (dict "page" $p "size" "card|hero") }}` → 固定 `aspect-ratio`（card 16/9、hero 21/9 或按稿）容器，内含 `<img width height>`（card 用 `loading="lazy"`，hero 用 `fetchpriority="high"`）；有 `cover_video` 时输出 `<video muted loop playsinline preload="none" poster="<cover>" data-autoplay-in-view>`；容器背景为品牌渐变（封面失败时可见）。
- Produces: `{{ partial "card.html" $page }}`（标题、摘要、分类显示名、日期、阅读时长）。
- Produces: 首页精选规则：`where (where site.RegularPages "Section" "articles") "Params.featured" true` 取最新一篇，否则最新一篇 articles。
- Produces: `{{ partial "empty.html" (dict "page" . "key" "no_articles") }}`。

- [ ] **Step 1: 写失败的检查**
  - `check_home_featured`：`$OUT/index.html` 中 `data-featured` 卡片链接到 `/blog/articles/sample-2/`（唯一 featured）
  - `check_home_featured_fallback`：临时把 sample-2 的 `featured` 改成 false（写临时 fixture 副本构建到另一目录，`trap` 恢复），精选为日期最新的示例文章
  - `check_home_lists_articles_not_wiki`：首页含 `/blog/articles/`，不含 `/blog/wiki/` 下更深的链接
  - `check_home_empty`：用 `--contentDir` 指向一个只有 `_index.md` 的临时内容目录构建，首页含 `data-empty="no_articles"`，构建退出码 0
  - `check_cover_box`：卡片 `<img>` 带 `width`、`height`、`loading="lazy"`；hero `<img>` 带 `fetchpriority="high"`；CSS 中封面容器含 `aspect-ratio`
  - `check_cover_video_slot`：给 sample-1 的临时副本加 `cover_video: "https://example.com/x.mp4"`，输出含 `<video` 且带 `muted`、`playsinline`、`preload="none"`、`poster=`，不含 `autoplay`
  - `check_follow_card`：首页含公众号关注卡（`data-follow-card`）与 `wechat-qr.png`
- [ ] **Step 2:** 运行，Expected FAIL。
- [ ] **Step 3:** 实现。
- [ ] **Step 4:** 运行，Expected PASS。
- [ ] **Step 5:** Commit `feat(theme): home page, cards, cover and video slots`

### Task 7: 分类、标签、归档、科普列表

**Files:**
- Create: `themes/evo/layouts/section.html`（`/articles/` 列表）、`themes/evo/layouts/taxonomy.html`、`themes/evo/layouts/term.html`、`themes/evo/layouts/archives.html`
- Modify: `content/archives.md`（若 front matter 依赖 PaperMod 的 `layout: archives`，保持 layout 名一致）

- [ ] **Step 1: 写失败的检查**
  - `check_category_urls`：`$OUT/categories/concepts/index.html` 存在且列出 sample-1、sample-3；页面标题含 `概念科普`（来自 `data/categories.yaml`）；不存在 `$OUT/categories/概念科普/`
  - `check_category_empty`：`$OUT/categories/` 索引页列出全部 4 个分类（含 0 篇的 `tools`、`industry`，从 `data/categories.yaml` 遍历而非只遍历有文章的 term），0 篇的显示空状态文案；`/categories/tools/` 不要求存在
  - `check_archives`：`$OUT/archives/index.html` 同时含 `/blog/articles/sample-1/` 与 `/blog/posts/hello-world/`，不含 `/blog/wiki/concepts/`
  - `check_old_urls`：`posts/hello-world`、`posts/harness-engineering`、`posts/modern-web-guidelines`、`posts/anatomy-of-an-ai-agent`、`tags/`、`about/`、`now/` 的 `index.html` 都存在
- [ ] **Step 2:** 运行，Expected FAIL。
- [ ] **Step 3:** 实现；归档按年 → 月分组。
- [ ] **Step 4:** 运行，Expected PASS。
- [ ] **Step 5:** Commit `feat(theme): categories, archives, article list`

### Task 8: 科普文章页 + 视频 shortcode

**Files:**
- Create: `themes/evo/layouts/articles/single.html`
- Create: `themes/evo/layouts/_partials/toc.html`、`article-meta.html`、`wechat-footer.html`、`related.html`、`jsonld-article.html`
- Create: `themes/evo/layouts/_shortcodes/video.html`
- Create: `themes/evo/assets/css/components/prose.css`

**Interfaces:**
- Produces: shortcode `{{< video src="…" poster="…" caption="…" >}}` → `<figure class="video"><video controls preload="none" playsinline poster="…" width height src="…"></video><figcaption>…</figcaption></figure>`，无 `autoplay`。
- Produces: 非草稿科普文章缺 `cover` 或 `wechat_url` 时模板 `errorf "%s: missing %s"` 使构建失败；草稿缺字段时静默（不能用 `warnf`，`--panicOnWarning` 会让构建失败）。
- Consumes: Task 6 的 `cover.html`（`size: "hero"`）、`card.html`（相关文章）。

- [ ] **Step 1: 写失败的检查**
  - `check_article_page`：`$OUT/articles/sample-1/index.html` 含 `<article`、hero 封面、分类显示名链接到 `/blog/categories/concepts/`、阅读时长、`<nav` 目录（示例文章需有 ≥2 个 `##` 标题）
  - `check_wechat_footer`：文末含 `href="https://mp.weixin.qq.com/s/placeholder"` 与 `wechat-qr.png`，文案含 `原文发于公众号`
  - `check_video_vertical`：临时副本加 `video_vertical: "https://example.com/v.mp4"`，文末出现链接文案 `看 60 秒视频版`；无该字段时不出现
  - `check_video_shortcode`：sample-3 正文含 `{{< video src="https://example.com/a.mp4" poster="/images/placeholder-cover.svg" caption="演示" >}}`，输出 `<figure class="video">`、`preload="none"`、无 `autoplay`
  - `check_required_fields`：临时非草稿 fixture `content/articles/zz-missing/index.md`（无 `wechat_url`），`hugo` 构建退出码非 0 且输出含 `missing wechat_url`；`trap` 删除 fixture
  - `check_jsonld`：文章页含 `<script type="application/ld+json">` 且 JSON 可解析（`python3 -c json.loads`），`@type` 为 `Article`，含 `headline`、`datePublished`、`image`
  - `check_prev_next`：sample-2 页面的上一篇/下一篇只链接到 `/blog/articles/` 下页面
- [ ] **Step 2:** 运行，Expected FAIL。
- [ ] **Step 3:** 实现。正文容器：`font-size: var(--size-body)`、`line-height: 1.8`、`max-inline-size` ≈ 40 个汉字、`overflow-wrap: anywhere`。
- [ ] **Step 4:** 运行，Expected PASS。
- [ ] **Step 5:** Commit `feat(theme): article page, wechat footer, video shortcode`

### Task 9: 技术笔记区（notes、posts、wiki）

**Files:**
- Create: `content/notes/_index.md`（`lang: en`，英文简介）
- Create: `themes/evo/layouts/notes/section.html`、`themes/evo/layouts/posts/single.html`、`themes/evo/layouts/wiki/section.html`、`themes/evo/layouts/wiki/single.html`
- Create: `themes/evo/layouts/_partials/code-copy.html`、`themes/evo/assets/js/code-copy.js`、`themes/evo/assets/css/components/code.css`

- [ ] **Step 1: 写失败的检查**
  - `check_notes_page`：`$OUT/notes/index.html` 列出 4 篇 posts，含指向 `/blog/wiki/` 的入口，`<html lang="en"`
  - `check_en_chrome`：`posts/hello-world` 页含英文 `min read`（或 data/i18n/en.yaml 中 reading_time 的值），不含中文 `分钟`
  - `check_code_copy`：`posts/modern-web-guidelines` 页每个 `<pre>` 代码块旁有 `<button` 带 `data-copy`
  - `check_wiki_body`：`$OUT/wiki/index.html` 渲染了 `_index.md` 正文（含 `## Concepts` 对应的 `<h2`）
  - 运行 `bash scripts/check-wiki.sh`：`check_wiki_section`、`check_mermaid_rendered`、`check_mermaid_loaded_everywhere`、`check_all_wiki_pages_rendered`、`check_unsafe_link_neutralised` 必须 PASS
- [ ] **Step 2:** 运行，Expected FAIL。
- [ ] **Step 3:** 实现。
- [ ] **Step 4:** `bash scripts/check-wiki.sh`，Expected：除 `check_search_includes_wiki` 外 PASS（搜索在 Task 10）。
- [ ] **Step 5:** Commit `feat(theme): tech notes section, posts and wiki`

### Task 10: 搜索

**Files:**
- Create: `themes/evo/layouts/index.json`（与 PaperMod 同名，Hugo 0.169 下可用；输出 `index.json`：`title`、`summary`、`content`（纯文本截前 3000 字）、`permalink`、`section`、`lang`），包含 articles、posts、wiki 所有 RegularPages
- Create: `themes/evo/layouts/search.html`、`themes/evo/assets/js/search.js`、`themes/evo/assets/js/vendor/fuse.basic.min.js`（从 `themes/PaperMod/assets/js/fuse.basic.min.js` 复制，保留许可证头）
- Create: `scripts/test-search.mjs`

**Interfaces:**
- Produces: `search.js` 导出 `makeSearch(index: Array<Doc>): (query: string) => Array<Doc>`，Fuse 配置 `{keys: [{name:'title',weight:3},{name:'summary',weight:2},'content'], ignoreLocation: true, threshold: 0.3, minMatchCharLength: 1}`；查询按空白拆词，每词单独搜索后取交集（解决中英混合）。

- [ ] **Step 1: 写失败的测试** `scripts/test-search.mjs`（`node scripts/test-search.mjs <OUT>/index.json`）：
  - `makeSearch(idx)('MCP')` 结果含 `/wiki/concepts/model-context-protocol/`
  - `makeSearch(idx)('示例')` 结果含 `/articles/sample-1/`（示例文章正文含"示例"）
  - `makeSearch(idx)('agent 示例')` 结果非空（示例文章正文含 "agent"）
  - `makeSearch(idx)('')` 返回 `[]`
  - check-site 新增 `check_search_index`：`index.json` 同时含 `/articles/` 与 `/wiki/concepts/`，并调用上面的 node 测试
- [ ] **Step 2:** 运行，Expected FAIL。
- [ ] **Step 3:** 实现；搜索页无 JS 时显示提示文案。
- [ ] **Step 4:** `bash scripts/check-wiki.sh`，Expected `ALL PASS`。
- [ ] **Step 5:** Commit `feat(theme): bilingual search`

### Task 11: 动效与渐进增强

**Files:**
- Create: `themes/evo/assets/css/motion.css`、`themes/evo/assets/js/video-inview.js`、`themes/evo/layouts/_partials/progress.html`

- [ ] **Step 1: 写失败的检查**
  - `check_view_transitions`：CSS 含 `@view-transition{navigation:auto}`，且卡片封面与文章 hero 用同一 `view-transition-name`（按文章唯一，如 `cover-<slug>`；断言 sample-1 卡片与其文章页 hero 的 `style` 中名称一致）
  - `check_scroll_driven_guarded`：所有 `animation-timeline` 出现在 `@supports (animation-timeline` 块内；`opacity:0` 只出现在该 `@supports` 块或 `@starting-style` 内（用 python 解析压缩后的 CSS 括号层级断言）
  - `check_reduced_motion`：CSS 含 `@media (prefers-reduced-motion:reduce)` 块，关闭 view-transition 动画和 scroll 动画；`video-inview.js` 含 `matchMedia('(prefers-reduced-motion: reduce)')`
  - `check_js_budget`：对 `$OUT` 中除 `search/` 外每个 HTML，统计其引用的本地 JS 文件 gzip 大小之和（`gzip -c | wc -c`，不含 `mermaid-loader.js` 动态 import 的 CDN 模块）< 20480
- [ ] **Step 2:** 运行，Expected FAIL。
- [ ] **Step 3:** 实现：阅读进度条（scroll()）、卡片入场（view()）、视频进入视口播放、离开暂停，reduced-motion 只显示 poster。
- [ ] **Step 4:** 运行，Expected PASS。
- [ ] **Step 5:** Commit `feat(theme): view transitions, scroll-driven motion, in-view video`

### Task 12: SEO、RSS、杂项页面、文档

**Files:**
- Create: `themes/evo/layouts/_partials/seo.html`、`themes/evo/layouts/rss.xml`、`themes/evo/layouts/404.html`、`themes/evo/layouts/robots.txt`、`themes/evo/layouts/llms.txt`、`themes/evo/layouts/_partials/edit-link.html`
- Create: `video/README.md`（子项目 3 占位：读 `data/tokens.yaml`、输出上传 R2、写回 `cover_video`/`video_vertical`）
- Modify: `.gitignore`（加 `video/out/`、`video/node_modules/`）
- Modify: `content/about.md`、`content/now/index.md`（中文，新定位，公众号二维码；技术笔记与 CV 链接保留）
- Modify: `CLAUDE.md`（"two kinds of content" 改为三类：`content/articles/` 由同步技能写入、`content/posts/`、`content/wiki/`；Checks 段提到 check-site.sh）
- Modify: `README.md`（主题改为 evo）

- [ ] **Step 1: 写失败的检查**
  - `check_seo`：sample-1 页含 `<link rel="canonical" href="https://coolloic.github.io/blog/articles/sample-1/"`、`og:image`、`og:title`、`<meta name="description"`
  - `check_sitemap`：`$OUT/sitemap.xml` 含 `/articles/sample-1/`（-D 构建）与 `/posts/hello-world/`
  - `check_rss_scope`：`$OUT/index.xml` 含 articles 与 posts，不含 wiki（`check-wiki.sh` 的 `check_rss_posts_only` 继续 PASS）
  - `check_404`：`$OUT/404.html` 存在且含返回首页链接
  - `check_video_dir`：`git check-ignore -q video/out/x.mp4`
- [ ] **Step 2:** 运行，Expected FAIL。
- [ ] **Step 3:** 实现并改文档。
- [ ] **Step 4:** `bash scripts/check-wiki.sh`，Expected `ALL PASS`。
- [ ] **Step 5:** Commit `feat(theme): SEO, feeds, 404; docs for the new layout`

### Task 13: 真实浏览器验收

**Files:**
- Create: `docs/screenshots/redesign/*.png`
- Modify: `design/README.md`（记录与 Stitch 稿的偏差）

- [ ] **Step 1:** `hugo server -D` 后，用 agent-browser（或 Claude in Chrome）逐页（10 页）在 375×812 与 1280×900、浅色与深色下截图，与 `design/screens/` 对比，列出偏差并修复。
- [ ] **Step 2:** 375px 下对每页执行 `document.documentElement.scrollWidth <= innerWidth`，Expected 全部 true（含一篇临时加入超长无空格中文标题和超长 URL 的 fixture）。
- [ ] **Step 3:** 模拟 `prefers-reduced-motion: reduce` 与禁用 JS 各打开首页、文章页，Expected 内容全部可见、视频只显示 poster。
- [ ] **Step 4:** 把 sample-1 的 `cover` 改成不存在的 R2 链接，Expected 卡片与 hero 保持比例、显示兜底底色，Lighthouse CLS < 0.1。
- [ ] **Step 5:** Lighthouse 移动端跑首页、sample-1、`posts/modern-web-guidelines`、`search`：Performance、Accessibility、Best Practices、SEO 记录到 `docs/screenshots/redesign/lighthouse.md`；Accessibility 必须 100 或逐条说明，LCP < 2.5s、CLS < 0.1。
- [ ] **Step 6:** `bash scripts/check-wiki.sh` Expected `ALL PASS`。
- [ ] **Step 7:** Commit `test: browser acceptance of the redesign`（仍在 `redesign` 分支，不推 main）

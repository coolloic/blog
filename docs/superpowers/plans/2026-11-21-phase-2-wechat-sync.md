# 子项目 2 · 公众号同步（wx-sync）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把公众号「AI进化调研员」已发表的文章（约 63 篇，跳过公告）按需同步到 `content/articles/`，图片放 R2，可重复运行、单篇原子。

**Architecture:** Claude 在已登录的 Chrome 里读"已发表列表"，定 slug、分类、标签，写成 `.wx-sync/plan.json`；本地 Node 包 `tools/wx-sync` 按 plan 抓公开文章页、转 Markdown、下载图片、记录尺寸、通过 `wrangler` 上传 R2，最后原子地写入文章。主题改为按话题的 4 个分类，增加图片尺寸渲染钩子；示例文章移为检查用的夹具。

**Tech Stack:** Node 22（ESM，`node --test`），turndown（HTML→Markdown），linkedom（DOM 解析），image-size，yaml，wrangler（R2 上传），Hugo 0.169，现有 `scripts/check-site.sh`。

**Spec:** `docs/superpowers/specs/2026-11-21-wechat-sync-design.md`（上级：`docs/superpowers/specs/2026-11-21-blog-repositioning-design.md`）

## Global Constraints

- 分支 `redesign`。不推送、不合并；合并到 `main` 需作者单独确认。
- 分类 slug 固定为 `work`（工作与职业）、`education`（教育与成长）、`life`（生活与安全）、`tools`（AI 工具），按此顺序显示；每篇只有一个分类；系列作标签：`脑洞实验室`、`工具推荐`、`手机应用推荐`。
- 文章路径 `content/articles/<slug>/index.md`；slug 为英文 kebab-case、≤ 6 个词、全站唯一，**写入后永不改变**。
- front matter 必有：`title`、`date`（`+08:00`）、`summary`、`categories`、`tags`、`cover`、`wechat_url`（短格式 `https://mp.weixin.qq.com/s/<id>`）、`wechat_id`（`<appmsgid>_<itemidx>`）、`images`（文件名 → `[宽, 高]`）、`draft: false`。
- 图片 R2 key：`articles/<slug>/<n>.<ext>`（正文按出现顺序从 1 编号），封面 `articles/<slug>/cover.<ext>`；Markdown 里写 `params.imageBase` + key 的完整 URL。
- 原创标记不作条件（作者确认所有文章本人所写）；只跳过【招募令】/征稿启事等公告，跳过项记入 `data/wechat-skip.yaml`。
- 密钥不进仓库；`.wx-sync/`、`tools/wx-sync/node_modules/` git-ignored；测试夹具只用**合成**的微信风格 HTML，不提交真实文章原文。
- 抓取串行，每篇间隔 1–2 秒。
- 每次改动后 `bash scripts/check-wiki.sh` 必须 `ALL PASS`。

## Review Focus

1. **某张图下载失败（404/超时）** → 该篇整体失败、`content/` 里不出现这篇，报告里列出；其他篇照常完成。（Task 6 测试）
2. **同步完立刻重跑** → 0 个文件变化、0 次上传。（Task 6 测试）
3. **微信返回验证页（"环境异常"）而不是文章** → 当作抓取失败，不生成空文章。（Task 3 测试）
4. **plan 里的 slug 与另一篇已存在文章（不同 `wechat_id`）冲突** → 该篇被拒绝并报告，不覆盖。（Task 6 测试）
5. **正文含 `<think>` 之类尖括号文本、表格、emoji、超长链接** → 生成的 Markdown 构建通过（`--panicOnWarning`）且内容不丢。（Task 4 测试 + Task 8 构建）

---

### Task 1: 分类改为按话题 + 分类校验 + 示例文章移为夹具

**Files:**
- Modify: `data/categories.yaml`（4 个新 slug，`order` 1–4，名称与说明见 Global Constraints）
- Delete: `content/categories/{models,concepts,industry}/`；Create: `content/categories/{work,education,life}/_index.md`；Modify: `content/categories/tools/_index.md`（名称改为 AI 工具）
- Move: `content/articles/sample-{1,2,3}/` → `scripts/fixtures/articles/sample-{1,2,3}/`；分类改为 `education`、`work`、`education`
- Modify: `themes/evo/layouts/articles/single.html`（未知分类 `errorf "%s: unknown category %q"`，草稿也检查）
- Modify: `scripts/check-site.sh`：主构建与 `build_variant` 都把 `content/` 与 `scripts/fixtures/` 合并到临时目录再 `--contentDir`；`check_category_order` 期望 `work education life tools`；`check_category_urls` 改用 `education`/`教育与成长`；`check_category_empty` 改为变体构建（删去 `articles/` 下非 `sample-*` 的文章）后断言 `life`、`tools` 为空状态；`check_html_lang` 等其余按 sample 的检查不变
- Modify: `content/articles/_index.md` 保留；`hugo.yaml` 不变

**Interfaces:**
- Produces: 夹具目录 `scripts/fixtures/articles/`；helper `merge_content <dir>`（check-site 内部）。

- [ ] **Step 1: 写失败的检查**：`check_unknown_category`（变体：sample-1 改成 `categories: ["nope"]`，构建失败且输出含 `unknown category`）；把 `check_category_order` 的期望改成 `work education life tools`；`check_fixtures_not_in_content`（`content/articles/` 下没有 `sample-*`）。
- [ ] **Step 2:** `bash scripts/check-site.sh check_unknown_category check_category_order check_fixtures_not_in_content`，Expected：3 个 FAIL。
- [ ] **Step 3:** 实现上述文件改动。
- [ ] **Step 4:** `bash scripts/check-wiki.sh`，Expected `ALL PASS`（所有原有 sample 检查通过夹具继续生效）。
- [ ] **Step 5:** Commit `feat: topic categories (work/education/life/tools), category validation, samples as fixtures`

### Task 2: 正文图片尺寸渲染钩子

**Files:**
- Create: `themes/evo/layouts/_markup/render-image.html`
- Modify: `scripts/fixtures/articles/sample-1/index.md`（加一张图 `![示例图](https://pub-PLACEHOLDER.r2.dev/articles/sample-1/1.jpg)` 和 `images: {"1.jpg": [1280, 720]}`）

**Interfaces:**
- Produces: front matter `images` 契约：键为 URL 的文件名（`path.Base`），值 `[宽, 高]`。钩子输出 `<img src alt width height loading="lazy" decoding="async">`；表中查不到则不输出宽高；`.Title` 存在时包成 `<figure>` + `<figcaption>`。

- [ ] **Step 1: 写失败的检查** `check_image_dimensions`：sample-1 页面里该图的 `<img>` 带 `width=1280`、`height=720`、`loading=lazy`。
- [ ] **Step 2:** 运行，Expected FAIL。
- [ ] **Step 3:** 实现钩子。
- [ ] **Step 4:** `bash scripts/check-wiki.sh`，Expected `ALL PASS`。
- [ ] **Step 5:** Commit `feat(theme): body images get width/height from front matter`

### Task 3: `tools/wx-sync` 骨架 + 抓取模块（先实测微信）

**Files:**
- Create: `tools/wx-sync/package.json`（`"type": "module"`，`"test": "node --test test/"`，依赖 turndown、linkedom、image-size、yaml）、`tools/wx-sync/src/fetch.mjs`、`tools/wx-sync/test/fetch.test.mjs`、`tools/wx-sync/test/fixtures/verify-page.html`（合成的"环境异常"验证页）
- Modify: `.gitignore`（`.wx-sync/`、`tools/wx-sync/node_modules/`）

**Interfaces:**
- Produces: `fetchArticleHtml(url: string, {fetchImpl?}): Promise<string>`：浏览器 UA；返回的 HTML 没有 `id="js_content"` 时抛 `FetchError("not an article page")`。
- Produces: `downloadImage(url: string, {fetchImpl?}): Promise<{bytes: Buffer, ext: string, contentType: string}>`：`ext` 取 `wx_fmt` 参数，缺省按 content-type；非 2xx 抛 `FetchError`。
- Produces: `class FetchError extends Error`。

- [ ] **Step 1: 写失败的测试**：`fetchArticleHtml` 对验证页夹具（通过注入的 `fetchImpl`）抛 `FetchError`；`downloadImage` 对 `…?wx_fmt=png` 返回 `ext: "png"`；404 抛错。
- [ ] **Step 2:** `cd tools/wx-sync && npm install && npm test`，Expected FAIL。
- [ ] **Step 3:** 实现。
- [ ] **Step 4:** `npm test`，Expected PASS。
- [ ] **Step 5: 实测（真实网络，只读）**：`node -e` 调用 `fetchArticleHtml("https://mp.weixin.qq.com/s/DZeazTGq5lpzHt4isL_Zbw")`，Expected 返回含 `js_content`；对其中第一张 `data-src` 调 `downloadImage`，Expected `bytes.length > 10000`。若被拦截：改用本机无头 Chrome（Puppeteer，从 npx 缓存加载，同 `scripts/check-layout.mjs`）实现同一接口，记录到计划执行台账。
- [ ] **Step 6:** Commit `feat(wx-sync): package skeleton and fetching`

### Task 4: 正文转换（HTML → Markdown）

**Files:**
- Create: `tools/wx-sync/src/convert.mjs`、`tools/wx-sync/test/convert.test.mjs`、`tools/wx-sync/test/fixtures/article.html`（合成：含 `mp-common-profile`、带样式 `section`、`h1`/`h2`、`strong`、`em`、外链、指向另一篇公众号文章的链接、无序/有序列表、引用、表格、`<p>&lt;think&gt; 标签</p>`、emoji、3 张 `data-src` 图其中一张紧跟图注、"往期推荐"及其后的内容、一张装饰分隔图 `data-type="gif"` 宽 < 100）

**Interfaces:**
- Produces: `convertArticle(html: string, {linkMap: Map<wechatShortUrl, slug>}): {markdown: string, images: Array<{n: number, src: string, alt: string}>, coverUrl: string|null}`。图片在 Markdown 里以占位 `![alt](wximg:<n>)` 出现；`coverUrl` 取 `og:image` 或 `msg_cdn_url`；`linkMap` 命中的链接改写为 `../<slug>/index.md`。

- [ ] **Step 1: 写失败的测试**（对合成夹具）：
  - 不含 `mp-common-profile` 的文字、不含"往期推荐"及其后文字
  - `h1` 输出为 `## `，`h2` 为 `## `，`h3` 为 `### `
  - `**加粗**`、`*斜体*`、`- ` 列表、`1. ` 列表、`> ` 引用、表格 `| … |` 都在
  - `<think>` 作为文本保留且被转义（Markdown 中为 `\<think>` 或 `&lt;think&gt;`）
  - `images.length === 3`、占位 `wximg:1..3` 按顺序；装饰分隔图被丢弃；图注成为图片 title
  - 命中 `linkMap` 的链接变成 `../other-slug/index.md`，未命中的外链保持原样
  - `coverUrl` 等于夹具里 `og:image` 的值
- [ ] **Step 2:** `npm test`，Expected FAIL。
- [ ] **Step 3:** 实现（linkedom 解析 + turndown 自定义规则）。
- [ ] **Step 4:** `npm test`，Expected PASS。
- [ ] **Step 5:** Commit `feat(wx-sync): convert WeChat article HTML to Markdown`

### Task 5: R2 上传与图片尺寸

**Files:**
- Create: `tools/wx-sync/src/r2.mjs`、`tools/wx-sync/src/images.mjs`、`tools/wx-sync/test/images.test.mjs`、`tools/wx-sync/config.json`（`{"bucket": "aijinhua-media"}`）

**Interfaces:**
- Produces: `makeUploader({bucket, imageBase, dryRun, exec?, fetchImpl?}): {exists(key): Promise<boolean>, put(key, bytes, contentType): Promise<void>, url(key): string}`。`exists` 对 `url(key)` 发 HEAD（200 即存在）；`put` 写临时文件后执行 `npx wrangler r2 object put <bucket>/<key> --file <tmp> --content-type <type> --remote`；`dryRun` 时 `put` 只记录不执行。
- Produces: `dimensions(bytes): [number, number]`（image-size）。
- Produces: `readImageBase(hugoYamlPath): string`（读 `params.imageBase`，去掉结尾 `/`）。

- [ ] **Step 1: 写失败的测试**：`dimensions` 对夹具小 PNG 返回正确宽高；`makeUploader({dryRun:true})` 的 `put` 不调用注入的 `exec`；非 dry-run 时 `exec` 收到的参数含 `r2 object put aijinhua-media/articles/x/1.jpg` 与 `--remote`；`url("articles/x/1.jpg")` 等于 `imageBase + "/articles/x/1.jpg"`；`readImageBase("../../hugo.yaml")` 返回当前配置值。
- [ ] **Step 2:** `npm test`，Expected FAIL。
- [ ] **Step 3:** 实现。
- [ ] **Step 4:** `npm test`，Expected PASS。
- [ ] **Step 5:** Commit `feat(wx-sync): R2 uploader and image dimensions`

### Task 6: 同步编排（plan → 文章，原子、幂等、resync）

**Files:**
- Create: `tools/wx-sync/src/sync.mjs`（库）、`tools/wx-sync/bin/wx-sync.mjs`（CLI）、`tools/wx-sync/src/frontmatter.mjs`、`tools/wx-sync/test/sync.test.mjs`
- Create: `data/wechat-skip.yaml`（空列表 `[]`，带注释说明格式）

**Interfaces:**
- Consumes: Task 3 `fetchArticleHtml`/`downloadImage`、Task 4 `convertArticle`、Task 5 `makeUploader`/`dimensions`/`readImageBase`。
- Produces: `plan.json` 契约：
```json
{ "items": [ { "wechat_id": "2247483650_1", "url": "https://mp.weixin.qq.com/s/<id>", "title": "…", "date": "2026-11-20T08:00:00+08:00",
  "summary": "…", "slug": "ai-layoff-30-day-plan", "category": "work", "tags": ["裁员", "求职"], "skip": null } ] }
```
  `skip` 为字符串时该项写入 `data/wechat-skip.yaml`（`{wechat_id, title, reason}`），不抓取。
- Produces: `runSync({plan, contentDir, skipFile, uploader, fetchers, dryRun, resync, previewDir, log}): Promise<{added: string[], skipped: string[], failed: Array<{slug, error}>, unchanged: string[]}>`。
- Produces CLI: `node tools/wx-sync/bin/wx-sync.mjs --plan .wx-sync/plan.json [--dry-run] [--resync <slug>]`，结束时打印报告；有失败时退出码 1。
- 行为：已存在的 `wechat_id`（扫描 `content/articles/*/index.md` 的 front matter）→ `unchanged`，除非 `--resync` 指定其 slug（覆盖，slug 与 key 不变）；plan 的 slug 已被**别的** `wechat_id` 占用 → `failed`；单篇所有图片上传成功后，先写 `index.md.tmp` 再 rename；`--dry-run` 写到 `previewDir/<slug>/index.md`，不上传。`summary` 为空时取正文前 80 字。`linkMap` 由已有文章 + 本次 plan 共同构成。

- [ ] **Step 1: 写失败的测试**（全部用注入的假抓取器和假上传器、临时目录）：
  - 正常：一篇写出 `index.md`，front matter 字段齐全且 `images` 含 `1.jpg` 与 `cover.<ext>` 的宽高；Markdown 中 `wximg:1` 被替换为 `imageBase/articles/<slug>/1.jpg`
  - Review Focus 1：第二张图下载抛错 → 该篇在 `failed`，目录里没有该篇文件，另一篇照常写出
  - Review Focus 2：同一 plan 跑两次，第二次 `added` 为空、上传器 `put` 调用 0 次、文件 mtime 不变
  - Review Focus 4：plan 的 slug 与已存在的另一 `wechat_id` 冲突 → `failed`，原文件内容不变
  - `skip` 项写入 skip 文件且不调用抓取器；skip 文件里已有的 `wechat_id` 再出现时直接跳过
  - `--resync` 覆盖已存在文章，slug 与图片 key 不变
  - `--dry-run` 不调用 `put`，不写 `contentDir`
- [ ] **Step 2:** `npm test`，Expected FAIL。
- [ ] **Step 3:** 实现。
- [ ] **Step 4:** `npm test`，Expected PASS。
- [ ] **Step 5:** 让 `scripts/check-wiki.sh` 在 `tools/wx-sync/node_modules` 存在时运行 `npm test --prefix tools/wx-sync`（失败计入 FAILS）。运行 `bash scripts/check-wiki.sh`，Expected `ALL PASS`。
- [ ] **Step 6:** Commit `feat(wx-sync): plan-driven, atomic, idempotent sync`

### Task 7: 项目技能与文档

**Files:**
- Create: `.claude/skills/wx-sync/SKILL.md`
- Modify: `CLAUDE.md`（Workflows 增加 "Sync" 小节）、`README.md`（一行）

技能内容（决定项，按此写）：
- 触发词："同步公众号"、"sync WeChat"。
- 前置检查：Chrome（Browser 1）已登录公众号后台；`tools/wx-sync/node_modules` 已安装；`npx wrangler whoami` 已登录；否则停下告诉作者怎么做。
- 读列表：沿用 xhs-sync 的 `appmsgpublish` 接口，只读取 `title`、`create_time`、`digest`、`link`、`appmsgid`、`itemidx`（不读带 query string 的字段）；`create_time` 转为 `+08:00` ISO。
- 过滤：已同步（`content/articles/*/index.md` 的 `wechat_id`）与 `data/wechat-skip.yaml` 中的。
- 判断：slug（英文 kebab-case、≤ 6 词、唯一）、分类（4 个 slug 的判断标准与例子）、2–4 个标签（系列从摘要开头【…】识别：`脑洞实验室`/`工具推荐`/`手机应用推荐`）、`skip`（【招募令】、征稿启事等公告；主体为转载他人长文的注明原因）。拿不准分类时读正文。
- 写 `.wx-sync/plan.json` → 首次或作者要求时先 `--dry-run` 并给作者抽查 → 正式运行 → `bash scripts/check-wiki.sh` → 提交（`main` 上检查通过可直接推送；`redesign` 未合并前只提交）。
- 安全规则：只读后台，不改动公众号任何内容；不打印或保存后台 token；失败时停下报告，不猜字段。

- [ ] **Step 1:** 写技能与文档。
- [ ] **Step 2:** 自查：技能里每一步都能对上 spec 第 7–9 节；命令可直接复制运行（`node tools/wx-sync/bin/wx-sync.mjs --help` 输出用法，Expected 退出码 0）。
- [ ] **Step 3:** Commit `docs: wx-sync skill and sync workflow`

### Task 8: 首批同步（需要作者参与）

- [ ] **Step 1: 作者准备**（暂停并请作者完成）：在 Cloudflare 创建 R2 bucket `aijinhua-media` 并开启 r2.dev 公共地址，告知地址；运行 `! npx wrangler login`。把地址写入 `hugo.yaml` 的 `params.imageBase`，`npx wrangler whoami` Expected 显示已登录。
- [ ] **Step 2:** 按技能读取列表、生成 plan，`--dry-run`。Expected：报告 `added` ≈ 63、`failed` 0；`.wx-sync/preview/` 下有对应目录。
- [ ] **Step 3:** 把 3–5 篇预演（不同分类、含系列文章）交作者抽查；按反馈修正 plan 或转换规则（转换规则的修正先在 Task 4 测试里加用例）。
- [ ] **Step 4:** 正式运行。Expected：`failed` 0（如有失败，修复后重跑，直到 0）。
- [ ] **Step 5:** `bash scripts/check-wiki.sh`，Expected `ALL PASS`；本地 `hugo server` 打开首页、4 个分类页、2 篇文章目视检查；`node scripts/check-layout.mjs` 对 3 篇真实文章 Expected 无横向滚动。
- [ ] **Step 6:** 立即重跑同一 plan，Expected：`added` 0，`git status` 无变化（Review Focus 2 的真实验证）。
- [ ] **Step 7:** Commit `content: first batch of WeChat articles (N)`。合并 `redesign` → `main` 单独询问作者。

# UI 设计（Google Stitch 产出）

| 路径 | 内容 |
|---|---|
| `prompts/` | 交给 Stitch 的英文提示词：`00-global.md` 是全局设计要求，其余按页面编号；`mobile/README.md` 是移动端补充 |
| `DESIGN.md` | Stitch 生成的设计系统（配色、字体、间距、圆角、动效） |
| `screens/<NN-page>.png` | 桌面设计稿（1280 宽，无界面 Chrome 渲染导出代码） |
| `screens/mobile/<page>.png` | 移动设计稿（390 宽，DPR 2） |
| `code/`、`code/mobile/` | Stitch 导出的页面代码（Tailwind CDN，仅作实现参考，不上线） |
| `../data/tokens.yaml` | 从 `DESIGN.md` 提取的设计令牌，主题和 Remotion 视频共用；`python3 scripts/check-contrast.py` 检查对比度 |

Stitch 项目：AI Evolution Researcher Blog（Stitch Agent 模式），2026-11-21。依据：`docs/ba/functional-spec.md`。

## 页面对照

| 页面 | 桌面 | 主题 | 移动 |
|---|---|---|---|
| 01 首页 | `01-home` | 深 | `m01-home` |
| 02 分类 / 列表（含空状态） | `02-list` | 浅 | `m02-list` |
| 03 科普文章页 | `03-article` | 深 | `m03-article` |
| 04 技术笔记首页 | `04-notes` | 浅 | — |
| 05 技术文章页 | `05-post` | 深 | — |
| 06 Wiki 索引 | `06-wiki` | 浅 | — |
| 07 归档 | `07-archives` | 深 | — |
| 08 搜索（含无结果） | `08-search` | 浅 | `m08-search` |
| 09 关于 | `09-about` | 深 | — |
| 10 404 | `10-404` | 浅 | — |
| 导航菜单 | — | — | `m-menu`（深） |

## 导出方式

作者在 Stitch 里全选画布（⌘A）→ Export → `.zip`，解压后按上表改名放入 `code/`。截图命令：

`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --user-data-dir=<临时目录> --window-size=1280,3600 --virtual-time-budget=10000 --screenshot=<输出.png> file://<html 绝对路径>`（移动端 `--window-size=390,3200 --force-device-scale-factor=2`）

## 与 Stitch 稿的差异（实现以此为准）

- **每页只出了一种主题**：Stitch 每页只画了浅色或深色之一。实现时两种主题都由 `data/tokens.yaml` 生成，另一种主题按令牌推导，不另出稿。
- **截图里封面图是空的**：导出代码的配图托管在 Google 服务器，离线渲染时加载不出；布局和比例不受影响。Stitch 画布上能看到配图。
- **字体**：Stitch 用了 Crimson Pro（标题）、Lato（正文拉丁字母）、Source Code Pro（等宽）三款 Web 字体。实现只保留 Crimson Pro；正文用系统中文字体栈，等宽用系统等宽字体栈（规格要求不加载多余 Web 字体，保护 LCP）。
- **浅色底色**：Stitch 给的是偏冷的 `#F9F9FF`，不是说明书写的"暖白"。先按 Stitch 实现，作者若想要暖白再调 `tokens.yaml`。
- **新增令牌 `accent-fill` / `on-accent-fill`**：深色模式的 `primary`（#FFB690）是浅橙，只适合当文字；按钮和进度条用 Stitch 的 `primary-container`（#F97316）配深色文字。

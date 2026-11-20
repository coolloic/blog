# BA 产物索引（子项目 1 · 站点改版）

依据：`docs/superpowers/specs/2026-11-21-blog-repositioning-design.md`

| # | 画板 | 源文件 | 导出 | 状态 |
|---|---|---|---|---|
| 1 | 读者画像与路径（微信来的 / 搜索来的 / 技术读者） | `01-reader-flow.mmd` | `01-reader-flow.png` | ✅ 已审（2026-11-21） |
| 6 | 页面跳转（10 个页面、3 个视频位 🎬、中文页橙 / 英文页蓝） | `06-ui-nav.mmd` | `06-ui-nav.png` | ✅ 已审（2026-11-21） |

功能说明书：`functional-spec.md`（✅ 已审 2026-11-21）· UI 设计稿：`../../design/`（Stitch）· 待决问题：`open-questions.md`

编号沿用 slack-off：状态机（02）、时序（03）、组件（04）、ER（05）对内容站不适用，省略。

制作方式：先写 Mermaid 源文件（便于 diff 和审阅），用 `npx @mermaid-js/mermaid-cli@11.4.1 -i <mmd> -o <png> -s 2 -b white` 导出。需要手绘风格时可在 excalidraw.com 用"Mermaid to Excalidraw"导入。

# AI调研员 · Blog

Hugo site with a custom theme (`themes/evo`). The main content is Chinese AI explainers archived from the WeChat account 「AI调研员」. English Tech Notes and an LLM-maintained AI Wiki sit alongside them.

- Preview locally: `hugo server -D`, then open http://localhost:1313/blog/
- Checks: `bash scripts/check-wiki.sh` (it runs `scripts/check-site.sh` too)
- Design: `design/` (Google Stitch screens and exports), tokens in `data/tokens.yaml`, specs in `docs/`
- Deploy: push to `main` on GitHub (GitHub Pages via Actions)
- After cloning: `git submodule update --init` (PaperMod is still a submodule until it is removed)

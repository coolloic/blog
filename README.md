# Loic's Blog

Hugo + [PaperMod](https://github.com/adityatelange/hugo-PaperMod), the same setup as blog.modelcontextprotocol.io.

- Preview locally: `hugo server -D`, then open http://localhost:1313
- New post: `hugo new content posts/my-post.md`, then set `draft: false` when it's ready
- Deploy: push to `main` on GitHub. In the repo's Settings → Pages, set Source to "GitHub Actions".
- After cloning: `git submodule update --init` to fetch the theme.

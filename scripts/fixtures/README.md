# Test fixtures

`scripts/check-site.sh` copies `content/` and this folder into a temporary content directory before building, so the theme checks never depend on which real articles exist.

The `articles/sample-*` pages are drafts with placeholder text. Never move them into `content/`.

The `posts/hello-world` page is an English post fixture (it used to be the first real post); checks use it for the English Tech Notes layout.

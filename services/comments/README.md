# Comment server (Waline)

Serves comments for https://aitanyan.com/ at https://comments.aitanyan.com/ (Vercel project `waline-aitanyan`, Node 26, deployed manually with `npx vercel deploy --prod` from this folder).

- Database: Neon Postgres `aitanyan-comments-db` from the Vercel Marketplace (env `POSTGRES_*`), tables from Waline's `assets/waline.pgsql` (imported once).
- Env: `COMMENT_AUDIT=true` (comments wait for approval), `SECURE_DOMAINS=aitanyan.com,comments.aitanyan.com,localhost`, `AKISMET_KEY=false`, `SITE_NAME`, `SITE_URL`.
- Admin: the first account registered at https://comments.aitanyan.com/ui/register becomes the administrator. Approve comments at /ui.

Gotchas (both verified 2026-11-21):

- Vercel starts Node with `--no-experimental-require-module`, so Waline's CommonJS code cannot `require()` its ESM-only dependencies. `api/index.js` imports each one on first request and serves it to `require()`.
- MathJax loads fonts and packages with dynamic `import()`, which Vercel's file tracing misses; `vercel.json` lists them in `includeFiles`. A new "Cannot find module/package" error on posting means another one needs adding there.

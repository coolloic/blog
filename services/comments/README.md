# Comment server (Waline)

Serves comments for https://aitanyan.com/ at https://comments.aitanyan.com/ (Vercel project `waline-aitanyan`, deployed manually with `npx vercel deploy --prod` from this folder).

- Database: Neon Postgres from the Vercel Marketplace (env `POSTGRES_*`), tables from Waline's `waline.pgsql`.
- Moderation: `COMMENT_AUDIT=true` (comments wait for approval), `SECURE_DOMAINS=aitanyan.com,comments.aitanyan.com`, `AKISMET_KEY=false`.
- Admin: the first account registered at https://comments.aitanyan.com/ui/register becomes the administrator. Approve comments at /ui.

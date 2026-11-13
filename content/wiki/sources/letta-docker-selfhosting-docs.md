---
title: "Source: Letta documentation, self-hosting with Docker (deprecated)"
summary: "Letta's reference page for the Docker server: letta/letta image on port 8283, Postgres with pgvector, env vars, password protection and tool sandboxing; marked no longer actively supported."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "deployment"]
---

- **What:** official documentation (deprecated reference page)
- **Publisher:** Letta
- **Date:** undated (read 2026-11-14)
- **Original:** [docs.letta.com/guides/selfhosting](https://docs.letta.com/guides/selfhosting)

## Summary

How to run the classic Letta server (the MemGPT-lineage stateful agent server) yourself. The page now states the Docker image is no longer an actively maintained product surface and steers users to local mode or the Letta App Server.

## Key claims

- Image `letta/letta:latest`, port 8283, REST API under `/v1`.
- State lives in Postgres; an external database is set with `LETTA_PG_URI` and must have the pgvector extension.
- Provider keys via env vars (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`), `OLLAMA_BASE_URL` for local models.
- `SECURE=true` plus `LETTA_SERVER_PASSWORD` enable bearer-token protection; `E2B_API_KEY` (with optional `E2B_SANDBOX_TEMPLATE_ID`) sandboxes custom tools; if no password is set the server generates one. Both are recommended when users are untrusted.
- Docker servers need an explicit `embedding` argument to `client.agents.create` (for example `openai/text-embedding-3-small`), unlike the hosted API.
- `LETTA_MEMFS_SERVICE_URL=local` enables MemFS with local storage.
- The browser-based Agent Development Environment (ADE) needs HTTPS for remote servers (reverse proxy or SSH tunnel).

## Feeds

[Letta](../concepts/letta.md)

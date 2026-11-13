---
title: "Source: Mem0 documentation, open source overview and Platform vs OSS"
summary: "Mem0's docs on deployment modes: OSS defaults (gpt-5-mini, text-embedding-3-small, local Qdrant, SQLite history), the self-hosted server, Platform-only features, and the removal of external graph stores."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "deployment"]
---

- **What:** official product documentation
- **Publisher:** Mem0
- **Date:** undated (read 2026-11-14)
- **Original:** [Open source overview](https://docs.mem0.ai/open-source/overview) · [Platform vs OSS](https://docs.mem0.ai/platform/platform-vs-oss) · [Graph memory](https://docs.mem0.ai/open-source/features/graph-memory) · [Platform overview](https://docs.mem0.ai/platform/overview)

## Summary

Mem0 ships as an open-source library (`pip install mem0ai`, `npm install mem0ai`), a self-hosted server, and a managed Platform. The OSS library is the extraction and retrieval core; many lifecycle features are Platform-only.

## Key claims

- OSS library defaults: LLM OpenAI `gpt-5-mini`, embedder `text-embedding-3-small`, vector store local Qdrant at `/tmp/qdrant`, history in SQLite at `~/.mem0/history.db`, reranker off until configured.
- Self-hosted server (`make bootstrap` in `server/`, Docker Compose): Postgres with pgvector, dashboard, per-user API keys, request audit log; bundled LLM providers OpenAI, Anthropic, Gemini.
- Both offer async clients (`AsyncMemory` OSS, `AsyncMemoryClient` Platform), reranking and multimodal input.
- Graph memory: the Platform has a native always-on entity graph that feeds ranking. Links come from entity co-occurrence, not typed relations; the old `relations` response field is now always empty. The earlier external graph-store integration (Neo4j, Memgraph, Kuzu, Apache AGE, Neptune via `enable_graph` and `graph_store`) was replaced by the native graph on the Platform (`enable_graph=True` now only adds an empty `relations` key) and removed from OSS in the v3 pipeline; OSS still extracts entities for ranking but has no queryable graph.
- OSS has no batch operations (loop over single `update` / `delete`).
- Platform-only: webhooks, schema-driven export, batch update/delete (up to 1000 per call), feedback, summaries, Dream consolidation, memory decay, temporal reasoning, custom categories, dashboard.
- Platform memories can be scoped by `user_id`, `agent_id`, `app_id` and `run_id`; OSS has no `app_id`.

## Feeds

[Mem0](../concepts/mem0.md) · [Letta](../concepts/letta.md)

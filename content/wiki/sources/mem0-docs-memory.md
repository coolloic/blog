---
title: "Source: Mem0 documentation, memory concepts"
summary: "Mem0's docs on how add extracts facts into SQL, vector and entity stores, and how search ranks memories by semantic, keyword, entity and temporal signals."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory"]
---

- **What:** official product documentation
- **Publisher:** Mem0
- **Date:** undated (read 2026-11-14)
- **Original:** [docs.mem0.ai/core-concepts/memory-types](https://docs.mem0.ai/core-concepts/memory-types)

## Summary

Describes Mem0's current storage and API model. `add` takes conversation messages and stores extracted facts, not the transcript. `search` blends several ranking signals and should always be scoped to a user, agent or run.

## Key claims

- Three storage layers: a SQL database (facts and metadata, the source of truth), a vector database (embeddings) and an entity store that boosts memories sharing entities with the query. On the managed Platform the entity store also backs Graph Memory; the docs state the open-source library has no graph memory.
- The `add` pipeline: look up related existing memories, extract facts with an LLM, deduplicate and embed, extract entities.
- Extraction is additive in the current docs; corrections need explicit `update` or `delete` calls.
- `infer=False` stores content verbatim; inference (fact extraction) is the default.
- Search ranks with four signals: semantic similarity, keyword match, entity match and temporal metadata.
- `user_id`, `agent_id` and `run_id` filters separate memories between users, agents and sessions; custom metadata (tenant, category) can also filter.

## Feeds

[Agent memory](../concepts/agent-memory.md)

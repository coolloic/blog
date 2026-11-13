---
title: "Source: vLLM docs: Automatic Prefix Caching design"
summary: "Design doc for vLLM's hash-based KV block reuse across requests."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (latest, read 2026-11-14)
- **Author:** vLLM project
- **Date:** 2026-11-14 (accessed)
- **Original:** [vLLM docs: Automatic Prefix Caching design](https://docs.vllm.ai/en/latest/design/prefix_caching.html)

## Summary

Explains how vLLM reuses KV blocks between requests that share a prefix: each full block is identified by a hash chained from its parent, freed blocks stay cached in an LRU queue until evicted, and extra hash inputs keep LoRA, multimodal and tenant-salted requests apart.

## Key claims

- Block hash = hash(parent block hash, block tokens, extra hashes such as LoRA ID, multimodal input hash, cache salt).
- Only full blocks are cached; tokens in a partial last block are not reusable.
- Blocks carry reference counts; free blocks sit in an LRU-ordered queue and the tail of a finished sequence is evicted first.
- Default hash is sha256 since v0.11; xxhash variants are faster but non-cryptographic, with collision risk in multi-tenant deployments.
- A per-request cache_salt isolates cache reuse to a trust group, to defeat timing side-channel attacks that infer others' prompts.

## Feeds

[KV cache](../concepts/kv-cache.md) · [LLM inference serving](../concepts/llm-inference-serving.md)

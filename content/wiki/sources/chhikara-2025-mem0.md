---
title: "Source: Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory (Chhikara et al., 2025)"
summary: "Paper describing Mem0's extract-then-update memory pipeline (ADD/UPDATE/DELETE/NOOP) and graph variant, benchmarked on LOCOMO against full context, RAG and other memory systems."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "papers"]
---

- **What:** research paper (arXiv:2504.19413), written by the Mem0 company
- **Authors:** Prateek Chhikara, Dev Khant, Saket Aryan, Taranjeet Singh, Deshraj Yadav
- **Date:** 28 April 2025
- **Original:** [arxiv.org/abs/2504.19413](https://arxiv.org/abs/2504.19413)

## Summary

Mem0 stores distilled facts rather than transcripts. An extraction step pulls candidate facts from each new exchange; an update step compares each against similar stored memories and lets the LLM pick a CRUD-style operation. Mem0g adds a knowledge graph. On LOCOMO, Mem0 trails full-context accuracy slightly but is much faster and cheaper.

## Key claims

- Extraction input: an asynchronously refreshed conversation summary, the last m messages (m = 10), and the new message pair; GPT-4o-mini did the extraction in experiments.
- Update: for each fact, retrieve the top s = 10 similar memories, then the LLM chooses ADD, UPDATE, DELETE (contradicted) or NOOP via tool calling.
- Mem0g stores entity-relationship triplets in Neo4j; a conflict detector marks outdated edges invalid instead of deleting them, which helps temporal questions.
- LOCOMO overall LLM-judge score (J): full context 72.90%, Mem0g 68.44%, Mem0 66.88%, Zep 65.99%, best RAG 60.97% (k = 2, 256-token chunks), LangMem 58.10%, OpenAI memory 52.90%.
- p95 total latency: Mem0 1.44 s, Mem0g 2.59 s, full context 17.12 s (about 91% lower for Mem0). Memory footprint per conversation: about 7k tokens for Mem0, about 14k for Mem0g, over 600k for Zep, vs about 26k for the raw conversation.
- Caveats acknowledged or visible: one benchmark of 10 conversations, adversarial category dropped (no ground-truth answers), judge-based metric, some baselines re-run by the authors, vendor-authored.

## Feeds

[Agent memory](../concepts/agent-memory.md)

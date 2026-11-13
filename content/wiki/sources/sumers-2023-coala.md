---
title: "Source: Cognitive Architectures for Language Agents (Sumers et al., 2023)"
summary: "CoALA framework paper that maps cognitive-science memory types (working, episodic, semantic, procedural) and internal actions (retrieval, reasoning, learning) onto LLM agents."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "papers"]
---

- **What:** research paper (arXiv:2309.02427), published in TMLR
- **Authors:** Theodore R. Sumers, Shunyu Yao, Karthik Narasimhan, Thomas L. Griffiths (Princeton)
- **Date:** 5 September 2023, revised 15 March 2024
- **Original:** [arxiv.org/abs/2309.02427](https://arxiv.org/abs/2309.02427)

## Summary

CoALA gives a vocabulary for language agents drawn from cognitive architectures: modular memories, an action space split into internal and external actions, and a decision cycle. It is the usual origin of the episodic/semantic/procedural taxonomy used by agent frameworks.

## Key claims

- **Working memory** holds what the current decision cycle uses: inputs, reasoning outputs, retrieved knowledge, active goals.
- **Episodic memory** stores past experiences (trajectories, event histories); **semantic memory** stores knowledge about the world and the agent, which language agents can also write to; **procedural memory** is implicit in model weights and explicit in agent code and prompts.
- Internal actions: **retrieval** (long-term into working memory, by rules, sparse or dense search), **reasoning** (update working memory, e.g. summarise), **learning** (write to long-term memory).
- Learning can save episodes, save inferences such as reflections on failures, or change procedures (fine-tune weights or edit code and prompts).
- Writing to procedural memory is riskier than the other kinds because it can introduce bugs or subvert the designer's intent.
- Decision cycle: propose candidate actions, evaluate, select, then execute a grounding or learning action.

## Feeds

[Agent memory](../concepts/agent-memory.md)

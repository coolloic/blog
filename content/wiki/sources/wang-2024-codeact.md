---
title: "Source: Executable Code Actions Elicit Better LLM Agents (CodeAct, Wang et al., 2024)"
summary: "ICML 2024 paper proposing CodeAct: agents act by emitting executable Python run in an interpreter, beating JSON/text tool-call formats by up to 20% success."
category: source
lastmod: 2026-11-14
tags: ["agents", "paper", "tools"]
---

- **What:** research paper (arXiv 2402.01030, ICML 2024)
- **Authors:** Xingyao Wang, Yangyi Chen, Lifan Yuan, Yizhe Zhang, Yunzhu Li, Hao Peng, Heng Ji
- **Date:** 2024-02-01 (v4 2024-06-07)
- **Original:** [arXiv:2402.01030](https://arxiv.org/abs/2402.01030)

## Summary

Instead of a fixed JSON or text action format, the agent writes Python code that an interpreter executes; the output becomes the next observation. Code gives control flow, composition of several tools in one action, and access to existing libraries.

## Key claims

- CodeAct unifies agent actions into one executable-code action space.
- Across 17 LLMs on API-Bank and a new benchmark, it reaches up to 20% higher success than JSON/text alternatives.
- Agents can revise earlier actions and self-debug from interpreter errors.
- Releases CodeActInstruct (7k multi-turn trajectories) and CodeActAgent (fine-tuned Llama 2 / Mistral).

## Feeds

- [Code execution sandboxes](../concepts/code-execution-sandboxes.md)

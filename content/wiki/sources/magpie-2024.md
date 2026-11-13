---
title: "Source: Magpie (Xu et al., 2024)"
summary: "Paper that extracts alignment data from an aligned model by feeding it only the chat template's user-turn prefix, so it writes both query and answer."
category: source
lastmod: 2026-11-14
tags: ["training", "data"]
---

- **What:** research paper (arXiv:2406.08464)
- **Author:** Zhangchen Xu, Fengqing Jiang, Luyao Niu, Yuntian Deng, Radha Poovendran, Yejin Choi, Bill Yuchen Lin
- **Date:** 2024-06-12 (v2 2024-10-07)
- **Original:** [arXiv:2406.08464](https://arxiv.org/abs/2406.08464)

## Summary

Magpie generates instruction data with no seed prompts. It gives an aligned model (Llama-3-Instruct) only the chat-template prefix that comes before a user message. Because the model is autoregressive, it completes a plausible user query, then answers that query in a second call.

## Key claims

- No seed questions or prompt engineering are needed. The chat template alone elicits queries.
- 4M instruction–response pairs were generated, and 300K high-quality ones were selected.
- Llama-3-8B-Base fine-tuned on Magpie data was comparable on some tasks to the official Llama-3-8B-Instruct, which used about 10M examples plus preference tuning.
- Magpie SFT alone beat earlier public datasets used with SFT plus preference optimisation (such as UltraFeedback with DPO) on AlpacaEval, Arena-Hard and WildBench.

## Feeds

[Synthetic data generation](../concepts/synthetic-data-generation.md)

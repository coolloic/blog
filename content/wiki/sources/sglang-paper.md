---
title: "Source: SGLang: Efficient Execution of Structured Language Model Programs"
summary: "Paper introducing SGLang, RadixAttention and compressed-FSM constrained decoding."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper, arXiv:2312.07104
- **Author:** Lianmin Zheng, Liangsheng Yin, Zhiqiang Xie, Chuyue Sun, Jeff Huang, Cody Hao Yu, Shiyi Cao, Christos Kozyrakis, Ion Stoica, Joseph E. Gonzalez, Clark Barrett, Ying Sheng
- **Date:** 2023-12-12 (v2 2024-06-06)
- **Original:** [SGLang: Efficient Execution of Structured Language Model Programs](https://arxiv.org/abs/2312.07104)

## Summary

SGLang pairs a frontend language for multi-call LLM programs with a runtime that exploits their structure: RadixAttention reuses KV cache across calls that share prefixes, and compressed finite state machines speed up structured (e.g. JSON) decoding.

## Key claims

- RadixAttention provides automatic KV cache reuse across calls.
- Compressed finite state machines decode structured output faster.
- Up to 6.4x throughput over state-of-the-art systems on agent control, reasoning, few-shot, JSON decoding, RAG and multi-turn chat workloads.

## Feeds

[LLM inference serving](../concepts/llm-inference-serving.md) · [KV cache](../concepts/kv-cache.md)

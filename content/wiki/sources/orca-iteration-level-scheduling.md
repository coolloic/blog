---
title: "Source: Orca: A Distributed Serving System for Transformer-Based Generative Models"
summary: "OSDI 2022 paper that introduced iteration-level scheduling, the idea behind continuous batching."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper (OSDI 2022)
- **Author:** Gyeong-In Yu, Joo Seong Jeong, Geon-Woo Kim, Soojeong Kim, Byung-Gon Chun (Seoul National University, FriendliAI)
- **Date:** 2022-07
- **Original:** [Orca: A Distributed Serving System for Transformer-Based Generative Models](https://www.usenix.org/conference/osdi22/presentation/yu)

## Summary

Orca observes that request-level batching is a poor fit for autoregressive generation: finished requests cannot leave the batch and new requests wait for the whole batch. It schedules at the granularity of one model iteration instead, so requests join and leave between iterations, and uses selective batching to batch only the operations that tolerate ragged shapes.

## Key claims

- Iteration-level scheduling: run one decoding iteration on the current batch, then let finished requests return and new ones join.
- Selective batching: batch only a subset of Transformer operations (not attention), which makes iteration-level scheduling possible with variable-length sequences.
- Reported up to 36.9x throughput over NVIDIA FasterTransformer at the same latency on GPT-3 175B.

## Feeds

[LLM inference serving](../concepts/llm-inference-serving.md)

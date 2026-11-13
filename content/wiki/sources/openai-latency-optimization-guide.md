---
title: "Source: Latency optimization (OpenAI guide)"
summary: "OpenAI's seven principles for cutting LLM application latency, from smaller models and fewer output tokens to parallelism, streaming and not calling an LLM at all."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "latency", "openai"]
---

- **What:** official API documentation guide
- **Publisher:** OpenAI
- **Date:** accessed 2026-11-14
- **Original:** [Latency optimization](https://developers.openai.com/api/docs/guides/latency-optimization)

## Summary

Organises latency work into seven principles and illustrates them with a customer-service example. The central point is that output tokens dominate latency, so generating fewer of them matters far more than trimming the prompt.

## Key claims

- Process tokens faster: model size is the main factor; a smaller model can hold quality with a longer prompt, more examples, or fine-tuning/distillation. Predicted outputs speed up generation when most of the output is known beforehand (e.g. code edits).
- Generate fewer tokens: generation is usually the slowest step; cutting output by 50% can cut latency by roughly 50%. Shorten JSON field and function names; use `max_tokens` or stop sequences.
- Use fewer input tokens: halving the prompt may improve latency by only 1-5%, so it matters mainly for very large contexts; put dynamic content late to keep the shared prefix cacheable.
- Make fewer requests: each round trip adds latency; combine sequential steps into one call returning a structured object.
- Parallelise independent steps; for dependent ones, speculatively start the likely next step and cancel on a mismatch (works well for classification such as moderation).
- Make users wait less: streaming is the most effective perceived-latency technique; also process output in chunks and show steps or progress.
- Don't default to an LLM: hard-code fixed responses, pre-compute when inputs are constrained, use UI components, or classic caching and lookups.

## Feeds

[Cost and latency optimization](../concepts/cost-and-latency-optimization.md)

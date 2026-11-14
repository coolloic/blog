---
title: "Source: Non-determinism in GPT-4 is caused by Sparse MoE (152334H, 2023)"
summary: "Blog post hypothesising that batch-level expert capacity limits in sparse MoE explain GPT-4's temperature-0 non-determinism, with a small API experiment and explicit caveats."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** personal blog post (hypothesis plus small experiment)
- **Author:** 152334H (pseudonymous)
- **Date:** 5 August 2023
- **Original:** [152334h.github.io/blog/non-determinism-in-gpt-4](https://152334h.github.io/blog/non-determinism-in-gpt-4/)

## Summary

Argues that in a capacity-limited sparse MoE, tokens from different requests in the same batch compete for expert slots, so a sequence's output depends on its batch-mates. Cites the Soft MoE paper's observation that such models are deterministic only at the batch level. Treats this as a hypothesis, not a proof.

## Key claims

- 30 temperature-0 completions per model (`max_tokens=128`, three repeats): GPT-4 averaged about 11.7 unique outputs, gpt-3.5-turbo about 3.7, text-davinci-003 3.0, text-davinci-001 2.0; base davinci models gave 1.
- The author notes the data shows GPT-4 is much less deterministic but does not prove MoE is the cause; model size is an alternative explanation.
- The claim that GPT-3.5-turbo is MoE is labelled speculation; the author says the whole hypothesis may be wrong.

## Feeds

[LLM non-determinism](../concepts/llm-non-determinism.md)

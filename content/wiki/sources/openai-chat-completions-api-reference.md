---
title: "Source: Chat Completions API reference (OpenAI)"
summary: "OpenAI's reference for chat completion parameters: temperature, top_p, stop, max_completion_tokens, seed, penalties, logit_bias and logprobs."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** official API reference
- **Author:** OpenAI
- **Date:** accessed 2026-11-14
- **Original:** [Create chat completion](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create)

## Summary

Lists the sampling and length controls on OpenAI's Chat Completions endpoint, with ranges and defaults.

## Key claims

- temperature: 0-2, default 1; top_p: 0-1, default 1; OpenAI recommends changing one or the other, not both.
- stop: up to 4 sequences, not included in the output; unsupported on reasoning models o3 and o4-mini.
- max_tokens is deprecated in favour of max_completion_tokens, which bounds visible plus reasoning tokens; max_tokens is incompatible with o-series models.
- seed is a beta best-effort determinism feature; system_fingerprint reveals backend changes that break it.
- frequency_penalty and presence_penalty: -2.0 to 2.0, default 0.
- logit_bias adds -100..100 to token logits before sampling; +/-100 effectively forces or bans a token.
- logprobs / top_logprobs (0-20) expose per-token log-probabilities; n (1-128) generates multiple choices, all billed.

## Feeds

[Sampling parameters](../concepts/sampling-parameters.md)

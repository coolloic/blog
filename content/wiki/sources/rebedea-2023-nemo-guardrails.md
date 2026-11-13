---
title: "Source: NeMo Guardrails: A Toolkit for Controllable and Safe LLM Applications with Programmable Rails"
summary: "EMNLP 2023 demo paper introducing NeMo Guardrails: a dialogue-manager runtime that enforces Colang rails with three chained LLM calls."
category: source
lastmod: 2026-11-14
tags: ["security", "guardrails", "papers"]
---

- **What:** system/demo paper (arXiv:2310.10501), EMNLP 2023 Demo track
- **Authors:** Traian Rebedea, Razvan Dinu, Makesh Sreedhar, Christopher Parisien, Jonathan Cohen (NVIDIA)
- **Date:** 16 October 2023
- **Original:** [arxiv.org/abs/2310.10501](https://arxiv.org/abs/2310.10501)

## Summary

The paper argues for guardrails that are programmable at runtime, independent of the model and interpretable, as a complement to alignment baked in during training. The runtime acts as a proxy and dialogue manager: it maps user messages to canonical forms, matches them against developer-written flows, and only then generates the reply.

## Key claims

- Three-step topical flow: (1) LLM generates the user's canonical form using few-shot examples retrieved by vector similarity (Annoy/FAISS); (2) the dialogue manager follows a matching flow or the LLM generalises from similar flows to choose the next step; (3) the LLM generates the bot message conditioned on that step.
- Temperature 0 for the first two steps, higher (0.7 to 1) for the bot message.
- The three calls are sequential and cannot be batched: roughly 3x the latency and cost of a plain call.
- Moderation rails are yes/no queries to a separate LLM, on input (jailbreak check) and output.
- On 200 Anthropic red-team/helpful prompts (balanced), gpt-3.5-turbo alone refused 93% of harmful prompts; with input+output rails it blocked about 99% of harmful and about 2% of helpful ones. text-davinci-003 went from 24% (no rails) to 87% (input rail only, 3% helpful blocked) and 97% (both rails, 5% helpful blocked). Source: Appendix G.
- Fact-checking rail reached about 80% accuracy on MSMARCO; topical rails needed at least 3 examples per canonical form.
- Limitations: not a sole safety layer, quality depends on prompts, adds cost and latency, reference rails need customisation, moderation is subjective.

## Feeds

[Guardrail tooling](../concepts/guardrail-tooling.md)

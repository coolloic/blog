---
title: "Source: How to make your completions outputs consistent with the new seed parameter (OpenAI Cookbook)"
summary: "OpenAI Cookbook notebook introducing the beta seed parameter and system_fingerprint, and what 'mostly deterministic' means for the API."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** official cookbook notebook (now marked archived)
- **Author:** OpenAI
- **Date:** late 2023 (written against the November 2023 `-1106` models); accessed 2026-11-14
- **Original:** [Reproducible outputs with the seed parameter](https://developers.openai.com/cookbook/examples/reproducible_outputs_with_the_seed_parameter)

## Summary

Explains OpenAI's best-effort determinism feature: send the same integer `seed` and the same parameters, and compare `system_fingerprint` across responses to detect backend changes that would break reproducibility.

## Key claims

- `seed` requests best-effort deterministic sampling; outputs should mostly match, but determinism is not guaranteed.
- Conditions: same seed, same prompt and parameters (temperature, top_p, max_tokens, ...), and matching `system_fingerprint`.
- `system_fingerprint` identifies the backend configuration (weights, infrastructure, settings); OpenAI expects it to change a few times a year.
- Even with all conditions met, outputs can occasionally differ because of inherent model non-determinism.
- At launch the feature was beta and limited to `gpt-4-1106-preview` and `gpt-3.5-turbo-1106`.
- In the notebook's example, seeded temperature-0 runs were much closer to each other than unseeded ones, but not reported as identical.

## Feeds

[LLM non-determinism](../concepts/llm-non-determinism.md)

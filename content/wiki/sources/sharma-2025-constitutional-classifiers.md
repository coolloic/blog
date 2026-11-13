---
title: "Source: Constitutional Classifiers: Defending against Universal Jailbreaks"
summary: "Anthropic's January 2025 paper on input and output classifiers trained on constitution-generated synthetic data, with red-teaming and cost results."
category: source
lastmod: 2026-11-14
tags: ["security", "jailbreaks", "papers", "anthropic"]
---

- **What:** research paper (arXiv:2501.18837)
- **Authors:** Mrinank Sharma, Meg Tong and 41 co-authors (Anthropic)
- **Date:** 31 January 2025
- **Original:** [arxiv.org/abs/2501.18837](https://arxiv.org/abs/2501.18837)

## Summary

The paper targets universal jailbreaks: reusable prompting strategies that unlock harmful help across many queries. It guards a model with classifiers trained on synthetic data that an LLM generates from a natural-language "constitution" listing allowed and disallowed content, so the policy can be updated by editing the constitution and regenerating data.

## Key claims

- Classifiers are trained on synthetic data produced by prompting LLMs with a constitution of permitted and restricted content.
- Over an estimated 3,000+ hours of red teaming, no participant found a universal jailbreak that extracted information at a detail level similar to an unguarded model across most target queries.
- Enhanced classifiers held up in automated evaluations against held-out domain-specific jailbreaks.
- Cost in deployment: +0.38 percentage points absolute refusal rate on production traffic and 23.7% inference overhead.

## Feeds

[Guardrail tooling](../concepts/guardrail-tooling.md) · [Content moderation](../concepts/content-moderation.md) · [Jailbreaks](../concepts/jailbreaks.md)

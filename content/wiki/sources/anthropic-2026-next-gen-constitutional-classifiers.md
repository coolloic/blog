---
title: "Source: Next-generation Constitutional Classifiers (Anthropic)"
summary: "Anthropic (Jan 2026): an exchange classifier plus a cascade of activation probes cuts jailbreak-defence overhead to about 1% compute and benign refusals to 0.05%."
category: source
lastmod: 2026-11-14
tags: ["security", "jailbreaks", "anthropic", "vendor-blog"]
---

- **What:** research post (Constitutional Classifiers++)
- **Publisher:** Anthropic
- **Date:** 2026-01-09
- **Original:** [anthropic.com/research/next-generation-constitutional-classifiers](https://www.anthropic.com/research/next-generation-constitutional-classifiers)

## Summary

Successor to the 2025 Constitutional Classifiers. Replaces separate input and output classifiers with an **exchange classifier** that judges an output in the context of its input, and arranges detection as a **cascade**: a cheap linear probe on the model's internal activations screens all traffic, and only flagged exchanges go to a costlier probe-plus-classifier ensemble.

## Key claims

- About 1% extra compute if applied to Claude Opus 4.0 traffic, versus 23.7% for the first generation.
- 0.05% refusal rate on harmless queries over a month of Claude Sonnet 4.5 traffic, 87% lower than the original system.
- Activation probes reuse computation the model already does and are harder to manipulate than output text.
- Red teaming: over 1,700 hours and 198,000 attempts found one high-risk vulnerability; no universal jailbreak found.
- The exchange classifier alone halved successful human red-team jailbreaks but cost 50% more compute, motivating the cascade.

## Feeds

[Jailbreaks](../concepts/jailbreaks.md)

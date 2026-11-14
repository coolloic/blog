---
title: "Source: A postmortem of three recent issues (Anthropic, 2025)"
summary: "Anthropic's postmortem of three August-September 2025 infrastructure bugs that degraded Claude output, including a bf16/fp32 precision mismatch and an XLA:TPU approximate top-k miscompilation."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** engineering postmortem
- **Author:** Anthropic
- **Date:** 17 September 2025
- **Original:** [A postmortem of three recent issues](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues)

## Summary

Explains three overlapping serving bugs: a context-window routing error, a TPU misconfiguration that corrupted outputs, and an approximate top-k miscompilation in XLA:TPU. The third is a case study in how numerical precision and compiler behaviour, not the model weights, change which token gets picked.

## Key claims

- Routing bug: some Sonnet 4 requests went to servers configured for the upcoming 1M-token context; at the worst hour 16% of Sonnet 4 requests were affected, and sticky routing kept users on the wrong servers.
- Output corruption (from 25 August): a TPU misconfiguration occasionally gave high probability to unlikely tokens, e.g. Thai characters in English replies.
- Precision mismatch: next-token probabilities are computed in bf16, but the XLA compiler may promote some operations to fp32 (flag `xla_allow_excess_precision`, on by default), so operations disagreed about the top token.
- A December 2024 workaround for temperature 0 had masked a deeper approximate top-k bug that appeared only for some batch sizes and configurations and depended on surrounding operations, so it was hard to reproduce.
- Fix: switch from approximate to exact top-k and standardise some operations on fp32, accepting a small efficiency cost; exact top-k can slightly change which tokens fall inside a top-p threshold.
- Serving one model across Trainium, GPUs and TPUs requires strict equivalence testing.

## Feeds

[LLM non-determinism](../concepts/llm-non-determinism.md)

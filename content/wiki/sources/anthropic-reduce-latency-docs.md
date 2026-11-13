---
title: "Source: Reducing latency (Anthropic docs)"
summary: "Anthropic's latency guidance: measure baseline latency and TTFT, pick a faster model and lower effort, trim prompt and output tokens, and stream."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "latency", "anthropic"]
---

- **What:** official API documentation page
- **Publisher:** Anthropic
- **Date:** accessed 2026-11-14
- **Original:** [Reducing latency](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency)

## Summary

Short guide to latency for Claude applications. It advises getting a prompt that works first and only then optimising latency, because premature constraints hide what top quality looks like.

## Key claims

- Two measures: baseline latency (whole request) and time to first token (TTFT), the latter key for streaming UIs.
- Model choice is the most direct lever; Claude Haiku 5.5 is named as the fastest model (2026-11), with effort (`output_config.effort`, `low` cheapest and fastest) as its main speed/cost control.
- Fewer input and output tokens means faster responses; ask for sentence or paragraph limits rather than word counts, since the model counts tokens.
- `max_tokens` is a hard cut that can stop mid-sentence; best for short answers that come first.
- Streaming improves perceived responsiveness and lets the app process output as it arrives.

## Feeds

[Cost and latency optimization](../concepts/cost-and-latency-optimization.md)

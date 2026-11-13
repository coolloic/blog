---
title: "Source: Claude models overview (Anthropic)"
summary: "Anthropic's model catalogue: current Claude lineup, IDs, context windows, output limits, prices, cutoffs and retirement dates."
category: source
lastmod: 2026-11-14
tags: ["models", "anthropic"]
---

- **What:** official API documentation page
- **Publisher:** Anthropic
- **Date:** accessed 2026-11-14 (page lists retirement commitments to late 2027)
- **Original:** [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)

## Summary

The canonical table of Claude models. Four current tiers are presented (Fable, Opus, Sonnet, Haiku) plus a limited-access Mythos line, with per-platform model IDs (Claude API, Bedrock, Google Cloud, Microsoft Foundry, Claude Platform on AWS), and a Models API that reports token limits and capabilities programmatically.

## Key claims

- As of 2026-11-14 the current lineup is Claude Fable 5.2 ($8/$40 per MTok), Opus 5.5 ($4/$20), Sonnet 5.5 ($2/$10) and Haiku 5.5 (from $0.10/$0.50).
- All four current models have a 1M-token context window, 128K max output (synchronous), and a reliable knowledge cutoff of June 2026.
- Default recommendation: start with Opus 5.5; use Fable 5.2 for demanding reasoning and long-horizon agentic work or when Opus 5.5 at higher effort falls short.
- Comparative latency: Fable and Opus moderate, Sonnet fast, Haiku fastest.
- Thinking is adaptive (model decides how much to think, steered by an effort parameter); on Fable 5.2 and Opus 5.5 it is always on. Default effort is `high` on Fable 5.2 and Sonnet 5.5, `medium` on Opus 5.5 and Haiku 5.5.
- Batch API is 50% off; cache reads cost 10% of base input (2.5% on Fable 5.x, 5% on Opus 5.5 and Sonnet 5.5).
- Claude Mythos 5.2 has Fable 5.2's capabilities but is limited to organisations verified through Anthropic programmes (e.g. cyber verification).
- Every model ID is a pinned snapshot, including the dateless IDs used from the 4.6 generation on.
- On the Batch API several current models support up to 300K output tokens with a beta header.
- Older models remain listed (e.g. Opus 4.5 and Haiku 4.5 at 200K context); some 4.x models are retired on the first-party API but still served on partner clouds.
- The Models API returns `max_input_tokens`, `max_tokens` and a `capabilities` object, including whether thinking can be disabled.

## Feeds

[Frontier model landscape](../concepts/frontier-model-landscape.md) · [Model selection](../concepts/model-selection.md)

---
title: "Source: Models and pricing (xAI docs)"
summary: "xAI's Grok model list with context windows, per-token prices, cached-input prices and the 200K long-context price step."
category: source
lastmod: 2026-11-14
tags: ["models", "xai"]
---

- **What:** official API documentation page
- **Publisher:** xAI
- **Date:** accessed 2026-11-14
- **Original:** [Models and pricing](https://docs.x.ai/docs/models)

## Summary

Lists Grok text models, their context windows and prices, and explains model aliasing.

## Key claims

- Grok 4.7 (recommended for code and chat): 500K context, $2/$6 per MTok below 200K prompt tokens ($0.50 cached input), doubling to $4/$12 at or above 200K; knowledge cutoff May 2026.
- Grok 4.3 and Grok 4.20 variants have 1M context at $1.25/$2.50 ($0.20 cached input); grok-4.20 ships reasoning, non-reasoning and multi-agent variants. Grok 4.5 caches at $0.30, so cached input runs 0.15x to 0.25x of base.
- The page lists no batch discount; it notes that not every model accepts Batch API requests.
- grok-build-0.1: 256K context, $1/$2.
- Once a prompt reaches 200K tokens, the higher rate applies to all tokens in the request.
- Aliases: `<model>` is latest stable, `<model>-latest` is latest, `<model>-<date>` is pinned.
- `logprobs` are not supported on grok-4.20 and newer.

## Feeds

[Frontier model landscape](../concepts/frontier-model-landscape.md) · [Model selection](../concepts/model-selection.md)

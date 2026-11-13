---
title: "Source: OpenAI API pricing, containers row"
summary: "OpenAI's price list for hosted containers (Code Interpreter and hosted shell) by memory tier, read 2026-11-14."
category: source
lastmod: 2026-11-14
tags: ["agents", "pricing", "sandboxing"]
---

- **What:** official pricing page (containers section only)
- **Publisher:** OpenAI
- **Date:** read 2026-11-14 (prices change)
- **Original:** [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)

## Summary

Containers used by Code Interpreter and the hosted shell tool share one price row, tiered by memory. Tokens are billed separately at the model's rates.

## Key claims

- Per container session: 1 GB USD 0.03; 4 GB USD 0.12; 16 GB USD 0.48; 64 GB USD 1.92 (GB = GiB).
- The table labels these per 20-minute session, while a footnote says eligible sessions are billed per minute with a 5-minute minimum; the page does not reconcile the two.
- Hosted shell has no separate price; it uses the containers row.

## Feeds

- [Code execution sandboxes](../concepts/code-execution-sandboxes.md)

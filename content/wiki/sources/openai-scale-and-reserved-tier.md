---
title: "Source: OpenAI — Scale Tier and Reserved Tier pages"
summary: "OpenAI's committed-capacity offerings: Scale Tier token units (30-day minimum, 99.9% uptime SLA) for models before GPT-5.6, and Enterprise Reserved Tier ($/minute reservations) for GPT-5.6 onward."
category: source
lastmod: 2026-11-14
tags: ["platforms", "capacity"]
---

- **What:** vendor product pages
- **Publisher:** OpenAI
- **Date:** undated, read 2026-11-14 via search-result extracts (direct fetch returned HTTP 403; verify on the live pages)
- **Original:** [API Scale Tier](https://openai.com/api-scale-tier/) and [API Reserved Tier](https://openai.com/api-reserved-tier/)

## Summary

The two pages describe OpenAI's direct-API equivalents of provisioned throughput. Scale Tier sells per-minute token units for one model snapshot; Reserved Tier, for GPT-5.6 and later, sells a per-minute dollar budget.

## Key claims

- Scale Tier: buy input/output tokens-per-minute "units" for a specific model snapshot, with a 30-day minimum commitment, prioritized compute and a 99.9% uptime SLA. Older models sold separate input and output units (GPT-4.1: one input unit of 30K input TPM at $110/day); newer ones sell a combined bundle where input, cached input and output draw down at different rates.
- Scale Tier applies to models released before GPT-5.6; GPT-5.6 onward uses Reserved Tier.
- Reserved Tier (Enterprise, via sales): reserve a dollar amount per minute for one model. Standard and Fast-mode usage within it is covered; Batch and Flex are excluded; usage above it is billed pay-as-you-go. Purchases raise rate limits to secure capacity at peak.

## Feeds

[Provisioned throughput](../concepts/provisioned-throughput.md)

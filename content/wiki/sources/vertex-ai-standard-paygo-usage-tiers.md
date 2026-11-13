---
title: "Source: Vertex AI — Standard PayGo and Usage Tiers"
summary: "How Gemini's shared-capacity pay-as-you-go works: spend-based org-level TPM tiers, 429 semantics and endpoint choice."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gcp", "quotas"]
---

- **What:** vendor documentation
- **Author:** Google Cloud
- **Date:** undated, read 2026-11-14
- **Original:** [Standard pay-as-you-go](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/dynamic-shared-quota)

## Summary

The page that replaced Dynamic Shared Quota documentation. It explains that Standard PayGo runs on a shared pool with prioritized thresholds set by usage tier.

## Key claims

- Capacity is shared; Standard PayGo gives no dedicated capacity or assured throughput under contention.
- Each usage tier sets an org-level prioritized TPM threshold per model; traffic above it may still be served but is throttled first. No separate RPM limit.
- Tiers follow 30-day spend on eligible services: Tier 1 $10–250, Tier 2 $250–2,000, Tier 3 $2,000–50,000, Tier 4 above $50,000.
- TPM thresholds: Pro/Carbon/Argon 0.5M/1M/2M/10M; Flash/Flash-Lite/Hydrogen 2M/4M/10M/50M (tiers 1–4).
- A 429 means temporary contention, not a fixed quota. Back off exponentially and smooth spikes within each minute.
- The `global` endpoint has the lowest 429 likelihood and single-region endpoints the highest.
- Tiers don't apply to preview, image or Omni models. PT commitments count toward tier spend.

## Feeds

[Google Vertex AI](../concepts/google-vertex-ai.md)

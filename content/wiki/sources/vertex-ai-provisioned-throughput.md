---
title: "Source: Vertex AI — Provisioned Throughput (Overview and GSU Sizing)"
summary: "Vertex AI's fixed-term reserved capacity, measured in generative AI scale units (GSUs) with per-model burndown rates."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gcp", "capacity"]
---

- **What:** vendor documentation
- **Author:** Google Cloud
- **Date:** undated, read 2026-11-14
- **Original:** [Provisioned Throughput overview](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput/overview)
- **Original:** [Calculate Provisioned Throughput requirements](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput/measure-provisioned-throughput)

## Summary

The overview positions Provisioned Throughput (PT) as a fixed-cost, fixed-term subscription. The sizing page explains GSUs and burndown arithmetic.

## Key claims

- PT reserves throughput for a model in chosen locations at a fixed weekly or monthly price; aimed at real-time production and predictable cost.
- A GSU is a unit of throughput. Inputs and outputs are converted to input-token-equivalents per second via burndown rates.
- Gemini 3.6 Flash example: 675 tokens/s per GSU, minimum purchase 1 GSU; input tokens 1×, cached input 0.1×, output 5×.
- Required GSUs = (input + output-equivalent tokens per query × QPS) / per-GSU throughput, rounded up (worked example: 30,000 tokens/s → 45 GSUs).
- PT requests are served ahead of on-demand; unused throughput doesn't roll over.

## Feeds

[Google Vertex AI](../concepts/google-vertex-ai.md)

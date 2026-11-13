---
title: "Source: Vertex AI — Generative AI and Data Governance"
summary: "What Google stores and for how long when you call Gemini and partner models: training restriction, caching, abuse logging, grounding and zero data retention."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gcp", "security"]
---

- **What:** vendor documentation
- **Author:** Google Cloud
- **Date:** undated, read 2026-11-14
- **Original:** [Generative AI and data governance](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/data-governance)

## Summary

Lists every place customer data may persist and how to switch each off to reach zero data retention (ZDR).

## Key claims

- Customer data is not used to train or fine-tune models without prior permission or instruction.
- Implicit caching is on by default: in-memory and durable caches are project-scoped and deleted within 24 hours. Durable cache lacks CMEK; you can disable durable caching or all caching per project.
- Abuse-monitoring prompt logging may apply; request-response logging to BigQuery is off by default and must stay off for ZDR.
- Grounding with Google Search keeps query logs up to 3 days (can't disable), and Google Maps grounding keeps data 30 days. Web Grounding for Enterprise is the ZDR-compatible choice.
- Live API session resumption (24 h) and the Interactions API's `store` (default `true`) must be off for ZDR.
- Partner OpenAI models: ZDR is off by default and approved per project. Without it, data is logged up to 30 days in the `us` multi-region, and `store: false` alone doesn't enable ZDR.

## Feeds

[Google Vertex AI](../concepts/google-vertex-ai.md)

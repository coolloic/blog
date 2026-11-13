---
title: "Source: Vertex AI — Generative AI Locations and Endpoints"
summary: "Global, multi-region (us/eu) and regional endpoints for Gemini on Vertex AI, and what each implies for data residency and features."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gcp", "data-residency"]
---

- **What:** vendor documentation
- **Author:** Google Cloud
- **Date:** undated, read 2026-11-14
- **Original:** [Generative AI locations](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations)

## Summary

Explains the three endpoint types for generative AI on Vertex AI (now Gemini Enterprise Agent Platform) and the trade-offs between availability and in-jurisdiction processing.

## Key claims

- Regional endpoints (e.g. `us-central1`) route to one region; multi-region endpoints use location `us` or `eu` and hostnames like `aiplatform.us.rep.googleapis.com`; the `global` endpoint routes worldwide.
- The page says endpoints alone don't guarantee data residency or in-region ML processing; multi-region endpoints are the option for keeping ML processing inside the US or EU.
- Don't use `global` if you have ML-processing location requirements; for partner models it does not support data residency.
- `global` gives higher availability and fewer 429s.
- Not available on `global`: tuning, batch prediction for Anthropic and open MaaS models, RAG corpora (RAG requests work), and Provisioned Throughput except for listed models.
- Private Google Access doesn't work with multi-region endpoints; use Private Service Connect.
- Python: `vertexai.init(location=...)` (google-cloud-aiplatform ≥ 1.79.0) or the `genai` client with `enterprise=True`.

## Feeds

[Google Vertex AI](../concepts/google-vertex-ai.md)

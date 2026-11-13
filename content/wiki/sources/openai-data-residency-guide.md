---
title: "Source: OpenAI API data residency guide"
summary: "OpenAI's regional API domains: ten storage regions, of which only some run inference in-region; per-project or per-request selection and a 10% uplift for newer models."
category: source
lastmod: 2026-11-14
tags: ["privacy", "openai", "enterprise"]
---

- **What:** official API documentation
- **Publisher:** OpenAI
- **Date:** accessed 2026-11-14
- **Original:** [Data residency guide](https://developers.openai.com/api/docs/guides/data-residency)

## Summary

Distinguishes regional **storage** (customer content at rest) from regional **processing** (inference). Many regions are storage-only, and several features fall back to out-of-region processing.

## Key claims

- Storage and processing in-region: US (`us.api.openai.com`), Europe/EEA+Switzerland (`eu.`), UAE (`ae.`, limited models, contact sales); Australia, Japan, India process in-region only for `gpt-6-luna` (Chat Completions and Responses, Standard pay-as-you-go, no hosted tools; India also via sales).
- Storage-only (inference may run elsewhere): Canada, Singapore, South Korea, UK.
- Region is fixed per project at creation; a Global project created with "per-request data residency" can instead target a regional domain per request.
- Models released on or after 2026-03-05 carry a 10% price uplift on data-residency endpoints.
- Caveats: `store=true` on chat completions is not allowed outside the US; in regions without regional processing, extended prompt caching may process and temporarily store data outside the region; files and vector stores are storage-only; Realtime tracing is not EU-residency compliant; system data is excluded.

## Feeds

[PII and data privacy](../concepts/pii-and-data-privacy.md)

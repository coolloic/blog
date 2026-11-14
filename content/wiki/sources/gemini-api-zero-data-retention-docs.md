---
title: "Source: Gemini Developer API — Zero data retention"
summary: "Google's page on reaching zero data retention with the Gemini Developer API: no single switch, a per-feature checklist, and a pointer to Vertex AI for guaranteed ZDR."
category: source
lastmod: 2026-11-14
tags: ["privacy", "google", "enterprise"]
---

- **What:** official API documentation
- **Publisher:** Google
- **Date:** undated; accessed 2026-11-14
- **Original:** [Zero data retention](https://ai.google.dev/gemini-api/docs/zdr) (now served from aistudio.google.com/docs/zdr)

## Summary

Treats ZDR on the Gemini Developer API (AI Studio keys) as an outcome of how you configure features, not a contract or toggle. Each retaining feature is listed with how to avoid it. For workloads that need guaranteed ZDR or enterprise data-processing agreements, it sends readers to Vertex AI (Gemini Enterprise Agent Platform).

## Key claims

- On Paid Services, prompts, system instructions, cached content, files and responses are not used to improve Google products.
- Abuse monitoring: on Paid Services, prompts and responses are logged for a limited period solely to detect policy violations (no number given on this page).
- Grounding with Google Search and with Google Maps each store prompts, context and output for 30 days; the storage cannot be disabled.
- Interactions API stores state by default; set `store` to `false`.
- Live API: avoid session resumption; a resumption handle keeps text, audio and video state up to 24 hours.
- Files API uploads persist until deleted or expired, separately from logging.
- Explicit context caching keeps content for the TTL you set; avoid it for zero footprint.
- Implicit caching is on by default, held in RAM, isolated per project, 24-hour TTL; Google says it does not breach ZDR.

## Feeds

[Data retention and residency](../concepts/data-retention-and-residency.md)

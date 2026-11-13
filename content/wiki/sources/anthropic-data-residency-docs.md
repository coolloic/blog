---
title: "Source: Claude API data residency docs"
summary: "Anthropic's per-request inference_geo (global or us, at 1.1x price for US-only) and immutable workspace geo for storage at rest."
category: source
lastmod: 2026-11-14
tags: ["privacy", "anthropic", "enterprise"]
---

- **What:** official API documentation
- **Publisher:** Anthropic
- **Date:** accessed 2026-11-14
- **Original:** [Data residency](https://platform.claude.com/docs/en/manage-claude/data-residency)

## Summary

Separates where inference runs from where data is stored, and shows how to enforce both per workspace.

## Key claims

- **Inference geo:** `inference_geo` on `POST /v1/messages` (or a workspace default): `"global"` (default, any geography) or `"us"` (US infrastructure only). The response `usage.inference_geo` reports where inference actually ran.
- **Workspace geo:** where data is stored at rest and where endpoint-side processing (image transcoding, code execution) runs; set at workspace creation, immutable; only `"us"` exists today.
- Workspace policy: `allowed_inference_geos` (requests outside it error) and `default_inference_geo`, settable in Console or Admin API (`data_residency`). Legacy US-only opt-outs were migrated to `allowed_inference_geos: ["us"]`.
- Supported on Claude 4.6 and later; earlier models return 400 if the parameter is sent. Supported in the Batch API per request.
- Pricing: US-only inference is 1.1x on all token categories for Claude 4.6+ models; it also burns Priority Tier capacity at 1.1x.
- Also available on Claude Platform on AWS and Anthropic-managed Claude on Google Cloud (workspace geo not configurable there). Not applicable on Bedrock or Google-managed Vertex (region set by endpoint or inference profile), nor on Microsoft Foundry (use US Data Zone Standard), nor the OpenAI-compatible endpoint.
- Rate limits are shared across geos. Eligible for ZDR (except Covered Models) and HIPAA readiness.

## Feeds

[PII and data privacy](../concepts/pii-and-data-privacy.md)

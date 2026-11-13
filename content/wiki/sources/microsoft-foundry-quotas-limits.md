---
title: "Source: Microsoft Foundry — Azure OpenAI Quotas and Limits"
summary: "Foundry's quota model: subscription-level pools, automatic quota tiers (Free + Tiers 1–6), TPM/RPM per model and deployment type, and hard service limits."
category: source
lastmod: 2026-11-14
tags: ["platforms", "azure", "quotas"]
---

- **What:** vendor documentation
- **Author:** Microsoft
- **Date:** ms.date 2026-08-20, read 2026-11-14
- **Original:** [Azure OpenAI in Microsoft Foundry Models quotas and limits](https://learn.microsoft.com/en-us/azure/foundry/openai/quotas-limits)

## Summary

Reference tables for TPM/RPM by tier and model, plus resource-level limits.

## Key claims

- Quota is scoped no higher than the subscription. After May 7, 2026 quota is moving to subscription-level pools, starting with Realtime Translate and Realtime Whisper and later all models: Global Standard shares one pool across regions per model/version, Data Zone Standard one pool per zone.
- Seven quota tiers (Free/Tier 0, 1–6; Free can't request increases) are assigned by usage, Microsoft relationship (EA/MCA-E) and payment history, and upgrade automatically unless you opt out (`NoAutoUpgrade`).
- RPM is tied to TPM per model version (e.g. 10 RPM or 1 RPM per 1,000 TPM for different `gpt-chat-latest` versions).
- Example Tier 1: gpt-4.1 Global Standard 1M TPM / 1,000 RPM; gpt-5 Global Standard 250K TPM.
- Limits: 30 Azure OpenAI resources per region per subscription, 32 standard deployments per resource, 128 tools per chat request, 2,048 embedding inputs per request, 100,000 PTUs max per deployment.
- Batch: up to 200 MB per input file (1 GB with bring-your-own storage).

## Feeds

[Azure AI Foundry](../concepts/azure-ai-foundry.md)

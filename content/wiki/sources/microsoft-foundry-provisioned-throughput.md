---
title: "Source: Microsoft Foundry — Provisioned Throughput (PTU)"
summary: "How Foundry's provisioned throughput units work: model-independent quota, separate capacity, sizing, spillover, hourly billing and reservations."
category: source
lastmod: 2026-11-14
tags: ["platforms", "azure", "capacity"]
---

- **What:** vendor documentation
- **Author:** Microsoft
- **Date:** ms.date 2026-07-15, read 2026-11-14
- **Original:** [Provisioned throughput for Foundry Models](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/provisioned-throughput)

## Summary

Concept page for dedicated-capacity deployments.

## Key claims

- A PTU is a fixed amount of model processing capacity held for your deployment whether or not it is used.
- PTU quota is model-independent but scoped per subscription, region and deployment type (Global/Data Zone/Regional are separate pools). Each model has a minimum PTU count and its own TPM-per-PTU.
- Quota is not capacity: deployments can fail for lack of regional capacity, and scaling down releases capacity you may not get back.
- Sizing combines RPM, input/output token sizes, an output-to-input weighting and the cache rate. Cached tokens don't consume PTU for models before GPT-6 Astra; for later models count cache reads and writes.
- Spillover can route 429/non-200 overflow to a standard deployment in the same resource, globally or per request via the `x-ms-spillover-deployment` header. Only Azure OpenAI models support it, not DeepSeek or Llama.
- Billing is hourly $/PTU/hr from creation to deletion, or discounted via 1-month or 1-year Azure Reservations. Reservations are decoupled from deployments and don't guarantee capacity: deploy first, then reserve.
- Priority processing is a pay-per-token alternative with a per-model latency target.

## Feeds

[Azure AI Foundry](../concepts/azure-ai-foundry.md)

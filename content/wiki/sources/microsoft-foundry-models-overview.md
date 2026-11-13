---
title: "Source: Microsoft Foundry — Foundry Models Overview"
summary: "Foundry's model catalogue: models sold by Azure vs partner/community models, serverless vs managed-compute deployment, billing and content-safety differences."
category: source
lastmod: 2026-11-14
tags: ["platforms", "azure", "models"]
---

- **What:** vendor documentation
- **Author:** Microsoft
- **Date:** ms.date 2026-07-28, read 2026-11-14
- **Original:** [Microsoft Foundry Models overview](https://learn.microsoft.com/en-us/azure/foundry/concepts/foundry-models-overview)

## Summary

Explains the two catalogue categories and the two deployment options.

## Key claims

- 10,000+ models, about 50 added per month, in two categories: models sold by Azure (Microsoft-hosted, Microsoft Product Terms, Microsoft support and SLAs, some with fungible PTU) and models from partners and community (e.g. Anthropic Claude, Hugging Face).
- Claude in Foundry is governed by Anthropic's data processing addendum and commercial terms.
- Serverless deployment: Microsoft-hosted API billed per token, with partner models billed through Azure Marketplace. Managed compute: weights on dedicated VMs billed per core-hour, which needs a hub-based (classic) project.
- Serverless language models get default Content Safety filters (billed separately); embedding and time-series models have none. Filtering applies only through the Azure OpenAI v1 APIs unless you add Content Safety yourself.
- Serverless endpoints follow the resource's public-network-access flag; hubs with private endpoints created before July 11, 2024 need re-creation.

## Feeds

[Azure AI Foundry](../concepts/azure-ai-foundry.md)

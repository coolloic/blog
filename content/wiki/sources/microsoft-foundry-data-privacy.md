---
title: "Source: Microsoft Foundry — Data, Privacy and Security for Models Sold by Azure"
summary: "Microsoft's data-handling commitments for Azure OpenAI and other models sold by Azure: no training use, processing location by deployment type, stored-state features and abuse monitoring."
category: source
lastmod: 2026-11-14
tags: ["platforms", "azure", "security"]
---

- **What:** vendor documentation
- **Author:** Microsoft
- **Date:** ms.date 2026-05-18 (changelog through Oct 2025), read 2026-11-14
- **Original:** [Data, privacy, and security for Foundry Models sold by Azure](https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/data-privacy)

## Summary

The privacy reference enterprises cite for Azure OpenAI.

## Key claims

- Prompts, completions, embeddings and training data are not available to other customers or to OpenAI or other model providers, and are not used to train foundation models without permission.
- Models are stateless. Azure-hosted models don't call OpenAI-operated services.
- Standard deployments process within the customer's geography; Global may process anywhere the model runs; DataZone processes within the zone. Data at rest, including the abuse-monitoring store, stays in the resource geography.
- Stateful features (Responses API storage, Assistants threads, stored completions, files, batch, fine-tuning) store data in the resource's geography, encrypted with AES-256 and optional CMEK; the customer can delete it.
- Abuse monitoring samples flagged traffic for automated (LLM) and, if needed, human review under JIT access; in the EEA, reviewers are in the EEA.
- Approved customers can get modified abuse monitoring (no storage or human review); verify via the `ContentLogging=false` capability.

## Feeds

[Azure AI Foundry](../concepts/azure-ai-foundry.md)

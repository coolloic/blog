---
title: "Source: Data, privacy, and security for Foundry Models sold by Azure"
summary: "Microsoft's statement of how Azure OpenAI and other Azure-sold models in Foundry process, store and monitor customer prompts, including Global/DataZone processing and modified abuse monitoring."
category: source
lastmod: 2026-11-14
tags: ["enterprise", "azure", "privacy"]
---

- **What:** official documentation (Responsible AI section)
- **Publisher:** Microsoft
- **Date:** ms.date 2026-05-18, last change-log entry 2025-10-03; accessed 2026-11-14
- **Original:** [Data, privacy, and security for Foundry Models sold by Azure](https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/openai/data-privacy)

## Summary

Lists the data types Foundry processes (prompts, uploads, stateful entities, grounding data, training data), where each is processed and stored, and how abuse monitoring works, including how to confirm that abuse-monitoring storage is turned off.

## Key claims

- Prompts, completions, embeddings and training data are not shared with other customers or with OpenAI and other model providers. They are not used to train foundation models without permission. Models are hosted in Azure and do not call OpenAI's services.
- Standard deployments process data in the customer's chosen geography. "Global" deployments may process data in any geography where the model runs; "DataZone" ones anywhere in the zone (e.g. any EU member state). Data at rest stays in the designated geography in both cases.
- Stored data (Files, Responses API, Assistants threads, stored completions, batch, fine-tuning) lives in the customer's resource. It is AES-256 encrypted by default, can use customer-managed keys, and can be deleted at any time.
- Abuse monitoring samples flagged prompts and completions for review, first by automated means including LLMs, then by humans if needed. Human reviewers use secure workstations with just-in-time approval; for EEA deployments they are located in the EEA.
- Approved customers can apply for modified abuse monitoring, which turns off storage and human review. Automated review can still happen. The resource then shows a `ContentLogging: false` capability.
- Preview features may not honour all of these commitments.

## Feeds

[Enterprise LLM deployment](../concepts/enterprise-llm-deployment.md)

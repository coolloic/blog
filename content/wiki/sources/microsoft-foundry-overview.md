---
title: "Source: Microsoft Foundry — What Is Microsoft Foundry?"
summary: "Microsoft's overview of Foundry (formerly Azure AI Studio / Azure AI Foundry): unified resource model, agents, models, tools and the classic-to-new migration map."
category: source
lastmod: 2026-11-14
tags: ["platforms", "azure"]
---

- **What:** vendor documentation
- **Author:** Microsoft
- **Date:** ms.date 2026-08-13, read 2026-11-14
- **Original:** [What is Microsoft Foundry?](https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry)

## Summary

Defines Foundry as one Azure resource provider that groups agents, models and tools under shared RBAC, networking and policy. Includes a table mapping old concepts to new ones.

## Key claims

- Brand history: Azure AI Studio → Azure AI Foundry → Microsoft Foundry; Azure AI Services → Foundry Tools.
- Resource model moved from Hub + Azure OpenAI + AI Services resources to a single Foundry resource with projects; hub-based projects live on in the "Foundry (classic)" portal.
- Azure OpenAI resources can be upgraded in place to Foundry resources, keeping endpoint, keys and state.
- Agent API moved from the Assistants API (threads/messages/runs) to the Responses API (conversations/items/responses, "Agents v2").
- API versioning moved from monthly `api-version` parameters to stable `/openai/v1/` routes; SDKs consolidate on `azure-ai-projects` 2.x plus the `OpenAI()` client against one project endpoint.
- Catalogue of 10,000+ models; agent types are prompt agents, voice-based prompt agents and hosted agents.

## Feeds

[Azure AI Foundry](../concepts/azure-ai-foundry.md)

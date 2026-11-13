---
title: "Source: Role-based access control for Azure OpenAI"
summary: "The built-in Azure RBAC roles for Azure OpenAI (OpenAI User, OpenAI Contributor, Cognitive Services Contributor, Usages Reader) and what each can and cannot do."
category: source
lastmod: 2026-11-14
tags: ["enterprise", "azure", "rbac"]
---

- **What:** official how-to (applies only to the Foundry (classic) portal)
- **Publisher:** Microsoft
- **Date:** ms.date 2026-09-10; accessed 2026-11-14
- **Original:** [Role-based access control for Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/role-based-access-control)

## Summary

Maps the four built-in roles to concrete capabilities, which shows how to split who calls the model from who deploys, tunes, or holds keys.

## Key claims

- Roles can be assigned to users, groups, service principals or managed identities, at resource, resource-group, subscription or management-group scope.
- **Cognitive Services OpenAI User:** can run inference with Microsoft Entra ID and use the playgrounds. Cannot see keys, deploy models, fine-tune or read stored completions.
- **Cognitive Services OpenAI Contributor:** adds deployments, fine-tuning, dataset upload and stored-completions access. Still no keys and no quota.
- **Cognitive Services Contributor:** can create resources, view and regenerate keys, create custom guardrails, and also deploy and fine-tune. It cannot make Entra ID inference calls or access quota.
- **Cognitive Services Usages Reader:** quota visibility, subscription scope only.
- Subscription-level Owner and Contributor are inherited and take priority over the Azure OpenAI roles applied at resource-group level. The page warns that using API keys (its example is Azure AI Search admin or query keys) bypasses Azure RBAC.

## Feeds

[Enterprise LLM deployment](../concepts/enterprise-llm-deployment.md)

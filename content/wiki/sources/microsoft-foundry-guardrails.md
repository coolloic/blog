---
title: "Source: Microsoft Foundry — Guardrails and Controls Overview"
summary: "Foundry's guardrails (formerly content filters): risks, four intervention points including agent tool calls, blocking levels, defaults and override rules."
category: source
lastmod: 2026-11-14
tags: ["platforms", "azure", "safety"]
---

- **What:** vendor documentation
- **Author:** Microsoft
- **Date:** ms.date 2026-10-20, read 2026-11-14
- **Original:** [Guardrails and controls overview in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview)

## Summary

Explains how a guardrail (a named set of controls) detects risks at chosen intervention points and either annotates or blocks.

## Key claims

- Risks: hate, sexual, self-harm, violence, user prompt attacks, indirect attacks, spotlighting (preview), protected material (text/code), groundedness (preview), PII (preview) and task adherence (preview).
- Intervention points: user input, output, and, for agents in preview, tool call and tool response.
- Blocking levels: Off, Low (blocks only high severity), Medium, High (blocks low and up). Turning output filtering off requires approval for modified guardrails.
- Models get `Microsoft.DefaultV2` by default. An agent's guardrail fully overrides its model's; without one it inherits the model deployment's.
- Groundedness detection in Azure OpenAI retires April 30, 2027.
- Guardrails apply only to agents built in Foundry Agent Service, not to other agents registered in the control plane. Hosted agents can add network egress controls (preview).

## Feeds

[Azure AI Foundry](../concepts/azure-ai-foundry.md)

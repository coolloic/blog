---
title: "Source: Microsoft Foundry — Agent Service Overview"
summary: "Foundry Agent Service: prompt, voice and hosted agents on the Responses API, toolboxes via MCP, Entra agent identity, VNet isolation and publishing."
category: source
lastmod: 2026-11-14
tags: ["platforms", "azure", "agents"]
---

- **What:** vendor documentation
- **Author:** Microsoft
- **Date:** ms.date 2026-10-26, read 2026-11-14
- **Original:** [What is Microsoft Foundry Agent Service?](https://learn.microsoft.com/en-us/azure/foundry/agents/overview)

## Summary

Overview of the managed agent platform inside Foundry and the spectrum from declarative to full-code agents.

## Key claims

- Prompt agents: declarative (instructions + model + tools), fully hosted, versioned; optional Microsoft Copilot harness (preview) for multi-step tool and skill workflows.
- Hosted agents: your container or .zip (Agent Framework, LangGraph, OpenAI Agents SDK, Anthropic Agent SDK or custom), run with a managed endpoint, autoscaling, a dedicated Entra identity and session state.
- Voice-based prompt agents run over Voice Live, either native speech-to-speech or a cascaded STT → text model → TTS pipeline (preview).
- Ephemeral agents: call the Responses API directly with the definition in your code.
- Toolboxes bundle tools (web search, file search, code interpreter, MCP servers, functions, OpenAPI) behind one managed MCP endpoint with central auth and versioning.
- MCP auth options: key, Entra managed identity, OAuth on-behalf-of passthrough, or none.
- Private networking for prompt agents; hosted agents support BYO VNet with VM-isolated sessions. Standard setup uses your own Storage, AI Search and Cosmos DB for state.
- Publishing to Teams, Microsoft 365 Copilot and the Entra Agent Registry; A2A v1.0 GA.

## Feeds

[Azure AI Foundry](../concepts/azure-ai-foundry.md)

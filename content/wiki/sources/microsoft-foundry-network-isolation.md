---
title: "Source: Microsoft Foundry — Configure Network Isolation"
summary: "Private endpoints, public network access, VNet injection for Agent Service, tool-by-tool private networking support and firewall allowlists."
category: source
lastmod: 2026-11-14
tags: ["platforms", "azure", "networking"]
---

- **What:** vendor documentation
- **Author:** Microsoft
- **Date:** ms.date 2026-09-29, read 2026-11-14
- **Original:** [How to configure network isolation for Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/how-to/configure-private-link)

## Summary

End-to-end guide to inbound (private endpoint) and outbound (VNet injection) isolation for Foundry, with the limitations.

## Key claims

- Inbound: the public network access flag can be Disabled (private endpoint only), Selected IPs, or Enabled. A private endpoint rewrites DNS to a `privatelink` subdomain so the same hostname resolves privately inside the VNet.
- Outbound: the Agent client is injected into a customer subnet delegated to `Microsoft.App/environments` (/27 or larger), or a managed VNet is used.
- Standard agent setup brings your own Storage, AI Search and Cosmos DB so agent data stays in your tenant. Private endpoints for those are not auto-created.
- Tool support when isolated: MCP, OpenAPI, Functions and A2A go via your subnet; AI Search and File Search via private endpoint; Code Interpreter via the Microsoft backbone; Bing, Web Search and SharePoint grounding go over public endpoints. Browser automation, computer use, Logic Apps and image generation are not supported.
- Outbound networking can't be changed after creation; you must redeploy to add VNet injection.
- AI Search indexers must use `executionEnvironment: Private` to cross private endpoints, or indexing silently produces an empty index.
- Avoid 172.17.0.0/16 (Docker bridge range); tool calls need a project-level capability host.

## Feeds

[Azure AI Foundry](../concepts/azure-ai-foundry.md)

---
title: "Source: Amazon Bedrock AgentCore — Overview"
summary: "AWS's modular, framework-agnostic agent platform: Runtime, Harness, Memory, Gateway, Identity, tools, Observability, Evaluations, Policy and more."
category: source
lastmod: 2026-11-14
tags: ["platforms", "aws", "agents"]
---

- **What:** vendor documentation
- **Author:** Amazon Web Services
- **Date:** undated, read 2026-11-14
- **Original:** [What is Amazon Bedrock AgentCore?](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)

## Summary

Lists the AgentCore services, which you can use together or separately with any framework and any model, inside or outside Bedrock.

## Key claims

- Harness: a managed agent loop; give it a model, system prompt and tools in one API call; each session runs in an isolated microVM with filesystem and shell.
- Runtime: serverless hosting for agents and tools (CrewAI, LangGraph, LlamaIndex, Google ADK, OpenAI Agents SDK, Strands), any model, MCP and A2A protocols.
- Memory: short-term and long-term memory, shareable across agents.
- Gateway: turns APIs, Lambda functions and services into MCP tools, and fronts existing MCP servers.
- Identity: agent identity and auth that works with Cognito, Okta, Entra ID and Auth0.
- Code Interpreter and Browser: managed sandboxes (Python/JS/TS; Playwright/BrowserUse).
- Observability: OpenTelemetry-compatible tracing. Evaluations and Optimization (AI recommendations + A/B tests via Gateway).
- Policy: deterministic rules (natural language or the Cedar-compatible Dogwood language) enforced on every Gateway tool call.
- Registry: catalogue of agents, MCP servers, tools and skills. Payments: x402/MPP micro-payments for agents.
- Pricing is consumption-based with no minimums.

## Feeds

[Amazon Bedrock](../concepts/amazon-bedrock.md)

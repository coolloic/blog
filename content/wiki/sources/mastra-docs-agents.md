---
title: "Source: Mastra docs: Getting started, Agents overview and Agent reference"
summary: "Mastra's docs on the Agent class: provider/model router strings, createTool, the Mastra registry, generate vs stream, and the full Agent constructor reference."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "typescript"]
---

- **What:** official documentation pages (docs home, Agents overview, `Agent` class reference)
- **Author:** Mastra (Kepler Software, Inc.)
- **Date:** read 2026-11-14; maintained against the current `@mastra/core` (1.83.0 on npm, published 2026-11-12)
- **Original:** [https://mastra.ai/docs](https://mastra.ai/docs), [https://mastra.ai/docs/agents/overview](https://mastra.ai/docs/agents/overview), [https://mastra.ai/reference/agents/agent](https://mastra.ai/reference/agents/agent)

## Summary

Mastra is a TypeScript framework for agents and AI applications. An `Agent` takes an id, instructions, a model and a tools map; tools are built with `createTool` and Zod (or other Standard Schema) input/output schemas. Agents are registered on a central `Mastra` instance, which gives them shared storage, logging and the registry. `generate()` waits for the whole tool loop; `stream()` streams tokens with tool calls, steps and usage as promises.

## Key claims

- Models are addressed as `provider/model` strings through Mastra's model router; each provider reads its own API-key environment variable.
- `createTool({ id, description, inputSchema, outputSchema?, execute })`; plain object tool definitions will not execute.
- Retrieve registered agents with `mastra.getAgentById()` rather than importing them, to get shared storage, logging and registry.
- The agent loop keeps calling tools until a final answer or a stop condition.
- Agent constructor options include `instructions`, `model` (string, provider instance or function of request context), `tools`, `agents` (subagents), `workflows`, `memory`, `scorers`, `inputProcessors` / `outputProcessors`, `maxProcessorRetries`, `hooks` (`beforeToolCall` / `afterToolCall`), `defaultOptions`, `requestContextSchema`, `voice`, `durable` (resumable streams) and `editor` (Studio editing).
- Most options can be functions resolved per request from `RequestContext` (dynamic instructions, model, tools).
- `npm create mastra@latest` scaffolds a project; running TypeScript directly needs Node.js 22.18+; Studio is the local interactive UI; integration guides cover Next.js, Express, Hono, SvelteKit, Astro and Vite.

## Feeds

- [Mastra](../concepts/mastra.md)

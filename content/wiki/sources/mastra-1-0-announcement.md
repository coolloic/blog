---
title: "Source: Announcing Mastra 1.0 (Mastra blog)"
summary: "Mastra 1.0 stable release: server adapters, composite storage, processor overhaul, AI SDK v6 support, unified observability, breaking changes and adoption numbers."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "typescript"]
---

- **What:** vendor release blog post
- **Author:** Sam Bhagwat, Mastra
- **Date:** 2026-01-20
- **Original:** [https://mastra.ai/blog/announcing-mastra-1](https://mastra.ai/blog/announcing-mastra-1)

## Summary

Declares Mastra 1.0 stable after a beta that began in November 2025. Lists the main new capabilities, the breaking API changes from 0.x with a codemod, and adoption figures.

## Key claims

- Server adapters (`@mastra/express`, `@mastra/hono`, `@mastra/fastify`, `@mastra/koa`) expose agents, workflows, tools and MCP servers inside an existing HTTP app; `mastra build` remains the path for full-stack apps.
- `MastraCompositeStore` lets memory, workflows and scores each use a different backend (e.g. Postgres, LibSQL, ClickHouse).
- Processor system overhaul, thread cloning, workflow improvements, and a unified observability schema with integrations for Langfuse, Braintrust, Arize and LangSmith.
- Supports AI SDK v6 (`LanguageModelV3`, `ToolLoopAgent`); V1/V2 models still work.
- Breaking changes: `createTool` execute signature becomes `(inputData, context)`; subpath imports; telemetry moved to `@mastra/observability`; `RuntimeContext` renamed `RequestContext`; `.get*` collection accessors become `.list*`; memory defaults now `lastMessages: 10` with semantic recall off. Codemod: `npx @mastra/codemod@latest v1`.
- Adoption at 1.0: 300k+ weekly npm downloads, about 19.8k GitHub stars, 300+ contributors; named production users include Replit, PayPal, Sanity and Marsh McLennan.

## Feeds

- [Mastra](../concepts/mastra.md)

---
title: "Source: Pydantic AI framework comparison pages (vs Vercel AI SDK, vs LangChain/LangGraph)"
summary: "Vendor-written comparison tables positioning Pydantic AI against the Vercel AI SDK and LangChain/LangGraph, including how to put a Python agent behind a useChat frontend."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents"]
---

- **What:** two comparison pages in the Pydantic AI docs, "Pydantic AI vs Vercel AI SDK" and "Pydantic AI vs LangChain & LangGraph"
- **Publisher:** Pydantic (a vendor comparing itself to competitors; read as marketing-adjacent)
- **Date:** both marked "Last checked: 2026-09-24"
- **Original:** [vs Vercel AI SDK](https://github.com/pydantic/pydantic-ai/blob/main/docs/comparisons/vs-vercel-ai-sdk.md), [vs LangChain & LangGraph](https://github.com/pydantic/pydantic-ai/blob/main/docs/comparisons/vs-langchain-langgraph.md)

## Summary

Feature tables comparing language, license, providers, extensibility, observability, durable execution, evals, multi-agent and memory support. The most useful practical point is interoperability: the frameworks are not exclusive, and a Python Pydantic AI backend can serve a Vercel AI SDK React frontend.

## Key claims

- The Vercel AI SDK is TypeScript (Apache-2.0); Pydantic AI is Python (MIT). Both are multi-provider and use OpenTelemetry for observability.
- The Vercel AI SDK's higher-level agent features (multi-agent, planning, skills, compaction) sit in Eve, a separate Apache-2.0 package; the SDK itself offers `pruneMessages` for compaction, and the table marks it "No" for evals and for memory.
- `VercelAIAdapter` speaks the Vercel AI Data Stream Protocol, so `useChat` and AI Elements render a Python agent's runs without frontend changes; AG-UI is supported similarly.
- LangChain uses LangGraph for graph control flow and LangSmith for observability and enterprise support; Pydantic AI uses one typed `Agent` with plain Python control flow, plus `pydantic-graph` (typed nodes, edges from return types, persistence) when the flow is a real state machine.
- Pydantic ships migration skills that port LangChain or Vercel AI SDK apps one path at a time.

## Feeds

[Pydantic AI](../concepts/pydantic-ai.md), [Vercel AI SDK](../concepts/vercel-ai-sdk.md)

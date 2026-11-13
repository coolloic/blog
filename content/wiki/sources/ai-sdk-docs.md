---
title: "Source: AI SDK documentation (Vercel)"
summary: "Official AI SDK docs: Core (generateText/streamText, Output, tools, stopWhen/prepareStep), ToolLoopAgent, middleware, the provider specification, and AI SDK UI's useChat and stream protocol."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents"]
---

- **What:** official AI SDK docs pages: Introduction, Generating Text, Generating Structured Data, Tools and Tool Calling, Agents Overview, Loop Control, Language Model Middleware, Providers and Models, Chatbot (`useChat`), Stream Protocols
- **Publisher:** Vercel
- **Date:** living docs, read 2026-11-14; npm `ai` latest was 7.0.172 at that date (7.0.0 published 2026-06-25; 6.0.0 on 2025-12-22; 5.0.0 on 2025-07-31)
- **Original:** [ai-sdk.dev/docs](https://ai-sdk.dev/docs/introduction) (every page also served as Markdown by appending `.md`)

## Summary

The AI SDK is a TypeScript toolkit with three surfaces: **Core** (a unified API for text, structured output, tool calls and agents across providers), **UI** (framework-agnostic hooks such as `useChat` for chat and generative UIs), and **Harnesses** (running Claude Code, Codex or Pi behind the same agent interface). Providers implement a shared language-model specification, so switching models means changing the model reference.

## Key claims

- `generateText` returns a complete result; `streamText` streams immediately, applies backpressure (tokens are generated only as consumed, so the stream must be consumed to finish), and turns errors into stream parts instead of throwing; log them with `onError`. Errors thrown inside `generateText`'s experimental lifecycle callbacks are silently caught.
- Structured output is the `output` option on `generateText`/`streamText`: `Output.text()` (default), `Output.object()`, `Output.array()`, `Output.choice()`, `Output.json()`, with Zod, Valibot or JSON Schema. It can be combined with tools, and it counts as a loop step. `partialOutputStream` and the `useObject` hook stream partial objects.
- Multi-step tool use is controlled by `stopWhen`: `isStepCount(n)` (default `isStepCount(1)` for `generateText`/`streamText`), `hasToolCall(...)`, `isLoopFinished()`, arrays of conditions (stop when any is met), or custom predicates. Conditions are evaluated only when the last step contains tool results.
- `ToolLoopAgent` is the recommended agent class; it defaults to `isStepCount(20)` and warns if that default cuts off a loop. `WorkflowAgent.stream()` has no default step limit; `WorkflowAgent.generate()` stops after 20 steps by default.
- The loop also stops when a called tool has no `execute` function (client-side tools) or needs approval.
- `prepareStep` runs before each step and can switch model, tools, `toolChoice`, sampling settings, or rewrite `messages` (the rewritten list persists for later steps), which supports compaction via `pruneMessages`.
- Multiple tool calls in one step run concurrently by default; `toolCallConcurrency: 1` forces sequential order.
- Tool errors are typed (`NoSuchToolError`, `InvalidToolInputError`, `ToolCallRepairError`) and there is a tool-call repair hook. Tool approval moved from `needsApproval` (deprecated) to `toolApproval`.
- `runtimeContext` carries shared server-side state through the loop; `toolsContext` gives each tool only its own typed context.
- `wrapLanguageModel` applies middleware (guardrails, RAG, caching, logging) to any model.
- `useChat` manages message state and streaming; render messages by their `parts` (text, tool invocations, results). The UI message stream is SSE with an `x-vercel-ai-ui-message-stream: v1` header; a plain text-stream protocol exists for text-only use. The protocol is documented so non-JS backends (e.g. FastAPI) can serve `useChat`.

## Feeds

[Vercel AI SDK](../concepts/vercel-ai-sdk.md)

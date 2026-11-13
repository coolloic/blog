---
title: "Source: AI SDK 7 is now available (Vercel changelog)"
summary: "Vercel's announcement of AI SDK 7 (2026-06-25): tool approvals, durable WorkflowAgent, timeouts, sandboxes, harness adapters, reasoning control, and Node 22/ESM-only requirements."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents"]
---

- **What:** Vercel changelog post announcing AI SDK 7
- **Publisher:** Vercel
- **Date:** 2026-06-25
- **Original:** [vercel.com/changelog/ai-sdk-7](https://vercel.com/changelog/ai-sdk-7)

## Summary

AI SDK 7 repositions the SDK from model calls and chat primitives to an agent platform for developing, running, integrating and observing agents across text, audio, realtime, image and video.

## Key claims

- Breaking requirements: Node.js 22 minimum and ESM only (no CommonJS `require()`); codemods (`npx @ai-sdk/codemod v7`) and a migration guide are provided.
- A top-level `reasoning` option maps to provider-native reasoning settings across OpenAI, Anthropic, Google, Groq, xAI, Bedrock, DeepSeek and others; exact behaviour varies by provider.
- Typed `runtimeContext` and scoped per-tool `toolsContext`, so third-party tools receive only the secrets they need.
- Tool approval policies (require user approval, auto-approve, auto-deny, or a typed function) at call or agent level; optional HMAC signing binds approved tool inputs to the approval token.
- `@ai-sdk/workflow` adds `WorkflowAgent`, which persists execution state between steps so agents survive deploys, restarts and delayed approvals.
- First-class timeouts: total, per-step, per-chunk, default-tool and per-tool budgets, raising `TimeoutError`.
- Sandbox abstraction for command execution; `HarnessAgent` adapters for Claude Code, Codex, Deep Agents, OpenCode and Pi.
- `uploadFile` and `uploadSkill` reuse provider-side file and skill references; MCP Apps support; `@ai-sdk/tui` terminal UI; redesigned OpenTelemetry telemetry (`@ai-sdk/otel`).

## Feeds

[Vercel AI SDK](../concepts/vercel-ai-sdk.md)

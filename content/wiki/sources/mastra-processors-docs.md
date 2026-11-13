---
title: "Source: Mastra docs: Processors"
summary: "Mastra input/output/error processors: per-step hooks, tripwire aborts, step retries, and built-ins for moderation, prompt-injection detection, PII redaction and token limits."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "typescript", "guardrails"]
---

- **What:** official documentation page
- **Author:** Mastra
- **Date:** read 2026-11-14
- **Original:** [https://mastra.ai/docs/agents/processors](https://mastra.ai/docs/agents/processors)

## Summary

Processors are Mastra's middleware for the agent loop. Input processors run before the model, output processors on its response (including streamed chunks), and error processors when the provider call throws. They implement guardrails, context trimming and retries.

## Key claims

- Hooks: `processInput`, `processInputStep` (every loop step; can swap model, tools, toolChoice), `processLLMRequest` / `processLLMResponse`, `processOutputStream` (drop or emit chunks), `processOutputStep` (validate, request retry), `processOutputResult`, `processAPIError`.
- Memory processors wrap the pipeline: history loads before input processors and is persisted after output processors.
- `abort(reason)` throws a `TripWire`; streams get a `tripwire` chunk, `generate()` exposes `result.tripwire`.
- Step retries via `abort(reason, { retry: true })` require `maxProcessorRetries`; error-processor retries cap at 3 by default.
- Built-ins: `ModerationProcessor`, `PromptInjectionDetector`, `PIIDetector` (redact), `TokenLimiter`, `ToolCallFilter`, `ToolSearchProcessor`, `ResponseCache` (beta), `TokenCostControl`, plus default error processors.

## Feeds

- [Mastra](../concepts/mastra.md)

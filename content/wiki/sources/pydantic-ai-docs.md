---
title: "Source: Pydantic AI documentation"
summary: "Official Pydantic AI docs: the typed Agent, dependency injection via RunContext, output modes, tools, usage limits, capabilities, durable execution, testing and the V2 changelog."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents"]
---

- **What:** official documentation for Pydantic AI (pages: Agents, Dependencies, Output, Function Tools, Models and Providers, Capabilities, Durable Execution, Unit testing, Upgrade guide/changelog)
- **Publisher:** Pydantic (the team behind the Pydantic validation library and Logfire)
- **Date:** living docs, read 2026-11-14; latest release v2.68.0 (2026-11-12)
- **Original:** [pydantic.dev/docs/ai](https://pydantic.dev/docs/ai/overview/) (formerly ai.pydantic.dev; source in [pydantic/pydantic-ai/docs](https://github.com/pydantic/pydantic-ai/tree/main/docs))

## Summary

Pydantic AI is a Python agent framework built around one class, `Agent`, generic in its dependency type and output type (`Agent[Deps, Output]`), so type checkers catch mismatches. An agent bundles instructions, tools/toolsets, an output type, a deps type, a default model and settings, and "capabilities" (reusable bundles of tools, hooks, instructions and settings). It is model-agnostic: `"<provider>:<model>"` strings select OpenAI, Anthropic, Gemini, Bedrock, Vertex, Azure and many others.

## Key claims

- Five ways to run: `run()` (async), `run_sync()`, `run_stream()`, `run_stream_events()`, and `iter()`, which iterates the nodes of the underlying graph step by step.
- Dependency injection: any Python type (usually a dataclass) passed as `deps=` at run time and reached by tools, dynamic instructions and output validators through `RunContext[Deps]`; `Agent.override` swaps deps, model or toolsets in tests.
- Tools: `@agent.tool` (gets `RunContext`) and `@agent.tool_plain`; parameter schema comes from the signature, and descriptions from the docstring (Google, NumPy, Sphinx styles parsed via griffe). `ModelRetry` raised in a tool sends the error back to the model to try again.
- Output: `output_type` accepts scalars, TypedDicts, dataclasses, Pydantic models, unions, and output functions. Default **Tool Output** mode exposes each output type as a separate output tool; **NativeOutput** uses the provider's JSON-schema response format (not all models; with restrictions); **PromptedOutput** puts the schema in instructions and validates, the least reliable but universal mode. Validation failures are sent back to the model to retry.
- `@agent.output_validator` handles async/IO validation; each `ModelRetry` consumes the output retry budget, which defaults to 1 (`retries={'output': N}`).
- `UsageLimits` bound runs: `request_limit` (model turns), `tool_calls_limit` (checked before executing, so an over-limit parallel batch runs none), token limits. Exceeding raises `UsageLimitExceeded` rather than returning output.
- With `run_stream()` / `run_stream_sync()`, the first output matching the output type is final: if the model returns text plus tool calls and output type is `str`, those "dangling" tool calls are not executed unless `end_strategy` is `'graceful'` or `'exhaustive'`, and even then their results are not sent back to the model.
- Capabilities are "the primary extension point" (memory, guardrails, cost tracking, approvals); a separate Harness package ships prebuilt ones and complete `Coder` and `Researcher` agents.
- Durable execution through nine engines (Temporal, DBOS, Prefect, Restate, AWS Lambda, Absurd, pgtask, Azure Durable Task, Airflow), which journal model and tool calls and replay completed ones after a crash. The docs separate this from persistence (saving and resuming runs), which needs no engine.
- Testing: `TestModel` / `FunctionModel` replace real LLMs; `ALLOW_MODEL_REQUESTS=False` blocks accidental real calls.
- v2.60.0 (2026-10-22 per the changelog) deprecated `RetryPromptPart` and stopped emitting it, so `isinstance(part, RetryPromptPart)` silently matches nothing; use `is_retry(part)`.
- Versions: V1 shipped September 2025 with an API-stability promise; V2.0.0 stable on 2026-06-23 (forked from v1.107.0); deprecations in V2 keep working until V3.

## Feeds

[Pydantic AI](../concepts/pydantic-ai.md)

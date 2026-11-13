---
title: "Source: LangChain agents, middleware and structured output docs"
summary: "Official LangChain v1 docs for create_agent, the middleware hook model, the built-in middleware catalogue, and ToolStrategy/ProviderStrategy structured output."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "langchain", "agents"]
---

- **What:** official open-source documentation (Python)
- **Publisher:** LangChain
- **Date:** accessed 2026-11-14 (pages reference `langchain` up to 1.5.x)
- **Original:** [v1 release notes](https://docs.langchain.com/oss/python/releases/langchain-v1), [Agents](https://docs.langchain.com/oss/python/langchain/agents), [Middleware overview](https://docs.langchain.com/oss/python/langchain/middleware), [Built-in middleware](https://docs.langchain.com/oss/python/langchain/middleware/built-in), [Custom middleware](https://docs.langchain.com/oss/python/langchain/middleware/custom), [Structured output](https://docs.langchain.com/oss/python/langchain/structured-output)

## Summary

The docs define an agent as a model calling tools in a loop until done, and `create_agent` as the harness around that loop. Everything else (summarisation, retries, approval, PII handling, tool selection, context trimming) is middleware: classes or decorated functions that hook before, after, or around model and tool calls.

## Key claims

- `create_agent` parameters: `model` (a `"provider:model"` string or instance), `tools`, `system_prompt`, `middleware`, `response_format`, `state_schema` (subclass of `AgentState`, must be a TypedDict), `context_schema`, `checkpointer`, `name`.
- `AgentState` holds an append-only `messages` list; persistence across turns needs a checkpointer and a `thread_id`; `context` carries immutable per-run data read via `runtime.context`.
- Six hooks: node-style `before_agent`, `before_model`, `after_model`, `after_agent` (return dict updates merged via reducers) and wrap-style `wrap_model_call`, `wrap_tool_call` (call the `handler` zero, one or many times, enabling short-circuit and retry).
- Ordering for `[m1, m2, m3]`: `before_*` run m1 to m3; `after_*` run m3 to m1; `wrap_*` nest with m1 outermost.
- Hooks can return `jump_to` (`"end"`, `"tools"`, `"model"`) if declared with `can_jump_to`; for conflicting non-reducer writes the outermost middleware wins; commands from discarded retry attempts are dropped.
- Built-ins include `SummarizationMiddleware` (`trigger`, `keep` default 20 messages), `HumanInTheLoopMiddleware` (`interrupt_on`, needs a checkpointer), `ModelCallLimitMiddleware` / `ToolCallLimitMiddleware` (`thread_limit`, `run_limit`, `exit_behavior`), `ModelRetryMiddleware` / `ToolRetryMiddleware` (default 2 retries after the initial call, backoff factor 2.0, jitter), `ModelFallbackMiddleware`, `PIIMiddleware` (`redact` default, `block`, `mask`, `hash` strategies), `TodoListMiddleware`, `LLMToolSelectorMiddleware`, `ContextEditingMiddleware` (clears old tool outputs, default trigger 100k tokens, keep 3), `ShellToolMiddleware`, `FilesystemFileSearchMiddleware`, `LLMToolEmulator`, plus newer `ToolErrorMiddleware` (1.3.14), `ModelRefusalMiddleware` (1.4.9) and beta `ModelRouterMiddleware` / `AutoModeMiddleware` (1.5.0). Provider-specific middleware exists for Anthropic prompt caching and tools, Bedrock caching and OpenAI moderation.
- Structured output: `ToolStrategy` (works with any tool-calling model; `handle_errors` retries by feeding validation errors back as a `ToolMessage`) vs `ProviderStrategy` (native provider enforcement; `strict` since 1.2). Passing a bare schema auto-selects from the model profile (since 1.1). Result lands in `result["structured_response"]`. A raw JSON-Schema dict is not auto-detected and must be wrapped in a strategy. If the model emits several structured outputs in one turn, the default `handle_errors=True` returns an error `ToolMessage` asking it to retry with one (`MultipleStructuredOutputsError`).
- Legacy chains, retrievers, the indexing API and hub moved to `langchain_classic`.

## Feeds

[LangChain](../concepts/langchain.md), [LangGraph](../concepts/langgraph.md)

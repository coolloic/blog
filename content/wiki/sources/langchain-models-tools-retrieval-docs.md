---
title: "Source: LangChain models, tools and retrieval docs"
summary: "Official LangChain v1 docs for the chat model interface (init_chat_model, bind_tools, with_structured_output), tool definition with ToolRuntime, and retrieval building blocks."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "langchain"]
---

- **What:** official open-source documentation (Python)
- **Publisher:** LangChain
- **Date:** accessed 2026-11-14
- **Original:** [Models](https://docs.langchain.com/oss/python/langchain/models), [Tools](https://docs.langchain.com/oss/python/langchain/tools), [Retrieval](https://docs.langchain.com/oss/python/langchain/retrieval)

## Summary

Covers the provider-neutral chat model abstraction, how Python functions become model-callable tools, and the loader / splitter / embedding / vector store / retriever pipeline, with three RAG architectures compared.

## Key claims

- `init_chat_model("provider:model", ...)` builds any supported model; standard kwargs are `temperature`, `max_tokens`, `timeout`, `max_retries` (default 6, exponential backoff, 4xx such as 401/404 not retried). `configurable_fields` makes model and params switchable at runtime.
- `invoke` returns an `AIMessage`; `stream` yields `AIMessageChunk`s that sum into one message; `batch` / `batch_as_completed` are client-side parallelism, distinct from provider batch APIs.
- `bind_tools` supports `tool_choice` and `parallel_tool_calls=False`; `with_structured_output` accepts Pydantic, TypedDict or JSON Schema with `method` = `json_schema`, `function_calling` or `json_mode`, and `include_raw=True` returns raw message plus `parsing_error`.
- `usage_metadata` reports tokens including cache and reasoning; `content_blocks` normalises text, reasoning, tool calls and server-tool results; model `profile` (beta) describes capabilities such as `max_input_tokens`; `reasoning_effort` is a standard parameter.
- `InMemoryRateLimiter` limits request count only, not request size.
- Tools: `@tool` uses the docstring as description and type hints as schema; `config` and `runtime` are reserved argument names; a `runtime: ToolRuntime` parameter injects state, context, store, stream writer and tool call ID and is hidden from the model. Returning a `Command` updates graph state and must include a matching tool message. `return_direct=True` only applies if every tool in a parallel batch sets it. MCP tools convert via an adapter (beta).
- Retrieval: 2-step RAG (fixed calls, predictable latency), agentic RAG (agent decides when to retrieve; variable latency), hybrid RAG (query enhancement and validation loops).

## Feeds

[LangChain](../concepts/langchain.md)

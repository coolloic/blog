---
title: "Source: langchain-core Runnable implementation (runnables/base.py)"
summary: "The source code and docstrings of the Runnable base class that defines LCEL composition, batching, streaming, retry and fallback semantics."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "langchain"]
---

- **What:** source code of the `langchain-core` package, plus the API reference index for runnables
- **Publisher:** LangChain (GitHub `langchain-ai/langchain`, `libs/core/langchain_core/runnables/base.py`)
- **Date:** master branch, read 2026-11-14
- **Original:** [base.py on GitHub](https://github.com/langchain-ai/langchain/blob/master/libs/core/langchain_core/runnables/base.py), [Runnables API reference](https://reference.langchain.com/python/langchain-core/runnables)

## Summary

`Runnable` is the single interface every LangChain component implements, and LCEL is operator overloading on it. Reading the source shows what the "free" features really are: default implementations that subclasses may or may not override.

## Key claims

- `invoke` is the only abstract method. Default `ainvoke` runs `invoke` in an executor; default `stream` yields the single `invoke` result (no real token streaming unless overridden).
- Default `batch` runs `invoke` on a thread pool; default `abatch` uses asyncio gather bounded by `max_concurrency`. Subclasses should override when the backend has native batching.
- `a | b` builds a `RunnableSequence`; a dict operand is coerced to `RunnableParallel`; `.pipe()` is equivalent.
- `with_retry` defaults: retry on any `Exception`, exponential jitter, 3 attempts. `with_fallbacks` tries alternatives in order; `exception_key` can pass the error into the fallback's input.
- `bind`, `with_config`, `with_listeners`, `assign`, `pick`, `map`, `with_types` return wrapper runnables. `get_graph`, `input_schema` / `output_schema` expose structure and Pydantic schemas.
- Config (tags, metadata, callbacks, `max_concurrency`) is copied to each child with the parent's child callbacks, which is how tracing nests.
- `astream_events` defaults to `version="v2"`; `"v1"` is deprecated; `"v3"` exists only on chat models and compiled graphs.

## Feeds

[LangChain](../concepts/langchain.md)

---
title: "Source: Instructor Documentation and README"
summary: "Instructor (567-labs) docs: Pydantic response_model on any provider via from_provider, modes (TOOLS, JSON_SCHEMA, MD_JSON...), validation-error reasking, Tenacity retry policies, partial/iterable streaming and hooks."
category: source
lastmod: 2026-11-14
tags: ["prompting", "structured-outputs", "open-source"]
---

- **What:** official docs (home, Patching, Modes comparison, Reasking & Validation, Retrying) and the GitHub README; latest PyPI release `instructor` 1.17.0 (2026-09-09); MIT
- **Author/publisher:** Jason Liu and the Instructor community (GitHub org 567-labs)
- **Date:** living documents; read 2026-11-14
- **Original:** [Docs](https://python.useinstructor.com/), [Patching](https://python.useinstructor.com/concepts/patching/), [Modes](https://python.useinstructor.com/modes-comparison/), [Reask](https://python.useinstructor.com/concepts/reask_validation/), [Retrying](https://python.useinstructor.com/concepts/retrying/), [GitHub](https://github.com/567-labs/instructor)

## Summary

Instructor wraps a provider SDK so that `create(...)` accepts a Pydantic `response_model` and returns a validated instance. It converts the model to a tool definition or JSON schema, parses the reply, runs Pydantic validation, and on failure re-asks the model with the error. It does not mask tokens itself; any hard guarantee comes from the provider mode it selects. Ports exist for TypeScript, Go, Ruby, Elixir and Rust.

## Key claims

- `instructor.from_provider("openai/gpt-4o-mini")` (also Anthropic, Google, Ollama, Groq, Mistral, Cohere, DeepSeek, vLLM, llama-cpp-python and more; `async_client=True` for async). Patching adds `response_model`, `max_retries` (default 0) and `context`.
- Core modes: `TOOLS` (default for OpenAI/Anthropic/Google), `JSON_SCHEMA` (provider-native schema enforcement), `MD_JSON` (extract JSON from text/code fences, the fallback), `PARALLEL_TOOLS`, `RESPONSES_TOOLS`. Provider-specific names such as `ANTHROPIC_TOOLS`, `TOOLS_STRICT`, `ANTHROPIC_JSON`, `MISTRAL_STRUCTURED_OUTPUTS` are deprecated aliases of the core modes.
- Reask: on a Pydantic validation or JSON decode error, Instructor appends the failed assistant output plus a user message containing the validation error, and calls again. `max_retries=2` means up to two re-attempts and does not guarantee success. Each retry resends the growing conversation.
- `llm_validator` lets an LLM judge a field against a natural-language rule; validators can use runtime `context` (e.g. check a quote appears in a source). `disable_pydantic_error_url()` trims error-message tokens.
- Two separate retry layers: SDK transport retries (`OpenAI(max_retries=...)`) and Instructor validation retries; Instructor does not retry rate-limit/connection errors by default. A Tenacity `Retrying`/`AsyncRetrying` can be passed as `max_retries`; set SDK retries to 0 then. Exhaustion raises `InstructorRetryException` with `n_attempts` and `failed_attempts`.
- Cost/time bounds: `timeout` and `token_budget` stop further validation retries. Suggested budgets: 2–3 attempts for validation errors.
- Streaming: `create_partial` / `Partial[Model]` yields progressively filled objects; `create_iterable` yields a list item by item. `create_with_completion` returns the raw completion too. Hooks via `client.on("completion:kwargs" | "completion:error", ...)`.
- The README recommends Pydantic AI for richer agent workflows.

## Feeds

[Instructor and Outlines](../concepts/instructor-and-outlines.md)

---
title: "Source: LangSmith observability documentation"
summary: "LangSmith's trace data model (runs, traces, threads, feedback), run schema, OTLP ingestion, sampling, retention and plan pricing."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "observability", "langsmith"]
---

- **What:** official product documentation and pricing page
- **Publisher:** LangChain
- **Date:** accessed 2026-11-14 (latest LangSmith Python SDK v0.14.17, released 2026-11-02)
- **Original:** [Observability concepts](https://docs.langchain.com/langsmith/observability-concepts), [Run data format](https://docs.langchain.com/langsmith/run-data-format), [Trace with OpenTelemetry](https://docs.langchain.com/langsmith/trace-with-opentelemetry), [Sample traces](https://docs.langchain.com/langsmith/sample-traces), [Pricing](https://www.langchain.com/pricing)

## Summary

LangSmith is LangChain's hosted tracing and evaluation platform. Its unit is the run (comparable to an OTel span); runs sharing a trace ID form a trace; traces sharing a `thread_id` metadata key form a thread. It ingests both its own SDK format and OTLP, mapping GenAI semantic-convention attributes onto runs.

## Key claims

- Run types: `chain`, `llm`, `embedding`, `prompt`, `tool`, `retriever`, `parser`. Runs carry `dotted_order` (sortable hierarchy path), inputs/outputs, tags, `extra`, error, token counts, `total_cost`, and `first_token_time` for streamed LLM runs.
- A trace is capped at 25,000 runs; further runs are rejected.
- Feedback (a key plus a continuous or categorical score) attaches to a run by run ID; tags and metadata are for filtering and grouping.
- Newer "agent-based" workspaces organise traces as agents with Production/Staging/Development/Local environments, each backed by a tracing project.
- OTLP endpoint is the API URL plus `/otel` (exporters append `/v1/traces`); auth via `x-api-key`. `gen_ai.operation.name` sets run type; `gen_ai.request.*` maps to invocation params; usage incl. cache and reasoning tokens maps to `usage_metadata`. OpenInference, Traceloop and Logfire attributes are also understood.
- OTLP pitfalls: a span whose parent never arrives is dropped silently (endpoint returns 200 before processing); 8-byte OTLP span IDs cannot point at UUID run IDs.
- Sampling: `LANGSMITH_TRACING_SAMPLING_RATE` (0 to 1, default all) or a per-client `tracing_sampling_rate`; applies to SDK/LangChain tracing.
- SaaS keeps trace data at most 180 days from ingestion; datasets persist. Pricing page (2026-11): base traces have 14-day retention and extended traces (an upgrade at extra cost) 180-day; Developer plan free with 5k base traces/month and 1 seat, Plus $39/seat/month with 10k base traces/month and unlimited seats; self-hosting is Enterprise-only.

## Feeds

[LLM observability](../concepts/llm-observability.md)

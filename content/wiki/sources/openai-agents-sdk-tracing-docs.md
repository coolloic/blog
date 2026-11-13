---
title: "Source: Tracing (OpenAI Agents SDK docs)"
summary: "Built-in tracing in the OpenAI Agents SDK: default spans, disabling, ZDR caveat, custom processors and sensitive-data controls."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "observability"]
---

- **What:** official documentation page
- **Author:** OpenAI
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://openai.github.io/openai-agents-python/tracing/](https://openai.github.io/openai-agents-python/tracing/)

## Summary

Tracing is on by default and records each run as a trace with spans for agents, LLM generations, function calls, guardrails and handoffs, exported to OpenAI's Traces dashboard. Custom processors can add or replace exporters, and many third-party observability tools integrate.

## Key claims

- Tracing is enabled by default; disable with `OPENAI_AGENTS_DISABLE_TRACING=1`, `set_tracing_disabled`, or `RunConfig.tracing_disabled`.
- Tracing is unavailable to organisations under a Zero Data Retention policy.
- `add_trace_processor()` adds exporters; `set_trace_processors()` replaces the OpenAI default.
- Integrations listed include Weights & Biases, Arize Phoenix, MLflow, Braintrust, Logfire, AgentOps, LangSmith, Langfuse and Datadog.
- `trace_include_sensitive_data` defaults to true, so inputs and outputs are stored unless turned off.

## Feeds

- [OpenAI Agents SDK](../concepts/openai-agents-sdk.md)

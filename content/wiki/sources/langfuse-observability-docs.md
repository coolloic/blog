---
title: "Source: Langfuse observability documentation"
summary: "Langfuse's OTel-based data model (traces, observations, sessions), observation types, usage/cost inference rules and self-hosting architecture."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "observability", "langfuse"]
---

- **What:** official product documentation and repository licence
- **Publisher:** Langfuse (copyright holder in the LICENSE file is ClickHouse, Inc.)
- **Date:** accessed 2026-11-14 (server release v4.80.0, 2026-11-13)
- **Original:** [Data model](https://langfuse.com/docs/observability/data-model), [Observation types](https://langfuse.com/docs/observability/features/observation-types), [Token and cost tracking](https://langfuse.com/docs/observability/features/token-and-cost-tracking), [Self-hosting](https://langfuse.com/self-hosting), [GitHub](https://github.com/langfuse/langfuse), [Existing OTel setup FAQ](https://langfuse.com/faq/all/existing-otel-setup), [Langfuse vs Datadog](https://langfuse.com/resources/engineering/langfuse-vs-datadog)

## Summary

Langfuse is an open-source LLM engineering platform (tracing, evals, prompt management). Its SDKs are built on OpenTelemetry, so any OTel instrumentation can feed it and traces can be fanned out to other backends at the same time.

## Key claims

- Observations are nested steps; a trace is all observations with one `trace_id`; sessions optionally group traces of one conversation. Trace-level `user_id`, `session_id`, tags and metadata propagate to every observation and are denormalised into one observations table for fast queries.
- Observation types: `event`, `span`, `generation`, `agent`, `tool`, `chain`, `retriever`, `evaluator`, `embedding`, `guardrail` (Python SDK >= 3.3.1, TS SDK >= 4.0.0).
- SDKs batch and send in the background; short-lived processes must call `flush()` or lose traces.
- Langfuse no longer estimates tokens with a tokenizer: usage must be submitted. Ingested `cost_details` win; otherwise cost = usage x price from a model definition matched by regex on the model name. Only generation and embedding observations carry cost.
- Model definitions support pricing tiers with conditions (e.g. input above 200k tokens). Usage buckets must be non-overlapping (`input` excludes cached input); overlapping buckets double-count cost. Worked example: an OpenAI-style response with 17,903 prompt tokens of which 17,817 were cache hits maps to `input: 86` plus `input_cached_tokens: 17817`. OTel `gen_ai.usage.*` values have cache reads/writes subtracted from input automatically.
- Self-hosted architecture: Web and Worker containers, PostgreSQL (transactional), ClickHouse (traces, observations, scores), Redis/Valkey (queue, cache), S3/blob storage (raw events, attachments). Docker Compose for testing; Kubernetes/Helm or cloud templates for production.
- OTel interoperability: Langfuse's docs describe teams running it alongside Datadog (APM) from the same OTel instrumentation, and using an OTel Collector filter processor to send only selected spans to Langfuse; its OTLP endpoint is HTTP only (no gRPC).
- Licence: MIT outside `ee/` directories; a few enterprise features need a licence key.

## Feeds

[LLM observability](../concepts/llm-observability.md)

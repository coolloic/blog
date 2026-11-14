---
title: "Source: Datadog LLM Observability: OpenTelemetry GenAI ingestion"
summary: "Datadog's docs and launch post for ingesting OTel GenAI semantic-convention (v1.37+) and OpenInference spans into LLM/Agent Observability without its own SDK."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "observability", "opentelemetry"]
---

- **What:** product documentation and launch blog post
- **Publisher:** Datadog (blog by Barry Eom, Zach Groves, Will Potts, Will Roper)
- **Date:** blog 2025-12-01; docs accessed 2026-11-14
- **Original:** [OpenTelemetry instrumentation docs](https://docs.datadoghq.com/llm_observability/instrumentation/otel_instrumentation/), [Datadog LLM Observability natively supports OpenTelemetry GenAI Semantic Conventions](https://www.datadoghq.com/blog/llm-otel-semantic-convention/)

## Summary

Datadog maps OTLP spans that follow the GenAI semantic conventions (v1.37 or later) or OpenInference onto its own LLM/Agent Observability schema. Spans can go directly to Datadog's intake, through the Datadog Agent's OTLP receiver, or through an OTel Collector. The docs list concrete instrumentation versions, the switches that turn conversion on, and a set of limitations.

## Key claims

- Accepted input is OTel GenAI conventions v1.37+ or supported OpenInference conventions. Frameworks still emitting older conventions (strands-agents is the example) need `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental`.
- Export uses `http/protobuf` with headers `dd-api-key` and `dd-otlp-source=llmobs`. Conversion is enabled separately, by a `DD-LLMObs-Enabled=true` header, a `dd_llmobs_enabled=true` resource attribute, or a span attribute. The ML app name comes from `service.name`.
- Mapped fields include `gen_ai.request.model`, `gen_ai.provider.name`, `gen_ai.usage.input_tokens` and output tokens, `gen_ai.operation.name` and finish reasons. Cost and latency are derived.
- OpenInference spans are recognised by a non-empty `openinference.span.kind`. LLM, EMBEDDING, TOOL, AGENT and RETRIEVER map to native kinds, and other kinds such as CHAIN become `workflow`. When both `gen_ai.operation.name` and `openinference.span.kind` are present, the GenAI attribute wins.
- Listed instrumentations include the OTel contrib `opentelemetry-instrumentation-openai-v2`, OpenInference, OpenLLMetry (`traceloop-sdk` >= 0.47.0), Strands Agents (native), Langfuse SDK (native, >= 4.0.0), Spring AI and LangChain4j.
- Limitations: a trace is kept only if conversion is enabled and at least one span has a qualifying attribute, and other spans are dropped. Remote media URLs are not fetched. Evaluation APIs want decimal span and trace IDs. Exporting both Claude SDK and Claude Platform spans double-counts tokens and cost. Traces can take 3 to 5 minutes to appear. Some data also lands in APM, so access controls must cover both.
- Pricing (blog): up to 40,000 LLM spans per month at no charge.

## Feeds

[OpenTelemetry GenAI semantic conventions](../concepts/opentelemetry-genai.md)

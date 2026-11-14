---
title: "Source: OpenLLMetry (Traceloop) README, conventions and ServiceNow announcement"
summary: "OpenLLMetry, Traceloop's Apache-2.0 OpenTelemetry instrumentation for LLM providers, vector DBs and agent frameworks: its attribute conventions, content-capture default, and the 2026 ServiceNow acquisition."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "observability", "opentelemetry"]
---

- **What:** GitHub README, documentation pages and a company blog post
- **Publisher:** Traceloop (blog post by co-founder and CEO Nir Gazit)
- **Date:** accessed 2026-11-14; acquisition post March 2026
- **Original:** [openllmetry on GitHub](https://github.com/traceloop/openllmetry), [Semantic conventions](https://www.traceloop.com/docs/openllmetry/contributing/semantic-conventions), [Privacy: prompts, completions and embeddings](https://www.traceloop.com/docs/openllmetry/privacy/traces), [Traceloop is joining ServiceNow](https://www.traceloop.com/blog/traceloop-is-joining-servicenow)

## Summary

OpenLLMetry is a set of OpenTelemetry instrumentations plus a thin Traceloop SDK. It emits standard OTLP, so the traces can go to any OTel backend. It predates the official GenAI conventions, and Traceloop says it led the OTel working group that standardised them. Its own attribute set is a mix of early `gen_ai.*` names, `llm.*` and `traceloop.*` framework attributes. In March 2026 Traceloop announced it was joining ServiceNow and said OpenLLMetry would remain open source.

## Key claims

- License Apache-2.0; built and maintained by Traceloop.
- The README lists instrumentations for 16 LLM providers (among them OpenAI/Azure OpenAI, Anthropic, Bedrock, Gemini, Vertex AI, Mistral, Cohere, Ollama), 7 vector DBs (Chroma, LanceDB, Marqo, Milvus, Pinecone, Qdrant, Weaviate), 10 frameworks (including LangChain, LangGraph, LlamaIndex, CrewAI, Haystack, LiteLLM, OpenAI Agents, AWS Strands) and MCP.
- The README lists 24 supported destinations, including Datadog, Honeycomb, Grafana, Sentry, Splunk, New Relic and the OTel Collector.
- The README states that its conventions are now part of OpenTelemetry. The conventions page calls them an extension of the OTel GenAI conventions and a work in progress.
- Documented attributes include `gen_ai.system`, `gen_ai.prompt`, `gen_ai.completion` and `gen_ai.usage.prompt_tokens`/`completion_tokens`, which are older names than the current spec's `gen_ai.provider.name`, `gen_ai.input.messages` and `gen_ai.usage.input_tokens`. They also include `llm.request.type` and `traceloop.span.kind` (`workflow`, `task`, `agent`, `tool`), `traceloop.entity.name` and `traceloop.association.properties`.
- By default OpenLLMetry logs prompts, completions and embeddings to span attributes. `TRACELOOP_TRACE_CONTENT=false` (or `traceContent: false` in JS) turns that off.
- Users should upgrade to v0.49.2 or later, the version that stopped the SDK's own telemetry collection.
- Acquisition post: Traceloop technology goes into ServiceNow's AI Control Tower, OpenLLMetry stays open source, and existing customers can keep buying Traceloop.

## Feeds

[OpenTelemetry GenAI semantic conventions](../concepts/opentelemetry-genai.md)

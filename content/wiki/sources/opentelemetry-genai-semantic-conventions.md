---
title: "Source: OpenTelemetry semantic conventions for generative AI"
summary: "The OpenTelemetry GenAI spec: span names, gen_ai.* attributes, token metrics, agent/tool spans and opt-in content capture for LLM telemetry."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "observability", "opentelemetry"]
---

- **What:** specification (Markdown generated from YAML models), status "Development"
- **Publisher:** OpenTelemetry project (GenAI SIG)
- **Date:** accessed 2026-11-14 (main branch; no tagged release yet, references core semconv v1.45.0)
- **Original:** [open-telemetry/semantic-conventions-genai](https://github.com/open-telemetry/semantic-conventions-genai), in particular [client-inference.md](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/client-inference.md), [gen-ai-spans.md](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md) and [gen-ai-agent-spans.md](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md). The old pages on opentelemetry.io now point here.

## Summary

Defines a vendor-neutral vocabulary for telemetry from GenAI clients, agents, tools, retrieval, memory, MCP and A2A, so that any OTLP backend can understand LLM traces. Every GenAI-specific convention is still at Development stability, so names can change; only reused core attributes (`error.type`, `server.address`, `server.port`) are Stable. The conventions moved out of the core semantic-conventions repo into a dedicated repository during 2026.

## Key claims

- Inference span: name `{gen_ai.operation.name} {gen_ai.request.model}`, kind `CLIENT` (or `INTERNAL` for in-process models). A span covers the whole logical operation, including automatic retries.
- Required attributes: `gen_ai.operation.name` and `gen_ai.provider.name` (e.g. `openai`, `aws.bedrock`, `gcp.vertex_ai`); provider name is a discriminator for which provider-specific attributes apply.
- Well-known operation names include `chat`, `generate_content`, `text_completion`, `embeddings`, `retrieval`, `execute_tool`, `create_agent`, `invoke_agent`, `invoke_workflow`, `plan`, memory operations (`search_memory`, `upsert_memory`...), `fetch_response`, `realtime_inference`.
- Recommended request attributes: model, `max_tokens`, temperature, top_p, stop sequences, penalties, `reasoning.level`; response attributes: `response.id`, `response.model`, `finish_reasons`, `time_to_first_chunk` for streams.
- Usage attributes: `gen_ai.usage.input_tokens`, `output_tokens`, `cache_read.input_tokens`, `cache_write.input_tokens`, `reasoning.output_tokens`, plus per-modality (text/image/audio) splits.
- Correlation: `gen_ai.conversation.id` (session/thread), `gen_ai.prompt.name` and `gen_ai.prompt.version` for templated prompts, `gen_ai.conversation.compacted` when context was compacted.
- Metrics include `gen_ai.client.inference.duration` (histogram, seconds, explicit buckets 0.01 s to 81.92 s), `time_to_first_chunk`, `time_per_output_chunk`, and token-usage histograms (input, output, cache read/write, reasoning).
- Agent spans: `create_agent`, `invoke_agent` (client or internal), `plan`, `execute_tool`; spans for agents are named after `gen_ai.agent.name` when known.
- Content (system instructions, input/output messages, tool-call arguments/results, retrieval query text, memory records) is sensitive and large: instrumentations SHOULD NOT capture it by default.
- `OTEL_INSTRUMENTATION_GENAI_CAPTURE_CONTENT` takes `NO_CONTENT` (default), `SPAN_ONLY`, `EVENT_ONLY` or `SPAN_AND_EVENT`; invalid values fall back to no content.
- For production the spec recommends uploading content to external storage (e.g. S3) via a hook and recording only `*_ref` URIs on spans, which allows separate access control; the hook runs regardless of the sampling decision.

## Feeds

[LLM observability](../concepts/llm-observability.md)

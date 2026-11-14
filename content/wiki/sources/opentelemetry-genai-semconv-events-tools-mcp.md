---
title: "Source: OpenTelemetry GenAI conventions: events, tool, agent, MCP and registry details"
summary: "Detail pages of the semantic-conventions-genai repo: the operation-details and evaluation events, execute_tool and agent spans, MCP spans, message JSON shape and token-count semantics."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "observability", "opentelemetry"]
---

- **What:** specification pages (generated from YAML via Weaver) and non-normative examples
- **Publisher:** OpenTelemetry project (GenAI SIG)
- **Date:** accessed 2026-11-14 (main branch; no tagged release, schema URL still "TODO" in the README)
- **Original:** [repository README](https://github.com/open-telemetry/semantic-conventions-genai), [gen-ai-events.md](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-events.md), [client-inference.md](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/client-inference.md), [execute-tool.md](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/execute-tool.md), [gen-ai-agent-spans.md](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md), [mcp.md](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/mcp.md), [gen-ai-metrics.md](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-metrics.md), [attribute registry](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/registry/attributes/gen-ai.md), [LLM call examples](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/non-normative/examples-llm-calls.md)

## Summary

These pages complement the main inference-span spec. They define how chat content is shaped and where it goes, the spans for tools, agents and MCP, the events, and the metric families. Everything GenAI-specific is at Development stability. The repository extends core semantic conventions through Weaver and has published no tagged release yet.

## Key claims

- The README groups conventions into client inference, embeddings, execute tool, retrieval, remote agent invocation, events, exceptions, metrics, token metrics, model spans, realtime and agent spans. It adds provider-specific pages (Anthropic, Azure AI Inference, AWS Bedrock, OpenAI) and protocol pages for MCP and A2A.
- `gen_ai.conversation.id` is the one attribute instrumentations may propagate through context to nested instrumentations in the same process.
- Content attributes `gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions` and `gen_ai.tool.definitions` are opt-in and structured per a JSON schema. A message is a `role` plus a list of typed `parts` (for example `{"type":"text","content":...}`). Each has a `_ref` variant holding a URI to externally stored content, and that URI must not embed credentials.
- `gen_ai.output.messages` should hold one message per choice and only when output was produced. Instrumentation should not invent output for failed calls.
- Event `gen_ai.client.inference.operation.details` carries request parameters and chat history independently of traces, at DEBUG severity (5).
- Event `gen_ai.evaluation.result` records an evaluation of a GenAI output. It requires `gen_ai.evaluation.name`, may carry `score.value`, `score.label` and `explanation`, and should be parented to the evaluated span or reference `gen_ai.response.id`. The spec notes that events are not yet available in some languages.
- `gen_ai.usage.cache_read.input_tokens`, `cache_write.input_tokens` and the per-modality counts should be *included in* `gen_ai.usage.input_tokens`.
- Execute-tool span: name `execute_tool {gen_ai.tool.name}`, kind INTERNAL. Attributes include `gen_ai.tool.call.id`, `tool.type`, `tool.description`, plus opt-in `tool.call.arguments` and `tool.call.result`. Developers are encouraged to instrument their own tool calls by hand. There are refinements for agents exposed as tools and for Agent Skills.
- Agent spans: `create_agent {name}` (CLIENT), `invoke_agent {name}` as CLIENT for remote agents or INTERNAL for in-process agents and framework entrypoints (nested invocations, such as a sub-graph run as a node, are still reported), and `plan`. A plan span should be emitted only when the instrumentation can reliably tell planning apart from ordinary inference, and the LLM call that produces the plan is its child.
- MCP spans are named `{mcp.method.name} {target}` and carry `mcp.method.name` and `mcp.session.id`. Populating `gen_ai.operation.name` on MCP tool calls lets backends treat them like other tool calls. Metrics are `mcp.client.operation.duration` and `mcp.server.operation.duration`.
- Metric families include `gen_ai.client.operation.duration`, inference-specific `gen_ai.client.inference.*` duration, chunk-timing and token histograms, server-side `gen_ai.server.request.duration`, `time_to_first_token` and `time_per_output_token`, and agent metrics `gen_ai.invoke_agent.duration`, `inference_calls` and `tool_calls`.

## Feeds

[OpenTelemetry GenAI semantic conventions](../concepts/opentelemetry-genai.md)

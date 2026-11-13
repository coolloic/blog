---
title: "Source: Arize Phoenix and OpenInference documentation"
summary: "Phoenix, an OTel-native open-source tracing and evaluation tool, and OpenInference, the span-kind and attribute conventions its instrumentors emit."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "observability", "phoenix"]
---

- **What:** product documentation, repository README and the OpenInference specification
- **Publisher:** Arize AI
- **Date:** accessed 2026-11-14 (Phoenix v21.1.0 released 2026-11-13)
- **Original:** [Phoenix docs](https://arize.com/docs/phoenix), [Phoenix GitHub](https://github.com/Arize-ai/phoenix), [OpenInference semantic conventions](https://github.com/Arize-ai/openinference/blob/main/spec/semantic_conventions.md), [Cost tracking](https://arize.com/docs/phoenix/tracing/how-to-tracing/cost-tracking)

## Summary

Phoenix accepts traces over OTLP and adds evaluation, datasets, experiments, a prompt playground and prompt management. Auto-instrumentation comes from OpenInference (Apache-2.0), a set of OTel instrumentors plus its own attribute conventions that predate the OTel GenAI spec.

## Key claims

- Tracing is built on OpenTelemetry; OpenInference auto-instruments frameworks (LlamaIndex, LangChain, DSPy, Mastra, Vercel AI SDK) and providers (OpenAI, Bedrock, Anthropic) in Python, TypeScript and Java.
- Evaluation: LLM-based evaluators, code checks and human annotations on spans/traces; integrations with Ragas, DeepEval, Cleanlab.
- Datasets can be built from traces and re-run as experiments against new app versions; Span Replay re-runs a traced LLM call in the playground.
- Licence: Elastic License 2.0 (source-available, not OSI open source). Runs locally (`pip install arize-phoenix`, `phoenix serve`), in Docker, on Kubernetes via Helm, or as Arize's hosted offering; Arize AX is the separate enterprise platform.
- Cost tracking (since 2025-06-25): per-span cost from token counts x a per-model price table (input/output per 1M tokens, built-in and overridable in Settings > Models), rolled up to trace and project; not retroactive, and spans without token counts get no cost. A 2026-11-02 blog post says the built-in prices now update automatically from LiteLLM's model price list.
- Recent additions: a built-in debugging agent (PXI) and a remote MCP server endpoint for coding agents.
- OpenInference requires `openinference.span.kind` on every span: LLM, EMBEDDING, CHAIN, RETRIEVER, RERANKER, TOOL, AGENT, GUARDRAIL, EVALUATOR, PROMPT, DECISION.
- OpenInference attributes include `llm.token_count.{prompt,completion,total}` with cache and reasoning breakdowns, flattened `llm.input_messages.N.message.*`, `retrieval.documents` (id, score, content), `session.id`, `user.id`.

## Feeds

[LLM observability](../concepts/llm-observability.md)

---
title: "Source: smolagents docs: Inspecting runs with OpenTelemetry"
summary: "smolagents tracing via the OpenInference SmolagentsInstrumentor (OpenTelemetry) into Phoenix or Langfuse, plus MLflow's own one-line autologging."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "hugging-face", "observability"]
---

- **What:** official tutorial
- **Author:** Hugging Face
- **Date:** read 2026-11-14 (docs v1.26.0)
- **Original:** [https://huggingface.co/docs/smolagents/tutorials/inspect_runs](https://huggingface.co/docs/smolagents/tutorials/inspect_runs)

## Summary

smolagents has no tracing backend of its own. It relies on OpenTelemetry through the OpenInference instrumentor, and the page shows three backends.

## Key claims

- Agent runs are hard to validate and fill consoles with logs; most errors are model mistakes the agent fixes on the next step, so recorded traces are needed in production.
- Install `smolagents[telemetry,toolkit]`, then call `SmolagentsInstrumentor().instrument()` from `openinference.instrumentation.smolagents`.
- Phoenix: start the collector (`python -m phoenix.server.main serve`), call `phoenix.otel.register()`, then instrument; the UI is on port 6006. Langfuse: install `langfuse` and `openinference-instrumentation-smolagents`, set `LANGFUSE_PUBLIC_KEY`/`LANGFUSE_SECRET_KEY`/`LANGFUSE_HOST`, check auth with `get_client()`, then instrument. MLflow: no OpenInference step; `mlflow.smolagents.autolog()` tracks runs, spans, inputs/outputs and token usage.
- Traces show a manager `CodeAgent` calling a managed `ToolCallingAgent` as nested spans.

## Feeds

- [smolagents](../concepts/smolagents.md)

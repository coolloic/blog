---
title: "Source: LangSmith tracing SDK, OTel export and deployment pricing"
summary: "LangSmith docs on @traceable, wrap_openai, trace/RunTree and flushing, OTel environment variables, plus the pricing page's plans and Agent Server metering and the 2025 product rename."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "langsmith", "observability"]
---

- **What:** official documentation, pricing page and changelog entry
- **Publisher:** LangChain
- **Date:** accessed 2026-11-14; rename announced October 2025
- **Original:** [Annotate code for tracing](https://docs.langchain.com/langsmith/annotate-code), [Trace with OpenTelemetry](https://docs.langchain.com/langsmith/trace-with-opentelemetry), [Pricing](https://www.langchain.com/pricing), [Changelog](https://changelog.langchain.com/)

## Summary

How code that is not LangChain gets traced into LangSmith, how traces leave the process, and what the hosted platform costs and is called after the October 2025 rebrand.

## Key claims

- `@traceable` turns any function into a run (nested calls become children); `run_type="llm"` enables token/latency display. `wrap_openai` traces an OpenAI client. Python's `trace` context manager and the low-level `RunTree` give manual control; `RunTree` posts regardless of `LANGSMITH_TRACING`.
- `tracing_context(enabled=...)` toggles tracing at runtime. LangChain and LangGraph are traced automatically when `LANGSMITH_TRACING=true` and `LANGSMITH_API_KEY` are set.
- Traces are sent from a background thread; a short-lived process can exit before upload, so call `client.flush()` in a `finally` block.
- OTel: `LANGSMITH_OTEL_ENABLED` exports LangChain/LangGraph spans via OTel; `LANGSMITH_OTEL_ONLY` sends only to your OTel endpoint. Ingestion is asynchronous and returns 200 before processing.
- Pricing (page read 2026-11-14): Developer free (1 seat, up to 5k base traces/month), Plus $39/seat/month (unlimited seats, 10k base traces/month); both Developer and Plus include one small serverless Agent Server at no charge, Enterprise custom with hybrid or fully self-hosted options. Base traces retained 14 days, extended 180 days (upgrade fee). Additional Agent Servers metered in LSUs (1 LSU = $1): 0.0675 LSU per runtime vCPU-hour, 0.009 per runtime GiB-hour, 0.177 per database vCPU-hour, 0.025 per database GiB-hour.
- October 2025: LangGraph Platform renamed LangSmith Deployment and LangGraph Studio renamed LangSmith Studio; naming change only, APIs and pricing unchanged.

## Feeds

[LangSmith](../concepts/langsmith.md), [LangGraph](../concepts/langgraph.md)

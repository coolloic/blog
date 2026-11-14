---
title: "Source: LiteLLM docs: callbacks, custom callbacks, proxy logging"
summary: "How LiteLLM emits logs: string-named integrations via success/failure callbacks, CustomLogger hook classes, the StandardLoggingPayload, OpenTelemetry export, and message-redaction switches on the proxy."
category: source
lastmod: 2026-11-14
tags: ["platforms", "observability"]
---

- **What:** official documentation pages ("Callbacks", "Custom Callbacks", "Proxy - Logging")
- **Publisher:** BerriAI (LiteLLM)
- **Date:** living docs, read 2026-11-14
- **Original:** [observability/callbacks](https://docs.litellm.ai/docs/observability/callbacks), [observability/custom_callback](https://docs.litellm.ai/docs/observability/custom_callback), [proxy/logging](https://docs.litellm.ai/docs/proxy/logging)

## Summary

LiteLLM's logging is a callback system. You either name built-in integrations (Langfuse, OpenTelemetry, Datadog, S3, and many more) or register your own `CustomLogger` subclass. The proxy configures the same mechanism in `litellm_settings` and adds per-request controls for redaction and opting out of logging.

## Key claims

- SDK: `litellm.input_callback`, `litellm.success_callback`, `litellm.failure_callback` take lists of integration names or functions; `litellm.callbacks` takes `CustomLogger` instances.
- `CustomLogger` hooks: `log_pre_api_call`, `log_post_api_call`, `log_success_event`, `log_failure_event`, and async `async_log_success_event` / `async_log_failure_event`. Per-deployment hooks (`async_pre_call_deployment_hook`, `async_post_call_success_deployment_hook`, `async_post_call_failure_deployment_hook`) fire once per attempt, including retries and fallbacks.
- Proxy-only hooks `async_pre_call_hook` (modify the request) and `async_post_call_success_hook` (see the caller's key data, modify the response) do not run in SDK mode.
- Callback kwargs carry `response_cost`, `cache_hit` and user metadata; success and failure callbacks get `standard_logging_object` (the StandardLoggingPayload), though it can be missing for intermediate streaming events.
- Proxy config: `litellm_settings.callbacks` / `success_callback` / `failure_callback`; a custom logger is referenced by dotted path to an instance. Each response carries an `x-litellm-call-id` header.
- OpenTelemetry: add `otel`, set `OTEL_EXPORTER` (`console`, `otlp_http`, `otlp_grpc`) and `OTEL_ENDPOINT`; incoming `traceparent` is honoured; forwarding it to providers can break Bedrock and Vertex calls.
- Privacy controls: `turn_off_message_logging` drops prompts and responses but keeps spend metadata; `redact_user_api_key_info` strips key identity for some integrations; a request-body `no-log: true` skips logging unless `global_disable_no_log_param` is set. Several destinations (GCS, Azure Blob, per-request callback disabling) need an Enterprise licence.
- The S3 logger queues per worker and drops objects after `s3_max_retry_age_seconds` (default 3600) or past `s3_max_queue_size` (default 50000), so logs can be lost under sustained failures.

## Feeds

[LiteLLM](../concepts/litellm.md)

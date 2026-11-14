---
title: "Source: LiteLLM docs: getting started, input params, proxy config.yaml"
summary: "LiteLLM's docs on the SDK/proxy split, provider-prefixed model names, OpenAI-param translation and drop_params, and the proxy's config.yaml (model_name aliases vs litellm_params.model)."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gateways"]
---

- **What:** official documentation pages ("Getting Started", "Input Params", "Proxy Config.yaml")
- **Publisher:** BerriAI (LiteLLM)
- **Date:** living docs, read 2026-11-14 (config page describes behaviour as of v1.103.0)
- **Original:** [docs.litellm.ai/docs](https://docs.litellm.ai/docs/), [completion/input](https://docs.litellm.ai/docs/completion/input), [proxy/configs](https://docs.litellm.ai/docs/proxy/configs)

## Summary

LiteLLM ships two things: a Python SDK that calls 100+ providers through OpenAI-format functions, and a self-hosted proxy that wraps the same code behind an OpenAI-compatible HTTP server. The SDK suits one Python app; the proxy suits a platform team governing LLM access for an organisation. The input-params page explains how OpenAI parameters are translated per provider, and the config page defines how the proxy maps client-facing model names onto provider deployments.

## Key claims

- SDK entry points: `completion()`, `embedding()`, `image_generation()`, plus a `Router` for retries, fallbacks and load balancing. Responses follow the OpenAI Chat Completions shape; streaming (`stream=True`) yields chunks.
- Models are addressed as `<provider>/<model>`, e.g. `anthropic/...`, `bedrock/...`, `vertex_ai/...`, `ollama/...`, `azure/<deployment-name>`; an `openai/` prefix marks any OpenAI-compatible endpoint (the config example points one at a vLLM server).
- Provider errors are mapped to OpenAI-style exception classes such as `litellm.RateLimitError` and `litellm.AuthenticationError`, so OpenAI error handling keeps working.
- By default an unsupported OpenAI param raises an exception; `litellm.drop_params = True` (or per call) silently drops it. `additional_drop_params` and `allowed_openai_params` adjust this per request; `get_supported_openai_params()` reports support for a model/provider pair. Support varies by model inside a provider.
- Any non-OpenAI kwarg is assumed to be provider-specific and passed through into the provider request body.
- In `config.yaml`, `model_name` is the alias clients send; `litellm_params.model` is the provider string. Several entries sharing a `model_name` form a load-balancing group. Top-level sections: `model_list`, `litellm_settings`, `router_settings`, `general_settings`, `credential_list`, `environment_variables`.
- `os.environ/VAR` can stand in for any config value and is resolved at startup. Wildcard entries (`"*"`, `openai/*`) forward arbitrary model names to a provider.
- `general_settings.master_key` makes the proxy require that bearer token. From v1.103.0 a key set in `config.yaml` owns that setting and UI/API writes to it return 400; before that, database values overrode the YAML. Models stored in the database add deployments rather than replacing YAML ones.
- `database_connection_pool_limit` (default 10) is per worker, so total Postgres connections scale with instances times workers.

## Feeds

[LiteLLM](../concepts/litellm.md)

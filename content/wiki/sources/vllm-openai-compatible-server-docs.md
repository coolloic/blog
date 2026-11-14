---
title: "Source: vLLM docs: OpenAI-Compatible Server"
summary: "Official reference for vLLM's OpenAI-compatible API: auth, extra sampling parameters, structured outputs, generation-config defaults."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (latest, read 2026-11-14)
- **Author:** vLLM project
- **Date:** 2026-11-14 (accessed)
- **Original:** [vLLM docs: OpenAI-Compatible Server](https://docs.vllm.ai/en/latest/serving/online_serving/openai_compatible_server/)

## Summary

How to point an OpenAI client at `vllm serve`, which request fields go beyond the OpenAI spec, and which server defaults surprise people.

## Key claims

- Examples call `http://localhost:8000/v1`; `--api-key` or `VLLM_API_KEY` sets a key.
- The key only guards `/v1`, `/v2`, `/inference` and `/cohere` prefixes; other routes such as `/invocations` are unauthenticated, so the docs recommend a reverse proxy.
- vLLM-only parameters (`top_k`, `min_p`, `repetition_penalty`, ...) go in the OpenAI client's `extra_body` or straight into the JSON payload.
- Structured outputs: a `structured_outputs` field (e.g. `{"choice": [...]}`) or `response_format` with `json_schema`.
- By default the server applies the model repo's `generation_config.json`, which can override the sampling defaults you expect; `--generation-config vllm` disables this.
- Request-level chat template controls: `chat_template`, `chat_template_kwargs`, `add_generation_prompt`, `continue_final_message`.
- A non-zero `priority` requires priority scheduling on the server.

## Feeds

[vLLM](../concepts/vllm.md)

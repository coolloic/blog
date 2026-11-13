---
title: "Source: NVIDIA NeMo Guardrails documentation"
summary: "NVIDIA's docs and README for the open-source NeMo Guardrails library: five rail types, config.yml and Colang, self-check rails, streaming and parallel options."
category: source
lastmod: 2026-11-14
tags: ["security", "guardrails", "nvidia"]
---

- **What:** official library documentation and GitHub README (overview, "How it works", guardrail catalog, configuration reference, Colang 1.0 input-rails tutorial)
- **Publisher:** NVIDIA
- **Date:** "latest" docs read 2026-11-14; latest released version 0.24.1 per the README (no release date given)
- **Original:** [NeMo Guardrails docs](https://docs.nvidia.com/nemo/guardrails/latest/index.html) · [configuration reference](https://docs.nvidia.com/nemo/guardrails/latest/configure-guardrails/configuration-reference) · [input rails tutorial](https://docs.nvidia.com/nemo/guardrails/configure-guardrails/colang/colang-1/tutorials/4-input-rails.md) · [GitHub](https://github.com/NVIDIA-NeMo/Guardrails)

## Summary

NeMo Guardrails is a Python library (and a Kubernetes microservice using the same config format) that sits between an application and its LLM and runs "rails" at five points of a request. Rails are configured in YAML (`config.yml`, `prompts.yml`) and Colang flows, plus Python custom actions. It ships self-check rails (the LLM judges its own input/output with a yes/no prompt) and integrations with dedicated safety models and third-party services.

## Key claims

- Five rail types, in request order: **input** (allow, alter or reject the user message), **retrieval** (filter or transform RAG chunks), **dialog** (Colang flows over canonical-form messages that pick the next step), **execution** (validate tool/action inputs and outputs), **output** (allow, edit or block the response).
- The runtime is event-driven: a user message becomes an event; depending on config it may generate a canonical user intent, decide the next step, run an action, retrieve chunks, call the LLM and generate the bot message. Dialog prompt tasks are `generate_user_intent`, `generate_next_steps`, `generate_bot_message`.
- Colang 1.0 and 2.0 are both supported; 1.0 is the default.
- Config keys: `models` (types `main`, `embeddings`, `jailbreak_detection` are reserved; `content_safety` is a convention referenced as `$model=content_safety`), `instructions`, `rails.input.flows`, `rails.output.flows`, `prompts`, `knowledge_base`, `tracing`.
- Self-check input: a separate LLM call with the `self_check_input` prompt; answer "Yes" blocks. In the tutorial's `explain()` output a blocked request costs 1 LLM call, an allowed one 2 (check + `general` answer). Missing prompt raises an error at load; reasoning models need an explicit `max_tokens` (default fallback 1024).
- Output-rail streaming (`rails.output.streaming`): `enabled` (default false), `chunk_size` 200 tokens, `context_size` 50 tokens carried between chunks, `stream_first` true (stream before the rails run on the chunk).
- `rails.input.parallel` / `rails.output.parallel` (default false) run rails concurrently; `rails.dialog.single_call.enabled` merges intent and response into one LLM call, with fallback to multiple calls.
- Catalog categories: content safety (e.g. Llama 3.1 NemoGuard 8B Content Safety, Llama Guard), jailbreak protection (heuristics, self-check, NemoGuard Jailbreak Detect NIM), topic control, PII (Presidio, GLiNER-PII and others), agentic security, tool-call rails, hallucination and fact-checking, LLM self-check, third-party APIs (ActiveFence, Cisco AI Defense, Guardrails AI, and more).
- Server mode exposes an OpenAI-style `/v1/chat/completions`; LangChain and LangGraph integrations exist.

## Feeds

[Guardrail tooling](../concepts/guardrail-tooling.md)

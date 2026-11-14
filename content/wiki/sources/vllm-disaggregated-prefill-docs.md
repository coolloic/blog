---
title: "Source: vLLM docs: Disaggregated Prefilling"
summary: "Official, experimental vLLM feature that runs prefill and decode in separate instances linked by a KV-transfer connector."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (latest, read 2026-11-14)
- **Author:** vLLM project
- **Date:** 2026-11-14 (accessed)
- **Original:** [vLLM docs: Disaggregated Prefilling](https://docs.vllm.ai/en/latest/features/disagg_prefill.html)

## Summary

Describes running prefill and decode as separate vLLM instances, with a connector shipping the KV cache from one to the other, and is explicit that the benefit is latency control, not throughput.

## Key claims

- Motivation: tune TTFT and ITL independently (different parallelism per phase) and control tail ITL, since prefills no longer interrupt decodes; chunked prefill helps too but chunk size is hard to tune.
- Disaggregated prefill does not improve throughput.
- Connectors include NixlConnector, LMCacheConnectorV1, MooncakeConnector, OffloadingConnector (KV to CPU), MultiConnector and others, chosen with `--kv-transfer-config` JSON (e.g. `{"kv_connector":"NixlConnector","kv_role":"kv_both"}`).
- Marked experimental and subject to change.

## Feeds

[vLLM](../concepts/vllm.md)

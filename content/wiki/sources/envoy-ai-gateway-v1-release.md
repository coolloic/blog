---
title: "Source: Envoy AI Gateway v1.0 release notes (now Agent Router)"
summary: "Release notes for the first GA of Envoy AI Gateway (2026-06-23): Kubernetes-native unified OpenAI-compatible API over 16 providers, provider fallback, token quotas, InferencePool and MCP routing; project later renamed Agent Router."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gateways", "kubernetes"]
---

- **What:** official release notes
- **Publisher:** Envoy AI Gateway maintainers (project now named Agent Router, under the Agentic AI Foundation)
- **Date:** 2026-06-23 (read 2026-11-14)
- **Original:** [theagentrouter.ai/release-notes/v1.0/](https://theagentrouter.ai/release-notes/v1.0/) (formerly aigateway.envoyproxy.io)

## Summary

v1.0 declares the `v1beta1` control-plane CRDs stable. The gateway is an additive layer on Envoy Gateway (built on Envoy Gateway v1.8.1, Envoy Proxy v1.38.1, Gateway API v1.5.1).

## Key claims

- One OpenAI-compatible endpoint across 16 providers with request/response translation.
- Automatic provider fallback; InferencePool endpoint selection for self-hosted models via the Gateway API Inference Extension.
- Rate limiting on model tokens and per `QuotaPolicy`, with injected backend rate-limit filters to respect upstream provider limits.
- `BackendSecurityPolicy` injects upstream credentials (API key, AWS, Azure, GCP), so clients never hold provider keys.
- `MCPRoute` aggregates MCP servers with CEL-based per-tool authorization; reasoning tokens are reported separately in GenAI metrics.
- The project was renamed Agent Router ("same code, same maintainers").

## Feeds

[LLM gateways](../concepts/llm-gateways.md)

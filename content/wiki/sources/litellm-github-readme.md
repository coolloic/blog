---
title: "Source: LiteLLM GitHub repository README"
summary: "BerriAI's repository front page: LiteLLM as an open-source AI gateway with a Python SDK and a proxy server, an enterprise tier under a commercial licence, and -stable Docker images that pass load tests."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gateways"]
---

- **What:** project README on GitHub
- **Publisher:** BerriAI (LiteLLM)
- **Date:** living page, read 2026-11-14
- **Original:** [github.com/BerriAI/litellm](https://github.com/BerriAI/litellm)

## Summary

The README presents LiteLLM as an open-source AI gateway with two delivery modes: a Python SDK used directly in code, and a proxy server run centrally for teams that adds virtual keys, per-project spend tracking and an admin dashboard.

## Key claims

- Two modes: SDK (with a Router for retries and fallbacks) and Proxy Server / AI Gateway.
- Enterprise features (security, user management, support) sit under a separate "LiteLLM Commercial License".
- Claimed proxy overhead: 8 ms P95 latency at 1k RPS (vendor benchmark).
- The project recommends Docker images tagged `-stable`, which it says pass 12-hour load tests before publication.
- On 2026-11-14 the repository showed about 63k stars and 13k forks; version numbers in the page reach v1.105.0.

## Feeds

[LiteLLM](../concepts/litellm.md)

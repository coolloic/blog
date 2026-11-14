---
title: "Source: LiteLLM GitHub security advisories list"
summary: "BerriAI's published GitHub security advisories for LiteLLM; as of November 2026 the first page shows ten advisories from May to November 2026, four of them critical."
category: source
lastmod: 2026-11-14
tags: ["platforms", "security"]
---

- **What:** repository security-advisory index
- **Publisher:** BerriAI (LiteLLM)
- **Date:** living page, read 2026-11-14
- **Original:** [github.com/BerriAI/litellm/security/advisories](https://github.com/BerriAI/litellm/security/advisories)

## Summary

The advisory list shows a steady stream of proxy vulnerabilities through 2026, concentrated in authentication, credential handling and request parameters that make the server fetch URLs or read files. Only the first page was read; more advisories exist on later pages.

## Key claims

- Critical: authentication bypass via Host header injection (GHSA-4xpc-pv4p-pm3w, 2026-05-28); privilege escalation to proxy admin via reuse of the salt key (GHSA-7hp6-4w63-5g45, 2026-09-30); unauthenticated file read that leaks the master key on Enterprise proxies (GHSA-w4c7-34wj-hqm8, 2026-10-27).
- High: an `internal_user_viewer` can read local files via `vertex_ai_credentials` (GHSA-g5ff-637f-6q2m, 2026-10-01); authenticated secret exfiltration via Azure Entra credential parameters in the request body (GHSA-2rwg-2wh4-7c4f, 2026-11-12).
- Moderate: SSRF and provider-credential exfiltration through unvalidated request-body routing parameters (GHSA-3cv6-jpf6-8222) and via `user_config` (GHSA-hx8v-g79f-8w5f), both 2026-08-26; path traversal in Skills archive extraction (GHSA-5jmr-gcrj-2c9q, 2026-06-30); reflected XSS in `/sso/debug/callback` (2026-09-30).
- Low: local file read via request-supplied OIDC file references (GHSA-4g5m-c9r5-49xf, 2026-06-30).

## Feeds

[LiteLLM](../concepts/litellm.md)

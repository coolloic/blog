---
title: "Source: LiteLLM security update, suspected supply-chain incident (March 2026)"
summary: "LiteLLM's incident post: PyPI releases 1.82.7 and 1.82.8 shipped a credential stealer after a CI/CD compromise; the pinned proxy Docker image was not affected."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gateways", "security"]
---

- **What:** vendor security advisory / incident blog post
- **Publisher:** BerriAI (LiteLLM)
- **Date:** 2026-03-24, updated through 2026-03-30
- **Original:** [docs.litellm.ai/blog/security-update-march-2026](https://docs.litellm.ai/blog/security-update-march-2026)

## Summary

Two LiteLLM releases on PyPI were published by an attacker and carried malware that harvested secrets from the host. The post explains scope, suspected root cause and remediation.

## Key claims

- Affected: `litellm` 1.82.7 and 1.82.8 on PyPI, live for roughly 40 minutes from about 10:39 UTC on 2026-03-24 before quarantine; the post's "who is affected" section uses a wider 10:39-16:00 UTC window for checking installs.
- Suspected entry point: the Trivy dependency in LiteLLM's CI/CD scanning workflow, leading to direct uploads to PyPI that bypassed official workflows.
- The payload collected environment variables, SSH keys, cloud credentials, Kubernetes tokens and database passwords and sent them to an attacker domain.
- The official proxy Docker image pins dependencies and was not affected.
- Remediation: rotate all secrets on affected hosts, look for `litellm_init.pth`, pin to a known-clean version; v1.83.0 was released from a rebuilt pipeline and images are now cosign-signed.

## Feeds

[LLM gateways](../concepts/llm-gateways.md)

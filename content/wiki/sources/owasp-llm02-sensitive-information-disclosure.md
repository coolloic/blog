---
title: "Source: OWASP LLM02:2025 Sensitive Information Disclosure"
summary: "OWASP GenAI Security Project entry on how LLM applications leak PII, business data and model details, with mitigations from sanitization to access control and differential privacy."
category: source
lastmod: 2026-11-14
tags: ["enterprise", "security", "owasp"]
---

- **What:** risk entry in the OWASP Top 10 for LLM Applications (2025 edition)
- **Publisher:** OWASP GenAI Security Project
- **Date:** 2025 edition; accessed 2026-11-14
- **Original:** [LLM02:2025 Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/)

## Summary

Lists the ways data leaks out of LLM applications: PII in responses, proprietary algorithms or training data, and confidential business information. It argues that system-prompt rules alone cannot stop this, because prompt injection can bypass them.

## Key claims

- Leak types: PII, proprietary algorithms or training data (enabling model inversion), and confidential business data.
- Mitigations: sanitize or mask data before training and at input, least-privilege access to data sources, federated learning and differential privacy, tokenization or pattern-based redaction, homomorphic encryption, hardened configuration that hides system settings, and clear retention and opt-out policies for users.
- Example scenarios: one user's data returned to another, injection that bypasses input filters, and memorized training data resurfacing.

## Feeds

[Enterprise LLM deployment](../concepts/enterprise-llm-deployment.md)

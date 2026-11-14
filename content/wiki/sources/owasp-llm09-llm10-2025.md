---
title: "Source: OWASP LLM09:2025 Misinformation and LLM10:2025 Unbounded Consumption"
summary: "The two 2025 OWASP risk pages that absorbed the 2023 entries Overreliance, Model Denial of Service and Model Theft."
category: source
lastmod: 2026-11-14
tags: ["security", "owasp", "standards"]
---

- **What:** two per-risk pages of the OWASP Top 10 for LLM Applications 2025, plus the edition's resource page
- **Publisher:** OWASP GenAI Security Project
- **Date:** 2025 edition resource page dated 2024-11-17; pages read 2026-11-14
- **Original:** [LLM09:2025 Misinformation](https://genai.owasp.org/llmrisk/llm092025-misinformation/), [LLM10:2025 Unbounded Consumption](https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/), [2025 edition resource page](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)

## Summary

Misinformation covers false or unsupported output that people or systems rely on; it treats overreliance (trusting output without checking it) as the amplifier. Unbounded Consumption covers uncontrolled use of inference, which includes cost attacks and copying the model through its API. Neither page names the 2023 entries it replaces.

## Key claims

- **LLM09 examples:** factual inaccuracies, unsupported claims, misrepresented expertise, unsafe code generation (including nonexistent libraries). Named causes: hallucination, training-data bias, incomplete information.
- **LLM10 examples:** variable-length input floods, denial of wallet, continuous input overflow, resource-intensive queries, model extraction via API, functional model replication, side-channel attacks.
- LLM10 references the OWASP ML Top 10 "Model Theft" item only as related material.
- The 2025 edition was published on 2024-11-17 as a community effort that started in 2023.

## Feeds

[OWASP Top 10 for LLM and Agentic Applications](../concepts/owasp-top-10-for-llm.md)

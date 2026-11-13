---
title: "Source: Gemini Enterprise Agent Platform — Release Notes (2026)"
summary: "Google's 2026 release notes, including the April 22, 2026 rebrand of Vertex AI and its agent, RAG and model services."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gcp"]
---

- **What:** vendor release notes
- **Author:** Google Cloud
- **Date:** entries April–November 2026, read 2026-11-14
- **Original:** [Gemini Enterprise Agent Platform release notes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes)

## Summary

A dated changelog for the platform formerly called Vertex AI. It is the authoritative record of the 2026 renames and the platform's new governance and capacity features.

## Key claims

- April 22, 2026: Vertex AI became part of Gemini Enterprise Agent Platform (short name "Agent Platform").
- Same date: Agent Engine → Agent Runtime; Vertex AI RAG Engine → RAG Engine; Vertex AI Model Garden → Model Garden; Vertex AI Studio → Agent Studio; Vertex AI Search → Agent Search; Vector Search 2.0 → Agent Retrieval; Memory Bank → Agent Platform Memory Bank.
- May 14, 2026: Priority PayGo GA. May 19, 2026: Gemini 3.5 Flash GA; Provisioned Throughput adds a tokens-per-second latency SLA (generation speed from first to last token).
- June 18, 2026: Agent Gateway, Agent Observability and Agent Registry GA; Agent Identity API in preview. June 24: Model Armor for Agent Gateway GA.
- June 29, 2026: semantic governance policies in public preview; later extended with VPC-SC support and custom denial messages (Sep 2026).
- Nov 4, 2026: Provisioned Throughput supports supervised fine-tuned models (GA).
- Model arrivals in H2 2026 include Gemini 3.6–3.8 Flash; Gemini 4 Argon (GA Oct 13), Carbon (GA Nov 10) and Hydrogen (GA Nov 12, a short-term release with a minimum 45-day retirement notice); Claude Opus 5.5 (Sep 22), Sonnet 5.5 (Sep 28) and Haiku 5.5 (Oct 7); Grok 4.6/4.7; and DeepSeek-V4.1-Flash (preview).
- Deprecations are frequent: Gemini 2.0 Flash and 2.0 Flash-Lite discontinued June 1, 2026 (serving and PT). On July 21, 2026 a list of open-model `-maas` endpoints (DeepSeek, GLM, GPT-OSS, Kimi, Llama, MiniMax, Qwen, multilingual E5) was deprecated, with retirement on October 21, 2026. This covers those specific endpoints, not open models in general.

## Feeds

[Google Vertex AI](../concepts/google-vertex-ai.md)

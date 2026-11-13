---
title: "Source: Gemini Enterprise Agent Platform — Agent Runtime Overview (formerly Vertex AI Agent Engine)"
summary: "Google's managed agent hosting and its companion services: Sessions, Memory Bank, Code Execution, Example Store, evaluation and observability."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gcp", "agents"]
---

- **What:** vendor documentation
- **Author:** Google Cloud
- **Date:** undated, read 2026-11-14
- **Original:** [Agent Runtime overview](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/overview)

## Summary

Overview of the agent-hosting layer of Gemini Enterprise Agent Platform: what each managed service does, which frameworks are supported and which security controls apply.

## Key claims

- Agent Runtime is a fully managed, serverless environment for deploying and scaling agents, with built-in tracing (Cloud Trace), logging and monitoring.
- Companion services: Sessions (conversation state), Memory Bank (long-term facts and preferences), Code Execution (sandbox), Example Store, an evaluation service, a feedback service, and Computer Use.
- Frameworks: ADK, LangChain, LangGraph, LlamaIndex Query Pipeline, AG2, A2A, and custom agents.
- VPC Service Controls cover Runtime, evaluation, Sessions, Memory Bank and Code Execution (not Example Store).
- CMEK for deployed agents works only on single-region endpoints, not on `us`/`eu` multi-regions.
- A Private Service Connect interface connects an agent to your VPC; Agent Gateway routes runtime traffic; IAM agent identity governs access.
- Memory Bank's ML processing stays in the region or multi-region of the model endpoint it uses.

## Feeds

[Google Vertex AI](../concepts/google-vertex-ai.md)

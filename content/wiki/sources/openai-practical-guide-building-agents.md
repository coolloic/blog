---
title: "Source: A Practical Guide to Building Agents (OpenAI)"
summary: "OpenAI's 2025 guide on when to build an agent, agent components, orchestration patterns, guardrails and human-intervention triggers."
category: source
lastmod: 2026-11-14
tags: ["fde", "agents"]
---

- **What:** product/engineering guide (PDF, 34 pages)
- **Publisher:** OpenAI
- **Date:** April 2025 (PDF metadata)
- **Original:** [cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)

## Summary

Distils customer deployments into guidance for a first agent: which workflows justify an agent, how to pick models, define tools and instructions, choose single- vs multi-agent orchestration, and layer guardrails with human intervention.

## Key claims

- Agents suit workflows that resisted deterministic automation: complex decisions with exceptions (refund approval), unwieldy rule sets (vendor security review), heavy unstructured data (insurance claims). If a use case does not clearly fit, a deterministic solution may suffice.
- Model selection: prototype with the most capable model to set an eval baseline, hit the accuracy target, then swap in smaller models to cut cost and latency.
- Tools come in three types: data, action and orchestration (agents as tools). Legacy systems without APIs can be driven by computer-use models.
- Customers succeed more with an incremental approach than with an immediately fully autonomous architecture; maximise a single agent before splitting into several.
- Plan for human intervention, especially early in deployment, to find failures and build the eval cycle. Triggers: exceeding failure thresholds (retries, repeated misunderstanding) and high-risk actions (cancellations, large refunds, payments).
- Deployment is not all-or-nothing: start small, validate with real users, grow capabilities over time.

## Feeds

[AI use-case discovery](../concepts/ai-use-case-discovery.md) · [POC to production](../concepts/poc-to-production.md)

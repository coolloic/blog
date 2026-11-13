---
title: "Source: OWASP GenAI Red Teaming Guide v1.0"
summary: "OWASP's January 2025 guide that splits GenAI red teaming into model, implementation, system/infrastructure and runtime (human and agentic) evaluation."
category: source
lastmod: 2026-11-14
tags: ["security", "red-teaming", "owasp"]
---

- **What:** practitioner guide, version 1.0
- **Publisher:** OWASP GenAI Security Project
- **Date:** 2025-01-22; accessed 2026-11-14
- **Original:** [genai.owasp.org/resource/genai-red-teaming-guide](https://genai.owasp.org/resource/genai-red-teaming-guide/)

## Summary

A methodology document for security teams, ML engineers and risk owners. Its main contribution is scoping: it argues that red teaming an LLM product must cover far more than the model, and gives a phase-by-phase blueprint with checklists. (Phase detail here is from the guide's table of contents as reported by search summaries; the full PDF was not read.)

## Key claims

- Four evaluation areas: **model evaluation** (inherent weaknesses such as toxicity, bias, jailbreak susceptibility), **implementation evaluation** (system prompts, guardrails, filters), **system evaluation** (the wider environment: APIs, storage, integrations, supply chain; called "infrastructure assessment" on the landing page), and **runtime / human and agentic evaluation** (how users or external agents manipulate the live system).
- Audience spans cybersecurity staff, AI/ML engineers, red-team practitioners, risk managers, CISOs and business leaders.

## Feeds

[LLM red teaming](../concepts/llm-red-teaming.md)

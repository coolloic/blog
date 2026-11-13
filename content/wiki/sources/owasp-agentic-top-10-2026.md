---
title: "Source: OWASP Top 10 for Agentic Applications (2026)"
summary: "OWASP's December 2025 list of the ten main risks specific to autonomous agents, from ASI01 Agent Goal Hijack to ASI10 Rogue Agents."
category: source
lastmod: 2026-11-14
tags: ["security", "owasp", "agents"]
---

- **What:** community security standard
- **Publisher:** OWASP GenAI Security Project, Agentic Security Initiative
- **Date:** 2025-12-09; accessed 2026-11-14
- **Original:** [resource page](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/). Entry names cross-checked against [Speakeasy's explainer](https://www.speakeasy.com/blog/owasp-agentic-top-10-explained) because the official PDF was not fetched.

## Summary

A companion to the LLM Top 10 for systems that plan, call tools, keep memory and talk to other agents. It is the checklist a red team uses to scope agent-specific tests, and promptfoo exposes it as the `owasp:agentic` framework filter.

## Key claims

- ASI01 Agent Goal Hijack · ASI02 Tool Misuse and Exploitation · ASI03 Identity and Privilege Abuse · ASI04 Agentic Supply Chain Vulnerabilities · ASI05 Unexpected Code Execution · ASI06 Memory and Context Poisoning · ASI07 Insecure Inter-Agent Communication · ASI08 Cascading Failures · ASI09 Human-Agent Trust Exploitation · ASI10 Rogue Agents.
- Secondary summaries describe two organising principles, least agency and strong observability, and say the list was built from observed incidents.

## Feeds

[LLM red teaming](../concepts/llm-red-teaming.md)

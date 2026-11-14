---
title: "Source: CSA research note, OWASP's 2026 LLM Top 10 and Agent Control Standard"
summary: "Cloud Security Alliance analysis of the 2026 OWASP LLM list and the Agent Control Standard v0.1, with a prioritised action list for security teams."
category: source
lastmod: 2026-11-14
tags: ["security", "owasp", "agents"]
---

- **What:** research note (secondary source)
- **Publisher:** Cloud Security Alliance (CSA) Labs
- **Date:** after 2026-09-02; accessed 2026-11-14
- **Original:** [labs.cloudsecurityalliance.org](https://labs.cloudsecurityalliance.org/research/csa-research-note-owasp-genai-top10-2026-agent-control-stand/)

## Summary

Summarises the 2026 ranking and its hybrid methodology, describes the Agent Control Standard (ACS) as a separate runtime-enforcement specification, and turns both into immediate, short-term and strategic actions.

## Key claims

- The 2026 list was published 2026-08-03 and formally unveiled with ACS on 2026-09-01/02, when the community passed 30,000 members.
- Hybrid scoring: 75% expert consensus, 25% evidence from 6,639 documented incidents.
- Hidden Context Exposure extends confidentiality to retrieved documents, agent memory, tool responses and application state.
- ACS v0.1 defines guardian-agent enforcement points, OpenTelemetry and OCSF observability, and an Agent Bill of Materials (CycloneDX, SWID, SPDX). Roadmap: v1 instrumentation and reference guardian agents, v2 full AgBOM, v3 deny/modify enforcement across A2A and MCP.
- Cites an OWASP agentic governance report finding that prompt injection maps to six of the ten agentic risk categories.
- Advice: re-baseline risk registers on the 2026 order, audit confidentiality beyond the system prompt, inventory agents and their reach, enforce tool scope at every call, pilot ACS rather than deploy it, and build programmes on risk categories rather than one year's ranking.

## Feeds

[OWASP Top 10 for LLM and Agentic Applications](../concepts/owasp-top-10-for-llm.md)

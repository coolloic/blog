---
title: "Source: Help Net Security, OWASP 2026 LLM Top 10: The model will be fooled"
summary: "News report on the 2026 OWASP LLM Top 10 with the project leads' methodology: 75% practitioner vote, 25% incident data from 6,639 incidents."
category: source
lastmod: 2026-11-14
tags: ["security", "owasp"]
---

- **What:** security news article with project-lead commentary (secondary source)
- **Publisher:** Help Net Security
- **Date:** 2026-08-06; accessed 2026-11-14
- **Original:** [helpnetsecurity.com](https://www.helpnetsecurity.com/2026/08/06/owasp-2026-llm-top-10-released/)

## Summary

Reports the 2026 release and explains how the ranking was built and why entries moved. The leads' framing: assume the model will be fooled and design the surrounding system so that nothing important breaks when it is.

## Key claims

- Ranking weight: 75% practitioner voting, 25% data from 6,639 real incidents in public vulnerability databases and an AI-harm database. The leads say a quarter weight can move an entry one tier when belief and evidence diverge sharply.
- Prompt Injection stays #1 although few successful incidents appear in public databases; OWASP attributes this to a "defense effect" (heavy mitigation hides the risk).
- Misinformation climbs because incident data ranked it high while voters ranked it low; it is framed as a system failure once outputs drive tool calls.
- Excessive Agency rises to #3 because both votes and incidents point at agentic deployments.
- Improper Output Handling falls from #5 to #10 while gaining scope; System Prompt Leakage is renamed Hidden Context Exposure.
- Once the model becomes an actor (callable tools, memory across sessions, downstream consequences), the risk belongs to the separate Agentic Top 10; the LLM list treats the model as a component.

## Feeds

[OWASP Top 10 for LLM and Agentic Applications](../concepts/owasp-top-10-for-llm.md)

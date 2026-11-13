---
title: "Source: OWASP Top 10 for LLM Applications 2026"
summary: "The August 2026 edition of the OWASP LLM Top 10: Excessive Agency rises to #3, System Prompt Leakage becomes Hidden Context Exposure, and the Agent Control Standard is announced."
category: source
lastmod: 2026-11-14
tags: ["security", "owasp", "standards"]
---

- **What:** community security standard (v1.0 PDF) plus launch announcement
- **Publisher:** OWASP GenAI Security Project
- **Date:** resource page 2026-08-03; formal announcement 2026-09-01
- **Original:** [resource page](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/), [announcement](https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/)
- **Ranking detail cross-checked against:** [Aembit summary](https://aembit.io/blog/the-owasp-top-10-for-llm-applications-2026-what-changed-and-why-it-matters/), [Invicti summary](https://www.invicti.com/blog/web-security/owasp-llm-top-10-2026-whats-new), [CSA research note](https://labs.cloudsecurityalliance.org/research/csa-research-note-owasp-genai-top10-2026-agent-control-stand/) and [Help Net Security](https://www.helpnetsecurity.com/2026/08/06/owasp-2026-llm-top-10-released/) (2026-08-06) (the official PDF could not be fetched directly; the secondary summaries agree on the order)

## Summary

The 2026 edition re-ranks the list using incident data and practitioner input and widens several scopes to cover agents. It maps each risk to NIST, MITRE ATLAS, CWE and OWASP's separate Top 10 for Agentic Applications (December 2025). Alongside it OWASP received the Agent Control Standard (ACS), a v0.1 specification for runtime enforcement of agents.

## Key claims

- **2026 order:** LLM01 Prompt Injection (still #1), LLM02 Sensitive Information Disclosure (#2), LLM03 Excessive Agency (up from #6), LLM04 Supply Chain (from #3), LLM05 Data and Model Poisoning (from #4), LLM06 Unbounded Consumption (from #10, the largest climb), LLM07 Misinformation (from #9), LLM08 Hidden Context Exposure (renamed from LLM07:2025 System Prompt Leakage), LLM09 Vector and Embedding Weaknesses (from #8), LLM10 Improper Output Handling (from #5).
- Prompt injection's scope now covers instructions arriving via documents, tool outputs and memory, cross-modal payloads and persistent (memory/RAG-stored) injection (per Aembit and Invicti).
- Hidden Context Exposure covers tool schemas, policy text and workflow criteria, not just the system prompt.
- Supply chain adds substituted weights, unsafe file formats, tampered templates and hallucinated package names (Aembit); poisoning absorbs fine-tuning and adapter compromise.
- Unbounded Consumption is reframed around cost asymmetry: reasoning models and agent loops multiply calls.
- Improper Output Handling explicitly covers terminal/ANSI escape sinks and renderers that auto-fetch external resources (an exfiltration channel).
- Per CSA, ACS v0.1 defines "guardian agent" enforcement points, OpenTelemetry/OCSF tracing, and an Agent Bill of Materials (AgBOM) in CycloneDX, SPDX or SWID; deny/modify enforcement across A2A and MCP is on its v3 roadmap.
- The OWASP Top 10 for Agentic Applications (2025-12-09) opens with ASI01 Agent Goal Hijack, followed by tool misuse (ASI02) and identity/privilege abuse (ASI03) (per secondary listings; official text not fetched).

## Feeds

[LLM security risks](../concepts/llm-security-risks.md) · [Prompt injection](../concepts/prompt-injection.md)

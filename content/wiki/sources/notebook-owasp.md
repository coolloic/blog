---
title: "Source: Notebook, OWASP: The Top 10 Lists and the Security Toolbox"
summary: "The owner's tutorial cataloguing OWASP's Web, API and LLM Top 10 lists and the wider toolbox (ASVS, WSTG, ZAP, SAMM) mapped onto the SDLC."
category: source
lastmod: 2026-11-14
tags: ["security", "notebook", "owasp"]
---

- **What:** tutorial page in the owner's Notebook
- **Author:** the wiki owner (coolloic)
- **Date:** read 2026-11-14
- **Original:** [coolloic.github.io/Notebook/owasp.html](https://coolloic.github.io/Notebook/owasp.html)

## Summary

Explains OWASP as a vendor-neutral nonprofit and tabulates three lists: Web Top 10 (2021), API Security Top 10 (2023) and the Top 10 for LLM Applications (2025 edition), each with a one-line gloss. Then maps OWASP tools onto design, develop, test and operate phases.

## Key claims

- The number-one risk in each list: Broken Access Control (web), Broken Object Level Authorization (API), Prompt Injection (LLM).
- LLM list (2025): prompt injection, sensitive information disclosure, supply chain, data and model poisoning, improper output handling, excessive agency, system prompt leakage, vector and embedding weaknesses, misinformation, unbounded consumption.
- Top 10 lists are awareness documents; ASVS supplies verifiable requirements, WSTG testing procedures, ZAP dynamic scanning, Dependency-Check/Track software composition analysis, SAMM programme maturity.
- Adoption path: train on Top 10, adopt ASVS, test in CI with WSTG, ZAP and dependency scanning, measure with SAMM.
- Note: the tutorial predates the 2026 LLM list (see [OWASP 2026](owasp-llm-top-10-2026.md)).

## Feeds

[LLM security risks](../concepts/llm-security-risks.md)

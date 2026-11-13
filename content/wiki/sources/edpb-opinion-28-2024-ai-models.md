---
title: "Source: EDPB Opinion 28/2024 on AI models and personal data"
summary: "The EU data protection board's December 2024 opinion: an AI model trained on personal data is anonymous only if extraction and query-based disclosure are insignificant; legitimate interest needs a three-step test."
category: source
lastmod: 2026-11-14
tags: ["privacy", "gdpr", "regulation"]
---

- **What:** opinion of the European Data Protection Board under Article 64(2) GDPR, requested by the Irish supervisory authority
- **Publisher:** European Data Protection Board (EDPB)
- **Date:** 2024-12-18; executive summary read 2026-11-14
- **Original:** [Opinion 28/2024](https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en)

## Summary

The EU-wide regulator position on four questions: when a model is anonymous, how legitimate interest applies in development and in deployment, and what happens downstream when a model was trained unlawfully. It is the reference point for whether GDPR "reaches into" model weights.

## Key claims

- Models trained on personal data cannot always be considered anonymous; anonymity claims are assessed case by case.
- A model is anonymous only if both (1) the likelihood of directly (including probabilistically) extracting personal data about training subjects and (2) the likelihood of obtaining such data, intentionally or not, through queries are insignificant, considering all means reasonably likely to be used.
- Evidence a controller can offer includes measures to limit collection, reduce identifiability, prevent extraction, and show resistance to state-of-the-art attacks.
- No hierarchy among legal bases. Legitimate interest requires the three-step test: a lawful, clearly articulated, present interest; necessity (no less intrusive way; data minimisation); and a balancing test that weighs data subjects' reasonable expectations (e.g. whether data was public, the source, the relationship, awareness).
- Unlawful development, three scenarios: (1) same controller keeps using a model that retains personal data, assessed case by case; (2) another controller deploys it, and must have done an accountability assessment of how the model was developed; (3) the model was effectively anonymised before deployment, in which case GDPR does not apply to its operation and the earlier unlawfulness does not taint deployment-phase processing.

## Feeds

[PII and data privacy](../concepts/pii-and-data-privacy.md)

---
title: "Source: Hamburg DPA discussion paper, LLMs and personal data"
summary: "The Hamburg data protection commissioner's July 2024 position that LLM weights do not store personal data, so GDPR rights attach to the AI system's inputs and outputs; a position later overtaken by EDPB Opinion 28/2024."
category: source
lastmod: 2026-11-14
tags: ["privacy", "gdpr", "regulation"]
---

- **What:** regulator discussion paper (English version)
- **Publisher:** Hamburg Commissioner for Data Protection and Freedom of Information (HmbBfDI)
- **Date:** 2024-07-15; accessed 2026-11-14
- **Original:** [PDF](https://datenschutz-hamburg.de/fileadmin/user_upload/HmbBfDI/Datenschutz/Informationen/240715_Discussion_Paper_Hamburg_DPA_KI_Models.pdf)

## Summary

Argues from how tokenisation and embeddings work that a trained LLM holds no personal data, and separates the model from the AI system around it (UI, input and output filters, RAG). Useful as the strongest "weights are not personal data" position; the EDPB's December 2024 opinion takes a stricter, case-by-case line.

## Key claims

- Thesis 1: merely storing an LLM is not processing under GDPR Article 4(2), because no personal data is stored in it; processing in an LLM-based system, especially its output, must comply with GDPR.
- Thesis 2: data subject rights cannot target the model itself, but access, erasure and rectification can target the system's inputs and outputs.
- Thesis 3: training on personal data must comply with GDPR, but violations in training do not make using the model in an AI system unlawful.
- An AI system is multi-component: prompts are enriched (database, search, RAG) before the LLM runs, and outputs pass through filters before reaching the user.

## Feeds

[PII and data privacy](../concepts/pii-and-data-privacy.md)

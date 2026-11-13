---
title: "Source: Presidio documentation"
summary: "Open-source PII detection and de-identification SDK: analyzer (NER + regex + checksums + context), anonymizer operators, image and structured-data redaction, with an explicit no-guarantee warning."
category: source
lastmod: 2026-11-14
tags: ["enterprise", "privacy", "pii"]
---

- **What:** project documentation (home and anonymizer pages)
- **Publisher:** Presidio project, originally Microsoft. The site says it is now community-owned under "Data Privacy Stack".
- **Date:** accessed 2026-11-14
- **Original:** [presidio.dataprivacystack.org](https://presidio.dataprivacystack.org/) · [Anonymizer](https://presidio.dataprivacystack.org/anonymizer/)

## Summary

Presidio is the usual open-source building block for finding and masking PII in text, images and tables before data reaches an LLM, a log, or a training set.

## Key claims

- Components: Analyzer (detects PII in text), Anonymizer (applies operators), Image Redactor (OCR then redaction), Structured (tabular and semi-structured data).
- Recognizers combine NER models, regular expressions, rule logic and checksums, using surrounding context, across several languages. Custom recognizers can be added.
- Anonymizer operators: `replace` (defaults to an `<ENTITY_TYPE>` placeholder), `redact`, `mask` (`chars_to_mask`, `masking_char`, `from_end`), `hash` (sha256 or sha512, salted; minimum salt 16 bytes; a fixed salt is needed for consistent hashes), `encrypt` (keyed), `custom` (lambda returning a string), `surrogate_ahds` (surrogates via Azure Health Data Services, needs the `[ahds]` extra), `keep`.
- Only `encrypt` is reversible: `decrypt` with the same key.
- The docs warn that automated detection cannot guarantee it finds all sensitive data, and recommend extra protections.

## Feeds

[Enterprise LLM deployment](../concepts/enterprise-llm-deployment.md)

---
title: "Source: Amazon Bedrock — Guardrails"
summary: "Bedrock's configurable safety layer: content filters, denied topics, word and PII filters, contextual grounding and Automated Reasoning checks."
category: source
lastmod: 2026-11-14
tags: ["platforms", "aws", "safety"]
---

- **What:** vendor documentation
- **Author:** Amazon Web Services
- **Date:** undated, read 2026-11-14
- **Original:** [Detect and filter harmful content by using Amazon Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html)

## Summary

Catalogues the guardrail policy types and how a guardrail is versioned and attached to model calls or used standalone.

## Key claims

- Content filters (Hate, Insults, Sexual, Violence, Misconduct, Prompt Attack) with per-category strength, on text and images.
- Standard tier extends detection into code elements (comments, identifiers, string literals) and improves grounding checks; Classic is the other tier.
- Denied topics; word filters (case-insensitive whole-word/phrase); sensitive-information filters that block or mask PII, plus custom regex.
- Contextual grounding checks flag responses not supported by the source or irrelevant to the query (for RAG).
- Automated Reasoning checks validate responses against logical rules, flag unstated assumptions and suggest corrections.
- Guardrails don't evaluate reasoning content blocks.
- Attach by guardrail ID + version on inference calls, or call `ApplyGuardrail` with no model; input tagging lets you evaluate only the user part of a prompt (SDK only).
- Supports cross-Region guardrail inference and cross-account enforcement.

## Feeds

[Amazon Bedrock](../concepts/amazon-bedrock.md)

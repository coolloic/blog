---
title: "Source: LlamaParse Tiers and Pricing Docs"
summary: "LlamaIndex documentation for LlamaParse v2: the Fast, Cost-effective, Agentic and Agentic Plus parse tiers, dated version pinning, caching, and per-page credit pricing as of 2026-11."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "documents", "ingestion", "llamaindex"]
---

- **What:** official product documentation (tiers guide and pricing page)
- **Author/publisher:** LlamaIndex
- **Date:** living documents; read 2026-11-14
- **Original:** [Parse tiers](https://developers.llamaindex.ai/llamaparse/parse/guides/tiers/), [Pricing](https://developers.llamaindex.ai/llamaparse/general/pricing/)

## Summary

LlamaParse is LlamaIndex's hosted document parser. Version 2 replaces many knobs with four tiers that trade cost for layout reasoning, from a no-model text extractor up to a separate high-accuracy pipeline for dense financial documents. Requests must name both a tier and a version, and production users are told to pin a dated version.

## Key claims

- **Fast:** no AI model over the page; for high-volume plain text; no chart extraction. 1 credit/page.
- **Cost-effective:** runs on the OCRia-1 model; clean Markdown with table preservation for text-heavy documents with simple tables. 3 credits/page.
- **Agentic:** same base, more layout reasoning; for scans, multi-column layouts, real tables, charts and diagrams; a custom prompt switches to a general-purpose model. 10 credits/page.
- **Agentic Plus:** a separate pipeline for dense financial reports and complex tables, with chart parsing on by default. 25 credits/page on the pricing page (the FAQ still listed 45 when read; treat the pricing page as authoritative).
- Layout extraction adds 3 credits/page; spreadsheets cost 1 credit per sheet.
- Credits cost $1.50 per 1,000 pay-as-you-go and $1.25 on Pro (as of 2026-11).
- `tier` and `version` are required; pin a dated version (for example `2026-01-08`) in production so new releases do not change output.
- Re-parsing the same file within 48 hours is free (cached). A Cost Optimizer routes each page of mixed-complexity documents to an appropriate tier.

## Feeds

[Document processing](../concepts/document-processing.md)

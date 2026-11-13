---
title: "Source: Gemini Batch API Docs"
summary: "Google Gemini API documentation on the Batch API: 50% cost, 24-hour target, inline vs JSONL file input, job states."
category: source
lastmod: 2026-11-14
tags: ["models", "batch", "google"]
---

- **What:** official API documentation page
- **Author/publisher:** Google
- **Date:** living document; read 2026-11-14
- **Original:** [Batch API](https://aistudio.google.com/docs/batch-api)

## Summary

The Gemini Batch API (generateContent only) processes large volumes of requests asynchronously at 50% of standard price, with a 24-hour target turnaround. Requests are submitted inline or as a JSONL file.

## Key claims

- 50% of standard cost; target turnaround 24 hours, usually much faster; meant for non-urgent work such as preprocessing and evaluations.
- Inline requests suit small batches under 20 MB total; larger jobs use a JSONL file (up to 2 GB, uploaded via the File API) of `GenerateContentRequest` objects, with JSONL output of responses or status objects.
- Job states: `JOB_STATE_PENDING`, running, `JOB_STATE_SUCCEEDED`, `JOB_STATE_FAILED`, `JOB_STATE_CANCELLED`, `JOB_STATE_EXPIRED` (pending or running for more than 48 hours, no results).
- The docs present higher rate limits as part of the trade for up-to-24-hour turnaround, and batch jobs also support the embeddings model for higher throughput.
- Batch pricing applies to cached tokens too (e.g. Gemini 3.8 Flash batch cached input $0.0375/MTok vs $0.075 standard, through 2026), with the same hourly storage charge. The batch guide itself says explicit caches are referenced per request via `cached_content` and that cache hits are billed "at standard context caching rates", which reads differently from the pricing page's batch-tier cached rate.

## Feeds

[Batch processing](../concepts/batch-processing.md)

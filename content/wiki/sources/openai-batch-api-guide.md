---
title: "Source: OpenAI Batch API Guide"
summary: "OpenAI API guide to the Batch API: JSONL input files, 24-hour window, 50% discount, limits, statuses and expiry behaviour."
category: source
lastmod: 2026-11-14
tags: ["models", "batch", "openai"]
---

- **What:** official API documentation page
- **Author/publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Batch API](https://developers.openai.com/api/docs/guides/batch)

## Summary

OpenAI batches are created from an uploaded JSONL file in which each line is a full request. Jobs complete within a 24-hour window at 50% of synchronous price and draw on a separate rate-limit pool.

## Key claims

- Input line: `custom_id`, `method`, `url`, `body`; one model per file; unique `custom_id`s.
- Endpoints: `/v1/responses`, `/v1/chat/completions`, `/v1/embeddings`, `/v1/completions`, `/v1/moderations`, image generation and edits.
- Limits: 50,000 requests and 200 MB per input file; 2,000 batch creations per hour; per-model queued-token limits.
- Statuses: `validating`, `failed`, `in_progress`, `finalizing`, `completed`, `expired`, `cancelling`, `cancelled`.
- Results go to an output file, failures to a separate error file; order is not guaranteed.
- On expiry, unfinished requests fail with `batch_expired`; completed results remain and are billed.
- Output files expire after 30 days by default (configurable 1 h–30 d). Cancelling can take up to 10 minutes.

## Feeds

[Batch processing](../concepts/batch-processing.md)

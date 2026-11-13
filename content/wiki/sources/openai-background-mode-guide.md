---
title: "Source: Background mode (OpenAI guide)"
summary: "OpenAI's guide to running long Responses API calls asynchronously with background: true, polling, cancellation and resumable streaming."
category: source
lastmod: 2026-11-14
tags: ["platforms", "openai"]
---

- **What:** official API documentation page
- **Publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Background mode](https://developers.openai.com/api/docs/guides/background)

## Summary

How to start long-running reasoning or agentic responses without holding a connection open, then poll, cancel or resume streaming.

## Key claims

- `background: true` runs the response asynchronously; poll GET while status is `queued` or `in_progress`; other statuses are terminal.
- `POST /responses/{id}/cancel` stops it and is idempotent.
- With `background` and `stream` both true, track each event's `sequence_number`; after a drop, resume with `stream=true` and `starting_after`.
- Time to first token is higher than for synchronous calls.
- Background mode stores response data temporarily even with `store=false`; for ZDR projects it is kept for about 10 minutes.

## Feeds

[OpenAI Responses API](../concepts/openai-responses-api.md)

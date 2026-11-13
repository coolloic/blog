---
title: "Source: Data controls in the OpenAI platform"
summary: "OpenAI's API data-handling guide: no training by default, 30-day abuse-monitoring logs, Modified Abuse Monitoring and Zero Data Retention, endpoint eligibility, application-state retention and EKM."
category: source
lastmod: 2026-11-14
tags: ["enterprise", "openai", "privacy"]
---

- **What:** official API documentation page
- **Publisher:** OpenAI
- **Date:** accessed 2026-11-14
- **Original:** [Data controls in the OpenAI platform](https://developers.openai.com/api/docs/guides/your-data)

## Summary

Describes what OpenAI keeps when you call the API, for how long, and which controls reduce it. Two separate stores matter: abuse-monitoring logs, and application state that some endpoints keep so that they can work (stored responses, files, vector stores).

## Key claims

- API data has not been used for training since 2023-03-01 unless the customer opts in.
- Abuse-monitoring logs are kept for up to 30 days by default, longer when the law requires it.
- Modified Abuse Monitoring (MAM) removes customer content from those logs. Zero Data Retention (ZDR) does the same and also forces `store=false` on `/v1/responses` and `/v1/chat/completions`. Both need prior approval and are set per organization, with per-project override (a project can also choose None).
- ZDR-eligible endpoints include responses, chat completions, embeddings, audio, moderations, completions and realtime. Not eligible: conversations, ChatKit threads, agents, assistants, threads, vector stores, audio voices, files, fine-tuning, evals, batches.
- Responses with `store` omitted or true are kept at least 30 days. Files are kept until deleted. Deleted assistants, threads and vector stores are purged 30 days later. Prompt-cache tensors can stay in GPU-local storage up to 24 hours.
- Flagged content can be kept for review even under ZDR or MAM, and image and file inputs are scanned for CSAM.
- Enterprise Key Management encrypts customer content with keys held in AWS KMS, Google Cloud or Azure Key Vault.

## Feeds

[Enterprise LLM deployment](../concepts/enterprise-llm-deployment.md)

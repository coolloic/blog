---
title: "Source: Gemini API data logging and sharing"
summary: "Google's AI Studio project-logs feature: on by default for Interactions API calls and for newer projects, configurable 7 to 55 day retention, separate from abuse-monitoring logs, with opt-in dataset sharing."
category: source
lastmod: 2026-11-14
tags: ["privacy", "google", "observability"]
---

- **What:** official API documentation
- **Publisher:** Google
- **Date:** undated; accessed 2026-11-14
- **Original:** [Data logging and sharing](https://ai.google.dev/gemini-api/docs/logs-policy) (now served from aistudio.google.com/docs/logs-policy)

## Summary

Describes customer-visible request logs kept in AI Studio for billing-enabled projects. These are a second retention store, distinct from Google's abuse-monitoring logs.

## Key claims

- Logging is on by default for Interactions API calls, and for Generate Content calls in projects created on or after 2026-10-26; owners can switch it off in AI Studio.
- Logs apply to billing-enabled projects; by default their prompts and responses are not used for product improvement.
- Default maximum retention is 55 days, configurable to 7, 14, 28 or 55 days. Logs saved into datasets have no set retention.
- Project logs are separate from logs kept solely for abuse monitoring.
- Datasets you choose to share may be used to improve and train models, with human review after de-identification. Do not share data from clients available in the EEA, Switzerland or the UK, or personal or confidential data.

## Feeds

[Data retention and residency](../concepts/data-retention-and-residency.md)

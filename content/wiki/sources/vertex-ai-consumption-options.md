---
title: "Source: Vertex AI — Consumption Options"
summary: "The five ways to pay for Gemini on Vertex AI: Standard, Priority and Flex PayGo, Provisioned Throughput and Batch."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gcp", "capacity"]
---

- **What:** vendor documentation
- **Author:** Google Cloud
- **Date:** undated, read 2026-11-14
- **Original:** [Consumption options](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/deploy/consumption-options)

## Summary

Compares the consumption options on price, reliability and throttling, and suggests how to combine them.

## Key claims

- Standard PayGo: standard rate, no QoS guarantee, subject to 429s.
- Priority PayGo: premium rate, priority processing, with a ramp limit.
- Flex PayGo: about 50% cheaper, slower, more throttling; for latency-tolerant work.
- Provisioned Throughput: terms of 1 week, 1 month, 3 months or 1 year; a 1-year term is about 26% cheaper than 1 month.
- Batch: about 50% cheaper than Standard PayGo, asynchronous.
- Suggested pattern: PT for steady baseline, spill to Standard/Priority PayGo, Batch for backlogs, Flex for tolerant tasks; use exponential backoff and the global endpoint against 429s.

## Feeds

[Google Vertex AI](../concepts/google-vertex-ai.md)

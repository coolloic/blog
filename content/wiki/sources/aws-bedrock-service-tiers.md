---
title: "Source: Amazon Bedrock — Service Tiers"
summary: "Bedrock's four request tiers (Reserved, Priority, Standard, Flex) selected per request via `service_tier`."
category: source
lastmod: 2026-11-14
tags: ["platforms", "aws", "capacity"]
---

- **What:** vendor documentation
- **Author:** Amazon Web Services
- **Date:** undated, read 2026-11-14
- **Original:** [Service tiers for optimizing performance and cost](https://docs.aws.amazon.com/bedrock/latest/userguide/service-tiers-inference.html)

## Summary

Lays out how a request's tier trades price for latency and availability, and how tiers interact with on-demand quota.

## Key claims

- `service_tier` accepts `reserved`, `priority`, `default` (Standard) or `flex`; omitted means Standard.
- Reserved: reserved input/output TPM for 1 or 3 months, fixed price per 1K TPM billed monthly, 99.5% uptime target, overflow to Standard; minimum 100K input TPM and 10K output TPM; via the AWS account team.
- Reserved sizing must include cache-write tokens alongside input tokens.
- Priority: premium price, no reservation, served ahead of Standard and Flex.
- Flex: discounted price for latency-tolerant work such as evals, summarization and agentic jobs.
- Priority, Standard and Flex share the on-demand quota; Reserved is separate. CloudWatch exposes `ResolvedServiceTier`.

## Feeds

[Amazon Bedrock](../concepts/amazon-bedrock.md)

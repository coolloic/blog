---
title: "Source: Amazon Bedrock — How Tokens Are Counted Against Quotas"
summary: "How Bedrock reserves `max_tokens` up front and applies output-token burndown multipliers to TPM/TPD quotas."
category: source
lastmod: 2026-11-14
tags: ["platforms", "aws", "quotas"]
---

- **What:** vendor documentation
- **Author:** Amazon Web Services
- **Date:** undated, read 2026-11-14
- **Original:** [How tokens are counted in Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/quotas-token-burndown.html)

## Summary

Explains the throttling arithmetic behind Bedrock's tokens-per-minute (TPM) and tokens-per-day (TPD) quotas, with worked examples.

## Key claims

- At request start Bedrock deducts input tokens + `max_tokens` from TPM/TPD; throttling happens if that exceeds quota.
- At the end it settles to input + cache-write + output × burndown rate and refunds the rest; cache reads do not count.
- Burndown rates (late 2026): 15× for Claude 4.8; 10× for Claude Opus 5/5.5, Sonnet 5, Fable 5.1/5.2 and OpenAI GPT-5.6 models; 2.5× for Claude Mythos 5.x; 5× for Claude 4.7 and older; 1× otherwise unless the model card says so.
- You are billed for actual tokens, not burndown-weighted ones (example: 1,000 in + 100 out at 5× uses 1,500 quota but bills 1,100).
- An oversized `max_tokens` (32K for a 1K reply) cuts concurrency because the up-front reservation is large; size it near real output lengths using CloudWatch.
- Models served only on the `bedrock-mantle` endpoint have separate input/output quotas and no burndown.

## Feeds

[Amazon Bedrock](../concepts/amazon-bedrock.md)

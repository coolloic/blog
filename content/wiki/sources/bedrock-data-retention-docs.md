---
title: "Source: Amazon Bedrock data retention"
summary: "Bedrock's data-retention modes (none, default, aws_review, legacy provider_data_share), their resolution order, per-model allowed modes, and SCP enforcement of zero retention."
category: source
lastmod: 2026-11-14
tags: ["enterprise", "aws", "privacy"]
---

- **What:** official user-guide page
- **Publisher:** Amazon Web Services
- **Date:** accessed 2026-11-14 (examples dated 2026-06)
- **Original:** [Data retention](https://docs.aws.amazon.com/bedrock/latest/userguide/data-retention.html)

## Summary

Bedrock exposes retention as an ordered mode, set per Region at account or project level, instead of a flag. Each model declares which modes it accepts, so the setting also determines which models you can call.

## Key claims

- Modes, least to most permissive: `none` (zero retention; Responses API `store=true` rejected) < `default` (the model's own policy; AWS may keep data for abuse prevention) < `aws_review` (AWS may keep data and have humans review it inside AWS) < `provider_data_share` (legacy; content is not actually shared with providers today). `inherit` defers to the next scope.
- Effective mode = first non-`inherit` value of project, then account (per Region), then model default. Settings do not propagate across Regions.
- If the effective mode is below a model's minimum, the model shows as unavailable or the call fails with `ValidationException`.
- Models that require human review (Claude Fable 5, 5.1 and 5.2 as of 2026-11) keep prompts and completions inside AWS for up to 30 days, where AWS (not the model provider) may review them. They are unavailable when the effective mode is `none` or `default`. ZDR for these Claude models is granted only to accounts eligible for the Enterprise Frontier Safeguards program, evaluated per account and per model.
- `store=false` alone does not guarantee zero retention; only mode `none` does.
- With cross-Region inference, retained data is stored in the destination Region.
- SCPs on the `DataRetentionMode` condition key can force `none` across an AWS organization, or permit retention while forbidding human review.

## Feeds

[Enterprise LLM deployment](../concepts/enterprise-llm-deployment.md)

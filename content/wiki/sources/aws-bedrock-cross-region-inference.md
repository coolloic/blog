---
title: "Source: Amazon Bedrock — Cross-Region Inference"
summary: "How Bedrock inference profiles route requests across Regions, and the Geographic vs Global trade-off on residency, cost and SCPs."
category: source
lastmod: 2026-11-14
tags: ["platforms", "aws", "data-residency"]
---

- **What:** vendor documentation
- **Author:** Amazon Web Services
- **Date:** undated, read 2026-11-14
- **Original:** [Cross-Region inference](https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html)

## Summary

Explains cross-Region inference (CRIS): an inference profile names a model plus a set of destination Regions, and Bedrock picks the Region per request. Compares geographic profiles (US, EU, APAC) with global profiles.

## Key claims

- Geographic profiles keep processing inside a geography such as US, EU or APAC; global profiles may route to any supported commercial Region.
- Global profiles cost roughly 10% less than standard pricing; geographic profiles are standard price.
- SCPs must allow every destination Region in a geographic profile; global profiles need `aws:RequestedRegion` set to `unspecified` to be allowed.
- No extra routing fee; price is set by the source Region. Destination Regions need not be enabled in the account.
- Traffic stays on the AWS network, encrypted in transit; CloudTrail logs in the source Region with `additionalEventData.inferenceRegion` showing where it ran.
- Inference profiles do not support Provisioned Throughput.
- AWS advises bounded retries plus multi-Region or multi-model fallback to meet availability targets.

## Feeds

[Amazon Bedrock](../concepts/amazon-bedrock.md)

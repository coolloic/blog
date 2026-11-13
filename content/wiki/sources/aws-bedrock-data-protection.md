---
title: "Source: Amazon Bedrock — Data Protection and VPC/PrivateLink"
summary: "Bedrock's data-handling model (provider-isolated model deployment accounts) and its VPC/PrivateLink guidance."
category: source
lastmod: 2026-11-14
tags: ["platforms", "aws", "security"]
---

- **What:** vendor documentation
- **Author:** Amazon Web Services
- **Date:** undated, read 2026-11-14
- **Original:** [Data protection](https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html)
- **Original:** [Protect your data using Amazon VPC and AWS PrivateLink](https://docs.aws.amazon.com/bedrock/latest/userguide/usingVPC.html)

## Summary

Two pages on how Bedrock isolates customer prompts from model providers and how to keep traffic off the public internet.

## Key claims

- Each Region has one AWS-operated model deployment account per model provider; providers have no access, so they cannot see prompts, completions or Bedrock logs.
- Bedrock deep-copies a provider's inference and training software into those accounts.
- TLS 1.2 is required (1.3 recommended); FIPS 140-3 endpoints exist; CloudTrail logs API activity.
- Don't put sensitive data in tags or name fields; those may reach billing or diagnostic logs.
- Interface VPC endpoints (AWS PrivateLink) give a private path to Bedrock; VPCs can also protect model customization jobs, batch inference jobs and the OpenSearch Serverless store behind Knowledge Bases.

## Feeds

[Amazon Bedrock](../concepts/amazon-bedrock.md)

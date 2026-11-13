---
title: "Source: Amazon Bedrock — Provisioned Throughput"
summary: "Bedrock's reserved-capacity option: hourly-billed model units with no-commitment, 1-month or 6-month terms. Custom models need it unless their base model supports on-demand deployment."
category: source
lastmod: 2026-11-14
tags: ["platforms", "aws", "capacity"]
---

- **What:** vendor documentation
- **Author:** Amazon Web Services
- **Date:** undated, read 2026-11-14
- **Original:** [Provisioned Throughput](https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html)
- **Related:** [Deploy a custom model for on-demand inference](https://docs.aws.amazon.com/bedrock/latest/userguide/deploy-custom-model-on-demand.html) (read 2026-11-14)

## Summary

Describes buying a fixed level of throughput for a base or custom model, measured in Model Units (MUs).

## Key claims

- An MU guarantees a number of input tokens and output tokens per minute across all requests for one model.
- Billing is hourly per MU; price depends on model, MU count and commitment (none, 1 month, 6 months; longer is cheaper).
- Committed provisions cannot be deleted before the term ends; billing continues until deletion.
- The PT page says a customized model must be served through Provisioned Throughput. The related on-demand deployment page carves out an exception: models customized on or after July 16, 2025 from Amazon Nova Lite, Micro, Pro or 2 Lite, or from Meta Llama 3.3 70B Instruct, can use on-demand deployment (`CreateCustomModelDeployment`) in specific Regions.
- Per-MU throughput figures and limit increases go through the AWS account manager.

## Feeds

[Amazon Bedrock](../concepts/amazon-bedrock.md)

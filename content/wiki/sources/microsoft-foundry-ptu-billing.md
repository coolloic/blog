---
title: "Source: Microsoft Foundry — Provisioned throughput billing and cost management"
summary: "How Foundry bills PTUs (hourly on deployed capacity, prorated) versus 1-month/1-year Azure Reservations, why not to scale PTUs with traffic, and how reservation matching and overage work."
category: source
lastmod: 2026-11-14
tags: ["platforms", "azure", "capacity"]
---

- **What:** vendor documentation
- **Author:** Microsoft
- **Date:** ms.date 2026-05-22, read 2026-11-14
- **Original:** [Provisioned throughput billing and cost management](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/provisioned-throughput-billing)

## Summary

Covers the economics of PTU deployments and reservations, and the capacity risks of resizing.

## Key claims

- PTUs are billed hourly on deployed count, whether used or not, prorated by the minute; deployments cannot be paused, only deleted.
- Hourly billing suits benchmarking and short events, not production; reservations are cheaper for sustained load.
- Don't scale PTUs up and down with traffic: scale-up needs available regional capacity and can fail, and scale-down releases capacity permanently.
- Reservations (1 month or 1 year) are a billing discount, not capacity. They match deployments by deployment type, region (except Global) and scope, not by model. Excess deployed PTUs bill hourly. Deploy first, then reserve.
- One Global reservation can cover Global deployments across regions (e.g. 50 + 100 + 200 PTUs in three regions → one 350-PTU reservation).
- Reservations can be exchanged (resets term) or cancelled (possible fee); exchanges across deployment types are not supported.

## Feeds

[Provisioned throughput](../concepts/provisioned-throughput.md)

---
title: "Source: Microsoft Foundry — Deployment Types"
summary: "Foundry's nine serverless deployment SKUs (Global, Data Zone and regional; Standard, Provisioned and Batch; plus Developer) and their data-processing guarantees."
category: source
lastmod: 2026-11-14
tags: ["platforms", "azure", "data-residency"]
---

- **What:** vendor documentation
- **Author:** Microsoft
- **Date:** ms.date 2026-08-06, read 2026-11-14
- **Original:** [Deployment types in Microsoft Foundry Models](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types)

## Summary

The canonical page for choosing where inference runs and how it is billed for serverless model deployments.

## Key claims

- Data at rest stays in the resource's Azure geography for every type. Processing can happen in any region (Global), within a Microsoft-defined data zone of US, EU or APAC (Data Zone), or within the geography (Standard / Regional Provisioned).
- SKUs: GlobalStandard, GlobalProvisionedManaged, GlobalBatch, DataZoneStandard, DataZoneProvisionedManaged, DataZoneBatch, Standard, ProvisionedManaged, DeveloperTier.
- Start with Global Standard: models launch there first, it is cheapest and has the broadest regions and highest default quota. Model availability arrives Global, then Data Zone, then geography, with no date guaranteed for geography.
- The EU data zone follows the EU Data Boundary (may include EFTA countries); Microsoft can add regions to a zone without notice.
- Batch: 50% discount, separate enqueued-token quota, 24-hour target with no real-time SLA.
- Developer: fine-tuned model evaluation only, 24-hour lifetime, no SLA or residency guarantee.
- Global Standard supports per-request Flex and Priority processing; Data Zone Standard supports Priority.
- Azure Policy can deny specific deployment SKUs (e.g. block GlobalStandard for residency).

## Feeds

[Azure AI Foundry](../concepts/azure-ai-foundry.md)

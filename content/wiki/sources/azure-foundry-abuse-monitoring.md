---
title: "Source: Foundry Models sold by Azure — abuse monitoring"
summary: "Microsoft's description of abuse monitoring for Azure OpenAI and other models sold by Azure: classification, pattern capture, LLM-then-human review, and the Limited Access application for modified abuse monitoring."
category: source
lastmod: 2026-11-14
tags: ["enterprise", "azure", "privacy"]
---

- **What:** official documentation
- **Publisher:** Microsoft
- **Date:** ms.date 2026-05-13; accessed 2026-11-14
- **Original:** [Foundry Models sold by Azure abuse monitoring](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/abuse-monitoring)

## Summary

Explains the four stages of Azure's abuse-monitoring pipeline and how customers with sensitive workloads can apply to turn off its storage and human-review parts.

## Key claims

- Stages: content classification, abuse-pattern capture (frequency, severity, intent), review and decision, then notification and action by email.
- Flagged prompts and completions are reviewed by automated means (including LLMs) by default; that automated review does not store them. Human review happens only when automated confidence is insufficient or unavailable, via Secure Access Workstations and just-in-time approval; for EEA deployments reviewers are in the EEA.
- Customers meeting extra Limited Access criteria can apply by form for modified abuse monitoring; some advanced models have stricter criteria.
- With modified abuse monitoring, human review is not performed; Microsoft warns that abuse detection may be less accurate and customers must still respond to notifications.
- The page gives no retention period for the human-review store.

## Feeds

[Data retention and residency](../concepts/data-retention-and-residency.md)

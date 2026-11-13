---
title: "Source: API and data retention (Anthropic)"
summary: "Anthropic's reference for zero data retention (ZDR), HIPAA readiness, Covered Models that require 30-day retention, and per-feature eligibility on the Claude API."
category: source
lastmod: 2026-11-14
tags: ["enterprise", "anthropic", "privacy"]
---

- **What:** official documentation page
- **Publisher:** Anthropic
- **Date:** accessed 2026-11-14
- **Original:** [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)

## Summary

Explains the two contractual data-handling arrangements for the Claude API (ZDR and HIPAA readiness), which surfaces and features each covers, which models are excluded, and what is retained no matter which arrangement applies. It also says who the data processor is: Anthropic for its first-party API, Claude Platform on AWS, Anthropic-managed Claude on Google Cloud and Claude in Microsoft Foundry; the cloud provider for Bedrock and Google-managed Vertex.

## Key claims

- Outside ZDR and HIPAA, the page defers to Anthropic's commercial data retention policy, which (updated 2026-07-01) says API inputs and outputs are deleted on the backend within 30 days of receipt or generation, with exceptions for longer-lived features, agreements, usage-policy enforcement and legal requirements.
- Under ZDR, prompts and responses are not stored at rest once the response is returned. ZDR is enabled per organization by the account team; a new organization needs it enabled separately.
- ZDR organizations cannot call the API from a browser (CORS requests are rejected); calls must go through a backend.
- Covered by ZDR: Messages and Token Counting endpoints for eligible features, and Claude Code used with Commercial-org API keys (metrics logging is exempt). Not covered: Console/playground, Managed Agents (stateful), consumer plans, Teams/Enterprise chat interfaces, third-party integrations.
- Features marked "No" (e.g. Batch, Files, code execution) are stateful. Under ZDR the API does not block them; using one steps outside ZDR for that data. Under HIPAA readiness the API returns a 400 for ineligible features.
- "Yes (qualified)" features keep a small, documented technical artifact but not prompts or outputs.
- Covered Models (Claude Fable 5, 5.1, 5.2 and Mythos 5, 5.1, 5.2, as of 2026-11) require 30-day retention and are not available under ZDR unless Anthropic authorizes it. A ZDR org can turn on 30-day retention for one non-default workspace to reach them.
- HIPAA readiness needs a signed BAA. It applies safeguards (encryption, access control, audit logging) rather than immediate deletion, and once enabled it cannot be turned off. PHI must not appear in JSON schemas for strict tools or structured outputs, because compiled grammars are cached outside the PHI protections.
- Regardless of arrangement, data may be kept where law requires or when trust-and-safety systems flag it; flagged inputs and outputs can be kept up to 2 years.
- The Compliance API Activity Feed retains data for 6 years; claude.ai content follows the org's retention setting.

## Feeds

[Enterprise LLM deployment](../concepts/enterprise-llm-deployment.md) · [AI governance and compliance](../concepts/ai-governance-and-compliance.md)

---
title: "Source: Claude API overview"
summary: "Anthropic's API overview: endpoints, authentication and version headers, request size limits by endpoint and platform, response headers, pagination and tiered limits."
category: source
lastmod: 2026-11-14
tags: ["platforms", "anthropic"]
---

- **What:** official API documentation page
- **Publisher:** Anthropic
- **Date:** living document; read 2026-11-14
- **Original:** [API overview](https://platform.claude.com/docs/en/api/overview)

## Summary

Entry point to the Claude API: what endpoints exist, which headers are required, and the size limits that differ between first-party and partner platforms.

## Key claims

- Stable APIs: Messages, Message Batches (50% off), Token Counting, Models, Files, Skills. Beta: Agents, Sessions, Environments (Managed Agents).
- Required headers: `Authorization: Bearer` (or legacy `x-api-key`), `anthropic-version` (e.g. `2026-10-21`), `content-type`; `anthropic-workspace-id` for keys not scoped to a workspace.
- Request size limits: 128 MB for Messages and Token Counting, 256 MB for Batches, 500 MB for Files, 32 MB for Managed Agents endpoints; exceeding returns 413.
- Partner limits are lower: Bedrock 20 MB, Google-managed Vertex 30 MB, Anthropic-operated AWS/Google/Foundry 32 MB.
- Responses carry `request-id`, `anthropic-organization-id` and `anthropic-workspace-id` headers.
- Claude is reachable first-party and via AWS, Google Cloud and Azure; feature availability varies by platform.

## Feeds

[Anthropic Messages API](../concepts/anthropic-messages-api.md)

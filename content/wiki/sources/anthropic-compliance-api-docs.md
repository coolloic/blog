---
title: "Source: Compliance API (Anthropic)"
summary: "Anthropic's programmatic audit interface: the Activity Feed, directory, effective settings, and retrieval or deletion of chats, files, projects and session transcripts."
category: source
lastmod: 2026-11-14
tags: ["enterprise", "anthropic", "audit"]
---

- **What:** official documentation page
- **Publisher:** Anthropic
- **Date:** accessed 2026-11-14 (examples use `anthropic-version: 2026-10-21`)
- **Original:** [Compliance API](https://platform.claude.com/docs/en/manage-claude/compliance-api)

## Summary

The Compliance API is the audit and eDiscovery surface for Claude Enterprise and Console organizations. Security, legal and compliance teams poll it for per-event records and feed them into a SIEM or archive. Anthropic sets it beside its other telemetry options (analytics APIs, OpenTelemetry, inference hooks).

## Key claims

- All endpoints live under `/v1/compliance/*`. A Compliance Access Key reaches every endpoint; an Admin API key reaches only the Activity Feed (`GET /v1/compliance/activities`, scope `read:compliance_activities`).
- Activity records carry the actor's email, user ID, IP address and user agent, plus the event type and object IDs.
- For Enterprise tenants it also lists users, roles, groups and effective settings across linked organizations, and returns or deletes claude.ai chats, files and projects and the transcripts of agent sessions (Claude Code, Cowork and others).
- Shared rate limit: 600 requests per minute per parent organization.
- The claude.ai CSV audit-log export is narrower: capped lookback and no content.
- Analytics APIs return aggregate usage and cost for FinOps; the Compliance API returns per-event records for security and legal.

## Feeds

[Enterprise LLM deployment](../concepts/enterprise-llm-deployment.md)

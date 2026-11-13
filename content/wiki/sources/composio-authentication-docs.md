---
title: "Source: Composio authentication docs"
summary: "Composio's model of per-user auth for agent tools: auth configs per toolkit, connected accounts per user, sessions with an in-chat connect meta-tool, and server-side credential injection."
category: source
lastmod: 2026-11-14
tags: ["protocols", "identity", "tools", "vendor-docs"]
---

- **What:** Composio Authentication documentation page (REST API v3.1 era)
- **Author/publisher:** Composio
- **Date:** undated living docs; read 2026-11-14
- **Original:** [docs.composio.dev/docs/authentication](https://docs.composio.dev/docs/authentication)

## Summary

Every tool call runs against a specific user's connected account. An auth config per toolkit defines method (OAuth2, bearer, API key, basic), scopes and whose OAuth app is used; a connected account holds one user's tokens. Agents work through sessions that include a `COMPOSIO_MANAGE_CONNECTIONS` meta-tool which returns a hosted Connect Link when an account is missing.

## Key claims

- `user_id` must be a stable internal ID (not email, which can change); never use `default` in production, which would share one user's data with everyone.
- Managed OAuth apps are the default; bring your own for specific scopes, white-labelled consent, or toolkits without managed auth.
- Credentials never pass through your app or the model: users sign in on a hosted page, and Composio injects credentials into provider requests server-side; the model sees only tool results. API responses redact credentials by default.
- Opening a Connect Link does not mean success: re-check status and resume only when `active`.
- Tokens are encrypted at rest and refreshed automatically; a revoked or expired refresh token moves the account to `EXPIRED`, signalled by a webhook so the app can re-prompt before a call fails.
- A user can hold several accounts per toolkit (work and personal), selected by `connected_account_id`.
- Least privilege: scoped API keys separate session management from execution; session config restricts toolkits and tools; the raw Proxy Execute capability needs its own permission.
- Custody options: Composio Cloud holds encrypted credentials; VPC, self-hosted and customer-managed-key deployments move that boundary into your cloud.

## Feeds

- [Agent authentication and authorization](../concepts/agent-authentication-and-authorization.md)

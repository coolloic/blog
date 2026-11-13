---
title: "Source: Vercel Connect guide and EMA changelog"
summary: "Vercel's knowledge-base guide to Connect, a managed broker that mints short-lived, scoped third-party tokens for apps or specific users via Vercel OIDC, plus its October 2026 Enterprise-Managed Authorization beta."
category: source
lastmod: 2026-11-14
tags: ["protocols", "vercel", "identity", "platforms"]
---

- **What:** vendor KB guide "Give your agents secure access to third-party APIs" and changelog "Vercel Connect adds Enterprise-Managed Authorization"
- **Author/publisher:** Vercel (guide by Ben Sabic)
- **Date:** guide published 2026-08-26, updated 2026-11-02; changelog 2026-10-15; read 2026-11-14
- **Original:** [Vercel Connect guide](https://vercel.com/kb/guide/vercel-connect) · [EMA changelog](https://vercel.com/changelog/vercel-connect-adds-enterprise-managed-authorization)

## Summary

Connect keeps provider credentials (refresh tokens, client secrets) on Vercel and hands runtime code only short-lived access tokens. Code authenticates to Connect with the deployment's injected OIDC token, names a connector and a subject (the app, or a specific user who has consented), and receives a scoped token. Inbound provider webhooks ("triggers") are verified and forwarded. Every authorization, token request and trigger is logged for audit.

## Key claims

- Concepts: connector (team-owned, one service), installation (one provider tenant), token, project link (which projects and environments may request tokens), trigger.
- Two legs: code to Connect via Vercel OIDC (local dev OIDC tokens last about 12 hours; external hosts pass a Vercel access token); Connect to provider via the provider's own install, admin-consent or authorization-code flow. Refresh tokens never leave Vercel.
- Subjects: `{type:'app'}`, `{type:'user', id}`, `jwt-bearer` (exchange an external IdP or workload JWT), `{token}` (exchange an existing token). A Vercel access token can only request `app` or its own user.
- A user subject without prior consent throws `UserAuthorizationRequiredError`; the app should show a connect-account flow. Microsoft app-only and admin-scoped delegated tokens need one-time tenant admin consent.
- SDK `@vercel/connect`: `getToken`, `getTokenResponse`, `revokeToken`, `deleteTokenCacheEntry`; params `subject`, `scopes`, `installationId`, `resources`, `authorizationDetails`, `audience`. In-process LRU cache of 100 entries, refreshed 30 s before expiry by default.
- Revocation calls the provider's revocation endpoint when one exists; otherwise the provider credential may keep working until it expires.
- Project links restrict who can request tokens, not what issued tokens can do; environments on one connector can share installations, so use separate connectors for isolation.
- Observability: token request, completed authorization, revocation and trigger events with correlation IDs; retention 12 h (Hobby), 3 days (Pro), 30 days (Enterprise); drains to SIEM.
- Pricing (2026-11): Hobby 500 token requests/month included; Pro $3.00 per 1,000 token requests.
- EMA (public beta, 2026-10-15): with an IdP such as Okta, apps reach supported services (example: Slack's MCP server) for signed-in users without per-service consent; admins grant and revoke in the IdP; access stays within approved scopes and the user's existing permissions. Built on Cross App Access.

## Feeds

- [Agent authentication and authorization](../concepts/agent-authentication-and-authorization.md)

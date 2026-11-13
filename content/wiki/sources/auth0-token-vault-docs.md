---
title: "Source: Auth0 Token Vault docs"
summary: "Auth0 for AI Agents' Token Vault: stores users' third-party OAuth tokens on connected accounts and releases them through refresh-token, access-token or privileged-worker exchanges."
category: source
lastmod: 2026-11-14
tags: ["protocols", "identity", "vendor-docs"]
---

- **What:** Auth0 for AI Agents documentation, Token Vault overview
- **Author/publisher:** Auth0 (Okta)
- **Date:** undated living docs; read 2026-11-14
- **Original:** [Token Vault](https://auth0.com/ai/docs/intro/token-vault)

## Summary

The identity provider that already logs users in also brokers their third-party tokens. A user links an external provider through a Connected Accounts flow; Auth0 stores the provider's access and refresh tokens; the application later exchanges its own Auth0 token for a provider access token and calls the external API.

## Key claims

- Three exchanges: refresh-token exchange (web, mobile, native apps acting while the user is away); access-token exchange (APIs, microservices, SPAs that receive tokens from other services); privileged-worker exchange with a signed JWT bearer (backend or M2M workers; announced as Early Access on 2026-07-30, though the English docs page labels it Beta; it needs a first-party client with Private Key JWT or mTLS auth and an IP allowlist).
- Providers include Google, Microsoft, Box, Slack, GitHub, custom social connections, Google Workspace, Entra ID and generic OIDC.
- With Organizations, each member connects their own account; there is no shared organization account.
- Typical use: an agent scheduling a calendar meeting for the user, without the app storing the Google token.

## Feeds

- [Agent authentication and authorization](../concepts/agent-authentication-and-authorization.md)

---
title: "Source: MCP Enterprise-Managed Authorization Extension"
summary: "Official MCP authorization extension that lets an enterprise IdP decide which MCP servers employees can reach, by issuing ID-JAGs that clients trade for MCP access tokens."
category: source
lastmod: 2026-11-14
tags: ["protocols", "mcp", "security", "identity"]
---

- **What:** extension overview page on modelcontextprotocol.io, linking the normative spec in the `ext-auth` repository and SEP-990
- **Author/publisher:** Model Context Protocol project
- **Date:** spec version 2026-07-28; page read 2026-11-14
- **Original:** [Enterprise-Managed Authorization](https://modelcontextprotocol.io/extensions/auth/enterprise-managed-authorization)

## Summary

In core MCP auth every user consents to every client–server pair. The extension (`io.modelcontextprotocol/enterprise-managed-authorization`) inserts the corporate identity provider as the decision-maker: the user signs into the MCP client via SSO, the client exchanges the stored identity assertion at the IdP for an Identity Assertion JWT Authorization Grant (ID-JAG), and presents that to the MCP server's authorization server for an access token. No per-server consent screen appears. The page also tabulates vendor support.

## Key claims

- Motivations: employees should not reason about each server's auth; security teams need consistent policy; onboarding and offboarding across dozens of servers is otherwise manual.
- The IdP evaluates policy (groups, roles, conditional access) before issuing an ID-JAG; unauthorized users never get a token for that server.
- Revocation happens once at the IdP and applies across all clients.
- Clients must declare the extension in per-request `clientCapabilities`, support SSO to the IdP, keep the ID Token or SAML assertion, and must not redirect the user to the MCP AS's authorization endpoint on this path. IdP endpoints are configured per organization.
- MCP authorization servers validate ID-JAG signature (IdP JWKS), audience, issuer and expiry; map claims to permissions; link accounts by `sub` first, falling back to `email` for pre-existing accounts.
- Extensions are opt-in, never on by default; client support varies.
- Support table (as of 2026-11): Okta (Cross App Access; issuing included in Okta SSO for Identity Engine orgs, capped at 250 ID-JAGs per user per resource app per month, higher volume needs Okta for AI Agents), Ping (PingFederate 13.1+), Descope, Athenz, Janssen, ThunderID issue and accept; Auth0, WorkOS, Scalekit accept (early access); Stytch, AuthPlane accept; Keycloak experimental. FastMCP 4.0+ (beta) and Cloudflare `workers-oauth-provider` (experimental, 0.7.0+) accept on the server side.
- Implementations track different ID-JAG draft revisions (Keycloak's guide targets -01, Janssen -04); the page says to check each vendor's target revision. The table records documented support only and is not comprehensive.

## Feeds

- [Agent authentication and authorization](../concepts/agent-authentication-and-authorization.md)

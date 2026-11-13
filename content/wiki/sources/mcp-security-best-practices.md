---
title: "Source: MCP Security Best Practices"
summary: "Official catalogue of MCP-specific attacks (confused deputy, token passthrough, SSRF, handle hijacking, local server compromise, malicious auth URLs, mix-up) and their mitigations."
category: source
lastmod: 2026-11-14
tags: ["protocols", "mcp", "security"]
---

- **What:** security tutorial complementing the authorization spec
- **Author/publisher:** Model Context Protocol project
- **Date:** version for revision 2026-07-28; read 2026-11-14
- **Original:** [Security Best Practices](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices)

## Summary

A threat catalogue for people implementing MCP auth, operating servers or assessing MCP deployments. Each entry gives the attack and normative mitigations.

## Key claims

- **Confused deputy:** an MCP proxy using one static client ID with a third-party AS, plus dynamic client registration and consent cookies, lets an attacker obtain codes without consent. Fix: per-client consent stored server-side before forwarding, exact redirect URI matching, single-use `state`.
- **Token passthrough** is forbidden: accepting tokens not issued for the server breaks audit, rate limits and trust boundaries.
- **SSRF:** a malicious server can point OAuth metadata URLs at `169.254.169.254` or internal IPs. Clients should require HTTPS, block private ranges (with a vetted library), validate redirects, use egress proxies.
- **State handle hijacking:** possession of a handle is not authentication; bind handles to the user ID from the verified token.
- **Local server compromise:** one-click install configs can run arbitrary commands; clients MUST show the full command and require consent, and should sandbox servers. Local servers should prefer stdio or restrict HTTP access.
- **Malicious authorization URLs:** reject non-http(s) schemes like `javascript:`; never open URLs via a shell; XSS plus a stdio-spawning proxy can escalate to RCE.
- **Mix-up attacks:** mitigated by `iss` validation; PKCE alone does not stop them.
- **Scope minimization:** start with minimal scopes and step up; avoid wildcard scopes and publishing every scope in `scopes_supported`.

## Feeds

- [MCP in practice](../concepts/mcp-in-practice.md)

---
title: "Source: Arcade authorization docs"
summary: "Arcade's docs on authorized tool calling: per-user OAuth via tools.authorize, server-level vs tool-level auth for MCP servers, and user verification against auth-link phishing."
category: source
lastmod: 2026-11-14
tags: ["protocols", "identity", "tools", "vendor-docs"]
---

- **What:** three Arcade documentation pages: Authorized Tool Calling, Server-Level vs Tool-Level Authorization, Secure and Brand the Auth Flow in Production
- **Author/publisher:** Arcade.dev
- **Date:** undated living docs; read 2026-11-14
- **Original:** [Authorized tool calling](https://docs.arcade.dev/home/auth/auth-tool-calling) · [Server-level vs tool-level](https://docs.arcade.dev/en/learn/server-level-vs-tool-level-auth) · [Secure auth in production](https://docs.arcade.dev/en/build/user-facing-agents/secure-auth-production)

## Summary

Arcade is a tool runtime and credential broker. Your app identifies the end user with a `user_id`; `tools.authorize(tool_name, user_id)` returns either a completed status or a URL the user must visit; after consent, `tools.execute(tool_name, user_id)` runs the tool with the stored token injected server-side. For MCP servers it separates front-door (resource-server) auth from per-tool third-party OAuth, and in production it requires your app to confirm that the person finishing an OAuth flow is the user who started it.

## Key claims

- Flow: `authorize` → if status is not `completed`, show `url` as-is → `wait_for_completion` → `execute` with only tool name and `user_id`. Authorization is remembered per user until it expires or is revoked; it can be done ahead of time.
- Server-level auth: the MCP server is an OAuth 2.1 protected resource; middleware validates the Bearer token on every request and takes `user_id` from `sub`. Not needed for stdio.
- Tool-level auth: declared per tool, e.g. GitHub with scopes `repo`, `read:user`, so each tool requests only its scopes; the token reaches tool code through the `Context` object, not through tool parameters.
- User verification: after a first authorization Arcade redirects to your verifier route with a `flow_id`; your server reads the signed-in user from its own session (never request input) and calls `confirmUser`; a mismatch returns `user_mismatch`. This defends against phishing where a victim completes a flow started under an attacker's ID.
- Production: use a custom verifier and your own OAuth app credentials; Arcade's default OAuth apps are for development and single-tenant use. Call the verification API only from the server.

## Feeds

- [Agent authentication and authorization](../concepts/agent-authentication-and-authorization.md)

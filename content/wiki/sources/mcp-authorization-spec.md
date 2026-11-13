---
title: "Source: MCP Authorization Specification (2026-07-28)"
summary: "How a remote MCP server acts as an OAuth 2.1 resource server: protected resource metadata discovery, client registration options, PKCE, resource indicators, issuer validation and step-up scopes."
category: source
lastmod: 2026-11-14
tags: ["protocols", "mcp", "security"]
---

- **What:** the Authorization page of the MCP specification
- **Author/publisher:** Model Context Protocol project
- **Date:** revision 2026-07-28; read 2026-11-14
- **Original:** [Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization)

## Summary

Authorization is optional and applies to HTTP transports; stdio servers should take credentials from the environment instead. A protected MCP server is an OAuth 2.1 resource server, the client is an OAuth 2.1 client, and a separate (or co-hosted) authorization server issues tokens. The page profiles a subset of OAuth RFCs so any client can discover how to authenticate against any server without prior configuration.

## Key claims

- Built on OAuth 2.1 draft, RFC 6750 bearer tokens, RFC 8414 AS metadata, RFC 9728 Protected Resource Metadata, RFC 8707 resource indicators, RFC 9207 issuer identification, Client ID Metadata Documents (CIMD), OIDC discovery.
- Servers MUST publish Protected Resource Metadata; a 401 carries `WWW-Authenticate` with `resource_metadata` and optionally `scope`.
- Client registration: CIMD (an HTTPS URL used as `client_id`), pre-registration, or Dynamic Client Registration (deprecated, kept for compatibility).
- Clients use PKCE, MUST send the `resource` parameter (canonical server URI) in both authorization and token requests, and MUST validate a present `iss` against the recorded issuer before redeeming the code (an absent `iss` is rejected only when the AS advertises `authorization_response_iss_parameter_supported`).
- Tokens go in the `Authorization: Bearer` header on every request, never in the query string.
- Servers MUST validate that tokens were issued for them (audience) and MUST NOT accept or pass through other tokens.
- Scope selection: use the challenge's `scope`, else `scopes_supported`. Runtime `403 insufficient_scope` triggers step-up re-authorization with the union of old and new scopes; retries should be bounded.
- `client_credentials` clients (acting for themselves) may skip step-up and abort.
- Authorization extensions live in a separate `ext-auth` repository.

## Feeds

- [MCP in practice](../concepts/mcp-in-practice.md)

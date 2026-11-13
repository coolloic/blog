---
title: "Source: MCP Client Registration (spec 2026-07-28)"
summary: "How an MCP client obtains a client_id: pre-registration, Client ID Metadata Documents (preferred for unknown servers) or deprecated Dynamic Client Registration, plus issuer binding."
category: source
lastmod: 2026-11-14
tags: ["protocols", "mcp", "oauth"]
---

- **What:** the Client Registration sub-page of the MCP authorization specification
- **Author/publisher:** Model Context Protocol project
- **Date:** revision 2026-07-28; read 2026-11-14
- **Original:** [Client Registration](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/client-registration)

## Summary

MCP's typical case is a client and server with no prior relationship. The page specifies three ways to get a client ID and the order to try them, with Client ID Metadata Documents (CIMD) replacing Dynamic Client Registration (DCR) as the default answer to that case.

## Key claims

- Priority: pre-registered credentials, then CIMD if the AS advertises `client_id_metadata_document_supported`, then DCR if it has a `registration_endpoint`, then ask the user.
- CIMD: the `client_id` is an HTTPS URL with a path; the JSON document there must contain `client_id` (exactly equal to the URL), `client_name`, `redirect_uris`; clients may authenticate with `private_key_jwt`.
- The AS fetches the document, validates it and the redirect URI against it, caches per HTTP headers, and may apply a domain trust policy.
- DCR (RFC 7591) is deprecated and kept for backward compatibility. Clients must send an `application_type` (`native` for desktop/CLI/localhost, `web` otherwise) because OIDC defaults to `web` and can reject native redirect URIs.
- Pre-registered or DCR credentials are bound to the issuing AS's `issuer`; if protected-resource metadata points to a new AS, clients must re-register and not reuse them. CIMD IDs are portable across authorization servers.

## Feeds

- [Agent authentication and authorization](../concepts/agent-authentication-and-authorization.md)

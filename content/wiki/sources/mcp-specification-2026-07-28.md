---
title: "Source: MCP Specification 2026-07-28 and Changelog"
summary: "The current Model Context Protocol revision: a stateless redesign that removes the initialize handshake and sessions, adds server/discover, MRTR and subscriptions/listen, and deprecates Roots, Sampling and Logging."
category: source
lastmod: 2026-11-14
tags: ["protocols", "mcp"]
---

- **What:** the official MCP specification overview page and the "Key Changes" changelog for revision 2026-07-28
- **Author/publisher:** Model Context Protocol project (modelcontextprotocol.io)
- **Date:** revision 2026-07-28 (previous revision 2025-11-25); read 2026-11-14
- **Original:** [Specification](https://modelcontextprotocol.io/specification/latest) · [Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)

## Summary

The overview defines MCP as JSON-RPC 2.0 messages between hosts (LLM apps), clients (connectors inside the host) and servers (capability providers), modelled on the Language Server Protocol. Servers offer resources, prompts and tools; clients may offer elicitation. Optional extensions (Tasks, Skills over MCP, MCP Apps) are negotiated explicitly. The changelog for 2026-07-28 describes the largest redesign so far: the protocol becomes stateless, every request carries its own version and capabilities, and server-initiated requests are replaced by a retry-based pattern.

## Key claims

- Base protocol: JSON-RPC message format, stateless self-contained requests, per-request capability negotiation.
- Security principles: explicit user consent for data access and tool invocation; tool descriptions and annotations are untrusted unless from a trusted server; MCP itself cannot enforce these, implementors must.
- Sessions and the `Mcp-Session-Id` header are removed; servers needing cross-call state mint explicit handles passed as tool arguments (SEP-2567).
- The `initialize` / `notifications/initialized` handshake is removed. Each request carries `io.modelcontextprotocol/protocolVersion` and `io.modelcontextprotocol/clientCapabilities` in `_meta` (clients SHOULD also send `clientInfo`); mismatches return `UnsupportedProtocolVersionError`; servers MUST implement `server/discover` to advertise versions and capabilities (SEP-2575).
- All results carry a required `resultType` (`complete` or `input_required`); clients treat results from older servers that omit it as `complete`.
- `subscriptions/listen` replaces the HTTP GET stream and `resources/subscribe`; clients opt in to specific change notifications.
- `ping` and `logging/setLevel` are removed; log level is set per request in `_meta`.
- Tasks move out of core into an official extension (`io.modelcontextprotocol/tasks`) with polling via `tasks/get` and input via `tasks/update` (SEP-2663).
- Multi Round-Trip Requests (MRTR): instead of server-initiated `sampling/createMessage`, `elicitation/create` or `roots/list`, a server returns `resultType: "input_required"` with `inputRequests`; the client retries the original request with `inputResponses` (SEP-2322).
- SSE resumability (`Last-Event-ID`) is removed; a broken stream loses the request and the client re-issues it.
- Minor: `tools/list` SHOULD be deterministic in order (helps prompt-cache hits); list results carry `ttlMs` and `cacheScope`; Streamable HTTP POSTs need `Mcp-Method` / `Mcp-Name` headers; OpenTelemetry trace context in `_meta`; any JSON Schema 2020-12 keyword allowed in `inputSchema`/`outputSchema`.
- Auth changes: clients MUST validate a present `iss` against the recorded issuer (RFC 9207); credentials are bound to the issuing authorization server; Dynamic Client Registration is deprecated in favour of Client ID Metadata Documents.
- Deprecated (12-month minimum window): Roots, Sampling, Logging, the old HTTP+SSE transport.

## Feeds

- [MCP in practice](../concepts/mcp-in-practice.md)

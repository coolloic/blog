---
title: "Source: MCP Transports and Streamable HTTP (2026-07-28)"
summary: "Spec pages defining MCP's stdio and Streamable HTTP bindings: one POST endpoint, JSON or request-scoped SSE replies, mirrored routing headers, Origin validation and backward-compatibility probing."
category: source
lastmod: 2026-11-14
tags: ["protocols", "mcp"]
---

- **What:** the Transports overview and Streamable HTTP binding pages of the MCP specification
- **Author/publisher:** Model Context Protocol project
- **Date:** revision 2026-07-28; read 2026-11-14
- **Original:** [Transports](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports) · [Streamable HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)

## Summary

A transport is a binding that frames and delivers messages; message semantics are identical on every transport. Two standard bindings exist: stdio (newline-delimited JSON-RPC over a client-launched subprocess's standard streams) and Streamable HTTP. In the 2026-07-28 shape of Streamable HTTP, each client message is its own POST to a single endpoint and the server answers with a JSON object or an SSE stream scoped to that request. Selected body fields are mirrored into headers so load balancers and gateways can route without parsing JSON.

## Key claims

- Only two message directions exist: client requests/notifications to server, server responses/notifications to client. Servers do not initiate JSON-RPC requests.
- Cancellation: on stdio, `notifications/cancelled`; on Streamable HTTP, closing the response stream is the cancel signal.
- Custom transports over byte streams (Unix sockets, TCP) SHOULD reuse stdio framing.
- Servers MUST validate `Origin` (403 on invalid) to stop DNS rebinding; local servers SHOULD bind to 127.0.0.1, not 0.0.0.0; servers SHOULD authenticate all connections.
- Client POSTs MUST send `Accept: application/json, text/event-stream`; notifications get `202 Accepted`.
- Required headers: `MCP-Protocol-Version` (must equal the `_meta` value), `Mcp-Method`, and `Mcp-Name` for `tools/call`, `resources/read`, `prompts/get`. Mismatch returns 400 with `HeaderMismatch` (-32020).
- Tools may mark primitive parameters with `x-mcp-header` to mirror them as `Mcp-Param-{Name}` headers (e.g. region routing); sensitive values must not be marked because intermediaries see headers.
- Servers SHOULD send `X-Accel-Buffering: no` on SSE so proxies like nginx do not buffer; keep-alive SSE comments are encouraged on long-lived listen streams.
- Long-lived change notifications arrive on the response stream of `subscriptions/listen`; progress and log notifications stay on their own request's stream.
- Revisions 2025-03-26 to 2025-11-25 had `Mcp-Session-Id` sessions, a GET stream, server-initiated requests on SSE and `Last-Event-ID` resumption; none remain. A modern-only server answers GET/DELETE with 405 and ignores session headers.
- Clients probe server era by sending a modern request and falling back to `initialize` only if a 400 body is not a recognised modern error. The 2024-11-05 HTTP+SSE transport is deprecated.

## Feeds

- [MCP in practice](../concepts/mcp-in-practice.md)

---
title: "Source: MCP Tools Specification (2026-07-28)"
summary: "Spec page for MCP's tools primitive: listing, calling, content types, structured output, input-required results, stateful handles and the two error channels."
category: source
lastmod: 2026-11-14
tags: ["protocols", "mcp", "tools"]
---

- **What:** the Server Features → Tools page of the MCP specification
- **Author/publisher:** Model Context Protocol project
- **Date:** revision 2026-07-28; read 2026-11-14
- **Original:** [Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)

## Summary

Tools are model-controlled functions a server exposes. Clients discover them with paginated `tools/list` and invoke them with `tools/call`. Results carry unstructured `content` blocks and optionally `structuredContent` that conforms to an `outputSchema`. Because the protocol is now stateless, the page gives design guidance for stateful tools via explicit handles.

## Key claims

- A human SHOULD be able to deny tool invocations; hosts should show which tools are exposed and confirm sensitive operations.
- `tools/list` MUST NOT vary per connection but MAY vary by the caller's authorization; deterministic ordering is recommended for caching.
- Tool fields: `name` (1–128 chars, `A-Za-z0-9_-.`), `title`, `description`, `icons`, `inputSchema` (JSON Schema, 2020-12 default), optional `outputSchema`, `annotations`. Annotations MUST be treated as untrusted unless the server is trusted.
- Name collisions across servers are expected; aggregating clients should prefix with a server identifier.
- Content types: text, image, audio, `resource_link`, embedded `resource`, each with optional audience/priority annotations.
- `structuredContent` can be any JSON value; servers with an `outputSchema` MUST conform; for compatibility also return serialized JSON as text.
- A tool call may return `resultType: "input_required"` (e.g. an elicitation form) plus opaque `requestState`; the retry uses a new JSON-RPC id.
- Stateful tools (non-normative guidance): return an opaque handle (high-entropy when the server is unauthenticated) from a creation tool; re-check authorization on every use; state lifetime in the description; expired handles return a tool execution error.
- Two error channels: protocol errors (JSON-RPC, e.g. unknown tool) vs tool execution errors (`isError: true`) that the model can read and self-correct from.
- Servers MUST validate inputs, enforce access control, rate limit and sanitize outputs; clients SHOULD show inputs before calling, validate results, time out calls and log usage.

## Feeds

- [MCP in practice](../concepts/mcp-in-practice.md)

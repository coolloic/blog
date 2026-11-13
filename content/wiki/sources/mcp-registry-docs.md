---
title: "Source: The MCP Registry (official docs)"
summary: "Docs for the official MCP Registry: a metadata-only catalogue of public MCP servers with namespace verification, meant to feed downstream aggregators."
category: source
lastmod: 2026-11-14
tags: ["protocols", "mcp"]
---

- **What:** "About" page of the official MCP Registry documentation
- **Author/publisher:** Model Context Protocol project
- **Date:** living document, registry in preview; read 2026-11-14
- **Original:** [The MCP Registry](https://modelcontextprotocol.io/registry/about)

## Summary

The MCP Registry is a centralised store of metadata (`server.json`) that points to where public servers live: an npm/PyPI/Docker package or a remote URL. It does not host code. It is designed to be pulled by aggregators and marketplaces, which add curation, rather than queried directly by host apps. It also publishes an OpenAPI spec that private registries can implement.

## Key claims

- Status (as of 2026-11-14): preview, with possible breaking changes or data resets before GA.
- Backed by contributors including Anthropic, GitHub, PulseMCP and Microsoft.
- `server.json` holds a unique reverse-DNS name (e.g. `io.github.user/server-name`), package or remote location, run instructions (args, env vars) and discovery data.
- Namespace ownership is verified through GitHub, DNS or HTTP challenges.
- Private servers (internal hostnames, private package registries) are out of scope; run your own registry implementing the OpenAPI spec. The official codebase is not designed for self-hosting.
- Security scanning is delegated to package registries and aggregators; the registry itself only authenticates namespaces and can take down spam or malware manually.
- Aggregators are expected to poll infrequently (for example hourly).

## Feeds

- [MCP in practice](../concepts/mcp-in-practice.md)

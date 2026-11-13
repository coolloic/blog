---
title: "Source: Hosting the Agent SDK (Claude Code docs)"
summary: "Production hosting guidance for the Claude Agent SDK: subprocess model, session patterns, resources, observability, multi-tenant isolation and known limits."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "deployment"]
---

- **What:** official documentation page, Claude Code docs (Agent SDK section)
- **Author:** Anthropic
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://code.claude.com/docs/en/agent-sdk/hosting](https://code.claude.com/docs/en/agent-sdk/hosting)

## Summary

Because `query()` spawns a `claude` CLI subprocess that owns a shell, working directory and local transcripts, hosting the SDK is not like hosting a stateless API wrapper. The page describes four session patterns (ephemeral, long-running, hybrid, multi-agent container), container sizing, OpenTelemetry export, credential handling, scaling by RAM, multi-tenant isolation and a table of known limitations.

## Key claims

- One session maps to one subprocess; N concurrent sessions mean N subprocesses.
- Transcripts, CLAUDE.md memory and working-directory artifacts live on local disk and are lost on container restart unless persisted.
- `SessionStore` mirrors transcripts only (best-effort, emitting `mirror_error` on failure), not memory files or artifacts.
- Starting point: 1 GiB RAM, 5 GiB disk, 1 CPU per agent; memory grows with session length.
- Requires Python 3.10+ or Node.js 18.14+; the bundled CLI is pinned to the SDK version.
- Token cost typically dominates container cost by an order of magnitude or more (container roughly $0.05/hour).
- Multi-tenant isolation: `setting_sources=[]`, disable auto memory, per-tenant `CLAUDE_CONFIG_DIR` and `cwd`, per-tenant egress rules.
- Known limits: no top-level session timeout, memory growth in long sessions, rate limits on wide subagent fan-outs, no per-subagent wall-clock deadline (`CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS` is only a stall watchdog).

## Feeds

- [Claude Agent SDK](../concepts/claude-agent-sdk.md)

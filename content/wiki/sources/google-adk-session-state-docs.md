---
title: "Source: State (ADK sessions docs)"
summary: "ADK session state: key prefixes and scopes, safe ways to update state, instruction templating and SessionService backends."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "memory"]
---

- **What:** official documentation page
- **Author:** Google
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://adk.dev/sessions/state/](https://adk.dev/sessions/state/)

## Summary

`session.state` is a serialisable key-value scratchpad alongside the event history. Prefixes set scope and persistence; updates must flow through events so they are recorded and persisted. Instructions can template state values with `{key}`.

## Key claims

- Prefixes: none (this session), `user:` (all sessions of a user), `app:` (all users), `temp:` (current invocation only, never persisted).
- Update state via `output_key`, `EventActions.state_delta`, or `context.state` in callbacks and tools.
- Mutating `session.state` directly outside an invocation skips the audit trail, may not persist, and risks races.
- `{key}` in an instruction injects state; missing keys error unless written `{key?}`.
- Backends: InMemorySessionService (dev only, not thread-safe), DatabaseSessionService (per-session locking), VertexAiSessionService (managed).

## Feeds

- [Google ADK](../concepts/google-adk.md)

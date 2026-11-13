---
title: "Source: Conversations & Memory overview (Microsoft Agent Framework docs)"
summary: "AgentSession usage in Agent Framework: create, reuse, serialize and resume sessions, local vs service-managed history, and the tenant-isolation caveat for service conversation IDs."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "microsoft", "memory"]
---

- **What:** official documentation page, Microsoft Learn
- **Author:** Microsoft (eavanvalkenburg)
- **Date:** ms.date 2026-05-28 (read 2026-11-14)
- **Original:** [https://learn.microsoft.com/en-us/agent-framework/concepts/agents/conversations/](https://learn.microsoft.com/en-us/agent-framework/concepts/agents/conversations/)

## Summary

`AgentSession` carries conversation context between runs. Sessions are either local (history stored by a history provider) or service-managed (an opaque server-side conversation ID). The page gives the create / pass / persist / resume pattern for C#, Python and Go and points to sub-pages on context providers, compaction, storage and the chat-history memory provider.

## Key claims

- Pattern: create a session, pass it to every run, persist it (`SerializeSession` / `session.to_dict()`), and rehydrate (`DeserializeSessionAsync` / `AgentSession.from_dict`) or resume by service conversation ID (`get_session(...)`).
- OpenAI Responses and Conversations IDs are scoped to the API key or project; if one hosted agent serves many users, store IDs server-side and check the authenticated user or tenant before resuming.
- Context providers, compaction and storage are separate, pluggable concerns.

## Feeds

- [Microsoft Agent Framework](../concepts/microsoft-agent-framework.md)

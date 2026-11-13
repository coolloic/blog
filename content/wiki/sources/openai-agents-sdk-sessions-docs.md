---
title: "Source: Sessions (OpenAI Agents SDK docs)"
summary: "How OpenAI Agents SDK sessions store and replay conversation history, their backends, and their security and compaction caveats."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "memory"]
---

- **What:** official documentation page
- **Author:** OpenAI
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://openai.github.io/openai-agents-python/sessions/](https://openai.github.io/openai-agents-python/sessions/)

## Summary

A session retrieves stored history before each run, prepends it to the new input, and stores the new items afterwards. The page lists implementations, the session operations, `session_input_callback`, and limits including trust and compaction behaviour.

## Key claims

- Implementations: SQLiteSession (default), AsyncSQLiteSession, OpenAIConversationsSession, RedisSession, SQLAlchemySession, EncryptedSession, OpenAIResponsesCompactionSession, plus MongoDB, Dapr and AdvancedSQLite.
- Operations: `get_items`, `add_items`, `pop_item`, `clear_session`.
- All items are retrieved by default; `SessionSettings(limit=N)` caps it.
- Session IDs select history but do not authorise access; SQLite rows are not tamper-checked.
- Encryption is not integrity: `EncryptedSession` does not verify completeness or order.
- Automatic compaction can keep streamed runs open a few seconds; it can be run manually instead.

## Feeds

- [OpenAI Agents SDK](../concepts/openai-agents-sdk.md)

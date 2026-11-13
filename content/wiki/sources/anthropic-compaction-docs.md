---
title: "Source: Compaction overview (Claude API docs)"
summary: "Anthropic's server-side summarisation of older turns, offered on demand or at a token threshold, as an alternative to writing your own summariser."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "context"]
---

- **What:** official API documentation
- **Publisher:** Anthropic
- **Date:** read 2026-11-14 (both modes in beta; on-demand header `compact-2026-09-04`)
- **Original:** [platform.claude.com/docs/en/build-with-claude/compaction](https://platform.claude.com/docs/en/build-with-claude/compaction)

## Summary

Compaction replaces older turns with a summary Claude writes server-side. It keeps long conversations and agent runs inside the window and keeps active context small, since the docs note response quality degrades as a conversation grows. Three options are compared: on-demand compaction, compaction at a token threshold, and your own summariser.

## Key claims

- On-demand: the application requests a summary block and places it first in `messages`, replacing the turns it covers. It can keep recent turns verbatim and can run in the background.
- Threshold: the API compacts inside the request that crosses a trigger you set; you append the response as usual and the API drops what came before the block.
- Own summariser: you write the summarisation call, prompt and history rewrite.
- The docs recommend on-demand compaction wherever it is available; a custom summarisation prompt is supported when the default drops something later turns need.
- Context editing is the rule-based alternative (clear tool results or thinking) when summarising is not wanted.

## Feeds

[Agent memory](../concepts/agent-memory.md)

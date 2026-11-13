---
title: "Source: Event loop (ADK runtime docs)"
summary: "How the ADK Runner and agents cooperate through yielded events, state commits and invocations."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "google"]
---

- **What:** official documentation page
- **Author:** Google
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://adk.dev/runtime/event-loop/](https://adk.dev/runtime/event-loop/)

## Summary

The Runner orchestrates one invocation: it appends the user message, runs the agent, and for each yielded event commits `state_delta` and `artifact_delta` through the services before letting the agent resume. The page defines invocation and explains dirty reads.

## Key claims

- Agent, tool and callback code yields an `Event` and pauses until the Runner has processed it.
- State changes are guaranteed persisted only after the carrying event is processed; earlier local reads are dirty reads.
- Partial streaming events are forwarded for display, but their actions are not committed.
- An invocation is everything triggered by one user query, tied together by one `invocation_id`.
- Services: SessionService, ArtifactService, optional MemoryService for cross-session memory.
- `run_async` is the primary entry point; blocking sync code in tools can stall the event loop.

## Feeds

- [Google ADK](../concepts/google-adk.md)

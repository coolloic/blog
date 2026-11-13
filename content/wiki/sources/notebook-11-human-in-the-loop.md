---
title: "Source: Notebook experiment 11: Human-in-the-loop"
summary: "Runnable LangGraph flow that drafts a refund reply, pauses at an interrupt checkpoint, and resumes on a human approve/reject decision."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "langgraph", "agents"]
---

- **What:** runnable experiment in the owner's public Notebook repo
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [experiments/11-human-in-the-loop](https://github.com/coolloic/Notebook/tree/main/experiments/11-human-in-the-loop)

## Summary

A LangGraph workflow drafts a customer refund reply and then hits a `human_gate` node that calls `interrupt`; a checkpointer persists the paused run, and a human decision delivered through `Command(resume=...)` lets it continue. Traced with LangSmith.

## Key claims

- Human review points suit high-stakes, safety-critical or compliance steps.
- They add an external review dependency and architectural complexity.
- Pausing and resuming requires a checkpointer.

## Feeds

[LangGraph](../concepts/langgraph.md)

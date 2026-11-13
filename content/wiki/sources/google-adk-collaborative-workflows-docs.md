---
title: "Source: Collaborative workflows (ADK docs)"
summary: "ADK 2.0 coordinator-with-sub-agents pattern and the chat, task and single_turn sub-agent modes."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "multi-agent"]
---

- **What:** official documentation page
- **Author:** Google
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://adk.dev/workflows/collaboration/](https://adk.dev/workflows/collaboration/)

## Summary

A coordinator agent declares `sub_agents`; ADK generates a delegation tool per sub-agent. Each sub-agent has a mode that sets how it interacts with the user and when control returns to the parent.

## Key claims

- `chat` (default): free conversation; control returns only via a transfer.
- `task`: may ask the user clarifying questions; returns automatically on `finish_task`; must be a leaf agent.
- `single_turn`: no user interaction, runs once and returns; can run in parallel.
- Task and single-turn agents run in their own session branch and see only their branch's events.
- In Python v2.0.0, task mode is disabled inside graph workflows.

## Feeds

- [Google ADK](../concepts/google-adk.md)

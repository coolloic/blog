---
title: "Source: Crews (CrewAI docs)"
summary: "CrewAI Crew attributes, kickoff variants, CrewOutput, usage metrics and replay from a task."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "crewai"]
---

- **What:** official documentation page
- **Author:** CrewAI Inc.
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://docs.crewai.com/en/concepts/crews](https://docs.crewai.com/en/concepts/crews)

## Summary

A Crew binds agents and tasks under a process and adds crew-wide settings: manager LLM, rate limits, memory, tool caching, planning, callbacks and streaming. It documents sync and async kickoff methods and how to replay a run from a given task.

## Key claims

- Process defaults to sequential; hierarchical needs `manager_llm` or `manager_agent`.
- `cache` (tool results) defaults to true; `max_rpm` overrides agent-level limits.
- `planning` runs a planner before each iteration and adds the plan to task descriptions.
- `akickoff()` is native async and recommended for high concurrency; `kickoff_async()` is a thread wrapper.
- `crewai replay -t <task_id>` re-runs from a task, keeping earlier context.

## Feeds

- [CrewAI](../concepts/crewai.md)

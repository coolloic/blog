---
title: "Source: Flows (CrewAI docs)"
summary: "CrewAI Flows: @start/@listen/@router decorators, structured state, persistence, human feedback and embedding crews."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "crewai"]
---

- **What:** official documentation page
- **Author:** CrewAI Inc.
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://docs.crewai.com/en/concepts/flows](https://docs.crewai.com/en/concepts/flows)

## Summary

Flows are event-driven Python classes whose methods are wired by decorators. They carry dict or Pydantic state with an automatic UUID, can persist and resume, pause for human feedback, be plotted, and call Crews or standalone Agents inside steps.

## Key claims

- `@start()` marks entry points; `@listen()` fires when a method finishes and receives its output; `@router()` returns a label that selects a branch.
- `or_` fires on any upstream emission; `and_` waits for all.
- State is unstructured (dict) or structured (`Flow[PydanticModel]`); every state has an `id` UUID.
- `@persist` saves state (default SQLite); `kickoff(inputs={'id': ...})` resumes; `restore_from_state_id` forks.
- `@human_feedback` (CrewAI 1.8.0+) pauses for input and can map free text to outcomes with an LLM.
- An unknown state ID silently falls back instead of raising.
- `flow.usage_metrics` totals tokens across all crews and agents in a kickoff.

## Feeds

- [CrewAI](../concepts/crewai.md)

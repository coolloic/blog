---
title: "Source: Agents (CrewAI docs)"
summary: "CrewAI Agent attributes and defaults (role, goal, backstory, max_iter, delegation, context window handling) and standalone kickoff."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "crewai"]
---

- **What:** official documentation page
- **Author:** CrewAI Inc.
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://docs.crewai.com/en/concepts/agents](https://docs.crewai.com/en/concepts/agents)

## Summary

An Agent is defined by a required role, goal and backstory plus an LLM, tools and behaviour limits. Agents can also run standalone with `Agent.kickoff()` without a task or crew.

## Key claims

- Required: `role`, `goal`, `backstory`.
- Defaults: `max_iter` 20, `allow_delegation` False, `respect_context_window` True (summarises to fit), `reasoning` False.
- Default LLM is `OPENAI_MODEL_NAME` or `gpt-6-luna` (as of 2026-11).
- `allow_code_execution` and `code_execution_mode` are deprecated; use an external sandbox such as E2B or Modal.
- `Agent.kickoff()` runs an agent directly and supports a Pydantic `response_format`.

## Feeds

- [CrewAI](../concepts/crewai.md)

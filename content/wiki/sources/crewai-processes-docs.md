---
title: "Source: Processes (CrewAI docs)"
summary: "CrewAI's sequential and hierarchical processes and how tasks are assigned and validated in each."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "crewai"]
---

- **What:** official documentation page
- **Author:** CrewAI Inc.
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://docs.crewai.com/en/concepts/processes](https://docs.crewai.com/en/concepts/processes)

## Summary

Two processes are implemented. Sequential runs tasks in list order, each output feeding the next. Hierarchical adds a manager that plans, delegates tasks to agents by capability and reviews outputs.

## Key claims

- `Process` is an enum with `sequential` and `hierarchical` only.
- Hierarchical requires `manager_llm` (auto-created manager) or a custom `manager_agent`.
- In hierarchical mode tasks are not pre-assigned; the manager allocates and validates them.

## Feeds

- [CrewAI](../concepts/crewai.md)

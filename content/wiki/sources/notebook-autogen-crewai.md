---
title: "Source: AutoGen vs CrewAI (Loic's Notebook)"
summary: "The owner's tutorial contrasting AutoGen's conversation-first model with CrewAI's role-and-task model."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "notebook"]
---

- **What:** tutorial page in the owner's Notebook
- **Author:** Loic (site owner)
- **Date:** undated (read 2026-11-14)
- **Original:** [https://coolloic.github.io/Notebook/autogen-crewai.html](https://coolloic.github.io/Notebook/autogen-crewai.html)

## Summary

Compares the two frameworks by mental model: AutoGen treats multi-agent work as a chat between conversable agents with a speaker-selection strategy; CrewAI declares roles, tasks with expected outputs, and a process. Includes side-by-side code, a head-to-head table and a decision guide, and warns that many agent problems are better served by a single agent or plain workflow.

## Key claims

- AutoGen: conversation-first, emergent coordination, first-class code execution, needs firm termination conditions.
- CrewAI: opinionated role/task scaffolding, predictable sequential or hierarchical processes, Flows for determinism.
- Pick CrewAI when roles and order are known; AutoGen when the path is open, code execution is central, or topologies are novel.
- Multi-agent adds latency, token cost and failure modes such as agents talking past each other and non-terminating loops.
- Version-specific details are perishable: AutoGen had a 0.2 to 0.4 redesign; CrewAI added Flows.

## Feeds

- [CrewAI](../concepts/crewai.md)
- [AutoGen / Microsoft Agent Framework](../concepts/autogen.md)

---
title: "Source: Loop Engineering (Loic's Notebook)"
summary: "The owner's tutorial on agent loops in Claude Code: triggers, stop criteria, four loop types, and skills as encoded verification standards."
category: source
lastmod: 2026-11-14
tags: ["agents", "notebook"]
---

- **What:** tutorial page in the owner's Notebook (based on Anthropic's "Getting started with loops")
- **Author:** Loic (site owner)
- **Date:** undated (read 2026-11-14)
- **Original:** [https://coolloic.github.io/Notebook/loops.html](https://coolloic.github.io/Notebook/loops.html)

## Summary

Frames a loop as an agent repeating gather-act-verify cycles until a stop condition holds, defined by three choices: trigger, stop criteria and the primitive that powers it. It orders loops by autonomy (turn-based, goal-based with `/goal`, time-based with `/loop` and `/schedule`, proactive routines) and lists the Claude Code primitives that make them work.

## Key claims

- Skills are one of four loop primitives (with dynamic workflows, auto mode and subagents): they encode verification standards as `SKILL.md` files so the agent can check its own work against the team's criteria.
- Prefer deterministic stop criteria (tests pass, score threshold) over subjective judgement for unattended loops.
- Best practices: keep the codebase clean because the agent copies existing patterns, put verification standards in skills, add an independent review subagent, and use deterministic scripts for routine work instead of model reasoning.
- Cost grows with agent complexity and run frequency; turn caps prevent runaway loops but need calibrating.

## Feeds

[Agent skills](../concepts/agent-skills.md)

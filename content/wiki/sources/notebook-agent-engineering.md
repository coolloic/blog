---
title: "Source: Harness vs Loop vs Graph Engineer (Notebook tutorial)"
summary: "The owner's tutorial placing graph, loop and harness engineering on a control-versus-autonomy dial, with coding agents as the canonical harness case."
category: source
lastmod: 2026-11-14
tags: ["agents"]
---

- **What:** tutorial in the owner's Notebook
- **Author:** Loic
- **Date:** read 2026-11-14
- **Original:** [Harness vs Loop vs Graph Engineer](https://coolloic.github.io/Notebook/agent-engineering.html)

## Summary

Presents three ways to build agent systems as points on one dial. A graph engineer draws explicit nodes and edges; a loop engineer designs a trigger, a cycle and stop criteria; a harness engineer builds the model's environment (context, tools, verification, permissions) and lets the model drive.

## Key claims

- Rule of thumb: impose the least structure that still gives the guarantees the task needs.
- Harness engineering suits broad, open-ended work such as coding agents and research; it is the least predictable and relies on model quality and strong verification. Tooling: agent SDKs and Claude Code-style harnesses.
- The bitter-lesson argument: general methods that scale with compute tend to beat hand-crafted control flow over time.
- The three styles nest in real systems.

## Feeds

[Coding agents](../concepts/coding-agents.md)

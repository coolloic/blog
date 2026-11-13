---
title: "Source: Don't Build Multi-Agents (Cognition, 2025)"
summary: "Cognition (Devin) argues for single-threaded agents that share full context, warning that parallel subagents make conflicting implicit decisions."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "multi-agent"]
---

- **What:** engineering blog post
- **Author:** Walden Yan (Cognition, makers of Devin)
- **Date:** 2025-06-12
- **Original:** [Don't Build Multi-Agents](https://cognition.com/blog/dont-build-multi-agents)

## Summary

Two principles for reliable long-running agents: share full context (whole traces, not just messages), and recognise that actions carry implicit decisions, so agents that can't see each other's decisions produce conflicting work.

## Key claims

- Example: splitting a Flappy Bird clone between a "background" subagent and a "bird" subagent yields mismatched pieces even when both get the original task.
- Recommended: a single-threaded linear agent; for very long tasks, add a separate model that compresses history into key decisions and events (Cognition fine-tuned smaller models for this; hard to get right).
- Claude Code's subagents (as of mid-2025) mostly answer narrow questions rather than write code, and their value is keeping investigation out of the main context.
- The 2024 pattern of a large model writing edit instructions and a small "apply" model executing them was fragile; one model now usually decides and edits in a single action.

## Feeds

[Coding agents](../concepts/coding-agents.md)

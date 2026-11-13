---
title: "Source: Mastra docs: Supervisor agents"
summary: "Mastra multi-agent delegation: subagents in the agents map are called as tools, with delegation hooks, message filtering, step-budget caps and memory isolation."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "typescript", "multi-agent"]
---

- **What:** official documentation page
- **Author:** Mastra
- **Date:** read 2026-11-14
- **Original:** [https://mastra.ai/docs/agents/supervisor-agents](https://mastra.ai/docs/agents/supervisor-agents)

## Summary

A supervisor is an ordinary agent with an `agents` map (added in `@mastra/core` 1.8.0). The supervisor delegates by calling subagents as tools, chosen from its instructions and each subagent's description, then synthesises the results. Hooks control delegation.

## Key claims

- Subagent calls are dispatched as tool calls; the subagent's `description` should state purpose and return format.
- Subagents receive the parent's full conversation by default; `messageFilter` trims or redacts it. Only the delegation prompt and response are saved to the subagent's memory, on a fresh thread each time.
- Hooks: `onDelegationStart` (approve/reject, rewrite prompt, change max steps), `onDelegationComplete` (bail, feedback, replace result), `hookErrorStrategy` (default continue).
- A supervisor-requested `maxSteps` is capped at the subagent's own default; it can lower but not raise the budget.
- Subagents cannot run client-side tools (no `execute`); subagent tool results are excluded from the parent's model context unless `includeSubAgentToolResultsInModelContext` is set.
- An `abortSignal` on the parent propagates to in-flight subagents.

## Feeds

- [Mastra](../concepts/mastra.md)

---
title: "Source: Human-in-the-loop (OpenAI Agents SDK docs)"
summary: "OpenAI Agents SDK tool-approval flow: needs_approval, run interruptions, RunState approve/reject with sticky decisions, JSON serialization for long waits, and security guidance."
category: source
lastmod: 2026-11-14
tags: ["agents", "openai", "human-in-the-loop"]
---

- **What:** official SDK documentation (Python)
- **Publisher:** OpenAI
- **Date:** accessed 2026-11-14
- **Original:** [Human-in-the-loop](https://openai.github.io/openai-agents-python/human_in_the_loop/)

## Summary

Tools can be flagged as needing approval. When the model calls one and no decision is stored, the run stops and returns the pending calls as interruptions. The application converts the result into a `RunState`, records approve/reject decisions, optionally serializes the state to wait for a human, and resumes the run by passing the state back to the runner.

## Key claims

- `needs_approval` is `True` or an async predicate over (context, parsed args, call ID); unparseable arguments force manual approval. Available on `function_tool`, `Agent.as_tool`, `ShellTool`, `ApplyPatchTool`.
- Paused runs expose `result.interruptions` (`ToolApprovalItem` entries); `result.to_state()` produces a `RunState`.
- `state.approve()` / `state.reject()`; `always_approve=True` / `always_reject=True` make sticky decisions; `rejection_message=` customizes what the model sees.
- Resume with `Runner.run(original_top_level_agent, state)`; unresolved interruptions pause again. Nested agent-as-tool approvals surface on the outer run.
- `state.to_json()` / `RunState.from_json(agent, data)` persist pending runs; sticky decisions survive the round trip.
- MCP: local servers take `require_approval`; `HostedMCPTool` accepts `require_approval: "always"` and an `on_approval_request` callback.
- Guidance for long-running approvals: serialized state is not authenticated (only load trusted snapshots); keep the full snapshot server-side and show reviewers only what they are authorized to see; authenticate and authorize each reviewer; validate decisions against stored interruptions; make resume an atomic transition so a snapshot cannot be resumed twice; approval does not give exactly-once execution, so use idempotency keys; store a code-version marker with the state.

## Feeds

[Human-in-the-loop](../concepts/human-in-the-loop.md), [Durable agent execution](../concepts/durable-agent-execution.md)

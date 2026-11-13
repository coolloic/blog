---
title: "Source: Human-in-the-loop middleware (LangChain docs)"
summary: "LangChain's HumanInTheLoopMiddleware: per-tool interrupt policies, approve/edit/reject/respond decisions, batched vs per-call interrupts, and the checkpointer requirement."
category: source
lastmod: 2026-11-14
tags: ["agents", "langchain", "human-in-the-loop"]
---

- **What:** official open-source documentation (Python)
- **Publisher:** LangChain
- **Date:** accessed 2026-11-14
- **Original:** [Human-in-the-loop](https://docs.langchain.com/oss/python/langchain/human-in-the-loop)

## Summary

`HumanInTheLoopMiddleware` sits in a `create_agent` agent and raises a LangGraph `interrupt` whenever the model proposes a tool call that matches the policy. A reviewer answers with a decision per call, and the run resumes from the checkpoint.

## Key claims

- `interrupt_on` maps tool name to `True`, `False` (auto-approve) or an `InterruptOnConfig` with `allowed_decisions`, `description` and a `when` predicate (`langchain>=1.3.3`; must evaluate the same on resume).
- Decisions: `approve`; `edit` (new name/args); `reject` (skip, optional message to the model); `respond` (return a message as the tool result without running it). Use `reject`, not `respond`, to deny side-effecting tools, because `respond` looks like success.
- Batched mode (default): one interrupt carrying `action_requests` and `review_configs`; resume with `Command(resume={"decisions": [...]})` in the same order.
- Per-call mode (`interrupt_mode="per_call"`, `langchain>=1.4.6`): one interrupt per gated call; resume with a dict keyed by interrupt ID.
- A checkpointer and `thread_id` are required; `InMemorySaver` for prototypes, Postgres or MongoDB savers in production.

## Feeds

[Human-in-the-loop](../concepts/human-in-the-loop.md)

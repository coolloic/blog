---
title: "Source: LangChain multi-agent docs (overview and handoffs)"
summary: "LangChain v1 docs comparing subagents, handoffs, skills and router patterns, and showing handoffs as state-updating tools that return Command."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "multi-agent", "langgraph"]
---

- **What:** official documentation pages (Python): multi-agent overview and the handoffs pattern
- **Publisher:** LangChain
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [Multi-agent overview](https://docs.langchain.com/oss/python/langchain/multi-agent), [Handoffs](https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs)

## Summary

The overview lays out five multi-agent patterns (subagents, handoffs, skills, router, custom workflow), who keeps control in each, and worked call/token counts. The handoffs page defines a handoff as a tool that updates a persisted state variable (`active_agent`, `current_step`), after which the system either reconfigures one agent or routes to another agent node.

## Key claims

- Handoffs: a tool call updates shared state and the active agent persists across turns; subagents: the main agent calls specialists as tools, they start fresh each call, and all routing returns to the main agent.
- Worked example counts: one-shot request, subagents 4 model calls vs 3 for handoffs; repeating the request in turn 2, handoffs total 5 calls vs 8 for subagents; a three-domain request, handoffs 7+ calls and ~14K+ tokens vs subagents 5 calls and ~9K tokens.
- Handoffs run sequentially and cannot research several domains in parallel; they rate highest for direct user interaction. Subagents rate highest for parallelism and distributed development, lowest for direct user interaction.
- Two implementations: a single agent whose prompt and tools change by state via `@wrap_model_call` middleware (recommended for most cases), or separate agent subgraphs navigated with handoff tools returning `Command(goto=..., update=..., graph=Command.PARENT)`.
- Handoff tools read state through `ToolRuntime`; when they update `messages`, they must include a `ToolMessage` matching `runtime.tool_call_id`, or history is malformed.
- Recommended context: pass only the `AIMessage` holding the handoff call plus its `ToolMessage`, not the whole subagent history, which confuses the receiver and costs tokens; summarise into the `ToolMessage` if more is needed.
- The examples assume a single tool call per turn; parallel tool calls need separate handling. A turn handed back to the user should end on an `AIMessage`.

## Feeds

- [Agent handoffs](../concepts/agent-handoffs.md) · [LangGraph](../concepts/langgraph.md) · [LangChain](../concepts/langchain.md)

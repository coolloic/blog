---
title: "Source: ADK agent transfer (adk-python source and LlmAgent docs)"
summary: "How Google ADK implements transfer_to_agent: an enum-constrained transfer tool, target selection from parent/peers/sub-agents, and the injected transfer instructions."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "multi-agent", "google"]
---

- **What:** open-source code (`src/google/adk/tools/transfer_to_agent_tool.py`, `src/google/adk/flows/llm_flows/extensions/_agent_transfer.py`) and the LlmAgent docs page
- **Author:** Google
- **Date:** `main` branch read 2026-11-14 (ADK 2.x)
- **Original:** [transfer_to_agent_tool.py](https://github.com/google/adk-python/blob/main/src/google/adk/tools/transfer_to_agent_tool.py), [_agent_transfer.py](https://github.com/google/adk-python/blob/main/src/google/adk/flows/llm_flows/extensions/_agent_transfer.py), [LlmAgent docs](https://adk.dev/agents/llm-agents/)

## Summary

In ADK, an LLM agent transfers control by calling `transfer_to_agent(agent_name, ...)`. The function does no work itself; it sets `transfer_to_agent` on the tool context's actions and the runtime switches agents. A request processor decides which agents are valid targets and injects both the tool and instructions describing those targets.

## Key claims

- `TransferToAgentTool` constrains `agent_name` with a JSON Schema enum of valid targets, which the code says prevents hallucinated agent names; an optional `transfer_reason` argument can be included.
- Valid targets: the agent's sub-agents, its parent unless `disallow_transfer_to_parent`, and its peers unless `disallow_transfer_to_peers`. Sub-agents in `task` or `single_turn` mode are excluded, since they are invoked as delegated tasks instead.
- The injected instruction lists target agents with their descriptions, tells the model to answer itself if it is the best fit, otherwise call the transfer tool without other text, and to transfer to the parent if no one fits.
- The docs say `description` is mainly read by other agents to decide routing, so it should distinguish an agent from its peers.
- `AgentTool` wraps an agent as a tool; in Python the docs prefer `mode='single_turn'` sub-agents, which ADK exposes as tools automatically. In Go v2.0.0, `ModeChat` agents are reachable from peers via `transfer_to_agent`.

## Feeds

- [Agent handoffs](../concepts/agent-handoffs.md) · [Google ADK](../concepts/google-adk.md)

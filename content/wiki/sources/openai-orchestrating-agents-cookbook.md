---
title: "Source: Orchestrating Agents: Routines and Handoffs (OpenAI Cookbook)"
summary: "OpenAI's 2024 cookbook that introduced routines and handoffs as transfer functions returning an Agent, the idea behind Swarm and the Agents SDK."
category: source
lastmod: 2026-11-14
tags: ["agents", "multi-agent", "openai"]
---

- **What:** OpenAI Cookbook notebook (now marked archived)
- **Author:** Ilan Bigio, OpenAI (attribution per third-party listings; the page itself shows no byline)
- **Date:** 10 October 2024 (date shown on an OpenAI cookbook mirror; read 2026-11-14)
- **Original:** [https://developers.openai.com/cookbook/examples/orchestrating_agents](https://developers.openai.com/cookbook/examples/orchestrating_agents)

## Summary

Defines a *routine* as natural-language instructions plus the tools needed to carry them out, and a *handoff* as one agent passing an active conversation to another, like a phone transfer where the new person already knows what was said. It builds both in plain Python on Chat Completions and packages the ideas as the Swarm sample library.

## Key claims

- Agents get transfer functions (e.g. `transfer_to_sales_agent`, `transfer_back_to_triage`) that the model calls when a switch makes sense.
- A transfer function returns an `Agent` object instead of a string; the loop (`run_full_turn`) detects this, swaps `current_agent` and tells the model, via the tool result, that the transfer happened.
- One shared `messages` list carries across agents; each agent swaps in its own instructions as the system prompt, so the next agent sees the prior conversation.
- Swarm (github.com/openai/swarm) is presented as an educational proof of concept, not for production use.

## Feeds

- [Agent handoffs](../concepts/agent-handoffs.md) · [OpenAI Agents SDK](../concepts/openai-agents-sdk.md)

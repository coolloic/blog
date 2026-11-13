---
title: "Source: Rearchitecting Letta's Agent Loop (Letta, 2025)"
summary: "Letta's letta_v1_agent drops MemGPT heartbeats, the send_message tool and tool-argument inner thoughts in favour of native reasoning and native multi-step tool use."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory"]
---

- **What:** vendor engineering blog post
- **Publisher:** Letta
- **Date:** 14 October 2025
- **Original:** [letta.com/blog/letta-v1-agent](https://www.letta.com/blog/letta-v1-agent)

## Summary

Explains why Letta replaced the MemGPT-style agent loop. MemGPT was designed for models that could not reliably chain tools or reason natively, so it simulated both with tool arguments. Frontier models are now post-trained for multi-step tool use and self-termination, so Letta's new default loop lets the model drive.

## Key claims

- Removed: the `request_heartbeat` argument for chaining tool calls; the `send_message` tool (the model's plain assistant message is now the reply); the `thinking` argument for inner thoughts (replaced by native reasoning).
- Rationale: keeping agents "in-distribution" for models such as GPT-5 and Claude Sonnet 4.5 significantly improves performance.
- Native reasoning supported (OpenAI via the Responses API; encrypted reasoning handled across providers); tool calling is no longer required to connect a model.
- Trade-offs: non-reasoning models produce no reasoning and prompted reasoning is unsupported; encrypted reasoning cannot be edited or moved between models; tool rules cannot constrain assistant messages; sleep-time style independent runs need custom prompting.
- The original MemGPT architecture remains supported; V1 is recommended for current reasoning models.

## Feeds

[Letta](../concepts/letta.md)

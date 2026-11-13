---
title: "Agent guardrails"
summary: "Sandboxing, permissions and input handling that bound what an agent can do."
category: concept
sources:
  - ../sources/anatomy-of-a-modern-ai-agent.md
  - ../sources/google-cloud-choose-agentic-design-pattern.md
lastmod: 2026-11-13
tags: ["agents", "security"]
---

**Agent guardrails** are the limits on what an agent is allowed to do. The more capable an agent is, the more they matter. Good guardrails are what let autonomy increase over time instead of requiring step-by-step supervision.

## Layers

- **Sandboxing.** Run code in isolated environments (containers, microVMs) so mistakes stay contained.
- **Permissions.** Read-only actions run freely. Writes, deletions and anything public-facing need approval or an explicit policy. See [tools](tools.md).
- **Treating inputs as data.** Web pages, emails, tool results and [MCP](model-context-protocol.md) responses can contain text that looks like instructions. An agent that obeys what it reads is open to **prompt injection**. Fetched content should inform the agent, never command it.

## Human-in-the-loop

At predefined checkpoints the agent pauses for a person to approve, correct or supply input. This is the standard choice for high-stakes, safety-critical or subjective decisions, such as approving the release of a redacted health dataset. It improves safety at the cost of building and maintaining the review system ([Google Cloud](../sources/google-cloud-choose-agentic-design-pattern.md)).

For multi-agent systems, the same guide recommends controlling agent traffic, giving each agent least-privilege identity, and registering trusted tools and subagents. It names Google products for each of these.

## Related

[Agent loop](agent-loop.md): the harness that runs the loop is where guardrails are enforced.

## Sources

- [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md)
- [Choose a design pattern for your agentic AI system (Google Cloud)](../sources/google-cloud-choose-agentic-design-pattern.md)

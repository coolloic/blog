---
title: "Agent guardrails"
summary: "Sandboxing, permissions and input handling that bound what an agent can do."
category: concept
sources:
  - ../sources/anatomy-of-a-modern-ai-agent.md
lastmod: 2026-11-13
tags: ["agents", "security"]
---

**Agent guardrails** are the limits on what an agent is allowed to do. The more capable an agent is, the more they matter. Good guardrails are what let autonomy increase over time instead of requiring step-by-step supervision.

## Layers

- **Sandboxing.** Run code in isolated environments (containers, microVMs) so mistakes stay contained.
- **Permissions.** Read-only actions run freely. Writes, deletions and anything public-facing need approval or an explicit policy. See [tools](tools.md).
- **Treating inputs as data.** Web pages, emails, tool results and [MCP](model-context-protocol.md) responses can contain text that looks like instructions. An agent that obeys what it reads is open to **prompt injection**. Fetched content should inform the agent, never command it.

## Related

[Agent loop](agent-loop.md): the harness that runs the loop is where guardrails are enforced.

## Sources

- [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md)

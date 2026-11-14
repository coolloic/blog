---
title: "Agent guardrails"
summary: "Sandboxing, permissions and input handling that bound what an agent can do."
category: concept
sources:
  - ../sources/anatomy-of-a-modern-ai-agent.md
  - ../sources/google-cloud-choose-agentic-design-pattern.md
lastmod: 2026-11-14
tags: ["agents", "security"]
---

**Agent guardrails** are the limits on what an agent is allowed to do. The more capable an agent is, the more they matter. Good guardrails are what let autonomy increase over time instead of requiring step-by-step supervision.

## Layers

- **Sandboxing.** Run code in isolated environments ([containers, microVMs](code-execution-sandboxes.md)) so mistakes stay contained.
- **Permissions.** Read-only actions run freely. Writes, deletions and anything public-facing need approval or an explicit policy. See [tools](tools.md).
- **Treating inputs as data.** Web pages, emails, tool results and [MCP](model-context-protocol.md) responses can contain text that looks like instructions. An agent that obeys what it reads is open to **[prompt injection](prompt-injection.md)**. Fetched content should inform the agent, never command it.

## Human-in-the-loop

At predefined checkpoints the agent [pauses for a person](human-in-the-loop.md) to approve, correct or supply input. This is the standard choice for high-stakes, safety-critical or subjective decisions, such as approving the release of a redacted health dataset. It improves safety at the cost of building and maintaining the review system ([Google Cloud](../sources/google-cloud-choose-agentic-design-pattern.md)).

For multi-agent systems, the same guide recommends controlling agent traffic, giving each agent [least-privilege identity](agent-authentication-and-authorization.md), and registering trusted tools and [subagents](subagents.md). It names Google products for each of these.

## Related

[Agent loop](agent-loop.md): the harness that runs the loop is where guardrails are enforced.

## Going deeper

- [Prompt injection](prompt-injection.md): direct and indirect injection, the lethal trifecta and the Agents Rule of Two.
- [Human-in-the-Loop](human-in-the-loop.md): approval gates, interrupts and escalation triggers in practice.
- [Code Execution Sandboxes](code-execution-sandboxes.md): isolation options, egress control and the sandbox vs approval-policy split.
- [Agent Authentication and Authorization](agent-authentication-and-authorization.md): scoped credentials and keeping secrets out of the model.
- [Guardrail tooling](guardrail-tooling.md): runtime input/output checks, including which paths (e.g. tool results) they skip.
- [LLM security risks](llm-security-risks.md): the wider threat model (OWASP LLM Top 10, data exfiltration, memory poisoning).
- [Computer-Use Agents](computer-use-agents.md): per-action approval and allowlists when the agent drives a screen.
- [PII and Data Privacy](pii-and-data-privacy.md): PII detection and redaction as a guardrail layer.

## Sources

- [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md)
- [Choose a design pattern for your agentic AI system (Google Cloud)](../sources/google-cloud-choose-agentic-design-pattern.md)

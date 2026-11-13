---
title: "Agent loop"
summary: "The core of every AI agent: a model choosing actions in a loop until the task is done."
category: concept
sources:
  - ../sources/anatomy-of-a-modern-ai-agent.md
  - ../sources/google-cloud-choose-agentic-design-pattern.md
lastmod: 2026-11-13
tags: ["agents"]
---

The **agent loop** is the minimal structure that makes a language model an agent. The model is called repeatedly. Each turn it either asks for one or more tool calls, which the harness executes and appends to the conversation, or it answers without calling a tool, which ends the loop.

```python
while True:
    response = model.generate(messages, tools=tools)
    messages.append(response)
    if not response.tool_calls:
        return response.text
    for call in response.tool_calls:
        messages.append(run(call))
```

## Key properties

- **No hard-coded control flow.** There is no separate planner or state machine. The model decides each next step.
- **The harness only executes.** It runs the requested [tools](tools.md), returns results, and enforces [guardrails](agent-guardrails.md).
- **Quality lives outside the loop.** How well the model chooses depends on its tools, its context ([context engineering](context-engineering.md)) and its ability to check results ([verification](verification-and-evals.md)).

> **Contradiction:** [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md) says agents have no hard-coded control flow. [Google Cloud's pattern guide](../sources/google-cloud-choose-agentic-design-pattern.md) treats predefined workflows (sequential, parallel, loop) as legitimate agent patterns that are cheaper and more predictable than letting a model decide. Synthesis: the open loop described here is the *model-orchestrated* case. Fixed workflows wrap agents in code-driven control flow. See [agent design patterns](agent-design-patterns.md).

**ReAct** is a named form of this loop in which the model explicitly writes a Thought before each Action and records each Observation. This makes its reasoning traceable, at the cost of latency.

## Related

[Tools](tools.md) · [Subagents](subagents.md), which nest the loop inside itself

## Sources

- [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md)
- [Choose a design pattern for your agentic AI system (Google Cloud)](../sources/google-cloud-choose-agentic-design-pattern.md)

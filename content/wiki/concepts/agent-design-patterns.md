---
title: "Agent design patterns"
summary: "Reusable architectures for arranging one or many agents, and how to choose between them."
category: concept
sources:
  - ../sources/google-cloud-choose-agentic-design-pattern.md
  - ../sources/anatomy-of-a-modern-ai-agent.md
lastmod: 2026-11-13
tags: ["agents", "patterns", "multi-agent"]
---

**Agent design patterns** are reusable architectures for organising an agentic system: how many agents there are, what each does, and **who decides what happens next**. That last point is the most useful way to tell them apart. In some patterns, code you wrote fixes the order of steps. In others, a model decides at runtime. Model-decided patterns adapt better but cost more calls, tokens and latency.

## Choosing a pattern

Start from the requirements, not the pattern:

1. **Task shape.** Are the steps known in advance, or open-ended? Does a model need to direct the work?
2. **Latency.** Is a fast, interactive response needed, or is a slower, more thorough result acceptable?
3. **Cost.** Can the budget support several model calls per request?
4. **Human judgment.** Are some decisions high-stakes, safety-critical or subjective?

If the task is predictable or fits in a single model call (summarising, translating, classifying), **don't use an agent at all**. Otherwise, **start with a single agent** and add structure only when a requirement forces it. Revisit the choice as the workload changes.

## The patterns

### Single agent

One model with a set of [tools](tools.md) and a detailed system prompt. It plans and picks tools itself: the plain [agent loop](agent-loop.md).
- **Use for:** multi-step tasks needing external data, and as the first version of any agent.
- **Watch for:** quality drops (wrong tool choice, failures, latency) as tools and responsibilities grow. That's the signal to move to ReAct or multi-agent.

### ReAct (reason and act)

A single agent that cycles explicitly through **Thought** (reason about the next step), **Action** (call a tool or answer) and **Observation** (record the result), until it reaches an answer, an iteration limit or an error.
- **Use for:** dynamic tasks that need continual re-planning.
- **Trade-off:** cheaper than multi-agent, and the reasoning trace helps debugging. But the loop adds latency, quality depends on the model's reasoning, and one bad tool result can mislead the final answer.

### Fixed workflows (code decides the order)

These [subagent](subagents.md) arrangements use predefined control flow with no model orchestration. They're cheaper, faster and predictable, but rigid.

| Pattern | Shape | Use for | Watch for |
|---|---|---|---|
| **Sequential** | A → B → C; each output feeds the next | Structured, repeatable pipelines (extract → clean → load) | Can't skip unneeded steps |
| **Parallel** | Fan out to agents running at once, then merge | Independent sub-tasks, or gathering several views quickly | Higher burst cost; merging conflicting results is hard |
| **Loop** | Repeat a sequence until an exit condition | Polling, self-correction | A bad exit condition means runaway cost |

Two loop variants focus on output quality:
- **Review and critique (generator–critic):** a generator drafts and a critic checks the draft against criteria (accuracy, format, safety), then approves it or sends it back. An example is a code generator paired with a security-auditor critic that runs tests. This is [verification](verification-and-evals.md) built into the architecture.
- **Iterative refinement:** one or more agents improve a shared result over several passes until it meets a quality bar or hits an iteration limit. Good for drafting, planning and debugging code.

### Dynamic orchestration (a model decides)

| Pattern | Shape | Use for | Watch for |
|---|---|---|---|
| **Coordinator** | A model routes each request to specialist agents | Varied inputs to a structured process (e.g. support: status, return, or refund) | Extra calls for every routing decision |
| **Hierarchical decomposition** | A root agent splits the task, sub-agents split further, workers execute | Ambiguous, open-ended work (research, planning) | Hard to design and debug; nested calls make it slow and costly |
| **Swarm** | Agents talk all-to-all, critique and hand off, with no central supervisor | Very complex problems that benefit from debate | The most complex and costly pattern; needs exit conditions to converge |

### Special requirements

- **Human-in-the-loop:** the agent pauses at set checkpoints for a person to approve, correct or add input. An example is a compliance officer approving a redacted dataset before release. It's one of the strongest [guardrails](agent-guardrails.md), at the cost of building the review system.
- **Custom logic:** your own code branches between other patterns. For example, a refund agent runs parallel checks, then branches to either a refund or a sequential store-credit flow. This is the most flexible option, but also the most work to build and maintain.

## Cross-cutting concerns

- **Cost and latency grow with every added agent, loop or cycle.** Most patterns trade extra model calls for quality.
- **Exit conditions are mandatory** for loop, refinement and swarm patterns: an iteration cap, a time limit or a goal.
- **Context per agent.** Isolate it, persist what later steps need, and compress large data. See [context engineering](context-engineering.md).
- **Synthesis:** the patterns compose. Real systems often nest them, for example a coordinator whose specialists run sequential or generator–critic loops. The custom-logic pattern is the general case of that.

## Sources

- [Choose a design pattern for your agentic AI system (Google Cloud)](../sources/google-cloud-choose-agentic-design-pattern.md): all 12 patterns, selection criteria and trade-offs
- [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md): the single agent loop and subagent trade-offs

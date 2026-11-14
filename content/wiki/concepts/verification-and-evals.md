---
title: "Verification and evals"
summary: "Feedback from outside the model, for the agent at runtime and for the builder over time."
category: concept
sources:
  - ../sources/anatomy-of-a-modern-ai-agent.md
  - ../sources/google-cloud-choose-agentic-design-pattern.md
lastmod: 2026-11-14
tags: ["agents", "evals"]
---

**Verification** gives an agent a feedback signal that doesn't come from the model itself, so it can check its work against reality. **Evals** do the same for the people building the agent.

## For the agent

Models are confident, which is not the same as correct. Effective agents check their output:

- [Coding agents](coding-agents.md) run tests, type checkers and linters, and read the errors.
- [Browser agents](computer-use-agents.md) take screenshots of what actually rendered.
- [Research agents](deep-research-agents.md) cite sources and re-read them.

An agent that can run the tests fixes its own bugs. One that can't ships them confidently.

## For the builder

[Evals](llm-evaluation.md) are a set of realistic tasks with checkable outcomes, run every time a prompt, [tool](tools.md) or model changes. Without them, every change is a guess.

## As architecture

The **review-and-critique** (generator–critic) pattern builds verification into the system: a separate critic agent checks output against criteria (often an [LLM-as-judge](llm-as-judge.md)), or runs tests, before it's accepted. Each revision cycle costs another model call. See [agent design patterns](agent-design-patterns.md).

Note: the Google Cloud pattern guide gives no evaluation guidance, so builder-side evals still rest on the agents post.

## Related

[Agent loop](agent-loop.md) · [Subagents](subagents.md)

## Going deeper

- [LLM Evaluation](llm-evaluation.md): graders, datasets and statistics for builder-side evals.
- [Agent Evaluation](agent-evaluation.md): trials, outcome vs trajectory grading, pass@k vs pass^k.
- [LLM-as-Judge](llm-as-judge.md): model graders and their biases (position, verbosity).
- [Error Analysis](error-analysis.md): reading traces to decide which evals to write.
- [Hallucination](hallucination.md): runtime checks such as chain-of-verification and existence checks.
- [LLM Observability](llm-observability.md): online evals and traces as the seed for eval datasets.
- [Benchmarks](benchmarks.md): public benchmarks and why they don't replace task-specific evals.
- [LLM Red Teaming](llm-red-teaming.md): adversarial testing as a complement to capability evals.

## Sources

- [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md)
- [Choose a design pattern for your agentic AI system (Google Cloud)](../sources/google-cloud-choose-agentic-design-pattern.md)

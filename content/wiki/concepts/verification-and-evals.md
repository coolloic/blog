---
title: "Verification and evals"
summary: "Feedback from outside the model, for the agent at runtime and for the builder over time."
category: concept
sources:
  - ../sources/anatomy-of-a-modern-ai-agent.md
  - ../sources/google-cloud-choose-agentic-design-pattern.md
lastmod: 2026-11-13
tags: ["agents", "evals"]
---

**Verification** gives an agent a feedback signal that doesn't come from the model itself, so it can check its work against reality. **Evals** do the same for the people building the agent.

## For the agent

Models are confident, which is not the same as correct. Effective agents check their output:

- Coding agents run tests, type checkers and linters, and read the errors.
- Browser agents take screenshots of what actually rendered.
- Research agents cite sources and re-read them.

An agent that can run the tests fixes its own bugs. One that can't ships them confidently.

## For the builder

Evals are a set of realistic tasks with checkable outcomes, run every time a prompt, [tool](tools.md) or model changes. Without them, every change is a guess.

## As architecture

The **review-and-critique** (generator–critic) pattern builds verification into the system: a separate critic agent checks output against criteria, or runs tests, before it's accepted. Each revision cycle costs another model call. See [agent design patterns](agent-design-patterns.md).

Note: the Google Cloud pattern guide gives no evaluation guidance, so builder-side evals still rest on the agents post.

## Related

[Agent loop](agent-loop.md) · [Subagents](subagents.md)

## Sources

- [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md)
- [Choose a design pattern for your agentic AI system (Google Cloud)](../sources/google-cloud-choose-agentic-design-pattern.md)

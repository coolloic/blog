---
title: "Source: How we built our multi-agent research system (Anthropic)"
summary: "Anthropic's engineering write-up of Claude Research: an orchestrator-worker system with a lead agent, parallel search subagents and a citation agent."
category: source
lastmod: 2026-11-14
tags: ["agents", "multi-agent", "research"]
---

- **What:** engineering blog post
- **Author / publisher:** Jeremy Hadfield, Barry Zhang, Kenneth Lien, Florian Scholz, Jeremy Fox, Daniel Ford (Anthropic)
- **Date:** 2025-06-13
- **Original:** [anthropic.com/engineering/multi-agent-research-system](https://www.anthropic.com/engineering/multi-agent-research-system)

## Summary

Describes the architecture behind Claude's Research feature, why a multi-agent design suits open-ended research, the prompting principles that made it work, how it was evaluated, and the production problems of running long, stateful agents.

## Key claims

- Research is path-dependent and open-ended, so a fixed pipeline cannot pre-plan the steps; agents that choose their next move fit better.
- Architecture: a lead agent (LeadResearcher) analyses the query, plans, and saves the plan to external memory (context past 200k tokens gets truncated); it spawns subagents with specific tasks; each subagent runs its own search loop and returns findings; the lead synthesises and decides whether to spawn more; a CitationAgent then maps claims in the report to sources.
- Contrasted with static RAG, which retrieves a fixed set of similar chunks once.
- Opus 4 lead with Sonnet 4 subagents beat single-agent Opus 4 by 90.2% on an internal research eval, with the biggest gain on breadth-first queries.
- On BrowseComp, token usage alone explained about 80% of performance variance; tool-call count and model choice explained most of the rest. Upgrading the model beat doubling the token budget.
- Cost: agents use roughly 4x the tokens of chat; multi-agent systems roughly 15x. Fits high-value, parallelisable tasks; coding is a weaker fit.
- Prompting principles: simulate the agent step by step; delegate with an objective, output format, tool guidance and boundaries (vague briefs caused duplicated work); scale effort to complexity (about 1 agent and 3-10 tool calls for simple facts, 10+ subagents for complex research); search broad then narrow; use extended thinking for planning and interleaved thinking in subagents.
- Parallelism: the lead spawns 3-5 subagents at once and subagents call 3+ tools in parallel, cutting research time by up to 90% on complex queries.
- A tool-testing agent that rewrote bad tool descriptions cut task time by 40%.
- Evaluation: start with about 20 real queries; grade outcomes, not paths; a single LLM-judge rubric (factual accuracy, citation accuracy, completeness, source quality, tool efficiency) scoring 0.0-1.0 plus pass/fail; human testers caught agents preferring SEO content farms over authoritative sources.
- Production: errors compound in long stateful runs, so the system resumes from checkpoints; full tracing for debugging; rainbow deployments; the lead waits synchronously for each subagent batch, which limits steering; subagents can write outputs to external storage and return references.

## Feeds

[Deep research agents](../concepts/deep-research-agents.md), [Web search APIs](../concepts/web-search-apis.md)

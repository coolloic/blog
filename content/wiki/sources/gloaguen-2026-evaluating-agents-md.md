---
title: "Source: Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents? (Gloaguen et al., 2026)"
summary: "ETH Zurich / LogicStar study finding that AGENTS.md-style context files do not generally raise coding-agent success and add over 20% inference cost."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "evaluation"]
---

- **What:** research paper (arXiv 2602.11988; ICLR 2026 listing)
- **Publisher:** Thibaud Gloaguen, Niels Mündler-Sasahara, Mark Niklas Müller, Veselin Raychev, Martin Vechev
- **Date:** v1 2026-02-12; v3 2026-09-29
- **Original:** [arXiv:2602.11988](https://arxiv.org/abs/2602.11988)

## Summary

Measures whether repository context files help coding agents, using SWE-bench tasks with LLM-generated files and a new set of issues from repositories that already commit developer-written files. The answer is mostly no: agents obey the files, which makes them do more work, but that extra work does not convert into more resolved tasks.

## Key claims

- Context files do not generally improve task success, across several agents and LLMs, for both LLM-generated and developer-written files.
- They increase inference cost by more than 20% on average.
- Agents do follow the instructions (more exploration, testing, reasoning), so the cost comes from compliance with unnecessary requirements.
- Repository overviews, despite being widely recommended, did not help agents find relevant files faster.
- Recommendation: keep human-written files to minimal, non-standard requirements, and evaluate any context file before relying on it.
- Secondary summaries of v1 reported a small loss for LLM-generated files and a small gain (around 4%) for developer-written ones; check the latest version before quoting numbers.

## Feeds

[Agent instruction files](../concepts/agent-instruction-files.md)

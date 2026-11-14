---
title: "Source: Harness engineering: leveraging Codex in an agent-first world (OpenAI, 2026)"
summary: "OpenAI post on building an internal product with Codex writing essentially all code, recasting the engineer's job as designing the environment, intent and feedback loops."
category: source
lastmod: 2026-11-14
tags: ["agents", "harness", "coding"]
---

- **What:** engineering blog post
- **Author:** Ryan Lopopolo
- **Publisher:** OpenAI
- **Date:** 2026-02-11
- **Original:** [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)

> **Note:** the original returned HTTP 403 to this wiki's fetcher. The claims below come from search-result excerpts of the original and from third-party summaries that agree with each other; figures marked *(secondary)* were not seen in the original text. Check the original before relying on exact numbers.

## Summary

A small OpenAI team built and shipped an internal product starting from an empty repository in late August 2025, with Codex agents writing the code and humans writing none of it. The bottleneck turned out to be the environment, not the agent's coding ability, so the engineers' work shifted to making the repository and running app legible to agents and to encoding taste as mechanical checks.

## Key claims

- Roughly one million lines of code over about five months; average throughput of 3.5 PRs per engineer per day, which rose as the team grew to seven engineers. Around 1,500 merged PRs *(secondary)*; the team started with three engineers *(secondary)*.
- The engineer's role moves from writing code to designing environments, specifying intent and building feedback loops.
- AGENTS.md is a short map (about 100 lines, *secondary*) pointing into a structured `docs/` directory: architecture, design docs, execution plans checked in as artifacts, product specs, references, and quality, reliability and security policies *(secondary)*.
- Architecture is enforced mechanically: a fixed layering (types, config, repo, service, runtime, UI, with cross-cutting concerns via providers, *secondary*) checked by custom linters and structural tests whose error messages carry remediation instructions for the agent.
- Application legibility: Chrome DevTools wired into the agent runtime so Codex can reproduce bugs, validate fixes and reason about UI; each worktree can boot its own app instance with logs, metrics and traces exposed to the agent *(secondary)*.
- Entropy control: a recurring doc-gardening agent and background agents that detect pattern drift and open small clean-up PRs *(secondary)*.
- Review is mostly agent-to-agent; human review is optional, merge gates are minimal *(secondary)*.

## Feeds

[Harness engineering](../concepts/harness-engineering.md)

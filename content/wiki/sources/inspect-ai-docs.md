---
title: "Source: Inspect documentation (UK AI Security Institute)"
summary: "Docs for Inspect, an open-source Python eval framework built on tasks, datasets, solvers and scorers, with agent and sandbox support."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "agents"]
---

- **What:** official framework documentation
- **Publisher:** UK AI Security Institute and Meridian Labs
- **Date:** accessed 2026-11-14
- **Original:** [inspect.aisi.org.uk](https://inspect.aisi.org.uk/) · [Scorers](https://inspect.aisi.org.uk/scorers.html)

## Summary

Inspect is a framework for frontier-model and agent evaluations. A `Task` combines a `Dataset` of samples (input, target), a `Solver` that produces the answer (one `generate()` call or a full agent), and a `Scorer`. Runs produce logs browsed with `inspect view`.

## Key claims

- CLI: `inspect eval file.py --model provider/model`; the Python `eval()` function is equivalent.
- Agents: a built-in `react()` agent, multi-agent primitives, and support for running external agents (Claude Code, Codex CLI, Gemini CLI).
- Sandboxing: `sandbox="docker"` runs untrusted model code in containers; Kubernetes, Modal and others via extensions.
- Built-in scorers: `match()`, `includes()`, `pattern()`, `answer()`, `choice()`, `exact()`, `f1()`, `model_graded_qa()`, `model_graded_fact()`; most report `accuracy` and `stderr` by default.
- Model-graded scorers accept custom templates and multiple grader models.
- A companion collection offers over 200 ready-to-run benchmark implementations.

## Feeds

[LLM evaluation](../concepts/llm-evaluation.md) · [Benchmarks](../concepts/benchmarks.md)

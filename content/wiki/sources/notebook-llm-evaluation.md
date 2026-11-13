---
title: "Source: Notebook: LLM Evaluation & Observability"
summary: "The owner's tutorial on eval datasets, offline graders, LLM-as-judge, online observability and the eval flywheel."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** tutorial page in the owner's Notebook
- **Author:** Loic (coolloic)
- **Date:** accessed 2026-11-14
- **Original:** [coolloic.github.io/Notebook/llm-evaluation.html](https://coolloic.github.io/Notebook/llm-evaluation.html)

## Summary

A practical introduction to proving an LLM app works: treat evaluation as a dataset problem, gate deploys with offline evals, monitor production with tracing and sampled online evals, and feed every failure back into the dataset.

## Key claims

- LLM evaluation is hard because outputs are open-ended, non-deterministic, prone to silent regressions on prompt or model changes, and compounding across agent steps.
- Start with 20-50 hand-labelled cases covering happy paths, hard cases, edge cases and every past failure; never let eval cases leak into few-shot prompts.
- Four grader families: exact/rule, reference-based similarity, LLM-as-judge, human.
- An offline harness loops over the dataset, grades, and fails CI if the pass rate drops below baseline minus a tolerance.
- LLM judges need a concrete rubric, a reason with each score, preference for pairwise comparison where possible, bias awareness, and validation against human labels.
- For RAG, separate retrieval quality (recall, MRR) from generation quality (groundedness given the retrieved chunks).
- Change one variable at a time and re-score against the baseline.
- Production observability: trace every request (full prompt, retrieved context, tool calls, model and params, output, latency, tokens, cost), with agent chains as nested spans.
- Online signals to watch: implicit feedback (retries, edits, thumbs, abandonment), sampled LLM-as-judge scores on live traffic, guardrail hits, and drift in latency, cost and refusal rate; ops metrics include latency p50/p95; alert on regressions.
- A prompt tweak or model upgrade can quietly break cases that used to work.

## Feeds

[LLM evaluation](../concepts/llm-evaluation.md) · [LLM-as-judge](../concepts/llm-as-judge.md) · [LLM observability](../concepts/llm-observability.md)

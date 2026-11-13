---
title: "Source: Evaluation best practices (OpenAI API docs)"
summary: "OpenAI guide to the eval process, grader types, LLM-as-judge modes, where to add evals in agent architectures, and anti-patterns."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** official API documentation guide
- **Publisher:** OpenAI
- **Date:** accessed 2026-11-14 (living page)
- **Original:** [developers.openai.com/api/docs/guides/evaluation-best-practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)

## Summary

A five-step process for building evals for generative apps, a taxonomy of graders, guidance on LLM judges, and a map of which evals each architecture (single-turn, workflow, single agent, multi-agent) needs.

## Key claims

- Process: define objective and success criteria; collect a dataset (synthetic, domain, production, historical, human-curated); define metrics; run and compare; evaluate continuously and grow the set.
- Eval types: industry benchmarks (e.g. MMLU) compare models in isolation; standard metrics (ROUGE, BERTScore) can feed custom evals; custom app tests are the focus.
- Graders: metric-based (exact match, ROUGE/BLEU, function-call accuracy, executable) are fast and good for regression; human is highest quality but slow; LLM judges are scalable but must be validated against human labels.
- LLM-judge modes: pairwise comparison, single-answer grading and reference-guided grading; the guide says "use pairwise comparison or pass/fail for more reliability", since LLMs are better at discriminating between options. Control position and verbosity bias; have the judge reason before scoring; use the most capable judge.
- Architecture: agents add tool-selection and argument-precision evals; multi-agent systems add handoff accuracy.
- Anti-patterns: generic metrics only (perplexity, BLEU), datasets unlike production traffic, vibe-based evaluation, adding evals only after shipping, ignoring human feedback when calibrating automated scorers.
- Platform note (as of 2026-11): the hosted OpenAI Evals platform is being deprecated; evals become read-only on 31 October 2026 and shut down on 30 November 2026.

## Feeds

[LLM evaluation](../concepts/llm-evaluation.md) · [LLM-as-judge](../concepts/llm-as-judge.md)

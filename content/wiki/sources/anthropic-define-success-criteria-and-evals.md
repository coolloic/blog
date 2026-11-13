---
title: "Source: Define success criteria and build evaluations (Claude docs)"
summary: "Anthropic docs on writing measurable success criteria, eval design principles, example eval types and tips for LLM-based grading."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** official documentation page (Test and evaluate section)
- **Publisher:** Anthropic
- **Date:** accessed 2026-11-14 (living page)
- **Original:** [platform.claude.com/docs/en/test-and-evaluate/develop-tests](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests)

## Summary

Frames prompt engineering as a define-test-refine loop: write specific, measurable, achievable, relevant success criteria, then build task-specific, automatable evals and grade them with the cheapest reliable method.

## Key claims

- Success criteria should be specific, measurable (even safety, e.g. a flagged-output rate), achievable and relevant; most apps need several dimensions (fidelity, consistency, tone, privacy, context use, latency, price).
- Design principles: mirror the real task distribution including edge cases; automate grading where possible; prefer more automatically graded questions over fewer hand-graded ones.
- Example eval types: exact match (sentiment labels), cosine similarity across paraphrases (consistency), ROUGE-L (summaries), LLM Likert (tone), LLM binary (PHI detection).
- Grader order of preference: code-based (fastest, most reliable, lacks nuance), then LLM-based (fast, flexible, test reliability first), then human (flexible, slow, expensive; avoid if possible).
- LLM-grading tips: detailed rubrics, constrained outputs (correct/incorrect or a 1-5 scale), and let the grader reason (thinking on) before scoring.
- Use a different model as grader than the one that produced the output, to reduce self-grading bias.

## Feeds

[LLM evaluation](../concepts/llm-evaluation.md) · [LLM-as-judge](../concepts/llm-as-judge.md)

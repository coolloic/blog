---
title: "Source: Who Validates the Validators? (Shankar et al., 2024)"
summary: "HCI paper on EvalGen and 'criteria drift': grading outputs changes what people think the criteria should be."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** research paper, arXiv:2404.12272 (UIST 2024)
- **Authors:** Shreya Shankar, J.D. Zamfirescu-Pereira, Björn Hartmann, Aditya G. Parameswaran, Ian Arawjo
- **Date:** 18 April 2024
- **Original:** [arxiv.org/abs/2404.12272](https://arxiv.org/abs/2404.12272)

## Summary

LLM-generated evaluators inherit the flaws of the models they judge, so humans must validate them. EvalGen proposes criteria, generates candidate implementations (Python assertions and LLM grader prompts), and picks those that best agree with a small set of human grades.

## Key claims

- **Criteria drift:** people need criteria to grade outputs, but grading outputs is how they discover the criteria; criteria change as they work.
- Some criteria are output-dependent: they only become visible after looking at real outputs, which undermines defining an eval entirely up front.
- Alignment of evaluators to human preference is subjective and iterative; tools should support refining criteria over time.

## Feeds

[LLM-as-judge](../concepts/llm-as-judge.md) · [LLM evaluation](../concepts/llm-evaluation.md)

---
title: "Source: Using LLM-as-a-Judge for evaluation (Hamel Husain)"
summary: "Practitioner guide to 'critique shadowing': building a binary LLM judge aligned to one domain expert's pass/fail critiques."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** practitioner blog post
- **Author:** Hamel Husain
- **Date:** 29 October 2024 (updated 1 September 2026)
- **Original:** [hamel.dev/blog/posts/llm-judge](https://hamel.dev/blog/posts/llm-judge/)

## Summary

A step-by-step method for building an LLM judge that agrees with the person whose judgment defines success: collect that expert's pass/fail labels with written critiques, use them as few-shot examples, iterate the judge prompt until it agrees, then use it for error analysis.

## Key claims

- Find the one or two principal domain experts; developers should not stand in for them.
- Build the dataset along dimensions (features, scenarios, personas); synthetic user inputs are fine, system responses are real.
- Use binary pass/fail plus a detailed critique, not Likert scales: nobody can say what separates a 3 from a 4, and such scores often do not track expert judgment.
- Iterate the judge prompt by hand and track agreement; the Honeycomb example passed 90% agreement in three iterations, on roughly balanced data (about 50% failures).
- Raw agreement misleads on imbalanced data: if 5% of outputs fail, an always-pass judge scores 95%. Report true positive and true negative rates separately.
- Sizing: start with about 30 examples; below about 60 the confidence intervals are too wide; aim for about 100 per failure mode; split labels roughly 10-20% train, 40-45% dev, 40-45% test.
- Add specialized judges only after this, and use code assertions where they suffice.

## Feeds

[LLM-as-judge](../concepts/llm-as-judge.md) · [LLM evaluation](../concepts/llm-evaluation.md)

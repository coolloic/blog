---
title: "Source: Humanity's Last Exam (Phan et al., 2025)"
summary: "2,500-question expert-written multimodal benchmark at the frontier of human knowledge, reporting accuracy and calibration error."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** research paper, arXiv:2501.14249, plus the project site
- **Authors:** Long Phan, Alice Gatti, ..., Alexandr Wang, Dan Hendrycks (Center for AI Safety and Scale AI, about 1,100 contributors)
- **Date:** 24 January 2025 (v12 19 October 2026); dataset finalized 3 April 2025
- **Original:** [arxiv.org/abs/2501.14249](https://arxiv.org/abs/2501.14249) · [lastexam.ai](https://lastexam.ai/)

## Summary

Built because popular benchmarks such as MMLU had saturated. Subject experts wrote hard, closed-ended questions (multiple-choice and exact short answer) across over a hundred subjects, designed for automated grading.

## Key claims

- 2,500 public questions across mathematics, humanities, natural sciences and more; multimodal (some questions include images).
- Closed-ended formats allow automatic grading; the leaderboard uses an LLM (o3-mini) to judge answer equivalence.
- A private held-out set is kept to detect overfitting to the public questions.
- The leaderboard reports **calibration error** alongside accuracy: frontier models are confidently wrong.
- Published in Nature (28 January 2026). Variants: HLE-Rolling (8 October 2025) and HLE-Diamond (22 September 2026).
- Site leaderboard (snapshot read 2026-11-14; it has not added models released after Gemini 3 Pro, so it understates the current frontier): Gemini 3 Pro 38.3% accuracy / 57.2% calibration error; GPT-5 25.3% / 50.0%; Grok 4 24.5%; Claude 4.5 Sonnet 13.7%; GPT-4o 2.7%.

## Feeds

[Benchmarks](../concepts/benchmarks.md)

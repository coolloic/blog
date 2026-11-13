---
title: "Source: Wei et al. 2025: BrowseComp"
summary: "OpenAI benchmark of 1,266 hard-to-find, easy-to-verify questions for browsing agents, showing deep research far ahead of browsing chat models and gains from more test-time compute."
category: source
lastmod: 2026-11-14
tags: ["agents", "benchmarks", "research"]
---

- **What:** research paper, arXiv:2504.12516
- **Author:** Jason Wei, Zhiqing Sun, Spencer Papay, Scott McKinney, Jeffrey Han, Isa Fulford, Hyung Won Chung, Alex Tachard Passos, William Fedus, Amelia Glaese (OpenAI)
- **Date:** 2025-04-16
- **Original:** [arXiv:2504.12516](https://arxiv.org/abs/2504.12516)

## Summary

BrowseComp measures whether an agent can persistently and creatively search the web for entangled facts. Answers are short, so grading is simple, which the authors liken to competitive programming for coding agents.

## Key claims

- 1,266 questions; does not test long-form answers or ambiguous queries.
- Accuracy: GPT-4o 0.6%, GPT-4o with browsing 1.9%, GPT-4.5 0.9%, o1 9.9%, Deep Research 51.5% (Deep Research was trained on data targeting such tasks).
- Calibration is poor: Deep Research's calibration error was 91%.
- Human trainers gave up on 70.8% of attempted questions after two hours; of the 29.2% they solved, 86.4% matched the reference.
- Deep Research accuracy rises smoothly with more browsing effort (test-time compute).
- Sampling 64 answers and aggregating (majority vote, confidence-weighted vote, best-of-N) improved accuracy by roughly 15-25%; best-of-N by the model's own confidence did best.
- Synthesis: plain browsing barely helps a non-agentic model; the gain comes from trained, persistent multi-step search.

## Feeds

[Deep research agents](../concepts/deep-research-agents.md)

---
title: "Source: OpenAI Deep Research System Card"
summary: "OpenAI's February 2025 system card for deep research: an o3 variant trained with RL on browsing tasks, and its prompt-injection and exfiltration mitigations."
category: source
lastmod: 2026-11-14
tags: ["agents", "research", "openai", "safety"]
---

- **What:** model system card (PDF)
- **Author / publisher:** OpenAI
- **Date:** 2025-02-25
- **Original:** [cdn.openai.com/deep-research-system-card.pdf](https://cdn.openai.com/deep-research-system-card.pdf)

## Summary

Explains how ChatGPT's deep research was trained and what safety risks browsing added. Read for pages 1-4 (introduction, training, prompt injection).

## Key claims

- Deep research is powered by an early version of o3 optimised for web browsing; it searches, reads text, images and PDFs, pivots on what it finds, and can run Python on data.
- Trained with reinforcement learning on new browsing datasets: searching, clicking, scrolling, reading files, using a sandboxed Python tool, and synthesising many sites.
- Training tasks range from auto-gradable ones with ground-truth answers to open-ended ones graded against rubrics by a chain-of-thought grader model.
- ChatGPT uses a second o3-mini model to summarise chains of thought.
- Prompt injection in browsed pages can cause two harms: wrong answers (for example recommending the wrong product) and data exfiltration (for example leaking an API key from context through a network request).
- Mitigations: safety training data against injections, plus a system-level rule that the agent cannot navigate to or construct arbitrary URLs.

## Feeds

[Deep research agents](../concepts/deep-research-agents.md)

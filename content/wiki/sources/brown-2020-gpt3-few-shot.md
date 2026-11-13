---
title: "Source: Language Models are Few-Shot Learners (GPT-3)"
summary: "Brown et al. (2020): a 175B-parameter model performs many tasks from in-context demonstrations alone, with no gradient updates."
category: source
lastmod: 2026-11-14
tags: ["prompting", "paper"]
---

- **What:** research paper (NeurIPS 2020), arXiv:2005.14165
- **Authors:** Tom B. Brown, Benjamin Mann, Nick Ryder and 28 others (OpenAI)
- **Date:** v1 2020-05-28, v4 2020-07-22
- **Original:** [arXiv:2005.14165](https://arxiv.org/abs/2005.14165)

## Summary

The GPT-3 paper. It established in-context learning as a paradigm: specify a task and a few demonstrations in the prompt text, and a large enough model performs the task without fine-tuning. It compares zero-shot (instruction only), one-shot and few-shot settings.

## Key claims

- GPT-3 has 175B parameters, about 10x larger than any previous non-sparse language model.
- Tasks and demonstrations are given purely as text; no gradient updates or fine-tuning.
- Scaling substantially improves task-agnostic few-shot performance, sometimes near prior fine-tuned state of the art.
- Few-shot still struggles on some datasets; web-scale training raises data-contamination concerns.

## Feeds

[Few-shot prompting](../concepts/few-shot-prompting.md) · [Prompt engineering](../concepts/prompt-engineering.md)

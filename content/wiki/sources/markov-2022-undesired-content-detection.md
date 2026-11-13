---
title: "Source: A Holistic Approach to Undesired Content Detection in the Real World"
summary: "OpenAI's AAAI-23 paper on building a production moderation classifier: taxonomy, labelling quality, active learning for rare events, robustness."
category: source
lastmod: 2026-11-14
tags: ["security", "moderation", "papers", "openai"]
---

- **What:** research paper (arXiv:2208.03274), AAAI-23 oral
- **Authors:** Todor Markov, Chong Zhang, Sandhini Agarwal, Tyna Eloundou, Teddy Lee, Steven Adler, Angela Jiang, Lilian Weng (OpenAI)
- **Date:** 5 August 2022 (v2 14 February 2023)
- **Original:** [arxiv.org/abs/2208.03274](https://arxiv.org/abs/2208.03274)

## Summary

The paper describes the end-to-end recipe behind OpenAI's moderation classifier. Its main argument is that model architecture matters less than the surrounding process: a precise taxonomy, consistent labelling, and data collection aimed at rare harmful events.

## Key claims

- Categories covered: sexual, hateful, violence, self-harm, harassment.
- Success depends on taxonomy and labelling-instruction design, data-quality control, an active-learning pipeline to surface rare events, and techniques that improve robustness and reduce overfitting.
- The approach generalises to other taxonomies and beats off-the-shelf classifiers.

## Feeds

[Content moderation](../concepts/content-moderation.md)

---
title: "Source: Self-Instruct (Wang et al., 2022)"
summary: "The paper that bootstrapped 52K instructions from 175 human seed tasks using GPT-3 itself, establishing the template for LLM-generated instruction data."
category: source
lastmod: 2026-11-14
tags: ["training", "data"]
---

- **What:** research paper (arXiv:2212.10560, ACL 2023)
- **Author:** Yizhong Wang, Yeganeh Kordi, Swaroop Mishra, Alisa Liu, Noah A. Smith, Daniel Khashabi, Hannaneh Hajishirzi
- **Date:** 2022-12-20 (v2 2023-05-25)
- **Original:** [arXiv:2212.10560](https://arxiv.org/abs/2212.10560)

## Summary

Self-Instruct has a language model write new task instructions, inputs and outputs from a small human seed set. It filters out invalid and near-duplicate generations, then fine-tunes the same model on what remains. Applied to vanilla GPT-3, it brought instruction following close to InstructGPT-001.

## Key claims

- Starts from 175 human-written seed tasks. Each generation prompt shows 8 in-context instructions (6 human, 2 model-generated).
- Steps: (1) generate instructions; (2) classify whether each is a classification task; (3) generate instances, output-first for classification (to avoid label imbalance) and input-first otherwise; (4) filter.
- Filtering: keep a new instruction only if its ROUGE-L similarity to every existing one is below 0.7. Drop instructions that mention images or graphs, which a text model cannot handle, and drop duplicate or heuristically invalid instances.
- Output: about 52K instructions and 82K instances from GPT-3 davinci, for roughly $600 in generation and $338 in fine-tuning.
- Expert audit of 200 samples: 92% valid instructions, 79% appropriate inputs, 58% correct outputs, and only 54% with every field valid. Noisy data still helped.
- Result: +33% absolute on Super-NaturalInstructions over vanilla GPT-3, on par with InstructGPT-001. In human evaluation on novel tasks it trailed InstructGPT-001 by 5 points.

## Feeds

[Synthetic data generation](../concepts/synthetic-data-generation.md)

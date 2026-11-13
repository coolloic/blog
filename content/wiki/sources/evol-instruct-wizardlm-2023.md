---
title: "Source: WizardLM / Evol-Instruct (Xu et al., 2023)"
summary: "Microsoft paper that uses an LLM to rewrite seed instructions into progressively harder ones (Evol-Instruct) to build complex instruction data."
category: source
lastmod: 2026-11-14
tags: ["training", "data"]
---

- **What:** research paper (arXiv:2304.12244, ICLR 2024)
- **Author:** Can Xu, Qingfeng Sun, Kai Zheng, Xiubo Geng, Pu Zhao, Jiazhan Feng, Chongyang Tao, Qingwei Lin, Daxin Jiang
- **Date:** 2023-04-24 (v3 2025-05-27)
- **Original:** [arXiv:2304.12244](https://arxiv.org/abs/2304.12244)

## Summary

Human-written instruction data skews easy. Evol-Instruct starts from seed instructions and has an LLM rewrite them step by step into more complex ones. The evolved data, mixed together, is used to fine-tune LLaMA into WizardLM.

## Key claims

- An LLM, not human annotators, raises instruction complexity through iterative rewriting.
- Human evaluators rated Evol-Instruct instructions above human-created ones.
- On the high-complexity part of the test set, evaluators preferred WizardLM's outputs to ChatGPT's.
- In GPT-4 automatic evaluation, WizardLM reached over 90% of ChatGPT's capability on 17 of 29 skills, while still trailing in some areas.

## Feeds

[Synthetic data generation](../concepts/synthetic-data-generation.md)

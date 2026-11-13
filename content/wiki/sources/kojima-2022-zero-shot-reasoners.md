---
title: "Source: Large Language Models are Zero-Shot Reasoners"
summary: "Kojima et al. (2022): appending \"Let's think step by step\" elicits chain-of-thought reasoning without any exemplars."
category: source
lastmod: 2026-11-14
tags: ["prompting", "reasoning", "paper"]
---

- **What:** research paper (NeurIPS 2022), arXiv:2205.11916
- **Authors:** Takeshi Kojima, Shixiang Shane Gu, Machel Reid, Yutaka Matsuo, Yusuke Iwasawa
- **Date:** v1 2022-05-24, v4 2023-01-29
- **Original:** [arXiv:2205.11916](https://arxiv.org/abs/2205.11916)

## Summary

Shows that CoT does not require hand-written exemplars: a single trigger phrase placed before the answer makes large models reason step by step ("Zero-shot-CoT"). The method uses two calls: one to extract reasoning, one to extract a formatted answer.

## Key claims

- With text-davinci-002, Zero-shot-CoT raised MultiArith accuracy from 17.7% to 78.7% and GSM8K from 10.4% to 40.7%; similar gains with PaLM 540B.
- Two-stage prompting: (1) "Q: … A: Let's think step by step." produces a reasoning passage; (2) the prompt plus reasoning plus an answer trigger (e.g. "Therefore, among A through E, the answer is") yields a parseable answer.
- Gains grow sharply with model size; small models do not benefit.
- Zero-shot-CoT generally underperforms carefully crafted few-shot CoT, showed no gains on commonsense tasks, and is sensitive to the trigger wording.

## Feeds

[Chain-of-thought](../concepts/chain-of-thought.md)

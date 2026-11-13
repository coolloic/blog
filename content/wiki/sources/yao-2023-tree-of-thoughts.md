---
title: "Source: Tree of Thoughts: Deliberate Problem Solving with Large Language Models"
summary: "Yao et al. (2023): generalise CoT into a search over a tree of intermediate thoughts with self-evaluation, lookahead and backtracking."
category: source
lastmod: 2026-11-14
tags: ["prompting", "reasoning", "paper"]
---

- **What:** research paper (NeurIPS 2023), arXiv:2305.10601
- **Authors:** Shunyu Yao, Dian Yu, Jeffrey Zhao, Izhak Shafran, Thomas L. Griffiths, Yuan Cao, Karthik Narasimhan
- **Date:** v1 2023-05-17, v2 2023-12-03
- **Original:** [arXiv:2305.10601](https://arxiv.org/abs/2305.10601)

## Summary

Left-to-right token generation cannot explore alternatives or undo early mistakes. Tree of Thoughts (ToT) frames problem solving as search: the LM proposes candidate "thoughts" (coherent intermediate steps), the LM evaluates them, and a classic search algorithm decides which to expand.

## Key claims

- Four design choices: thought decomposition (size of a step: words, an equation, a paragraph plan); thought generator (sample i.i.d. thoughts, or propose several in one prompt for constrained spaces); state evaluator (value each state, e.g. sure/maybe/impossible, or vote across states); search (BFS keeping the best *b* states per level, or DFS with pruning and backtracking).
- Game of 24 with GPT-4: IO 7.3%, CoT 4.0%, CoT-SC 9.0%, ToT (b=1) 45%, ToT (b=5) 74%.
- Cost: roughly $0.74 per Game-of-24 case (5.5k generated tokens) vs $0.47 for CoT best-of-100; ToT can need 5–100x more generated tokens than CoT.
- Limitations stated: may be unnecessary for tasks the model already handles; only three toy tasks tested; higher API cost.

## Feeds

[Chain-of-thought](../concepts/chain-of-thought.md)

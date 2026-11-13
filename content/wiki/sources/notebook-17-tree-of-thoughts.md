---
title: "Source: Notebook experiment 17-tree-of-thoughts (Tree of Thoughts)"
summary: "The owner's runnable LangChain experiment demonstrating Tree of Thoughts."
category: source
lastmod: 2026-11-14
tags: ["prompting", "notebook", "reasoning"]
---

- **What:** runnable experiment (Python, LangChain LCEL, LangSmith tracing) in the owner's Notebook repo
- **Author:** Loic
- **Date:** accessed 2026-11-14
- **Original:** [experiments/17-tree-of-thoughts](https://github.com/coolloic/Notebook/tree/main/experiments/17-tree-of-thoughts)

## Summary

Branch into candidate reasoning steps, score them, expand the best: search over a tree rather than one chain. The experiment is a simplified beam search: at each depth a proposer model suggests K next steps, a scorer model rates them, the best are kept for DEPTH levels, then the model answers.

## Key claims

- When to use: Problems needing exploration or backtracking (puzzles, planning, constraint satisfaction) where a single chain gets stuck.

## Feeds

[Chain-of-thought](../concepts/chain-of-thought.md)

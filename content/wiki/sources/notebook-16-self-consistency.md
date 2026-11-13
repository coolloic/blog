---
title: "Source: Notebook experiment 16-self-consistency (Self-Consistency)"
summary: "The owner's runnable LangChain experiment demonstrating Self-Consistency."
category: source
lastmod: 2026-11-14
tags: ["prompting", "notebook", "reasoning"]
---

- **What:** runnable experiment (Python, LangChain LCEL, LangSmith tracing) in the owner's Notebook repo
- **Author:** Loic
- **Date:** accessed 2026-11-14
- **Original:** [experiments/16-self-consistency](https://github.com/coolloic/Notebook/tree/main/experiments/16-self-consistency)

## Summary

Sample several CoT solutions and majority-vote their final answers. The experiment runs the CoT chain N=5 times at non-zero temperature, extracts each `Answer:` and returns the most common one.

## Key claims

- When to use: Problems with a single verifiable answer (maths, logic) where one chain sometimes slips; trades extra tokens for reliability.

## Feeds

[Chain-of-thought](../concepts/chain-of-thought.md)

---
title: "Source: Notebook experiment 15-chain-of-thought (Chain-of-Thought)"
summary: "The owner's runnable LangChain experiment demonstrating Chain-of-Thought."
category: source
lastmod: 2026-11-14
tags: ["prompting", "notebook", "reasoning"]
---

- **What:** runnable experiment (Python, LangChain LCEL, LangSmith tracing) in the owner's Notebook repo
- **Author:** Loic
- **Date:** accessed 2026-11-14
- **Original:** [experiments/15-chain-of-thought](https://github.com/coolloic/Notebook/tree/main/experiments/15-chain-of-thought)

## Summary

Prompt the model to reason step by step in one call, no tools or loop. The experiment is a single LangChain LCEL chain that asks for step-by-step working ending in `Answer: <result>`.

## Key claims

- When to use: Multi-step arithmetic, logic or planning where a direct answer is error-prone; the cheapest reasoning upgrade to try before agents.

## Feeds

[Chain-of-thought](../concepts/chain-of-thought.md)

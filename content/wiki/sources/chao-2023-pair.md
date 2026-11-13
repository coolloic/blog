---
title: "Source: Jailbreaking Black Box Large Language Models in Twenty Queries (PAIR)"
summary: "Chao et al. (2023): an attacker LLM iteratively refines semantic jailbreak prompts against a black-box target, often in under 20 queries."
category: source
lastmod: 2026-11-14
tags: ["security", "jailbreaks", "paper"]
---

- **What:** research paper, arXiv:2310.08419
- **Authors:** Patrick Chao, Alexander Robey, Edgar Dobriban, Hamed Hassani, George J. Pappas, Eric Wong
- **Date:** 2023-10-12 (v4 2024-07-18)
- **Original:** [arXiv:2310.08419](https://arxiv.org/abs/2310.08419)

## Summary

PAIR (Prompt Automatic Iterative Refinement) uses one LLM as an attacker that proposes a jailbreak, reads the target's response, and refines the prompt, inspired by social engineering. It needs only black-box access and produces human-readable prompts.

## Key claims

- Often finds a jailbreak in fewer than twenty queries, orders of magnitude more efficient than token-level search.
- Competitive success and transferability on GPT-3.5/4, Vicuna and Gemini.

## Feeds

[Jailbreaks](../concepts/jailbreaks.md)

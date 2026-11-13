---
title: "Source: Red Teaming Language Models with Language Models"
summary: "Perez et al. (DeepMind, Feb 2022): use one LM to generate test cases and a classifier to grade a target LM, from zero-shot prompting to RL-trained red LMs."
category: source
lastmod: 2026-11-14
tags: ["security", "red-teaming", "paper"]
---

- **What:** research paper, arXiv:2202.03286
- **Authors:** Ethan Perez, Saffron Huang, Francis Song, Trevor Cai, Roman Ring, John Aslanides, Amelia Glaese, Nat McAleese, Geoffrey Irving
- **Date:** 2022-02-07
- **Original:** [arXiv:2202.03286](https://arxiv.org/abs/2202.03286)

## Summary

The founding paper for automated LLM red teaming: an attacker LM writes test prompts, the target answers, and an offensive-content classifier scores the replies. The attacker ranges from zero-shot and few-shot prompting to supervised and reinforcement-learned generators, trading off diversity against difficulty.

## Key claims

- Found tens of thousands of offensive replies from a 280B-parameter chatbot.
- Surfaced groups the chatbot discussed offensively, phone numbers it emitted as its own contact details, leakage of private training data, and harms that only emerge over a multi-turn conversation.
- Prompt engineering the red LM redirects it to other harm types.

## Feeds

[LLM red teaming](../concepts/llm-red-teaming.md)

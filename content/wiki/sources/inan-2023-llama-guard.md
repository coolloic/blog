---
title: "Source: Llama Guard: LLM-based Input-Output Safeguard for Human-AI Conversations"
summary: "Meta's December 2023 paper introducing Llama Guard, an instruction-tuned Llama 2 7B that classifies prompts and responses against a taxonomy given in the prompt."
category: source
lastmod: 2026-11-14
tags: ["security", "moderation", "papers", "meta"]
---

- **What:** research paper (arXiv:2312.06674)
- **Authors:** Hakan Inan, Kartikeya Upasani and 9 co-authors (Meta)
- **Date:** 7 December 2023
- **Original:** [arxiv.org/abs/2312.06674](https://arxiv.org/abs/2312.06674)

## Summary

Llama Guard reframes content moderation as an instruction-following task: an LLM is given a safety taxonomy and a conversation, and generates whether the user prompt (prompt classification) or the agent response (response classification) is safe, and if not which categories it violates. Because the taxonomy lives in the prompt, it can be changed at inference time.

## Key claims

- Base model: Llama 2 7B, instruction-tuned on a small, high-quality dataset collected by the authors.
- Separate tasks for prompt and response classification over the same taxonomy.
- It performs multi-class classification (which categories are violated) and also yields binary safe/unsafe decision scores.
- Matches or exceeds existing moderation tools on the OpenAI Moderation Evaluation set and ToxicChat.
- New taxonomies can be supplied zero-shot or few-shot at inference, or adopted by further fine-tuning.
- Weights released openly.

## Feeds

[Content moderation](../concepts/content-moderation.md) · [Guardrail tooling](../concepts/guardrail-tooling.md)

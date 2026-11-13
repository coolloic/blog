---
title: "Source: Towards Understanding Sycophancy in Language Models (Anthropic)"
summary: "Anthropic paper showing five production assistants are sycophantic and tracing it partly to human preference data and preference models."
category: source
lastmod: 2026-11-14
tags: ["models", "alignment"]
---

- **What:** research paper (arXiv:2310.13548), ICLR 2024
- **Authors:** Mrinank Sharma, Meg Tong, Tomasz Korbak, ... Ethan Perez (Anthropic and collaborators)
- **Date:** 20 October 2023 (v4 10 May 2025)
- **Original:** [arxiv.org/abs/2310.13548](https://arxiv.org/abs/2310.13548)

## Summary

Sycophancy is a model telling users what they want to hear rather than what is true. The paper measures it across five state-of-the-art assistants on four free-form tasks (e.g. giving biased feedback on text the user says they like, abandoning correct answers when challenged, conforming to user beliefs, copying user mistakes). It then examines preference data and finds the training signal itself favours agreement.

## Key claims

- All five assistants were consistently sycophantic across the four tasks.
- In existing human preference data, a response matching the user's stated views is more likely to be preferred.
- Humans and preference models sometimes prefer a convincingly written sycophantic answer over a correct one.
- Optimising against a preference model can trade truthfulness for sycophancy.
- Conclusion: sycophancy is a general property of RLHF-trained assistants, driven in part by human preference judgements.

## Feeds

[LLM limitations](../concepts/llm-limitations.md) · [Hallucination](../concepts/hallucination.md)

---
title: "Source: A Survey on Hallucination in Large Language Models (Huang et al.)"
summary: "ACM TOIS survey giving the standard factuality/faithfulness taxonomy of LLM hallucination, its causes, detection and mitigation."
category: source
lastmod: 2026-11-14
tags: ["models", "hallucination"]
---

- **What:** survey paper (arXiv:2311.05232), accepted by ACM Transactions on Information Systems
- **Authors:** Lei Huang, Weijiang Yu, Weitao Ma, et al. (Harbin Institute of Technology and Huawei)
- **Date:** v1 9 November 2023; v2 19 November 2024
- **Original:** [arxiv.org/abs/2311.05232](https://arxiv.org/abs/2311.05232)

## Summary

The most widely used taxonomy of LLM hallucination. It splits hallucination into **factuality** errors (output conflicts with, or cannot be verified against, world facts) and **faithfulness** errors (output diverges from the user's instructions, the supplied context, or itself). It organises causes by where they enter the pipeline (data, training, inference) and catalogues detection and mitigation methods, including the limits of retrieval augmentation.

## Key claims

- **Factuality hallucination:** factual contradiction (entity errors, relation errors) and factual fabrication (unverifiable claims, overclaims).
- **Faithfulness hallucination:** instruction inconsistency, context inconsistency, logical inconsistency.
- **Causes from data:** misinformation and biases in pretraining data (imitative falsehoods); knowledge boundaries (long-tail, out-of-date and copyright-restricted knowledge); SFT data that teaches facts beyond what pretraining gave the model can increase hallucination.
- **Causes from training:** architectural limits such as unidirectional modelling and attention dilution; exposure bias (training on gold prefixes, generating from own prefixes); alignment that forces answers beyond the model's knowledge; RLHF belief misalignment, including sycophancy.
- **Causes from inference:** sampling randomness (worse at high temperature), over-attention to recent generated tokens over the source, the softmax bottleneck, reasoning failures such as the reversal curse.
- **Detection:** fact-checking against external or internal knowledge; uncertainty estimation from internal states (token probability, entropy) or behaviour (self-consistency, cross-examination); for faithfulness, n-gram/entity overlap, entailment classifiers, QA-based checks and LLM judges.
- **Mitigation:** data filtering, model editing, retrieval augmentation; training-side fixes; factuality- and faithfulness-enhanced decoding.

## Feeds

[Hallucination](../concepts/hallucination.md) · [LLM limitations](../concepts/llm-limitations.md)

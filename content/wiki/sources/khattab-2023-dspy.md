---
title: "Source: DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines (Khattab et al., 2023)"
summary: "The paper introducing DSPy: LM pipelines as text-transformation graphs of parameterized declarative modules, optimized by a compiler against a metric."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "prompting"]
---

- **What:** research paper (arXiv 2310.03714; later ICLR 2024)
- **Authors:** Omar Khattab, Arnav Singhvi, Paridhi Maheshwari, et al., incl. Matei Zaharia and Christopher Potts (Stanford)
- **Date:** submitted 2023-10-05
- **Original:** [arxiv.org/abs/2310.03714](https://arxiv.org/abs/2310.03714)

## Summary

The paper argues that LM pipelines built from hand-tuned prompt templates are brittle and proposes DSPy: pipelines are imperative computational graphs whose LM calls go through declarative, parameterized modules. Modules learn by collecting demonstrations, and a compiler optimizes the whole pipeline for a given metric.

## Key claims

- LM pipelines are abstracted as text transformation graphs; modules are parameterized and can learn compositions of prompting, fine-tuning, augmentation and reasoning techniques.
- A compiler optimizes any DSPy pipeline to maximize a metric.
- In case studies (math word problems, multi-hop retrieval, complex QA, agent loops), compiled programs beat standard few-shot prompting by generally over 25% (GPT-3.5) and 65% (llama2-13b-chat), and expert-demonstration pipelines by up to 5 to 46% and 16 to 40% respectively.
- Programs compiled to small open models (770M T5, llama2-13b-chat) were competitive with expert-written prompt chains on proprietary GPT-3.5.

## Feeds

[DSPy](../concepts/dspy.md)

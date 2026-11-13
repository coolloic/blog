---
title: "Source: Fine-tuning vs RAG vs Prompting (Notebook)"
summary: "The owner's tutorial on choosing between prompting, RAG and fine-tuning to adapt an LLM."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** tutorial in the owner's Notebook
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [Fine-tuning vs RAG vs Prompting — Which & When](https://coolloic.github.io/Notebook/finetune-rag-prompt.html)

## Summary

A decision guide that frames prompting, retrieval-augmented generation and fine-tuning as three levers with different jobs. Prompting changes how you ask, RAG changes what the model can see at query time, and fine-tuning changes how the model behaves. It recommends adopting them in order of effort and combining them in mature systems.

## Key claims

- Use RAG for knowledge (private, changing facts) and fine-tuning for behaviour (style, format, a niche task).
- Fine-tuning is a poor way to inject facts: baked-in facts go stale and the model can still hallucinate.
- Fine-tuning needs a quality labelled dataset (often hundreds to thousands of examples), a training pipeline and evals, and risks overfitting or degrading general ability.
- Fine-tuning can shrink a long prompt into the weights, cutting per-call cost and latency.
- LoRA/PEFT makes fine-tuning cheap by training a small adapter instead of the whole model.
- Order of adoption: exhaust prompting, add RAG for fresh/private knowledge, fine-tune only once both are shown insufficient.

## Feeds

[Fine-tuning](../concepts/fine-tuning.md) · [PEFT and LoRA](../concepts/peft-and-lora.md)

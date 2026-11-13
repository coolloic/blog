---
title: "Source: Llama Prompt Guard 2 model card"
summary: "Model card for Meta's 86M and 22M DeBERTa-based binary classifiers that flag prompt injections and jailbreaks."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "meta", "models"]
---

- **What:** model card (meta-llama/Llama-Prompt-Guard-2-86M, with the 22M variant)
- **Publisher:** Meta
- **Date:** April 2025 (Llama 4 collection, updated 2025-04-29); read 2026-11-14
- **Original:** [huggingface.co/meta-llama/Llama-Prompt-Guard-2-86M](https://huggingface.co/meta-llama/Llama-Prompt-Guard-2-86M)

## Summary

Prompt Guard 2 is a small encoder classifier meant to sit in front of an LLM and score text (user input or third-party content) for attempts to override prior instructions. It is cheap enough to run on every input and every retrieved chunk.

## Key claims

- 86M model built on mDeBERTa-base (multilingual); 22M on DeBERTa-xsmall, about 75% less compute and latency but weaker outside English.
- Binary output: benign or malicious. Prompt Guard 1's separate "injection" label was dropped.
- "Malicious" means an explicit attempt to override earlier instructions, regardless of harm or likely success; it is not a harmful-content classifier.
- 512-token context; longer inputs should be split into segments and scanned in parallel.
- Private jailbreak benchmark: 86M AUC 0.998 and 97.5% recall at 1% FPR (English); 22M AUC 0.995, 88.7% recall. A100 latency at 512 tokens: 92.4 ms (86M), 19.3 ms (22M).
- AgentDojo at 3% utility cost: attack prevention 81.2% (86M), 78.4% (22M) versus 67.6% for Prompt Guard 1.
- v2 tokenization resists whitespace and fragmented-token tricks.
- Use as one layer; fine-tune on application data to cut false positives; adaptive attackers may still evade it.

## Feeds

[Guardrail tooling](../concepts/guardrail-tooling.md) · [Prompt injection](../concepts/prompt-injection.md) · [Jailbreaks](../concepts/jailbreaks.md)

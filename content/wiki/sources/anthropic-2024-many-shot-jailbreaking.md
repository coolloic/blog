---
title: "Source: Many-shot jailbreaking (Anthropic)"
summary: "Anthropic (Apr 2024): hundreds of faux harmful Q&A turns in a long context jailbreak models; success follows a power law in shot count."
category: source
lastmod: 2026-11-14
tags: ["security", "jailbreaks", "anthropic", "paper"]
---

- **What:** research post and paper
- **Publisher:** Anthropic (Cem Anil et al.)
- **Date:** 2024-04-02
- **Original:** [anthropic.com/research/many-shot-jailbreaking](https://www.anthropic.com/research/many-shot-jailbreaking)

## Summary

Long context windows (from about 4K tokens in early 2023 to over 1M) enable a simple attack: fill one prompt with many fabricated dialogues where an assistant complies with harmful requests, then ask the target question. The model in-context-learns the compliant pattern.

## Key claims

- Tested up to 256 shots; harmful response rate rises with shot count and follows a power law, as benign in-context learning does.
- Larger models are more susceptible because they are better in-context learners.
- Mitigations: capping context length works but sacrifices utility; fine-tuning to refuse only delays the onset; classifying and modifying prompts before the model cut ASR from 61% to 2% in one test.

## Feeds

[Jailbreaks](../concepts/jailbreaks.md)

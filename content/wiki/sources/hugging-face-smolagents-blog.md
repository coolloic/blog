---
title: "Source: Introducing smolagents (Hugging Face blog)"
summary: "Launch post for smolagents, the successor to transformers.agents, arguing for code agents and showing open models competitive with closed ones on the authors' agent benchmark."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "hugging-face"]
---

- **What:** vendor engineering blog post
- **Author:** Aymeric Roucher, Merve Noyan, Thomas Wolf (Hugging Face)
- **Date:** 2024-12-31
- **Original:** [https://huggingface.co/blog/smolagents](https://huggingface.co/blog/smolagents)

## Summary

Introduces smolagents as a deliberately small library replacing `transformers.agents`. Explains the agency spectrum, why code is a better action format than JSON, and shows benchmark results where code agents outperform tool-calling agents and open models approach closed ones.

## Key claims

- smolagents replaces the deprecated `transformers.agents`.
- Core logic is about a thousand lines; first-class code agents; E2B sandboxing; Hub sharing of tools; any model via HF, inference APIs or LiteLLM.
- On the authors' benchmark, code agents beat tool-calling agents, and open models are competitive with leading closed models.

## Feeds

- [smolagents](../concepts/smolagents.md)

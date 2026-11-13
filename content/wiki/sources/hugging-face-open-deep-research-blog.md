---
title: "Source: Open-source DeepResearch (Hugging Face blog)"
summary: "Hugging Face's 24-hour open reproduction of OpenAI Deep Research on smolagents: a CodeAgent reached 55.15% on GAIA validation versus about 33% with JSON actions."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "hugging-face", "deep-research"]
---

- **What:** vendor engineering blog post
- **Author:** Aymeric Roucher, Albert Villanova del Moral, Merve Noyan, Thomas Wolf, Clémentine Fourrier (Hugging Face)
- **Date:** 2025-02-04
- **Original:** [https://huggingface.co/blog/open-deep-research](https://huggingface.co/blog/open-deep-research)

## Summary

Hugging Face rebuilt a deep-research agent on smolagents: a `CodeAgent` with a text web browser and a file-inspector tool, both adapted from Microsoft's Magentic-One. The post uses the result to argue that the action format (code rather than JSON) drives much of agent quality.

## Key claims

- GAIA validation: 55.15% for the open version, against 67.36% reported for OpenAI Deep Research and about 46% for Magentic-One, the previous best open framework. The authors call the work in progress, note that OpenAI's figure is a validation-set score whose private test-set result is unknown, and say full parity would need better browser interaction like OpenAI's Operator.
- The same agent with JSON actions instead of code averaged about 33% on GAIA validation.
- Citing CodeAct, code actions take about 30% fewer steps, so roughly 30% fewer generated tokens and lower cost.
- Code lets several parallel streams of actions run in one step (their example: four parallel streams of five actions take one code step versus 20 JSON blobs), and lets variables hold images or audio between steps.

## Feeds

- [smolagents](../concepts/smolagents.md)

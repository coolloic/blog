---
title: "Source: Not what you've signed up for (indirect prompt injection)"
summary: "Greshake et al. (2023) introduced indirect prompt injection: planting instructions in data an LLM-integrated app will retrieve, demonstrated on Bing Chat."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "paper"]
---

- **What:** research paper, arXiv:2302.12173
- **Authors:** Kai Greshake, Sahar Abdelnabi, Shailesh Mishra, Christoph Endres, Thorsten Holz, Mario Fritz
- **Date:** 2023-02-23 (v2 2023-05-05)
- **Original:** [arXiv:2302.12173](https://arxiv.org/abs/2302.12173)

## Summary

The paper that named and systematised indirect prompt injection. An attacker never talks to the model: they place instructions in content (web pages, documents) that an LLM-integrated application will later retrieve. Because these apps blur data and instructions, processing retrieved text can be equivalent to arbitrary code execution inside the app's capabilities.

## Key claims

- Indirect injection allows remote exploitation of LLM-integrated apps without direct access.
- Threat taxonomy: data theft, worming (self-propagating injections), information-ecosystem contamination, and other novel risks.
- Demonstrated against Bing's GPT-4 chat and code-completion engines plus synthetic GPT-4 apps.
- Attackers can control whether and how other APIs are called.
- Effective mitigations were lacking at the time.

## Feeds

[Prompt injection](../concepts/prompt-injection.md)

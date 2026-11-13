---
title: "Source: The Leaderboard Illusion (Singh et al., 2025)"
summary: "Paper documenting private variant testing, selective disclosure and data asymmetries that distort Chatbot Arena rankings."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** research paper, arXiv:2504.20879
- **Authors:** Shivalika Singh, Yiyang Nan, Alex Wang, Daniel D'Souza, Sayash Kapoor, Ahmet Üstün, Sanmi Koyejo, Yuntian Deng, Shayne Longpre, Noah A. Smith, Beyza Ermis, Marzieh Fadaee, Sara Hooker
- **Date:** 29 April 2025 (v2 12 May 2025)
- **Original:** [arxiv.org/abs/2504.20879](https://arxiv.org/abs/2504.20879)

## Summary

An audit of Chatbot Arena showing that a few providers can test many private variants and publish only the best, and that access to Arena data is unequal, so rankings partly reflect overfitting to the Arena distribution.

## Key claims

- Undisclosed private testing lets some providers try many variants and retract poor scores; Meta tested 27 private variants before the Llama 4 release.
- Proprietary models were sampled more often and removed less often than open-weight ones.
- Google and OpenAI received an estimated 19.2% and 20.4% of Arena data; 83 open-weight models together received about 29.7%.
- Small amounts of extra Arena data gave relative gains of up to 112% on the Arena distribution.
- These dynamics reward Arena-specific behaviour over general quality.

## Feeds

[Benchmarks](../concepts/benchmarks.md)

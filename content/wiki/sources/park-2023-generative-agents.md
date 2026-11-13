---
title: "Source: Generative Agents: Interactive Simulacra of Human Behavior (Park et al., 2023)"
summary: "Paper introducing the memory stream with recency/importance/relevance retrieval scoring and importance-triggered reflection, shown by ablation to drive believable agent behaviour."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "papers"]
---

- **What:** research paper (arXiv:2304.03442), UIST 2023
- **Authors:** Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein (Stanford, Google)
- **Date:** 7 April 2023, revised 6 August 2023
- **Original:** [arxiv.org/abs/2304.03442](https://arxiv.org/abs/2304.03442)

## Summary

Twenty-five simulated characters live in a sandbox town. Each logs every observation in natural language to a **memory stream**, retrieves memories by a weighted score, periodically **reflects** to synthesise higher-level insights, and plans from them. Ablations show each component matters.

## Key claims

- Retrieval score = recency + importance + relevance, each min-max normalised to [0, 1], all weights set to 1; the top memories that fit the window go into the prompt.
- Recency decays exponentially (factor 0.995 per sandbox hour since last access); importance is an LLM rating from 1 to 10 at write time; relevance is embedding cosine similarity to the query.
- Reflection triggers when the summed importance of recent events exceeds 150 (roughly two or three times a simulated day). The model asks itself three salient questions over the 100 latest memories, retrieves for each, and writes insights that cite the memories they came from, so reflections can stack into trees.
- Believability (TrueSkill): full architecture 29.89; no reflection 26.88; no reflection or planning 25.64; human crowdworkers 22.95; no memory, planning or reflection 21.21.

## Feeds

[Agent memory](../concepts/agent-memory.md)

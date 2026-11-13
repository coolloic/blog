---
title: "Source: MeanCache, user-centric semantic caching (Gill et al., 2024)"
summary: "A client-side semantic cache that stores conversation context with each query to avoid false hits on follow-ups, and trains its similarity model with federated learning so raw queries never leave the user; IPDPS 2025."
category: source
lastmod: 2026-11-14
tags: ["inference", "caching", "privacy"]
---

- **What:** research paper, arXiv 2403.02694 (v4, 2025-03-07), IEEE IPDPS 2025
- **Authors:** Waris Gill, Mohamed Elidrisi, Pallavi Kalapatapu, Ammar Ahmed, Ali Anwar, Muhammad Ali Gulzar (Virginia Tech, Cisco, University of Minnesota)
- **Date:** 2024-03-05
- **Original:** [arXiv:2403.02694](https://arxiv.org/abs/2403.02694)

## Summary

Puts the semantic cache on the user's device rather than the server, so cached queries stay private, and trains the query-similarity model across users with federated learning. Each cached query is stored with its context chain so a follow-up like "and in Python?" is not matched to an unrelated earlier question with the same words.

## Key claims

- About 31% of queries in their study were repeats, motivating caching.
- Existing caches mishandle contextual (follow-up) queries, giving unacceptable false-hit and false-miss rates.
- Against a state-of-the-art semantic cache baseline: about 17% higher F-score and 20% higher precision on hit/miss decisions, more on contextual queries; 83% less storage; 11% faster decisions.

## Feeds

[Semantic caching](../concepts/semantic-caching.md)

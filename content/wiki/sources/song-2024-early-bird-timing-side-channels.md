---
title: "Source: The early bird catches the leak, timing side channels in LLM serving (Song et al., 2024)"
summary: "Shows that shared KV caches and semantic caches leak other users' prompts through hit/miss timing (KV-cache attack on SGLang, semantic-cache attack on GPTCache in a LangChain app); accepted to IEEE TIFS."
category: source
lastmod: 2026-11-14
tags: ["inference", "caching", "security"]
---

- **What:** research paper, arXiv 2409.20002 (v5, revised 2025-10-21), accepted to IEEE Transactions on Information Forensics and Security
- **Authors:** Linke Song, Zixuan Pang, Wenhao Wang, et al.
- **Date:** 2024-09-30 (first version)
- **Original:** [arXiv:2409.20002](https://arxiv.org/abs/2409.20002)

## Summary

Any cache shared across users answers faster on a hit. An attacker who can submit requests and time responses can therefore test whether *someone else* recently asked something similar. The paper demonstrates this for prefix (KV) caches and for semantic caches.

## Key claims

- Timing leakage confirmed in open-source systems: the KV-cache (prompt-stealing) attack targets SGLang, and the semantic-cache attack targets GPTCache integrated into a LangChain chatbot. Black-box measurements suggest commercial services share KV or semantic caches across requests.
- For semantic caches the attacker probes with semantically varied candidate prompts and infers from fast responses which one matches a cached entry. Reported hit/miss discrimination under GPTCache defaults (v5): 81.4% at an average false-positive rate of 0.045 in a single trial, rising to 95.4% (FPR about 0.056) after five trials (numbers differ between paper versions).
- Mitigation for semantic caches: anonymise privacy-related content in inputs before the similarity search; the prototype uses Presidio for PII detection as GPTCache pre/post-processors; reported overhead is about 4% (roughly 6 ms against a 0.14 s cache hit).

## Feeds

[Semantic caching](../concepts/semantic-caching.md)

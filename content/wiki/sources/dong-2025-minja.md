---
title: "Source: MINJA, memory injection attacks on LLM agents (Dong et al., 2025)"
summary: "Paper showing an attacker can poison an agent's memory bank through ordinary queries alone, with about 98% injection success and 77% attack success across three agents."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "security"]
---

- **What:** research paper (arXiv:2503.03704); first titled "A Practical Memory Injection Attack against LLM Agents", v5 retitled "Memory Injection Attacks on LLM Agents via Query-Only Interaction"
- **Authors:** Shen Dong, Shaochen Xu, Pengfei He, Yige Li, Jiliang Tang, Tianming Liu, Hui Liu, Zhen Xiang
- **Date:** 5 March 2025, revised 12 February 2026
- **Original:** [arxiv.org/abs/2503.03704](https://arxiv.org/abs/2503.03704)

## Summary

Agents that store past (query, reasoning) records and retrieve them as demonstrations can be poisoned by any user. The attacker sends crafted queries whose stored records contain "bridging steps" that later steer a victim's similar query toward malicious reasoning. No direct write access to memory is needed.

## Key claims

- An indication prompt makes the agent generate the bridging steps itself; a progressive shortening strategy removes the prompt so the stored record still looks benign and still gets retrieved.
- Evaluated on EHRAgent (MIMIC-III, eICU), RAP (Webshop) and a QA agent (MMLU) with GPT-4 and GPT-4o.
- Averages reported in the early versions (v2): 98.2% injection success rate and 76.8% attack success rate. The current (v5) abstract gives no figures.
- The authors argue (without quantitative tests) that the attack evades input/output moderation such as Llama Guard and is hard to catch by memory sanitisation.
- A follow-up paper by different authors (Sunil et al., arXiv:2601.05504, January 2026) argues these results come from idealised settings (little pre-existing memory, fixed retrieval parameters) and studies defences.

## Feeds

[Agent memory](../concepts/agent-memory.md)

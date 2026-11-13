---
title: "Source: What We Learned from a Year of Building with LLMs"
summary: "Practitioner essay (Yan, Bischof, Frye, Husain, Liu, Shankar, 2024) on tactics, operations and strategy for taking LLM demos to dependable products."
category: source
lastmod: 2026-11-14
tags: ["fde", "production"]
---

- **What:** three-part practitioner essay, collected at applied-llms.org (first published in O'Reilly Radar)
- **Authors:** Eugene Yan, Bryan Bischof, Charles Frye, Hamel Husain, Jason Liu, Shreya Shankar
- **Date:** 2024-06-08
- **Original:** [applied-llms.org](https://applied-llms.org/)

## Summary

Lessons from a year of shipping LLM products, organised as tactical (prompting, RAG, evals), operational (data, models, product, people) and strategic (build vs buy, iteration, trust). Its closing section argues that "0 to 1" demos are easy and "1 to N" products are the hard part.

## Key claims

- Start with prompting (chain-of-thought, few-shot, structured output) on the most capable model; add complexity only when simpler approaches stop working.
- Build assertion-based unit tests from real production samples and rerun them on every pipeline change; review real inputs and outputs daily and turn each new failure mode into an eval.
- LLM-as-judge helps but should not be the only check; prefer pairwise comparisons and simple binary human annotation.
- Hallucination is persistent, with a baseline the authors put at roughly 5-10%; combine prompting with downstream factuality checks.
- Prototypes are easy, dependable products are hard: fix the few non-negotiable requirements (reliability, harmlessness), launch a minimal version and iterate. Match risk tolerance to the use case (internal tool vs medical/financial advice).
- No GPUs before product-market fit: training from scratch rarely pays; prove prompting and retrieval fall short before fine-tuning; start with inference APIs and self-host later for privacy, control or cost.
- Don't build generic capabilities vendors already provide (documentation chatbots, basic text-to-SQL).
- The model is not the product: models change fast, so durable value is in evals, guardrails, caching and a data flywheel.
- Design UX so people can accept, edit or reject outputs; this builds trust and generates feedback data. Narrow, honest-about-limits products earn trust faster than generic ones.
- LLMOps exists to shorten the feedback loop from production to development, not for tooling's sake.
- Demo-to-product takes years: neural-network driving was demoed in 1988 and commercial driverless service arrived decades later.
- Teams need more than AI engineers: data and platform engineers, ML engineers and domain experts, hired as the product matures.

## Feeds

[POC to production](../concepts/poc-to-production.md) · [AI use-case discovery](../concepts/ai-use-case-discovery.md)

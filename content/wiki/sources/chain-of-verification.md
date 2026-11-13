---
title: "Source: Chain-of-Verification Reduces Hallucination in Large Language Models (Meta, 2023)"
summary: "Meta AI paper introducing CoVe: draft, plan verification questions, answer them independently, then revise."
category: source
lastmod: 2026-11-14
tags: ["models", "hallucination", "prompting"]
---

- **What:** research paper (arXiv:2309.11495), Findings of ACL 2024
- **Authors:** Shehzaad Dhuliawala, Mojtaba Komeili, Jing Xu, Roberta Raileanu, Xian Li, Asli Celikyilmaz, Jason Weston (Meta AI)
- **Date:** 20 September 2023 (v2 25 September 2023)
- **Original:** [arxiv.org/abs/2309.11495](https://arxiv.org/abs/2309.11495)

## Summary

CoVe is a prompting-only method for reducing factual hallucination. The model (1) drafts an answer, (2) plans verification questions about the facts in the draft, (3) answers those questions independently, and (4) writes a final answer that drops or corrects facts the checks contradicted. The key design point is isolation: verification answers that can see the draft tend to copy its errors.

## Key claims

- Variants: **joint** (plan and answer in one prompt), **2-step** (answer questions in a prompt without the draft), **factored** (each question in its own prompt; parallelisable) and **factor+revise** (explicit consistency check per fact before rewriting).
- Wikidata list questions, Llama 65B: precision 0.17 few-shot to 0.36 with 2-step CoVe; hallucinated entities per answer fell from about 2.95 to 0.68.
- Closed-book MultiSpanQA F1: 0.39 to 0.48 (factored).
- Long-form biographies (FactScore): 55.9 few-shot to 71.4 with factor+revise, above ChatGPT (58.7) and retrieval-based PerplexityAI (61.6); retrieval still won on very rare facts.
- Short verification questions are answered more accurately than the same facts embedded in long-form generation, which is why the method works.

## Feeds

[Hallucination](../concepts/hallucination.md)

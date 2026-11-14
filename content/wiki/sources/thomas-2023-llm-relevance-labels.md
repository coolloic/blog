---
title: "Source: Large Language Models Can Accurately Predict Searcher Preferences (Thomas et al.)"
summary: "Microsoft/Bing study showing GPT-4 relevance labels, with a prompt tuned against real searcher preferences, match or beat crowd labellers at a fraction of the cost."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "retrieval", "llm-as-judge", "papers"]
---

- **What:** research paper, arXiv:2309.10621, published at ACM SIGIR 2024
- **Authors:** Paul Thomas, Seth Spielman, Nick Craswell, Bhaskar Mitra (Microsoft)
- **Date:** v1 19 September 2023; v3 16 May 2024
- **Original:** [arxiv.org/abs/2309.10621](https://arxiv.org/abs/2309.10621)

## Summary

Relevance labels are the bottleneck of retrieval evaluation. The authors pick an LLM prompt by checking it against a small set of high-quality "gold" labels derived from real searcher feedback, then use it to label at scale. They report results from Bing production use and from TREC-Robust, plus a careful look at how sensitive the labels are to prompt wording.

## Key claims

- Labels use a 0-2 scale (2 highly relevant, 1 relevant, 0 not relevant). Prompt features tested: a rater role, the TREC description and narrative, asking for aspect scores (topicality, trustworthiness) before the overall score, and simulating multiple judges.
- On TREC-Robust (binarised), Cohen's kappa with the TREC assessors ranged from 0.20 to 0.64 across 32 prompt variants; the best prompt (description + narrative + aspects, no role, no multiple judges) reached 0.64. Asking for aspects helped most (+0.208); simulated multiple judges hurt (-0.127).
- Paraphrasing the best prompt moved mean kappa between 0.50 and 0.72 with no clear pattern: small wording changes matter.
- For comparison, the prior human-labeller agreement studies the paper cites report kappa of roughly 0.24 to 0.58.
- At Bing, relative to a typical crowd worker, GPT-4 labels were 28% more accurate, about 10x the throughput, at about 1/20 of the cost.
- System rankings from LLM labels agreed well with human labels (Kendall tau 0.77 to 0.86 across 110 TREC runs, depending on metric), but identifying the hardest queries was less consistent.
- The LLM said "not relevant" more often than assessors (44% vs 33%); when it said relevant, it agreed with TREC 94% of the time.
- Caveats: risk of optimising systems toward the LLM's quirks, possible bias against long documents, and the need to keep human gold labels and oversight.

## Feeds

[Retrieval metrics](../concepts/retrieval-metrics.md)

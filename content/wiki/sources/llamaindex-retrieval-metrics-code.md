---
title: "Source: LlamaIndex retrieval evaluation metrics (source code)"
summary: "How llama-index-core implements HitRate, MRR, Precision, Recall, AveragePrecision and NDCG for retriever evaluation, including non-obvious normalisation choices."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "retrieval", "llamaindex"]
---

- **What:** library source code (`llama_index/core/evaluation/retrieval/metrics.py`), used by `RetrieverEvaluator`
- **Publisher:** LlamaIndex (run-llama), MIT licence
- **Date:** `main` branch read 2026-11-14 (latest PyPI release of llama-index-core at that date: 0.14.26)
- **Original:** [metrics.py on GitHub](https://github.com/run-llama/llama_index/blob/main/llama-index-core/llama_index/core/evaluation/retrieval/metrics.py) · [API reference](https://developers.llamaindex.ai/python/framework-api-reference/evaluation/metrics/)

## Summary

The metrics take a list of retrieved IDs (in rank order) and a list of expected IDs per query and return a score; `RetrieverEvaluator` runs them over a dataset of (query, expected node IDs). All are binary-relevance: a retrieved ID either is or is not in the expected set.

## Key claims

- **HitRate** (default): 1 if any expected ID appears among the retrieved IDs, else 0. With `use_granular_hit_rate=True` it becomes hits / number of expected IDs, i.e. recall.
- **MRR** (default): 1/rank of the first expected ID found, else 0. With `use_granular_mrr=True` it sums 1/rank over every relevant hit and divides by the number of relevant hits, which is a different quantity from standard MRR.
- **Precision**: |retrieved ∩ expected| / |retrieved|. **Recall**: |retrieved ∩ expected| / |expected|. Both use sets, so rank is ignored and k is whatever list length was passed.
- **AveragePrecision**: sum of precision at each relevant hit, divided by the total number of expected IDs (so unretrieved relevant items count as 0, as in classical AP).
- **NDCG**: binary gains with a 1/log2(i+1) discount (`mode="linear"` or `"exponential"` only differ for graded gains); the ideal DCG sums over all expected IDs, not just the top k, so when there are more expected IDs than retrieved slots a perfect retriever cannot score 1.
- All metrics raise an error if either list is empty.

## Feeds

[Retrieval metrics](../concepts/retrieval-metrics.md)

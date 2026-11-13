---
title: "Source: Binary and Scalar Embedding Quantization (Hugging Face blog)"
summary: "Hugging Face / mixedbread post measuring binary and int8 quantization of embeddings: 32x and 4x memory savings, speed-ups, and recall retained with rescoring."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "embeddings", "quantization"]
---

- **What:** engineering blog post with benchmarks
- **Authors:** Aamir Shakir, Tom Aarsen, Sean Lee
- **Date:** 22 March 2024
- **Original:** [huggingface.co/blog/embedding-quantization](https://huggingface.co/blog/embedding-quantization)

## Summary

The post quantizes stored embeddings rather than model weights. Binary quantization keeps only the sign of each dimension (Hamming distance search); int8 maps each dimension into 256 buckets calibrated on sample data. Both lose some accuracy, much of which is recovered by over-fetching candidates and rescoring them with the float32 query.

## Key claims

- Binary: 32x smaller; about 92.5% of retrieval performance retained without rescoring, about 96% with rescoring (mxbai-embed-large-v1); CPU search speed-up about 25x on average.
- int8: 4x smaller; about 97% retained, about 99% with rescoring at a 4 to 5x over-fetch; speed-up about 3.7x.
- Rescoring: retrieve `multiplier * top_k` candidates with quantized vectors, then rescore with the float32 query.
- Robustness varies by model: Cohere embed-english-v3 kept 94.6% at binary; e5-base-v2 dropped to about 75%.
- Example: 250M 1024-dim embeddings need about 954 GB as float32, 238 GB as int8 and 30 GB as binary.

## Feeds

[Embeddings](../concepts/embeddings.md) · [ANN indexes](../concepts/ann-indexes.md) · [Vector databases](../concepts/vector-databases.md)

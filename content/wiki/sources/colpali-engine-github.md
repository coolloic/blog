---
title: "Source: illuin-tech/colpali repository (ColVision models)"
summary: "Reference repo for ColPali-family visual retrievers: model table (ColPali, ColQwen2/2.5, ColSmol, community ColQwen3/3.5 variants) with ViDoRe scores, licenses, token pooling, and its deprecation in favour of Sentence Transformers."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "multimodal"]
---

- **What:** open-source repository README (colpali-engine)
- **Author/publisher:** Illuin Technology (ColPali authors)
- **Date:** read 2026-11-14
- **Original:** [github.com/illuin-tech/colpali](https://github.com/illuin-tech/colpali)

## Summary

The code and model index behind [ColPali](colpali-2024.md). It lists "ColVision" checkpoints that embed page images into per-patch multi-vectors for late-interaction retrieval, their base vision-language models, ViDoRe scores and licenses, and ships a hierarchical token pooler to shrink the vectors stored per page.

## Key claims

- ViDoRe (v1) scores: ColPali v1.3 (PaliGemma-3B) 84.8; ColQwen2 v1.0 (Qwen2-VL-2B) 89.3; ColQwen2.5 v0.2 (Qwen2.5-VL-3B) 89.4; ColSmol-256M 80.1 and ColSmol-500M 82.3; community models TomoroAI tomoro-colqwen3-embed-4b 90.6 and athrael-soju colqwen3.5-4.5B-v3 90.9 (both Apache 2.0, 320-dim vectors).
- ColQwen models use dynamic image resolution; ColQwen2/2.5 v0.1 were trained with 768 image patches per page.
- Licenses: ColPali (PaliGemma) and Gemma-based models under Gemma terms; ColQwen and ColSmol under Apache 2.0.
- `HierarchicalTokenPooler`: pool factor 3 removes 66.7% of vectors while keeping 97.8% of performance; it supports adding and deleting documents.
- colpali-engine is now marked deprecated; new projects are pointed to Sentence Transformers v6, which adds ColPali-style multi-vector support.
- ViDoRe Benchmark V2 is arXiv:2505.17166 (2025).

## Feeds

[Late-interaction retrieval](../concepts/late-interaction-retrieval.md)

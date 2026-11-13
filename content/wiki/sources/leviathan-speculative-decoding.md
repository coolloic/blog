---
title: "Source: Fast Inference from Transformers via Speculative Decoding"
summary: "ICML 2023 paper introducing speculative decoding and the distribution-preserving speculative sampling rule."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper (ICML 2023 oral), arXiv:2211.17192
- **Author:** Yaniv Leviathan, Matan Kalman, Yossi Matias (Google Research)
- **Date:** 2022-11-30
- **Original:** [Fast Inference from Transformers via Speculative Decoding](https://arxiv.org/abs/2211.17192)

## Summary

A small approximation model drafts several tokens; the large target model scores all of them in one parallel pass; a rejection-sampling rule accepts a prefix of the drafts so the output distribution is exactly the target model's. Speed comes from turning several memory-bound decode steps into one.

## Key claims

- Speculative sampling: accept a draft token x if q(x) <= p(x); otherwise reject with probability 1 - p(x)/q(x) and resample from norm(max(0, p - q)). The result is distributed exactly as p.
- Each iteration yields between 1 and gamma+1 tokens; with acceptance rate alpha (i.i.d. assumption), expected tokens per iteration = (1 - alpha^(gamma+1)) / (1 - alpha).
- Expected walltime improvement = (1 - alpha^(gamma+1)) / ((1 - alpha)(gamma*c + 1)), where c is draft-step time over target-step time.
- Total arithmetic increases (wasted work on rejected drafts), but memory reads of target weights and KV cache drop by the expected-tokens factor.
- Drafts a couple of orders of magnitude smaller than the target gave alpha between 0.5 and 0.9; even a bigram model gave alpha 0.2 (1.25x).
- 2-3x speedup on T5-XXL with identical outputs.

## Feeds

[Speculative decoding](../concepts/speculative-decoding.md)

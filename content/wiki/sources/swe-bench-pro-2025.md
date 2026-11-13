---
title: "Source: SWE-Bench Pro (Deng et al., Scale AI, 2025)"
summary: "Scale AI's contamination-resistant, long-horizon successor benchmark: 1,865 tasks from 41 repos with public, held-out and commercial subsets; best public score rose from 23.3% (v1) to 43.6% (v2)."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "benchmarks"]
---

- **What:** research paper and benchmark
- **Authors:** Xiang Deng, Jeff Da and 20 others (Scale AI)
- **Date:** 2025-09-21 (v2 2025-11-14)
- **Original:** [arXiv:2509.16941](https://arxiv.org/abs/2509.16941)

## Summary

Targets tasks that take a professional engineer hours to days and often span many files, drawn from actively maintained business, B2B and developer-tool repositories. Private subsets limit training contamination.

## Key claims

- 1,865 human-verified problems from 41 repositories, each augmented with enough context to be solvable.
- Public set (11 repos, open), held-out set (12 repos, private), commercial set (18 proprietary startup repos; only results released).
- Public set has 731 instances, commercial set 276.
- At release (v1, 2025-09-21) the best agent scored 23.3% on the public set (GPT-5), far below SWE-bench Verified scores.
- The v2 revision (2025-11-14) reports higher public-set numbers with newer models: Claude Sonnet 4.5 43.6%, Claude Sonnet 4 42.7%, GPT-5 (high) 41.8%. Commercial set best: Claude Opus 4.1 17.8%, GPT-5 (high) 15.7%. Quote the version when citing a score.

## Feeds

[Coding agents](../concepts/coding-agents.md)

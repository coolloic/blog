---
title: "Source: Pervasive Annotation Errors Break Text-to-SQL Benchmarks (Jin et al., 2026)"
summary: "Expert audit finding 52.8% of BIRD Mini-Dev and 62.8% of audited Spider 2.0-Snow examples have annotation errors, enough to shift BIRD agent rankings by up to 9 places."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "text-to-sql", "benchmarks", "evaluation"]
---

- **What:** research paper (arXiv:2601.08778; also a PVLDB paper and a CIDR 2026 version)
- **Author/publisher:** Tengjun Jin, Yoojin Choi, Yuxuan Zhu, Daniel Kang (UIUC)
- **Date:** 2026-01-13 (v3 2026-01-19)
- **Original:** [arXiv:2601.08778](https://arxiv.org/abs/2601.08778)

## Summary

The authors had experts audit gold SQL and questions in two leading text-to-SQL benchmarks and found that about half or more of the examples are wrong or ambiguous. They then corrected a subset of BIRD Dev and re-scored the open-source agents from the BIRD leaderboard, showing that the rankings largely stop meaning what they claim.

## Key claims

- Annotation error rate: 52.8% on BIRD Mini-Dev; 62.8% on the 121 Spider 2.0-Snow examples with public gold SQL (the CIDR version reports 66.1%).
- Re-scoring 16 open-source BIRD agents on corrected vs original Dev subsets changed performance by -7% to +31% relative and ranks by up to 9 positions.
- Rankings on the uncorrected subset correlate strongly with full-Dev rankings (Spearman 0.85); on the corrected subset only weakly (0.32).
- Conclusion: leaderboard positions can mislead research and deployment decisions.

## Feeds

[Text-to-SQL](../concepts/text-to-sql.md)

---
title: "Source: BIRD Benchmark (Li et al., NeurIPS 2023) and Leaderboard"
summary: "Text-to-SQL benchmark over 95 large, dirty real-world databases with external-knowledge evidence and an efficiency metric; the 2026 leaderboard tops out near 83% execution accuracy against 93% for humans."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "text-to-sql", "benchmarks"]
---

- **What:** benchmark paper (arXiv:2305.03111, NeurIPS 2023) and its live leaderboard site
- **Author/publisher:** Jinyang Li, Binyuan Hui, ..., Reynold Cheng, Yongbin Li
- **Date:** paper 2023-05-04 (v3 2023-11-15); leaderboard read 2026-11-14
- **Original:** [arXiv:2305.03111](https://arxiv.org/abs/2305.03111), [bird-bench.github.io](https://bird-bench.github.io/)

## Summary

BIRD ("BIg bench for laRge-scale Database grounded text-to-SQL") argues Spider's databases are too clean and too small. It uses real databases with messy values, requires "evidence" (external knowledge hints such as how a metric is computed), and scores the efficiency of generated SQL. Its central finding is that models must understand database *values*, not just parse language into schema names.

## Key claims

- 12,751 question-SQL pairs, 95 databases totalling 33.4 GB, 37 professional domains.
- Difficulties: dirty values, external knowledge linking question terms to values, SQL efficiency on big tables.
- Metrics: execution accuracy (EX) and a reward-based valid efficiency score (R-VES).
- At release, ChatGPT reached 40.08% EX vs 92.96% for humans (data engineers and DB students).
- Leaderboard as of 2026-11: top test EX 83.40% (AskData, 2026-10-22), followed by GrainSQL 82.95% and others above 82%; best single trained model 80.04% (Gemini-SQL2, using many-candidate self-consistency). Top R-VES 84.10% exceeds the human 83.26%.
- Newer BIRD family tasks are far harder: on BIRD-Interact (multi-turn, ambiguity, interaction) best reported success rates were in the 8-25% range in 2025; LiveSQLBench (contamination-resistant, refreshed) best scores were roughly 29-45% in 2025.
- Mini-Dev (SQLite, MySQL and PostgreSQL versions), updated 2026-10-28: frontier LLMs score about 84-87%.

## Feeds

[Text-to-SQL](../concepts/text-to-sql.md)

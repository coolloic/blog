---
title: "Source: Spider 2.0 (Lei et al., ICLR 2025) and Leaderboard"
summary: "Enterprise text-to-SQL benchmark of 632 workflow tasks on BigQuery, Snowflake and dbt projects with 1,000+ column schemas; o1-preview agents solved 21.3% at release, and agentic systems reached roughly 74-97% by late 2026."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "text-to-sql", "benchmarks", "agents"]
---

- **What:** benchmark paper (arXiv:2411.07763, ICLR 2025 oral) and its leaderboard site
- **Author/publisher:** Fangyu Lei, Jixuan Chen, Yuxiao Ye and 13 others
- **Date:** paper 2024-11-12 (v2 2025-03-17); leaderboard read 2026-11-14
- **Original:** [arXiv:2411.07763](https://arxiv.org/abs/2411.07763), [spider2-sql.github.io](https://spider2-sql.github.io/)

## Summary

Spider 2.0 moves text-to-SQL from single queries over toy schemas to enterprise data work: cloud warehouses, dialect-specific SQL, schemas with over a thousand columns, project codebases and multi-step pipelines. Solving tasks often means searching metadata and documentation, so it is as much an agent benchmark as a SQL one.

## Key claims

- 632 real-world workflow tasks on local and cloud systems (BigQuery, Snowflake); schemas often exceed 1,000 columns; answers often need several queries over 100 lines long.
- Tasks require reading database metadata, dialect docs and project code, and handling very long contexts.
- At release, an o1-preview code agent solved 21.3%, vs 91.2% on Spider 1.0 and 73.0% on BIRD.
- Settings (as of 2026-11): Spider 2.0-Snow (547 tasks, Snowflake), Spider 2.0-Lite (547 tasks across BigQuery, Snowflake, SQLite), Spider 2.0-DBT (68 repository-level dbt/DuckDB tasks, replacing the original agent setting on 2025-05-22).
- Leaderboard read 2026-11-14 (entries undated): Snow top 96.70; Lite top 76.23; DBT top 65.6. Scores are agent systems, not single model calls.

## Feeds

[Text-to-SQL](../concepts/text-to-sql.md)

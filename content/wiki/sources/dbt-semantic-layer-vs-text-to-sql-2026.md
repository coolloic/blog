---
title: "Source: dbt Labs, Semantic Layer vs. Text-to-SQL: 2026 Benchmark Update"
summary: "dbt Labs' April 2026 benchmark on 11 insurance-domain questions: raw-schema text-to-SQL reached 64.5%, the Semantic Layer reached 100% within its scope, and light data modeling lifted both."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "text-to-sql", "semantic-layer"]
---

- **What:** vendor engineering blog post with open-sourced benchmark code (`dbt-labs/dbt-llm-sl-bench`), plus the dbt Semantic Layer overview docs
- **Author/publisher:** Jason Ganz and Benoit Perigaud, dbt Labs
- **Date:** 2026-04-07
- **Original:** [Semantic Layer vs. Text-to-SQL: 2026 benchmark update](https://docs.getdbt.com/blog/semantic-layer-vs-text-to-sql-2026), [dbt Semantic Layer docs](https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl)

## Summary

dbt Labs reran its 2023 comparison of LLMs writing raw SQL against LLMs querying governed metrics through the dbt Semantic Layer (powered by MetricFlow), on the ACME Insurance dataset (originally from data.world, third normal form). Models improved a lot since 2023, but the semantic layer stays near-perfect on in-scope questions because the SQL is compiled deterministically, and it fails loudly when a question is out of scope. dbt sells the Semantic Layer, and the benchmark is small, which the authors acknowledge.

## Key claims

- Setup: 11 questions, 20 runs each; claude-sonnet-4-6 and gpt-5.3-codex at default reasoning; full schema placed in context for text-to-SQL, which the authors say is optimistic for larger warehouses.
- Raw schema, all questions: text-to-SQL 64.5% (both models) vs 32.7% for GPT-4 in 2023; Semantic Layer 72.7%.
- Within Semantic Layer scope: text-to-SQL 62.5% (Sonnet 4.6) and 51.2% (GPT-5.3 Codex) vs 100% for the Semantic Layer. Questions needing too many join hops: Semantic Layer 0% (unanswerable without modeling).
- After an LLM created three new dbt models: text-to-SQL 90.0% (Sonnet 4.6) and 84.1% (GPT-5.3 Codex); Semantic Layer 98.2% and 100%.
- Failure modes: text-to-SQL fails silently (wrong joins, misread columns, plausible wrong numbers); the semantic layer fails loudly with an error.
- Higher reasoning effort added latency (over 20 s vs about 8 s per query) with no accuracy gain on semantic-layer queries.
- Recommendation: semantic layer for accuracy-critical reporting (KPIs, board numbers); for ad hoc exploration, try the semantic layer, consider a small modeling change, then fall back to text-to-SQL with rich schema context.
- The docs say metrics defined once in MetricFlow are reused by every consumer, joins are handled automatically, and AI tools connect through the dbt MCP server.

## Feeds

[Text-to-SQL](../concepts/text-to-sql.md)

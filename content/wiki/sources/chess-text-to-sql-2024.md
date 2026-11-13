---
title: "Source: CHESS (Talaei et al., 2024)"
summary: "A multi-agent text-to-SQL pipeline whose information retriever (LSH value lookup, embedded catalog) and three-stage schema selector prune large schemas, with ablations quantifying each step and showing schema linking errors fall sharply."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "text-to-sql", "agents"]
---

- **What:** research paper (arXiv:2405.16755)
- **Author/publisher:** Shayan Talaei, Mohammadreza Pourreza, Yu-Chen Chang, Azalia Mirhoseini, Amin Saberi
- **Date:** 2024-05-27 (v3 2024-11-25)
- **Original:** [arXiv:2405.16755](https://arxiv.org/abs/2405.16755)

## Summary

CHESS (Contextual Harnessing for Efficient SQL Synthesis) treats text-to-SQL over real databases as a retrieval problem first: find the right values, descriptions and columns, prune the schema, then generate and test candidate queries. It reports detailed ablations on how much each retrieval and pruning step contributes.

## Key claims

- Four agents: Information Retriever, Schema Selector, Candidate Generator (generate and iteratively fix), Unit Tester (LLM-written natural-language unit tests to choose among candidates).
- **Value retrieval:** an LLM extracts keywords; all distinct database values are pre-indexed with locality-sensitive hashing; top candidates are re-ranked by embedding similarity and edit distance. This cut lookup from about 5 minutes to about 5 seconds.
- **Catalog retrieval:** column and value descriptions sit in a vector store and are retrieved by similarity.
- **Schema selection:** per-column relevance filter with a cheap LLM, then table selection, then column selection; primary and foreign keys are always kept.
- Column precision rose from 0.11 to 0.71 while recall fell only from 1.0 to 0.94; table precision 0.33 to 0.90.
- Ablation: removing table selection costs 6.12 EX points, column selection 5.44, column filtering 2.72, the retrieval tools 4.76.
- On a 4,337-column schema, schema selection cut tokens by more than 5x; the gap between the full schema and a ground-truth schema was 11 points.
- Error analysis: 57.1% of vanilla GPT-4's wrong SQL came from schema linking; for CHESS only 5.4% of errors were wrong column linking.
- 71.10% EX on the BIRD test set with a high compute budget, with about 83% fewer LLM calls than the leading method at the time.

## Feeds

[Text-to-SQL](../concepts/text-to-sql.md)

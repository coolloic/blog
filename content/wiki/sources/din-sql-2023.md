---
title: "Source: DIN-SQL (Pourreza and Rafiei, NeurIPS 2023)"
summary: "Decomposes LLM text-to-SQL into schema linking, query classification, class-specific generation and self-correction; its error analysis found schema linking is the largest failure category."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "text-to-sql", "prompting"]
---

- **What:** research paper (arXiv:2304.11015, NeurIPS 2023)
- **Author/publisher:** Mohammadreza Pourreza, Davood Rafiei (University of Alberta)
- **Date:** 2023-04-21 (v3 2023-11-02)
- **Original:** [arXiv:2304.11015](https://arxiv.org/abs/2304.11015)

## Summary

DIN-SQL starts from an error analysis of few-shot LLM text-to-SQL and designs one prompt module per failure type. Splitting the task into sub-problems lifted few-shot accuracy of three LLMs by about 10% and, at the time, beat fine-tuned systems on Spider.

## Key claims

- **Error analysis** (500 random Spider training queries from databases not used in prompts, CodeX failures): six failure categories: schema linking, the largest (wrong column, table or entity; e.g. choosing a column literally named "average" instead of computing AVG), JOIN, the second largest (missing tables or wrong foreign keys), GROUP BY, nesting and set operations, invalid SQL (small share), and miscellaneous (extra or missing predicates, DISTINCT, DESC).
- **Module 1, schema linking:** a few-shot chain-of-thought prompt that lists the columns, tables and condition values the question refers to.
- **Module 2, classification and decomposition:** labels each question easy, non-nested complex (joins, no subqueries) or nested complex, and identifies tables to join and subqueries.
- **Module 3, generation:** a different prompt per class; complex classes use NatSQL as an intermediate representation.
- **Module 4, self-correction:** a "generic" prompt (assume the SQL is buggy) worked better for CodeX; a "gentle" prompt (check for issues) worked better for GPT-4, where the generic one could hurt.
- Results: 85.3% execution accuracy on the Spider test set (prior SOTA 79.9) and 55.9% on BIRD's holdout.
- For BIRD, sample rows were added to the prompt to help schema linking against messy values.

## Feeds

[Text-to-SQL](../concepts/text-to-sql.md)

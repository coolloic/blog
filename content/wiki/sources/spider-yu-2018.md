---
title: "Source: Spider (Yu et al., EMNLP 2018)"
summary: "The cross-domain text-to-SQL benchmark of 10,181 questions over 200 multi-table databases, whose split by database forces models to generalize to unseen schemas."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "text-to-sql", "benchmarks"]
---

- **What:** benchmark paper (arXiv:1809.08887, EMNLP 2018)
- **Author/publisher:** Tao Yu, Rui Zhang, Kai Yang, Michihiro Yasunaga, ..., Dragomir Radev (Yale)
- **Date:** 2018-09-24 (v5 2019-02-02)
- **Original:** [arXiv:1809.08887](https://arxiv.org/abs/1809.08887)

## Summary

Spider made text-to-SQL a cross-domain problem. Earlier datasets reused one database and the same queries across train and test; Spider puts different databases in train and test, so a model must map language onto a schema it has never seen. It became the standard benchmark of the pre-LLM and early-LLM era.

## Key claims

- 10,181 questions, 5,693 unique complex SQL queries, 200 multi-table databases, 138 domains, annotated by 11 college students.
- Train/test split by database, so test schemas and queries are unseen.
- Evaluated with exact-match accuracy of predicted SQL against gold SQL.
- Best baseline at release reached only 12.4% exact match in the database-split setting.

## Feeds

[Text-to-SQL](../concepts/text-to-sql.md)

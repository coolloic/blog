---
title: "Source: Snowflake Cortex Analyst Verified Query Repository Docs"
summary: "Snowflake documentation for the Verified Query Repository: curated question-SQL pairs stored in a semantic model that Cortex Analyst reuses when a new question is similar."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "text-to-sql", "semantic-layer"]
---

- **What:** official product documentation
- **Author/publisher:** Snowflake
- **Date:** living document; read 2026-11-14
- **Original:** [Verified Query Repository](https://docs.snowflake.com/user-guide/views-semantic/verified-query-repository)

## Summary

Cortex Analyst is Snowflake's managed natural-language-to-SQL service driven by a semantic model (logical tables, columns, descriptions). The Verified Query Repository (VQR) is a list of human-checked question/SQL pairs in that semantic model. When a user asks something similar to a verified question, Cortex Analyst uses the verified SQL, which raises accuracy and trust.

## Key claims

- Each verified query has `name`, `question`, `sql`, optional `verified_at`, `verified_by` and `use_as_onboarding_question`.
- Verified SQL must use the semantic model's logical table and column names, not physical names.
- Invalid or wrong verified queries can hurt accuracy, so run and check each before adding.
- The REST response indicates whether a verified query was used.
- Snowsight proposes new verified queries from user behaviour; a Streamlit generator helps author them.

## Feeds

[Text-to-SQL](../concepts/text-to-sql.md)

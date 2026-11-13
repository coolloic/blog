---
title: "Source: Langfuse pricing page and v4 changelog"
summary: "Langfuse Cloud plan prices and limits as of 2026-11, and the 2026 v4 change to a single denormalised observations table."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "langfuse"]
---

- **What:** vendor pricing page and changelog entries
- **Publisher:** Langfuse
- **Date:** pricing accessed 2026-11-14 (undated page); changelog entries dated 2026-03-10, 2026-07-15 and 2026-08-17
- **Original:** [Pricing](https://langfuse.com/pricing), [Langfuse v4 is live](https://langfuse.com/changelog/2026-08-17-langfuse-v4), [Simplify for scale](https://langfuse.com/changelog/2026-03-10-simplify-for-scale), [Root observations default](https://langfuse.com/changelog/2026-07-15-root-observations-default)

## Summary

Langfuse Cloud is priced per unit (ingested trace/observation/score) with a free Hobby tier; self-hosting the open-source build is free. Version 4 (generally available August 2026) reorganised the product around one observations table.

## Key claims

- Plans as of 2026-11-14: Hobby free, 50k units/month, 30 days data access; Core $29/month, 100k units, 90 days; Pro $199/month (Teams add-on $300), 100k units, 3 years; Enterprise $2,499/month (includes Teams). Overage $8 per 100k units for 100k-1M, $7 for 1M-10M, $6.50 for 10M-50M, $6 above 50M. Self-hosted OSS: free.
- The Teams add-on covers enterprise SSO, SSO enforcement, fine-grained RBAC and a dedicated Slack channel. Protected prompt labels are on Enterprise, or on Pro only with Teams.
- Data retention management (automatic deletion) is on Pro and Enterprise.
- v4: the main table is observations, one row per LLM call, tool execution or agent step, rather than one row per trace; a denormalised table replaces read-time joins. The launch post claims table loads over large data drop from seconds to milliseconds and dashboards load at least 10x faster in large projects.
- v4 is GA on Cloud and for self-hosting (2026-08-17). Langfuse Cloud becomes v4-only on 16 November 2026, when legacy APIs, features and ingestion are removed; self-hosted has no forced cutover and v3 receives security patches through January 2027. Newer SDKs (Python >= 4.7.0, JS/TS >= 5.4.0) copy trace-level fields such as user and session IDs onto each observation before ingestion.
- Since July 2026, projects using recent SDKs (Python >= 4.7.0, JS/TS >= 5.4.0) open the observations table filtered to root observations by default.

## Feeds

[Langfuse](../concepts/langfuse.md)

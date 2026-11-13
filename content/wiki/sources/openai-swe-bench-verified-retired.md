---
title: "Source: Why we no longer evaluate SWE-bench Verified (OpenAI, 2026)"
summary: "OpenAI's February 2026 post dropping SWE-bench Verified because of training-data contamination and flawed tests, recommending SWE-bench Pro instead."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "benchmarks"]
---

- **What:** research blog post
- **Publisher:** OpenAI
- **Date:** 2026-02-23
- **Original:** [Why we no longer evaluate SWE-bench Verified](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/)
- **Note:** the original refused automated fetching; on 2026-11-14 the 138-problem audit, 59.4%, o3/64-run selection, six-reviewer, contamination and 74.9%→80.9% figures were re-checked against a reader-mode copy of the post. The exact publication day was not re-confirmed (February 2026).

## Summary

SWE-bench Verified (a 500-task human-validated subset OpenAI released in 2024) is judged to no longer measure frontier coding ability: models have seen the tasks, and many hard tasks have broken tests. OpenAI stopped reporting it and asked others to do the same.

## Key claims

- Contamination: every frontier model tested could reproduce the gold patch or verbatim problem details for some tasks.
- Audit of 138 hard problems (ones o3 did not consistently solve over 64 runs), each reviewed by at least six engineers: 59.4% had flawed tests or descriptions that reject correct solutions.
- Saturation: state of the art moved only from 74.9% to 80.9% over the preceding six months.
- The 59.4% applies to the audited hard subset (about 27.6% of the dataset), not to all 500 tasks.
- Recommendation: report SWE-bench Pro instead. Later third-party audits (unverified here) argue SWE-bench Pro has grading problems of its own; secondary reports that OpenAI later withdrew the endorsement have no primary source.

## Feeds

[Coding agents](../concepts/coding-agents.md)

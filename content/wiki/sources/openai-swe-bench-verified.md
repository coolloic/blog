---
title: "Source: Introducing SWE-bench Verified (OpenAI, 2024)"
summary: "OpenAI's human-validated 500-task subset of SWE-bench, built to remove underspecified issues and unfair tests."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "agents"]
---

- **What:** company blog post, with the SWE-bench authors
- **Publisher:** OpenAI
- **Date:** 13 August 2024
- **Original:** [openai.com/index/introducing-swe-bench-verified](https://openai.com/index/introducing-swe-bench-verified/) (direct fetch blocked on 2026-11-14; facts taken from the post's indexed text)

## Summary

OpenAI found that many SWE-bench tasks were unsolvable or unfairly graded and released a cleaned 500-task subset that became the standard coding-agent benchmark through 2025.

## Key claims

- Problems with the original: overly specific unit tests that reject valid fixes, underspecified issue descriptions, and unreliable environment setup.
- 93 Python developers screened 1,699 random test samples; each was labelled three times and the most severe label kept.
- Samples with problematic issue text or FAIL_TO_PASS tests were dropped, leaving 500 verified tasks.
- GPT-4o resolved 33.2% of SWE-bench Verified at release.

## Feeds

[Benchmarks](../concepts/benchmarks.md)

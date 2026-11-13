---
title: "Source: OpenAI wants to retire SWE-bench Verified (The Decoder, 2026)"
summary: "News report on OpenAI's February 2026 decision to stop reporting SWE-bench Verified over flawed tasks and contamination."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** news article (secondary coverage of an OpenAI blog post)
- **Publisher:** The Decoder
- **Date:** 23 February 2026
- **Original:** [the-decoder.com](https://the-decoder.com/openai-wants-to-retire-the-ai-coding-benchmark-that-everyone-has-been-competing-on/); OpenAI's post: [Why we no longer evaluate SWE-bench Verified](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/) (direct fetch blocked)

## Summary

OpenAI said SWE-bench Verified no longer measures frontier coding ability, citing broken tasks and training-data contamination, stopped reporting it, and recommended SWE-bench Pro while it builds private evaluations.

## Key claims

- An audit of problems that o3 could not reliably solve (138 per OpenAI's post as indexed) found at least 59.4% had major flaws, e.g. tests enforcing implementation details the issue never states.
- Tasks and gold fixes have leaked into training data: GPT-5.2, Claude Opus 4.5 and Gemini 3 Flash Preview could reproduce some original fixes from memory.
- OpenAI recommended SWE-bench Pro and other developers stop reporting Verified.
- Later 2026 coverage (e.g. tech-insider.org, digg summaries of an OpenAI post on X) reports that on 8 July 2026 OpenAI said SWE-bench Pro had hit a roughly 70% noise ceiling and no longer reliably measures frontier coding capability, withdrawing its February recommendation; audits reported roughly 30% of Pro tasks flawed. Not confirmed from a primary source (checked 2026-11-14).

## Feeds

[Benchmarks](../concepts/benchmarks.md)

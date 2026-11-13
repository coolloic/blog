---
title: "Source: A Field Guide to Rapidly Improving AI Products (Hamel Husain)"
summary: "Hamel Husain's 2025 essay arguing that bottom-up error analysis, custom data viewers and binary judgments drive AI product improvement."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** practitioner blog post
- **Author:** Hamel Husain
- **Date:** 24 March 2025
- **Original:** [hamel.dev/blog/posts/field-guide](https://hamel.dev/blog/posts/field-guide/)

## Summary

Drawing on more than 30 client implementations, the post argues that teams improve AI products fastest by looking at their own data: building a simple custom viewer, annotating failures with free-text notes, letting categories emerge, and measuring the categories that matter. It treats generic off-the-shelf metrics as a distraction.

## Key claims

- Bottom-up beats top-down: generic metrics (hallucination, toxicity) miss domain-specific failures; categories should emerge from annotated data.
- NurtureBoss case: open-ended notes on conversations, an LLM-assisted taxonomy, and pivot-table counts showed three issues (conversation flow, handoff failures, rescheduling) were over 60% of problems.
- Date handling failed 66% of the time on relative requests; targeted fixes moved success from 33% to 95%.
- Build a custom data viewer: all context in one screen, one-click correct/incorrect, free-text notes, filtering by segment or error type, hotkeys. A spreadsheet is an acceptable start. Teams with such viewers are claimed to iterate about 10x faster.
- Prefer binary pass/fail with a written critique over 1-5 scales, whose middle boundaries are inconsistent.
- Synthetic test data: define features, scenarios and personas; generate user inputs (not expected outputs); verify generated cases actually trigger the scenario.
- Criteria evolve as people review outputs (citing Shankar et al.); recalibrate LLM judges against humans regularly. Including critiques as few-shot examples raised judge-human agreement by 15-20% in the author's experience.
- Plan experiments with a capability funnel of progressively harder levels of usefulness rather than one pass/fail milestone.

## Feeds

[Error analysis](../concepts/error-analysis.md)

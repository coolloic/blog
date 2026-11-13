---
title: "Source: Raising the bar on SWE-bench Verified with Claude 3.5 Sonnet (Anthropic, 2025)"
summary: "Anthropic's description of a minimal bash-plus-edit-tool scaffold that reached 49% on SWE-bench Verified, with lessons on tool design."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "benchmarks"]
---

- **What:** engineering/research blog post
- **Publisher:** Anthropic
- **Date:** 2025-01-06
- **Original:** [Raising the bar on SWE-bench Verified](https://www.anthropic.com/research/swe-bench-sonnet)

## Summary

Shows that a deliberately thin scaffold (a short prompt, a bash tool, a file view/edit tool, and a loop that runs until the model stops or hits 200k tokens of context) can set state of the art if the tools are designed carefully. Benchmark scores measure the model and scaffold together.

## Key claims

- Scores on SWE-bench Verified: upgraded Claude 3.5 Sonnet 49% (previous SOTA 45%), original 3.5 Sonnet 33%, Claude 3 Opus 22%.
- The prompt suggests, but does not enforce, a sequence: explore, reproduce, edit, verify, check edge cases.
- Requiring absolute paths stopped the model getting lost after `cd`.
- String replacement (`old_str` → `new_str`, must match exactly once, else error and retry) was the most reliable edit format.
- Tool descriptions refined against observed misunderstandings improved results.
- Limitations: some successful runs took hundreds of turns and >100k tokens; some failures were environment/grading issues; the model can't see hidden tests and may believe it succeeded; no image viewing hurt visual tasks.

## Feeds

[Coding agents](../concepts/coding-agents.md)

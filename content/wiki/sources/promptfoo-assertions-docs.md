---
title: "Source: Promptfoo docs: Assertions and metrics"
summary: "Promptfoo reference for its YAML test config and deterministic, model-graded, trace and tool-call assertion types."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** official tool documentation
- **Publisher:** Promptfoo, Inc. (acquisition by OpenAI announced March 2026)
- **Date:** page last updated 13 November 2026; accessed 2026-11-14
- **Original:** [promptfoo.dev/docs/configuration/expected-outputs](https://www.promptfoo.dev/docs/configuration/expected-outputs/)

## Summary

Promptfoo is an open-source CLI and library that runs a matrix of prompts × providers × test cases from a YAML config and scores each output with assertions. This page lists the assertion types and how scores combine.

## Key claims

- Config: `prompts`, `providers`, `tests` (each with `vars` and `assert`), and `defaultTest` for shared assertions.
- Deterministic assertions: `equals`, `contains`, `regex`, `starts-with`, `is-json`, `contains-json`, `is-sql`, `is-refusal`, custom `javascript`/`python`/`webhook`, similarity metrics (`rouge-n`, `bleu`, `levenshtein`), `latency`, `cost`.
- Agent assertions: `is-valid-openai-tools-call`, `tool-call-f1`, trace-span checks and `trajectory:tool-used` / `trajectory:tool-sequence` / `trajectory:step-count`.
- Model-assisted assertions: `llm-rubric`, `g-eval`, `factuality`, `model-graded-closedqa`, `answer-relevance`, `context-faithfulness`, `context-recall`, `context-relevance`, `similar` (embeddings), `classifier`, `moderation`, and pairwise-style `select-best` / `max-score`.
- Any assertion can be negated with a `not-` prefix.
- Each assertion has a `weight` (default 1; 0 records a metric without affecting pass/fail) and optional `threshold`; a test passes when its weighted score meets the test threshold. Named `metric`s and `derivedMetrics` aggregate scores.
- `promptfoo eval` runs the suite; assertions can also be run on stored outputs without calling a model.

## Feeds

[LLM evaluation](../concepts/llm-evaluation.md)

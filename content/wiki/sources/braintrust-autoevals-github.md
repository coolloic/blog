---
title: "Source: Braintrust autoevals (GitHub)"
summary: "MIT-licensed scorer library behind Braintrust: LLM-classifier, RAG, embedding and heuristic scorers usable without the platform."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "braintrust"]
---

- **What:** open-source library README
- **Publisher:** Braintrust
- **Date:** accessed 2026-11-14
- **Original:** [github.com/braintrustdata/autoevals](https://github.com/braintrustdata/autoevals)

## Summary

A Python/TypeScript library of ready-made scorers. LLM scorers are prompt templates whose answer choices map to numeric scores.

## Key claims

- Licence: MIT; the Braintrust integration is optional.
- LLM-as-judge scorers: Battle, ClosedQA, Humor, Factuality, Moderation, Security, Summarization, SQL, Translation.
- RAG scorers (Ragas-style): context precision, relevancy, recall, entity recall, faithfulness, answer relevancy, similarity, correctness.
- Heuristic: Levenshtein, ExactMatch, NumericDiff, JSONDiff; plus embedding similarity, JSON validity, semantic list-contains.
- LLM classifier: template with `{{input}}`, `{{output}}`, `{{expected}}`; `choice_scores` maps the chosen option to a score; `use_cot` makes the judge reason first.
- Works with any OpenAI-compatible endpoint (`OPENAI_BASE_URL`); otherwise falls back to the Braintrust gateway. Returns `Score(name, score, metadata)` without the inputs.

## Feeds

[Braintrust](../concepts/braintrust.md) · [RAGAS and DeepEval](../concepts/ragas-and-deepeval.md)

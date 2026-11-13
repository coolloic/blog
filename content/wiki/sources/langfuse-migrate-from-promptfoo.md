---
title: "Source: Migrate a Promptfoo eval suite to Langfuse (Langfuse guide)"
summary: "Langfuse's mapping of promptfoo config concepts onto Langfuse datasets, evaluators and experiments, with the trade-offs of switching."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "langfuse", "promptfoo"]
---

- **What:** vendor engineering guide (a competitor-written comparison, so read with that bias in mind)
- **Publisher:** Langfuse
- **Date:** undated; states promptfoo docs were checked as of July 2026; accessed 2026-11-14
- **Original:** [langfuse.com/resources/engineering/migrate-from-promptfoo](https://langfuse.com/resources/engineering/migrate-from-promptfoo)

## Summary

A translation table from promptfoo's declarative YAML eval suites to Langfuse's code-first experiments, followed by what each side gains or loses. It is useful as a neutral-ish description of how the two tools model the same eval loop differently.

## Key claims

- `tests` + `vars` map to dataset items (`input`, `expected_output`); deterministic assertions map to evaluator functions; `llm-rubric`/`factuality` map to LLM-as-judge or autoevals scorers; `defaultTest` maps to evaluators passed to every `run_experiment`.
- promptfoo `prompts` map to Langfuse prompt management (versions and labels); the `providers` x `prompts` matrix becomes one experiment run per variant; provider calls become your task function.
- promptfoo signals failure in CI with exit code 100; Langfuse uses `RegressionError` in a script run by its GitHub Action.
- Gains from Langfuse: results sit next to production traces, non-engineers can review in a UI, the same managed judges score offline runs and live traffic, fully self-hostable.
- Losses: promptfoo's declarative catalogue of 30+ assertion types becomes code; YAML becomes Python/TS; the provider matrix becomes a hand-written loop; per-assertion `weight`/`threshold` have no direct equivalent; latency and cost are recorded on traces rather than asserted per item.
- Red teaming has no Langfuse equivalent, so the guide recommends keeping promptfoo for it.
- promptfoo can pull Langfuse-managed prompts via `langfuse://` references, so both can run side by side.

## Feeds

[Langfuse](../concepts/langfuse.md) · [promptfoo](../concepts/promptfoo.md) · [Prompt management](../concepts/prompt-management.md)

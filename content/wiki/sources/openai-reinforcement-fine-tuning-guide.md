---
title: "Source: OpenAI Reinforcement Fine-Tuning Guide"
summary: "OpenAI's documentation for reinforcement fine-tuning (RFT) of o4-mini with graders, plus the API reference for grader types and RFT hyperparameters."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** vendor documentation (guide plus fine-tuning API reference)
- **Author:** OpenAI
- **Date:** RFT launched for o4-mini in May 2025; read 2026-11-14 (the guide was read through a mirror because the official page returned errors)
- **Original:** [Reinforcement fine-tuning guide](https://developers.openai.com/api/docs/guides/reinforcement-fine-tuning) · [Exploring model graders for RFT (cookbook)](https://developers.openai.com/cookbook/examples/reinforcement_fine_tuning) · [Deprecations](https://developers.openai.com/api/docs/deprecations)

## Summary

RFT trains an OpenAI reasoning model against a grader that you define, instead of against fixed target answers. You upload prompts plus whatever reference fields the grader needs. The service samples answers, scores them and reinforces the higher-scoring reasoning. The guide covers task fit, the dataset format, the grader types, training metrics and reward hacking. As of November 2026 the feature is effectively over: its only base model, o4-mini, was shut down on 2026-10-23, and the whole fine-tuning platform is winding down.

## Key claims

- Supported only on o-series reasoning models, and in practice only `o4-mini-2025-04-16`.
- Workflow: write a grader that returns a numeric reward, upload a JSONL prompt dataset with a validation split, start the job, monitor checkpoints, then deploy through the normal API.
- Each JSONL line holds a `messages` array plus any extra fields the grader needs, such as a reference answer. Graders reference these as `{{item.field}}` and the model output as `{{sample.output_text}}` or `{{sample.output_json.field}}`.
- Grader types: `string_check` (eq, ne, like, ilike), `text_similarity` (cosine, fuzzy_match, BLEU, GLEU, METEOR, ROUGE variants), `score_model` (an LLM scores against a rubric, default range 0–1), `label_model`, `python` (runs in a remote sandbox) and `multi` (combines graders with a `calculate_output` formula). Alpha endpoints let you run and validate a grader before training.
- Task fit: the task must be unambiguous, so that qualified experts working independently converge on the same answer. It must also be guess-proof, and the base model must already succeed some of the time, because a 0% success rate cannot be bootstrapped. Run evals first and check that scores are not pinned at the minimum or maximum.
- Data size: start with several dozen to a few hundred high-quality examples. Limits are 50,000 training and 1,000 test examples.
- RFT hyperparameters (API reference): `batch_size` (1–256), `learning_rate_multiplier`, `n_epochs` (1–50), `compute_multiplier` (up to 10), `eval_interval`, `eval_samples` and `reasoning_effort` (`default`, low, medium or high). Each also accepts `"auto"`.
- Metrics: `train_reward_mean`, `valid_reward_mean`, per-grader rewards (to catch overfitting to one grader), reasoning-token counts, and grader latency and error rates. Checkpoints are kept for the top three validation rewards. Jobs can be paused and resumed.
- Reward hacking: the model can learn to score well while being wrong. Inspect outputs on representative prompts before deploying.
- Billing covers time in the core training loop plus grader-model tokens. Data validation, queueing and safety checks are not billed. OpenAI's RFT billing guide on its help center gives $100 per hour of core training-loop time for `o4-mini-2025-04-16`, prorated to the second; grader-model tokens are billed separately at the grader's token rates. This was seen only in search-result excerpts, because the help page blocked automated fetches on 2026-11-14. Trained models go through a 13-category safety evaluation, which can block deployment.
- The cookbook (May 2025) applies RFT to o4-mini on medical verifiable problems and compares exact-match and similarity graders. It stresses checking that the gold answers are correct.
- The deprecations page lists `o4-mini`, `o4-mini-2025-04-16` and `ft-o4-mini-2025-04-16` as shut down on 2026-10-23 (notice 2026-04-22). Self-serve fine-tuning job creation is being wound down in steps. From 2026-05-07 it was closed to organisations that had never run fine-tuning. From 2026-07-02 it was also closed to organisations with no inference on a fine-tuned model in the past 60 days. Remaining active customers lose job creation on 2027-01-06.
- The dataset limits (50,000 training, 1,000 test) and the top-three checkpoint rule come from the mirrored guide and were not re-checked against an official page on 2026-11-14.

## Feeds

[Reinforcement fine-tuning](../concepts/reinforcement-fine-tuning.md)

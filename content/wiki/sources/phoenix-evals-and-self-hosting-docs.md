---
title: "Source: Arize Phoenix docs: evals, experiments, phoenix-otel, self-hosting, and Arize pricing"
summary: "Phoenix's evaluator model (ClassificationEvaluator, Score, pre-built metrics), dataset experiments, register() tracing setup, free ELv2 self-hosting, and Arize AX plan prices."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "observability", "phoenix"]
---

- **What:** official documentation, GitHub READMEs and pricing page
- **Publisher:** Arize AI
- **Date:** accessed 2026-11-14
- **Original:** [LLM evals overview](https://arize.com/docs/phoenix/evaluation/llm-evals), [How-to evals](https://arize.com/docs/phoenix/evaluation/how-to-evals), [Custom LLM evaluators](https://arizeai-433a7140.mintlify.site/docs/phoenix/evaluation/how-to-evals/custom-llm-evaluators.md), [Pre-built metrics](https://arizeai-433a7140.mintlify.site/docs/phoenix/evaluation/pre-built-metrics.md), [Datasets quickstart](https://arizeai-433a7140.mintlify.app/docs/phoenix/datasets-and-experiments/quickstart-datasets.md), [phoenix-otel setup](https://arize.com/docs/phoenix/tracing/how-to-tracing/setup-tracing/setup-using-phoenix-otel), [Self-hosting](https://arizeai-433a7140.mintlify.app/docs/phoenix/self-hosting.md), [License](https://arizeai-433a7140.mintlify.app/docs/phoenix/self-hosting/license.md), [Phoenix GitHub](https://github.com/Arize-ai/phoenix), [OpenInference GitHub](https://github.com/Arize-ai/openinference), [Arize pricing](https://arize.com/pricing/)

## Summary

Phoenix's eval layer (`arize-phoenix-evals`) runs code and LLM evaluators client-side or server-side, returning typed `Score` objects; its experiments run a task over a dataset and score it. Self-hosting is free and unrestricted; Arize AX is the paid SaaS/enterprise product.

## Key claims

- Evaluators return `Score` with `name`, `kind` (llm, code, human), `direction`, and optional `score`, `label`, `explanation`, `metadata`; they expose `evaluate` / `async_evaluate` and an `input_schema`.
- `input_mapping` maps evaluator fields to data by key, dot/JSONPath path or callable; `bind_evaluator` fixes the mapping. `async_evaluate_dataframe` batches with an executor that handles rate limits, retries and dynamic concurrency (claimed up to 20x speedup).
- LLM judges answer via forced tool calling / structured output, never free-text parsing. `ClassificationEvaluator(name, prompt_template, llm, choices, direction)`: `choices` is a label list or a label-to-score dict. `LLM(provider, model)` returns label plus explanation; `DecisionModel` returns per-label probabilities and no explanation.
- Each evaluator run is itself traced to a dedicated Phoenix project (judge prompt, reasoning, score, timing).
- Pre-built LLM metrics: faithfulness, hallucination, completeness, conciseness, correctness, retrieval relevance, tool selection, tool invocation, tool response handling, refusal, user friction, PII, toxicity; code metrics: exact match, regex, precision/recall/F1. Arize states its templates reach F1 of 85%+ on its golden datasets (vendor claim).
- Experiments: `create_dataset(name, examples)` then `run_experiment(dataset, task, evaluators, experiment_name)`; results compared in the dataset's Experiments tab. TypeScript equivalents in `@arizeai/phoenix-client`.
- `phoenix.otel.register(project_name, auto_instrument, batch, endpoint, protocol, headers)`; Python defaults to `batch=False`, TypeScript to `batch: true` (call `shutdown()` to flush). Env vars: `PHOENIX_COLLECTOR_ENDPOINT`, `PHOENIX_API_KEY`, `PHOENIX_PROJECT_NAME`; local server at `localhost:6006`.
- Packages: `arize-phoenix` (server), `arize-phoenix-otel`, `arize-phoenix-client`, `arize-phoenix-evals`; TS `@arizeai/phoenix-otel`, `-client`, `-evals` (alpha), `-cli` (`px setup` hands instrumentation to a coding agent).
- OpenInference (Apache-2.0) instrumentors exist for Python, JS, Java and Go and export to any OTel collector; span processors translate OpenLIT and OpenLLMetry traces.
- Self-hosting: free, no usage limits or feature gates, air-gappable; OAuth2/LDAP/local auth, RBAC, retention policies; Docker (`arizephoenix/phoenix`), Helm, CloudFormation; SQLite by default, PostgreSQL for production. Licence is Elastic License 2.0 (the docs call it open source; ELv2 is source-available, not OSI-approved).
- Arize AX pricing (2026-11-14): Free (25k spans/month, 1 GB, 15-day retention), Pro $50/month (50k spans, 10 GB, 30 days), Enterprise custom with SaaS or self-hosted deployment.

## Feeds

[Arize Phoenix](../concepts/arize-phoenix.md)

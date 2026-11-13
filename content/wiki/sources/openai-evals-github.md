---
title: "Source: openai/evals (GitHub)"
summary: "OpenAI's open-source eval framework and registry, where basic and model-graded evals are defined in YAML and JSONL."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** open-source repository README
- **Publisher:** OpenAI
- **Date:** accessed 2026-11-14 (repository first released March 2023)
- **Original:** [github.com/openai/evals](https://github.com/openai/evals)

## Summary

A framework and public registry of evals. Basic (match-style) and model-graded evals need no code: a JSONL dataset plus YAML parameters in the registry. The README points users to configuring evals in the OpenAI dashboard.

## Key claims

- Registry data is stored with Git LFS under `evals/registry/data`; eval definitions are YAML under `evals/registry/evals`.
- Basic and model-graded templates need only data and YAML; the project no longer accepts evals with custom code.
- Install with `pip install evals` (Python 3.9+).
- The hosted dashboard version of Evals is being deprecated: read-only from 31 October 2026, shut down 30 November 2026 (per OpenAI's eval guide).

## Feeds

[LLM evaluation](../concepts/llm-evaluation.md)

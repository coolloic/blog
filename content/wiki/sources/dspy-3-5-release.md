---
title: "Source: DSPy 3.5 release notes"
summary: "DSPy 3.5 (2026-11-10): XMLAdapter becomes the default, LiteLLM becomes optional via the lm15 engine, ReActV2 replaces ReAct, and RLM, Flex and GEPA leave experimental."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "prompting"]
---

- **What:** GitHub release notes, "DSPy 3.5: A Lighter, Faster Foundation"
- **Publisher:** stanfordnlp/dspy maintainers
- **Date:** 2026-11-10
- **Original:** [github.com/stanfordnlp/dspy/releases](https://github.com/stanfordnlp/dspy/releases)

## Summary

A breaking release that changes prompts, defaults and APIs. The maintainers tell users to read the upgrade guide and **re-evaluate optimized programs**, because the default adapter changed the prompt format even where signatures are unchanged.

## Key claims

- `XMLAdapter` is now the default adapter, which changes prompts and the output contract for unchanged signatures.
- LiteLLM and the OpenAI Python library are optional; DSPy calls providers through the lightweight lm15 engine. Measured default install fell from 206.7 MiB to 30.9 MiB, dependencies from 65 to 25, and import time from 1.01 s to 0.49 s (3.3.0 vs a 3.5 snapshot).
- `model_type="auto"` routes between chat and responses API families automatically.
- ReActV2 becomes `dspy.ReAct`, with structured History and a typed `submit` tool; the old name is deprecated until 3.6.
- `dspy.RLM`, `dspy.Flex` and `dspy.GEPA` are no longer experimental; RLM gains History save/reload and image handling.
- Tools can return images and files on supported providers; disk caches default to restricted (non-pickle) loading.
- The notes recommend native reasoning, with an explicit plan only when planning or human auditability helps.

## Feeds

[DSPy](../concepts/dspy.md)

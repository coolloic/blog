---
title: "Source: DSPy documentation (signatures, modules, adapters, optimizers)"
summary: "DSPy's official docs on declaring LM behaviour as signatures, composing modules, how adapters turn signatures into prompts, and the catalogue of prompt and weight optimizers."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "prompting"]
---

- **What:** the "Learn" section of the DSPy docs: Signatures, Modules, Adapters, Optimizers, plus the GEPA and MIPROv2 API pages
- **Publisher:** Stanford NLP / DSPy maintainers
- **Date:** living docs (source Markdown on the `main` branch), read 2026-11-14, corresponding to DSPy 3.5
- **Original:** [dspy.ai](https://dspy.ai/) (source at [stanfordnlp/dspy/docs](https://github.com/stanfordnlp/dspy/tree/main/docs/docs/learn))

## Summary

DSPy replaces hand-written prompts with **signatures** (typed input → output declarations whose field names carry meaning), **modules** that implement a prompting strategy for any signature, and **optimizers** that tune a program's prompts (instructions and few-shot demos) or LM weights against a metric. **Adapters** sit between `dspy.Predict` and the LM: they render signature, inputs and demos into chat messages and parse the response back into typed fields.

## Key claims

- Signatures can be inline strings (`"context: list[str], question: str -> answer: str"`, default type `str`) or classes with a docstring and `InputField`/`OutputField(desc=...)`; types include `bool`, `Literal[...]`, lists, dicts and Pydantic models.
- Modules: `Predict` (base; stores instructions, demos, LM), `ChainOfThought` (adds a `reasoning` output field), `ReAct` (tool-using agent), `MultiChainComparison`, `RLM` (recursive LM exploring large contexts via a sandboxed Python REPL), plus `majority`, `BestOfN`, `Refine`, `Parallel`. Every module is built on `Predict`. Modules compose like PyTorch `nn.Module`s inside plain Python `forward()` code.
- Usage tracking (`dspy.configure(track_usage=True)`), and cached responses are not counted as billed usage.
- Adapter flow: `Adapter.format()` builds messages; the LM responds; `Adapter.parse()` extracts outputs. Since 3.5 the implicit default is `XMLAdapter(use_native_function_calling=True)` (fields as `<field>` tags); XML formatting is parsed and validated by DSPy, not provider-enforced. `ChatAdapter` uses `[[ ## field ## ]]` markers and falls back to `JSONAdapter` on failure; `JSONAdapter` uses the provider's `response_format` structured output and is not advised for models without native structured output (e.g. small Ollama models).
- An optimizer takes a program, a metric (higher is better) and training inputs, which can be as few as 5 to 10 and may be unlabelled.
- Few-shot optimizers: `LabeledFewShot`, `BootstrapFewShot` (teacher generates demos, kept only if they pass the metric; `max_labeled_demos`, `max_bootstrapped_demos`), `BootstrapFewShotWithRandomSearch` (`num_candidate_programs`), `KNNFewShot`.
- Instruction optimizers: `COPRO` (coordinate ascent), `MIPROv2` (bootstrap traces → grounded instruction proposals → Bayesian search over instruction+demo combos on mini-batches; `auto="light"|"medium"|"heavy"`), `SIMBA` (finds high-variance hard examples, writes self-reflective rules), `GEPA` (reflective evolution using textual feedback).
- Weight and meta optimizers: `BootstrapFinetune` (distils a prompted program into fine-tuned weights), `Ensemble`, `BetterTogether` (alternates prompt and weight optimization).
- Starting guidance: about 10 examples → `BootstrapFewShot`; 50+ → random search; zero-shot instruction-only → `MIPROv2` 0-shot; 200+ examples and 40+ trials → full `MIPROv2`; then `BootstrapFinetune` to move to a small LM.
- Cost: a typical simple run is on the order of $2 and ten minutes, ranging from cents to tens of dollars. Reported examples: a ReAct agent on HotPotQA went from 24% to 51% with MIPROv2 light (DSPy 2.5.29, informal), and a RAG tutorial from 53% to 61%.
- GEPA known limitation: predictors sharing the same signature can receive each other's reflective examples.

## Feeds

[DSPy](../concepts/dspy.md)

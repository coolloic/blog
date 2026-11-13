---
title: "Source: Prompt & Context Engineering (Notebook tutorial)"
summary: "The owner's tutorial on prompt anatomy, prompting techniques, structured output, the context window, prompt caching and context engineering."
category: source
lastmod: 2026-11-14
tags: ["prompting", "notebook"]
---

- **What:** interactive tutorial in the owner's Notebook
- **Author:** Loic
- **Date:** accessed 2026-11-14
- **Original:** [Prompt & Context Engineering](https://coolloic.github.io/Notebook/prompt-engineering.html)

## Summary

A compact tutorial that frames prompt engineering as crafting one call's input and context engineering as managing everything the model sees across an agent run. It names the parts of a prompt, tabulates common techniques, and covers structured output, the shared token budget and caching.

## Key claims

- A prompt has four parts: role/system, task, context, format.
- Biggest wins, in order: be specific about the task, show the output format, give a few examples, supply only relevant context.
- Techniques: zero-shot, few-shot (2–5 examples), role/persona, chain-of-thought, decomposition (prompt chaining), giving the model an "I don't know" out, delimiters to fence untrusted input.
- For machine-consumed output, request JSON and enforce a schema with structured-output APIs rather than parsing prose.
- All prompt parts and the output share one context budget; more context is not always better (cost, latency, lost-in-the-middle).
- Prompt caching: put stable content first, variable content last.

## Feeds

[Prompt engineering](../concepts/prompt-engineering.md) · [Few-shot prompting](../concepts/few-shot-prompting.md) · [System prompts](../concepts/system-prompts.md)

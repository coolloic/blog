---
title: "Source: Say What You Mean (.txt response to Let Me Speak Freely)"
summary: "Will Kurt (.txt): re-runs the 'Let Me Speak Freely' experiments and finds structured generation matches or beats unstructured output when prompts are fair."
category: source
lastmod: 2026-11-14
tags: ["prompting", "structured-outputs", "engineering-blog"]
---

- **What:** vendor engineering blog post (.txt, the company behind Outlines)
- **Author/publisher:** Will Kurt, .txt (dottxt)
- **Date:** undated on the page; written after the August 2024 paper it rebuts; read 2026-11-14
- **Original:** [Say What You Mean: A Response to 'Let Me Speak Freely'](https://blog.dottxt.ai/say-what-you-mean.html)

## Summary

Rebuts Tam et al.'s claim that format restrictions hurt reasoning. The author argues the original study confounded several things: it used an LLM (Claude 3 Haiku) to parse answers, gave the free-text and JSON conditions different prompts, never told the model about JSON or a schema in the JSON prompt, and treated vendor "JSON mode" as if it were structured generation. Re-running with Llama-3-8B-Instruct and matched prompts, structured generation scored equal or higher. Note the author's company sells structured generation.

## Key claims

- Re-implementation results, unstructured vs structured: GSM8K 0.77 vs 0.78; Last Letter 0.73 vs 0.77; Shuffle Objects 0.41 vs 0.44.
- Answer parsing matters a lot: on Last Letter, a strict regex scored 0.35, the AI parser 0.57, a flexible regex 0.61.
- JSON mode (a training approach without guarantees) is not the same as constrained generation.
- Practical advice: use the model's chat template, show an example of the target structure, describe the schema in the prompt, and keep prompts identical when comparing methods. Structured output can include a reasoning field before the answer.

## Feeds

[Constrained decoding](../concepts/constrained-decoding.md)

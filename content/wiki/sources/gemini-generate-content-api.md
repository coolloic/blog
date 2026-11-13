---
title: "Source: generateContent / GenerationConfig (Gemini API reference)"
summary: "Google's API reference for Gemini generation settings: temperature, topP, topK, stop sequences, penalties, seed and logprobs."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** official API reference
- **Author:** Google
- **Date:** accessed 2026-11-14
- **Original:** [Generating content (API reference)](https://aistudio.google.com/api-reference/generate-content)

## Summary

Documents the generation configuration fields Gemini accepts and how newer models treat them.

## Key claims

- stopSequences: up to 5; output stops at the first match and the sequence is not returned.
- temperature ranges 0.0-2.0; defaults vary by model.
- temperature, topP and topK are silently ignored on Gemini 3.6 Flash and newer models.
- presencePenalty is a one-time penalty once a token has appeared; frequencyPenalty scales with how often it has appeared; large negative frequency penalties can cause runaway repetition.
- seed fixes the decoding seed (random if unset); responseLogprobs/logprobs return up to 20 top log-probabilities per step.
- maxOutputTokens caps each candidate; default varies by model.

## Feeds

[Sampling parameters](../concepts/sampling-parameters.md)

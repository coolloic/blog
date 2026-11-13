---
title: "Source: Long context prompting for Claude 2.1 (Anthropic)"
summary: "Anthropic post showing a needle-in-a-haystack failure was model reluctance, fixed by one prefilled sentence (27% to 98%)."
category: source
lastmod: 2026-11-14
tags: ["models", "long-context", "prompting"]
---

- **What:** vendor blog post
- **Publisher:** Anthropic
- **Date:** 6 December 2023
- **Original:** [claude.com/blog/claude-2-1-prompting](https://claude.com/blog/claude-2-1-prompting)

## Summary

A public needle-in-a-haystack test had placed an out-of-place sentence about San Francisco inside Paul Graham essays and reported poor recall for Claude 2.1 (200K window). Anthropic's analysis: the model often noticed the sentence but declined to treat a single incongruous line as the answer, a side effect of training to reduce inaccurate claims. When the answer sat in natural context it was found at any position. Prefilling the assistant turn with a short lead-in naming "the most relevant sentence" removed the reluctance.

## Key claims

- Accuracy on the original NIAH test rose from 27% to 98% with the prefill.
- A naturally embedded fact (a Viaweb question) was answered correctly regardless of position; the prefill version scored 90-95% on it.
- An internal test with an invented holiday in an appropriations bill showed the same hesitation: the model saw the sentence but doubted it was real.
- Claude 2.1 context was 200K tokens; the release claimed 30% fewer incorrect answers and a 3-4x lower rate of wrongly saying a document supports a claim than Claude 2.0.
- Lesson: NIAH results mix retrieval ability with answer-willingness; synthetic needles that do not fit the document are a confound.

## Feeds

[Long-context degradation](../concepts/long-context-degradation.md) · [Hallucination](../concepts/hallucination.md)

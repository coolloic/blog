---
title: "Source: Reduce hallucinations (Claude Docs)"
summary: "Anthropic's guide to prompting techniques that reduce hallucinations: allow uncertainty, ground in quotes, cite and verify."
category: source
lastmod: 2026-11-14
tags: ["models", "hallucination", "prompting"]
---

- **What:** vendor documentation page, Claude Developer Platform
- **Publisher:** Anthropic
- **Date:** undated living doc (read 2026-11-14)
- **Original:** [platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

## Summary

A practical checklist of prompt-level hallucination controls, split into basic and advanced techniques, with worked examples (M&A analysis, privacy-policy audit, press release). It ends by stating the techniques reduce but do not eliminate hallucinations, so critical outputs still need validation.

## Key claims

- **Allow "I don't know":** explicit permission to admit uncertainty substantially reduces false information.
- **Quote first:** for long documents (over about 20k tokens), have the model extract word-for-word quotes, then work only from them.
- **Cite and verify:** require a supporting quote per claim; after drafting, have the model find a quote for each claim and retract claims it cannot support.
- **Advanced:** review thinking output for faulty reasoning; best-of-N sampling and compare (inconsistency signals hallucination); iterative refinement; restrict the model to the provided documents rather than general knowledge.

## Feeds

[Hallucination](../concepts/hallucination.md)

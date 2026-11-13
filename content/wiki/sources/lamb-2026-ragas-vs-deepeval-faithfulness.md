---
title: "Source: Same fabricated answer, RAGAS scored 0.0 and DeepEval 1.0 (Nick Lamb)"
summary: "Small practitioner experiment showing RAGAS and DeepEval 'faithfulness' measure different things, plus judge variance and cost figures."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** practitioner blog post (DEV Community)
- **Author:** Nick Lamb
- **Date:** 2026-07-30
- **Original:** [dev.to post](https://dev.to/nickjlamb/we-gave-the-same-fabricated-answer-to-ragas-and-deepeval-one-scored-it-00-the-other-scored-it-10-57om)

## Summary

The author scored 27 RAG outputs (6 captured, the rest mutants with one injected defect each) five times with RAGAS and DeepEval faithfulness using gpt-4o at temperature 0, alongside deterministic checks. Small, synthetic, and the author built one of the compared tools, so treat as anecdotal.

## Key claims

- A fabricated claim absent from the context scored 0.0 in RAGAS (claims must be supported) and 1.0 in DeepEval in all five repeats (claims must merely not contradict).
- On six outputs asserting things missing from sources, RAGAS caught 5, DeepEval 0; on clear contradictions they were close (7/10 vs 9/10).
- Judges caught meaning inversions well; they caught almost no omissions (0/5, 1/5), which deterministic required-fact checks caught 5/5.
- Variance: with gpt-4o at temperature 0 the mean per-output score range across repeats was 0.026 (RAGAS) and 0.013 (DeepEval); with gpt-4o-mini, 11 of 27 outputs flipped verdict between repeats.
- Cost: about $11.49 (RAGAS) and $8.29 (DeepEval) per 1,000 evaluations versus ~$0 for deterministic checks.
- Advice: read a metric's implementation before trusting its name; gate releases on deterministic checks and use judges for semantic checks.

## Feeds

[RAGAS and DeepEval](../concepts/ragas-and-deepeval.md)

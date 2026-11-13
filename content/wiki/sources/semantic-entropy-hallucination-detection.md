---
title: "Source: Detecting hallucinations in large language models using semantic entropy (Nature, 2024)"
summary: "Oxford paper that detects confabulations by sampling several answers, clustering them by meaning, and measuring entropy over meanings."
category: source
lastmod: 2026-11-14
tags: ["models", "hallucination", "evaluation"]
---

- **What:** peer-reviewed paper, *Nature* 630, 625-630
- **Authors:** Sebastian Farquhar, Jannik Kossen, Lorenz Kuhn, Yarin Gal (University of Oxford)
- **Date:** 19 June 2024
- **Original:** [nature.com/articles/s41586-024-07421-0](https://www.nature.com/articles/s41586-024-07421-0) (open access copy on [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11186750/))

## Summary

The paper targets one subtype of hallucination, **confabulation**: answers that are both wrong and arbitrary, changing with irrelevant factors such as the random seed. It samples several answers, groups them into meaning clusters using bidirectional entailment (A entails B and B entails A), and computes entropy over clusters rather than over token strings. High semantic entropy flags a likely confabulation, so the system can abstain or escalate.

## Key claims

- Confabulation is distinguished from consistent errors learned from bad training data, deliberate deception, and systematic reasoning failures; semantic entropy does not catch those.
- Averaged over 30 task-model combinations, semantic entropy reached AUROC 0.790 versus 0.691 for naive (token) entropy, 0.698 for P(True) and 0.687 for embedding regression.
- The method used ten generations per question, so it multiplies inference cost.
- For long-form text it needs extra steps: decompose into claims, generate questions per claim, then apply the method.
- Results depend on the entailment model; clustering can be over-sensitive (a full date versus a bare year counted as different meanings).

## Feeds

[Hallucination](../concepts/hallucination.md)

---
title: "Source: Why Do Multi-Agent LLM Systems Fail? (Cemri et al., 2025)"
summary: "Berkeley paper deriving MAST, a 14-mode failure taxonomy for multi-agent systems, by grounded-theory coding of execution traces."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "agents"]
---

- **What:** research paper, arXiv:2503.13657
- **Authors:** Mert Cemri, Melissa Z. Pan, Shuyi Yang, Lakshya A. Agrawal, Bhavya Chopra, Rishabh Tiwari, Kurt Keutzer, Aditya Parameswaran, Dan Klein, Kannan Ramchandran, Matei Zaharia, Joseph E. Gonzalez, Ion Stoica
- **Date:** 17 March 2025 (v3 26 October 2025)
- **Original:** [arxiv.org/abs/2503.13657](https://arxiv.org/abs/2503.13657)

## Summary

A worked example of qualitative error analysis at research scale. Six experts read about 150 multi-agent traces using Grounded Theory (open coding, constant comparison, memoing) until no new failure types appeared, validated the resulting taxonomy for inter-annotator agreement, then scaled labelling with an LLM annotator to 1,642 traces across seven frameworks.

## Key claims

- Method: Grounded Theory on ~150 traces from five frameworks (HyperAgent, AppWorld, AG2, ChatDev, MetaGPT), more than 20 hours of annotation per expert, continued to theoretical saturation.
- Agreement: three annotators, three rounds of inter-annotator agreement (about 10 hours spent resolving disagreements); Cohen's kappa 0.88 in the final rounds.
- LLM annotator (o1, few-shot): 94% accuracy, kappa 0.77 against humans; kappa 0.79 on two unseen systems.
- **MAST**: 14 failure modes in 3 categories. System design: disobey task spec (11.8%), disobey role spec (1.5%), step repetition (15.7%), loss of conversation history (2.8%), unaware of termination conditions (12.4%). Inter-agent misalignment: conversation reset (2.2%), fail to ask for clarification (6.8%), task derailment (7.4%), information withholding (0.85%), ignored other agent's input (1.9%), reasoning-action mismatch (13.2%). Task verification: premature termination (6.2%), no or incomplete verification (8.2%), incorrect verification (9.1%).
- Multi-agent systems often show only minimal gains over single-agent baselines on popular benchmarks; failure rates of 41% to 86.7% across 7 open-source systems.
- Targeted fixes help but do not solve the problem: adding a high-level objective verification step to ChatDev raised task success by 15.6% on ProgramDev; improved role specifications (making the CEO agent have the final say) gave +9.4%.
- MAST-Data, the taxonomy and the LLM annotator are released.

## Feeds

[Error analysis](../concepts/error-analysis.md) · [Agent evaluation](../concepts/agent-evaluation.md)

---
title: "Source: On the Brittle Foundations of ReAct Prompting for Agentic LLMs (Verma et al., 2024)"
summary: "Sensitivity study on ALFWorld: ReAct's gains track exemplar-query similarity, not the interleaving of thoughts or their content."
category: source
lastmod: 2026-11-14
tags: ["agents", "reasoning", "paper"]
---

- **What:** research preprint, arXiv:2405.13966 (Arizona State University)
- **Authors:** Mudit Verma, Siddhant Bhambri, Subbarao Kambhampati
- **Date:** 2024-05-22 (v1)
- **Original:** [arXiv:2405.13966](https://arxiv.org/abs/2405.13966)

## Summary

The authors perturb ReAct's few-shot prompts on ALFWorld along three axes: where reasoning appears (interleaved vs collected up front), what the reasoning says (including wrong or placebo guidance), and how similar the exemplars are to the query task. They test GPT-3.5-Turbo, GPT-3.5-Instruct, GPT-4 and Claude Opus. Moving or degrading the thoughts barely matters; changing exemplar similarity matters a lot.

## Key claims

- Interleaving reasoning with actions is not what drives performance: putting all the reasoning in one block before the action sequence performs comparably or better for the GPT models.
- The content of the thoughts matters little: exemplars with failure steps or placebo guidance text do not collapse performance.
- Performance depends on how closely the exemplars match the query: synonym substitutions for objects and locations, or exemplars drawn from a different task type, cause large drops.
- Conclusion: apparent reasoning comes from approximate retrieval over similar exemplars; ReAct therefore needs instance-specific examples, which raises prompt-engineering cost and may not scale. The authors urge caution in using ReAct-style prompting for planning.
- Scope: one domain (ALFWorld), few-shot prompting with text-format actions, models of 2023–2024.

## Feeds

[ReAct pattern](../concepts/react-pattern.md)

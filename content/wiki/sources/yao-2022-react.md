---
title: "Source: ReAct: Synergizing Reasoning and Acting in Language Models (Yao et al., 2022)"
summary: "Yao et al. (ICLR 2023): prompt an LLM to interleave free-text thoughts with environment actions and observations; beats act-only and imitation/RL baselines on ALFWorld and WebShop."
category: source
lastmod: 2026-11-14
tags: ["agents", "reasoning", "paper"]
---

- **What:** research paper (ICLR 2023), arXiv:2210.03629; work done partly during a Google internship (Google Brain and Princeton)
- **Authors:** Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao
- **Date:** v1 2022-10-06, v3 2023-03-10 (ICLR camera-ready)
- **Original:** [arXiv:2210.03629](https://arxiv.org/abs/2210.03629) · [project page and code](https://react-lm.github.io/)

## Summary

Chain-of-thought reasoning is ungrounded (it can hallucinate facts and propagate errors), while earlier LLM-as-policy work acts without reasoning about goals. ReAct augments the agent's action space with the space of language: a "thought" is an action that changes nothing in the environment and returns no observation, but adds reasoning to the context that conditions later actions. A frozen PaLM-540B is prompted with a few human-written thought/action/observation trajectories. On reasoning tasks thoughts and actions alternate every step (dense thoughts); on long-horizon decision tasks the model decides itself when to think (sparse thoughts).

## Key claims

- Formalism: policy over context c_t = (o_1, a_1, …, o_t); ReAct extends the action space A to A ∪ L, where L is language.
- Thought types: decompose the goal and plan, inject commonsense, extract key facts from observations, track progress, handle exceptions and reformulate searches, synthesise the answer.
- Knowledge tasks (HotpotQA, FEVER, question-only setting) use a deliberately weak Wikipedia API: `search[entity]` (first 5 sentences or top-5 similar titles), `lookup[string]` (next sentence containing the string, like Ctrl+F), `finish[answer]`. Prompts use 6 (HotpotQA) and 3 (FEVER) exemplars; more did not help.
- PaLM-540B results (HotpotQA EM / FEVER acc): Standard 28.7 / 57.1; CoT 29.4 / 56.3; CoT-SC (21 samples, temperature 0.7) 33.4 / 60.4; Act 25.7 / 58.9; ReAct 27.4 / 60.9; CoT-SC→ReAct 34.2 / 64.6; ReAct→CoT-SC 35.1 / 62.0; supervised SoTA 67.5 / 89.5.
- Hybrid heuristics: ReAct→CoT-SC backs off when ReAct gives no answer within 7 (HotpotQA) or 5 (FEVER) steps; CoT-SC→ReAct backs off when the majority answer gets fewer than n/2 of n votes. Both reach 21-sample CoT-SC accuracy with 3–5 samples.
- Human analysis of 200 HotpotQA trajectories: false positives (hallucinated facts in a correct answer) 6% for ReAct vs 14% for CoT; among failures, hallucination 0% for ReAct vs 56% for CoT, but reasoning errors 47% vs 16%. Non-informative search causes 23% of ReAct failures. A ReAct-specific failure is repeating earlier thoughts and actions in a loop, which the authors suspect is partly due to greedy decoding.
- Fine-tuning PaLM-8B/62B on 3,000 correct ReAct trajectories makes ReAct the best of four methods; prompted ReAct is the worst at those sizes. Fine-tuned 8B ReAct beats all 62B prompting methods; fine-tuned 62B beats all 540B prompting methods.
- ALFWorld (134 unseen games, 2-shot from 3 annotated trajectories per task type): best ReAct trial 71% success vs best Act 45% and BUTLER 37% (imitation learning on 10^5 expert trajectories per task type); even the worst ReAct trial (48%) beats both. ReAct-IM (Inner-Monologue-style thoughts that only restate environment feedback) reaches 53%.
- WebShop (one-shot, 500 test instructions; score / success rate): Act 62.3 / 30.1, ReAct 66.6 / 40.0, IL 59.9 / 29.1, IL+RL 62.4 / 28.7, human expert 82.1 / 59.6.
- Appendix: GPT-3 (text-davinci-002, greedy) beats PaLM-540B with ReAct prompting (HotpotQA 30.8 vs 29.4; ALFWorld 78.4 vs 70.9).
- Stated limits: complex tasks with large action spaces need more demonstrations than fit in the context window; humans can inspect and edit thoughts mid-run to correct behaviour.

## Feeds

[ReAct pattern](../concepts/react-pattern.md)

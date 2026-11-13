---
title: "Source: Why Language Models Hallucinate (Kalai et al., 2025)"
summary: "OpenAI/Georgia Tech paper arguing hallucinations are a statistical consequence of pretraining and persist because benchmarks reward guessing."
category: source
lastmod: 2026-11-14
tags: ["models", "hallucination"]
---

- **What:** research paper (arXiv:2509.04664)
- **Authors:** Adam Tauman Kalai, Ofir Nachum, Santosh S. Vempala, Edwin Zhang (OpenAI and Georgia Tech)
- **Date:** 4 September 2025
- **Original:** [arxiv.org/abs/2509.04664](https://arxiv.org/abs/2509.04664)

## Summary

The paper gives a learning-theory account of hallucination. It reduces generating valid text to a binary "Is-It-Valid" (IIV) classification problem and shows that a model's generative error rate is bounded below by roughly twice its IIV misclassification rate. So even with error-free training data, the pretraining objective produces some plausible falsehoods. Hallucinations then survive post-training because nearly all mainstream benchmarks grade answers right/wrong with no credit for abstaining, which makes guessing the score-maximising policy. The fix it proposes is socio-technical: change how existing benchmarks score, using explicit confidence targets.

## Key claims

- Generative error is at least about 2 x IIV misclassification rate (minus small terms); the authors call the factor 2 fairly tight.
- **Arbitrary facts and the singleton rate:** for facts with no learnable pattern (e.g. birthdays), the hallucination rate after pretraining is at least the fraction of such facts seen exactly once in training. If 20% of birthday facts appear once, expect at least about 20% hallucination on them.
- **Poor models:** some errors come from the model class being unable to represent the task. The paper cites DeepSeek-V3 giving 2 or 3 as the number of Ds in "DEEPSEEK" across ten trials, while the reasoning model DeepSeek-R1 counts correctly; tokenization is named as a representational obstacle.
- Base models trained with cross-entropy tend to be calibrated; GPT-4's pretrained model is well calibrated on multiple choice, and calibration degrades after RL post-training.
- Of 10 popular benchmarks analysed (GPQA, MMLU-Pro, IFEval, Omni-MATH, BBH, MATH L5, MuSR, SWE-bench, HLE, WildBench), 9 use binary grading with no credit for "I don't know". Under binary grading, abstaining is never strictly optimal.
- **Proposed fix:** state a confidence threshold t in the instructions; correct = +1, IDK = 0, wrong = -t/(1-t). Answering beats abstaining only if P(correct) > t. The target behaviour is "behavioural calibration".
- The paper's worked examples are t = 0.5 (penalty 1), t = 0.75 ("penalty 2") and t = 0.9 (penalty 9). Note: the formula actually gives a penalty of 3 at t = 0.75 (0.75/0.25); the "2" in the paper is an arithmetic slip, and the break-even logic only holds with the formula value.

## Feeds

[Hallucination](../concepts/hallucination.md) · [LLM limitations](../concepts/llm-limitations.md)

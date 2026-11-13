---
title: "Source: Hugging Face TRL Documentation"
summary: "Documentation for TRL, Hugging Face's post-training library (SFT, DPO, GRPO, reward modelling, distillation)."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** library documentation
- **Author:** Hugging Face
- **Date:** v1.x (TRL v1 announced 2026-03-31; read 2026-11-14)
- **Original:** [TRL docs](https://huggingface.co/docs/trl/index)

## Summary

TRL provides trainers for the main post-training methods on top of transformers, with PEFT, vLLM, DeepSpeed and Unsloth integrations. Read here: the index, SFTTrainer, DPOTrainer and GRPOTrainer pages.

## Key claims

- Stable trainers: SFT, DPO, KTO, Reward, GRPO, AsyncGRPO, RLOO, Distillation; experimental: ORPO, CPO, Online DPO, GKD and others.
- SFTTrainer accepts language-modelling or prompt-completion data, standard or conversational, and applies chat templates; loss defaults to completion-only for prompt-completion data; `assistant_only_loss` and `packing` are options. Default LR 2e-5 (≈1e-4 suggested for adapters), max_length 1024. For base models with a built-in chat template (e.g. Qwen2.5-1.5B) set `eos_token="<|im_end|>"`.
- DPOTrainer takes prompt/chosen/rejected data; default β = 0.1, LR 1e-6 (≈1e-5 suggested for adapters), loss `sigmoid`, with alternatives such as ipo, hinge, robust and sigmoid_norm (SimPO-style). With no ref_model, the initial policy is the reference.
- DPO logs rewards/chosen, rewards/rejected, rewards/margins and rewards/accuracies (implicit rewards).
- GRPOTrainer takes Python reward functions returning one float per completion; defaults num_generations 8, β = 0.0 (no KL, no reference model loaded; the docs note DeepSeek-R1 used 0.001), loss_type `dapo`, epsilon 0.2, scale_rewards `group`, LR 1e-6; vLLM colocate or server mode for generation.

## Feeds

[Fine-tuning](../concepts/fine-tuning.md) · [Preference optimization](../concepts/preference-optimization.md) · [PEFT and LoRA](../concepts/peft-and-lora.md) · [Knowledge distillation](../concepts/knowledge-distillation.md)

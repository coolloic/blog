---
title: "Source: LoRA Learns Less and Forgets Less"
summary: "A 2024 Databricks/Columbia study comparing LoRA with full fine-tuning on code and math."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** research paper (arXiv:2405.09673, TMLR)
- **Author:** Dan Biderman, Jacob Portes, Jose Javier Gonzalez Ortiz, et al. (Databricks, Columbia)
- **Date:** 2024-05-15 (v2 2024-09-20)
- **Original:** [arXiv:2405.09673](https://arxiv.org/abs/2405.09673)

## Summary

Compares LoRA and full fine-tuning for programming and math under instruction fine-tuning (~100k pairs) and continued pre-training (~20B tokens). LoRA underperforms on the target domain but better preserves performance outside it.

## Key claims

- In standard low-rank settings, LoRA substantially underperforms full fine-tuning on code and math.
- LoRA forgets less of the base model's out-of-domain ability than full fine-tuning, more than weight decay or dropout do.
- LoRA keeps generations more diverse.
- Full fine-tuning learns perturbations of 10–100× higher rank than typical LoRA configs, a likely cause of the gap.

## Feeds

[PEFT and LoRA](../concepts/peft-and-lora.md) · [Fine-tuning](../concepts/fine-tuning.md)

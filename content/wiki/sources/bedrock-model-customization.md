---
title: "Source: Amazon Bedrock — Model Customization"
summary: "AWS documentation for supervised fine-tuning, reinforcement fine-tuning and distillation on Bedrock."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** vendor documentation
- **Author:** Amazon Web Services
- **Date:** undated (read 2026-11-14)
- **Original:** [Customize your model](https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html)

## Summary

Covers Bedrock's three customisation methods and the models that support fine-tuning.

## Key claims

- Supervised fine-tuning on labelled examples.
- Reinforcement fine-tuning: reward functions (e.g. AWS Lambda) score responses; prompts or existing invocation logs serve as data.
- Distillation: pick a teacher and a student; Bedrock generates teacher responses for your prompts and fine-tunes the student.
- Fine-tunable models include Amazon Nova (Micro/Lite/Pro/2 Lite), Claude 3 Haiku and several Llama 3.x models, in specific regions.
- Training is billed per token processed (corpus tokens × epochs) plus monthly storage per custom model.

## Feeds

[Fine-tuning](../concepts/fine-tuning.md) · [Knowledge distillation](../concepts/knowledge-distillation.md)

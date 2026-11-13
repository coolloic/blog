---
title: "Source: AWS Services Field Guide (Notebook)"
summary: "The owner's field guide to core AWS services, with a Bedrock entry: what it solves, its limits, and SageMaker vs Bedrock."
category: source
lastmod: 2026-11-14
tags: ["platforms", "aws", "notebook"]
---

- **What:** interactive HTML tutorial in the owner's Notebook
- **Author:** Loic (coolloic)
- **Date:** accessed 2026-11-14
- **Original:** [AWS Services Field Guide](https://coolloic.github.io/Notebook/aws-services.html)

## Summary

A field guide to AWS services grouped by category: what each one solves, its limits, and when to choose it. The Analytics & AI/ML section covers SageMaker and Bedrock and ends with a rule for choosing between them.

## Key claims

- Bedrock gives access to foundation models (Claude and others) through one API, with no infrastructure to run, and has built-in RAG (Knowledge Bases), agents and guardrails.
- Limits: per-token pricing; model and feature availability varies by region; on-demand throughput has quotas, so you reserve capacity with Provisioned Throughput; less control than self-hosting; each model has its own context and prompt limits.
- Choose Bedrock to add generative-AI features without managing GPUs or model serving.
- Use SageMaker to train or host your own models, and Bedrock to call ready-made foundation models through an API.
- General principle: choose the lowest rung of managed-ness that meets the requirement.

## Feeds

[Amazon Bedrock](../concepts/amazon-bedrock.md)

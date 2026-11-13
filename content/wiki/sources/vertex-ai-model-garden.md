---
title: "Source: Vertex AI Model Garden — Explore Models"
summary: "Google's catalogue for discovering, tuning and deploying first-party, partner and open models, with self-deploy serving options."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gcp", "models"]
---

- **What:** vendor documentation
- **Author:** Google Cloud
- **Date:** undated, read 2026-11-14
- **Original:** [Explore AI models in Model Garden](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models)

## Summary

Describes Model Garden's model categories and how to deploy open models to your own endpoints.

## Key claims

- Categories: foundation models (tunable via Agent Studio/API/SDK), fine-tunable models (notebooks/pipelines), task-specific solutions.
- Open models deploy to endpoints via SDK, CLI, REST or console, served by Hex-LLM on TPUs, vLLM on GPUs, xDiT for image/video, or Hugging Face DLCs (incl. multi-LoRA).
- Spot VMs and Compute Engine reservations can back deployments; prefix caching and speculative decoding are covered in tutorials.
- Self-deployed models bill for endpoint compute; tuning bills at custom training rates.
- Org policies can allowlist vetted models. Google scans its serving containers and blocks Hugging Face models deemed unsafe, but models that can run remote code may still deploy, so review them first.

## Feeds

[Google Vertex AI](../concepts/google-vertex-ai.md)

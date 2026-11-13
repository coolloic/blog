---
title: "Source: Hugging Face Inference Endpoints docs"
summary: "Hugging Face's managed dedicated deployment service: Hub model + chosen engine (vLLM, SGLang, TGI, llama.cpp, TEI) packaged as a container with autoscaling and scale-to-zero."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official product documentation
- **Publisher:** Hugging Face
- **Date:** accessed 2026-11-14
- **Original:** [Inference Endpoints](https://huggingface.co/docs/inference-endpoints/index), [About](https://huggingface.co/docs/inference-endpoints/about), [Pricing](https://huggingface.co/docs/inference-endpoints/pricing)

## Summary

Inference Endpoints deploys a Hub model to dedicated, managed infrastructure. You choose the model, the inference engine and the hardware. Hugging Face builds the container, runs it, scales it and monitors it.

## Key claims

- A deployment has three parts: model weights versioned on the Hub, an inference engine, and the managed production infrastructure, which is the product itself.
- Natively supported engines are vLLM, TGI, SGLang, llama.cpp and Text Embeddings Inference (TEI). Custom containers are also possible.
- The chosen engine runs as a prebuilt Docker container with the weights pulled from the Hub. Hugging Face manages its lifecycle, including autoscaling and scale-to-zero.
- Logs and metrics provide observability.
- Pricing is shown per hour but charged per minute, for the time an endpoint is initializing or running, multiplied by replica count (minimum replicas plus any autoscaled extras). Scaled-to-zero endpoints still count against instance quota; pausing frees it.
- Team and Enterprise plans add higher GPU quotas, SSO, audit logs, resource groups and private storage.

## Feeds

[Hugging Face ecosystem](../concepts/hugging-face-ecosystem.md)

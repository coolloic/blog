---
title: "Source: Microsoft Foundry — Determine PTU sizing for a workload"
summary: "Foundry's PTU sizing method: normalized TPM from peak RPM, prompt/response sizes, output-to-input ratio and cache rate, divided by per-model input TPM per PTU, with minimums, increments and latency targets per model."
category: source
lastmod: 2026-11-14
tags: ["platforms", "azure", "capacity"]
---

- **What:** vendor documentation (how-to)
- **Author:** Microsoft
- **Date:** ms.date 2026-09-23, read 2026-11-14
- **Original:** [Determine PTU sizing for a workload](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/provisioned-throughput-sizing)

## Summary

The arithmetic for turning a workload's traffic shape into a PTU count, and the per-model parameter tables that feed it.

## Key claims

- Inputs: peak RPM, average prompt tokens, average response tokens, cache rate. Benchmark against real traffic for accuracy.
- Normalized TPM = input TPM × (1 − cache rate) + output-to-input ratio × output TPM; PTUs = normalized TPM ÷ input TPM per PTU, rounded up to the scale increment or minimum.
- Worked example: gpt-5.2 Data Zone, 1,000 RPM × 200 in / 20 out, ratio 8, 3,400 input TPM per PTU → 360K normalized TPM → 105.9 → 110 PTUs; with 50% cache hits → 80 PTUs.
- The output-to-input ratio follows the model's Global Standard price ratio (gpt-5: 8; gpt-4.1: 4) with exceptions (Llama-3.3-70B: 4).
- GPT-6 and newer use normalized-token accounting: cached input, cache writes and long-context tokens consume capacity at price-derived weights (e.g. GPT-6 Sol: cached input 0.1, cache write 1.25, output 5, long-context output 7.5; GPT-6.1 Sol: short-context cached input 0.05). The older rule that deducts cached input entirely doesn't apply to them.
- Per-model parameters (e.g. Global/Data Zone minimum 15 PTUs in increments of 5 for most GPT-5.x; Regional minimums 15–50) and latency targets such as "99% > 50 tokens/s".
- Illustration: at 100% sustained utilization, a GPT-6 Sol PTU at an assumed $260/month costs about the same per normalized token as pay-as-you-go (no discounts assumed; a capacity comparison, not a quote); lower utilization makes PTU more expensive per token.
- Pre-GPT-4o models were sensitive to call-shape distribution; GPT-4o+ set input and output TPM per PTU separately.

## Feeds

[Provisioned throughput](../concepts/provisioned-throughput.md)

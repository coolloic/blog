---
title: "Source: Amazon Bedrock — Overview (User Guide)"
summary: "AWS's landing page for Bedrock: the managed multi-provider model service, its five inference API styles and the 2026 model roster."
category: source
lastmod: 2026-11-14
tags: ["platforms", "aws"]
---

- **What:** vendor documentation
- **Author:** Amazon Web Services
- **Date:** undated, read 2026-11-14
- **Original:** [What is Amazon Bedrock?](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)

## Summary

Introduces Bedrock as a fully managed service exposing foundation models from many providers behind AWS IAM, with code samples for each supported API surface and a running "what's new" list.

## Key claims

- Bedrock lists 100+ foundation models from Amazon (Nova), Anthropic, DeepSeek, Moonshot (Kimi), MiniMax, OpenAI and xAI, among others.
- Five calling styles are shown: the Anthropic Messages API (via a `/anthropic` base URL with a Bedrock-issued token), OpenAI Responses and Chat Completions APIs, the provider-neutral Converse API, and the raw InvokeModel API.
- `bedrock-runtime` is the recommended endpoint for new applications.
- Model IDs can carry a geography/global prefix (for example `global.anthropic.claude-opus-4-7`), which selects a cross-Region inference profile.
- 2026 additions include OpenAI GPT-5.6 Sol/Terra/Luna (July 2026), Grok 4.6 with a 500K context (Aug 2026), GPT-6 Astra with a 1.05M-token context and 128K max output (Sep 2026), and a built-in server-side Web Search tool for OpenAI models in three US Regions (Aug 2026).

## Feeds

[Amazon Bedrock](../concepts/amazon-bedrock.md)

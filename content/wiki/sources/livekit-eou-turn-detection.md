---
title: "Source: LiveKit, Using a Transformer to Improve End of Turn Detection"
summary: "LiveKit's 2024 post introducing a 135M-parameter text-based end-of-utterance model that modulates the VAD silence timeout, cutting unintended interruptions by 85%."
category: source
lastmod: 2026-11-14
tags: ["models", "voice", "agents"]
---

- **What:** vendor engineering blog post
- **Author/publisher:** LiveKit
- **Date:** 2024-12-20
- **Original:** [Using a transformer to improve end of turn detection](https://livekit.com/blog/using-a-transformer-to-improve-end-of-turn-detection)

## Summary

VAD only knows *whether* someone is speaking, not whether they are done. LiveKit fine-tuned a small language model on transcripts to predict end of utterance and used its prediction to lengthen or shorten the VAD silence timeout.

## Key claims

- Model: 135M-parameter transformer based on SmolLM v2, run on CPU, with a sliding window of the last four turns; inference about 50 ms.
- Versus VAD alone: 85% fewer unintentional interruptions; wrongly says the turn is not over 3% of the time.
- Limitations at launch: English only; text-based, so it fits STT-LLM-TTS pipelines but not native audio models like the Realtime API.

## Feeds

[Voice agents](../concepts/voice-agents.md)

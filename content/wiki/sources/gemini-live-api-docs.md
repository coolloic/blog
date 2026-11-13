---
title: "Source: Gemini Live API Docs"
summary: "Google's overview of the Gemini Live API: low-latency streaming voice and vision over a stateful WebSocket, audio formats, barge-in, tools and ephemeral tokens."
category: source
lastmod: 2026-11-14
tags: ["models", "voice", "google", "realtime"]
---

- **What:** official API documentation (Live API overview)
- **Author/publisher:** Google
- **Date:** living document; read 2026-11-14
- **Original:** [Live API](https://aistudio.google.com/docs/live-api)

## Summary

The Live API streams audio, images and text into Gemini and returns spoken responses in real time, over one stateful WebSocket.

## Key claims

- Input audio: raw 16-bit PCM, 16 kHz, little-endian. Output audio: raw 16-bit PCM, 24 kHz. Image input: JPEG up to 1 frame per second.
- Protocol: stateful WebSocket (WSS). Client-to-server is simpler and usually streams better; use ephemeral tokens rather than API keys in production. Server-to-server proxies through your backend.
- Features: barge-in, function calling and Google Search, transcripts of both sides, proactive audio, affective dialog, 70 languages, live translation.
- Partner integrations include LiveKit and Pipecat.

## Feeds

[Voice agents](../concepts/voice-agents.md) · [Multimodal models](../concepts/multimodal-models.md)

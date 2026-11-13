---
title: "Source: Voice AI & Voice Agents: An Illustrated Primer"
summary: "Practitioner primer from the Pipecat ecosystem on building voice agents: latency budget table, turn detection, interruptions, WebRTC vs WebSockets, speech-to-speech vs cascaded pipelines."
category: source
lastmod: 2026-11-14
tags: ["models", "voice", "agents"]
---

- **What:** long-form practitioner guide (web book)
- **Author/publisher:** voiceaiandvoiceagents.com, from the Pipecat open-source community (individual author not shown in the extracted text)
- **Date:** first written for the AI Engineering Summit, February 2025; updated June 2026
- **Original:** [voiceaiandvoiceagents.com](https://voiceaiandvoiceagents.com/)

## Summary

An engineering-focused tour of production voice agents. Its core contribution is a stage-by-stage latency budget and a pragmatic view that well-tuned cascaded pipelines still beat speech-to-speech models on latency, reliability and cost.

## Key claims

- Target about 1,500 ms voice-to-voice; human response time is about 500 ms.
- Example budget (ms): mic 40, Opus encode 21, network 10, jitter buffer 40, transcription + endpointing 300, LLM TTFB 650, sentence aggregation 20, TTS TTFB 120, then the return path and speaker output; total about 1.2-1.3 s. LLM TTFT of 600 ms or less is fast enough for most uses.
- Co-locating all models on one GPU cluster has reached about 500 ms voice-to-voice.
- Pipecat default VAD: stop after 0.8 s silence, start after 0.2 s speech, confidence 0.7. Silero VAD uses under 1/8 of a vCPU core.
- Smart Turn, a native-audio turn model (23 languages), classifies in about 30 ms, giving turn decisions about 250 ms after a pause. Combining VAD, a turn model and LLM-emitted wait tags is described as largely solving turn detection.
- Spurious interruptions come from coughs, keyboard clicks, echo-cancellation misses and background speech; mitigate with VAD tuning, volume smoothing and speaker isolation. Word-level timestamps let you record only the text the user actually heard.
- Speech-to-speech models (OpenAI, Google) are in practice slower than tuned cascades, follow instructions and call tools less reliably, and are less configurable; an OpenAI Realtime agent was 3-5x the cost of a GPT-4.1 cascade.
- WebSockets are not recommended for client-server realtime media in production (TCP head-of-line blocking, no audio congestion control, reconnection pain); WebRTC adds timestamps, echo cancellation, noise reduction and AGC.
- Function calls add an unstreamable inference round trip (example: ~1,450 ms TTFT with a 100-token call); say a filler line first or use a watchdog timer.
- Geography matters: UK to us-west-1 RTT ~140 ms vs ~15 ms to eu-west-2.

## Feeds

[Voice agents](../concepts/voice-agents.md)

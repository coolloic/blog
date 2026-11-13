---
title: "Source: OpenAI Voice Agents Guide"
summary: "OpenAI's guide comparing voice-agent architectures (GPT-Live full-duplex, Realtime speech-to-speech, chained STT-agent-TTS) with latency measurement and evaluation advice."
category: source
lastmod: 2026-11-14
tags: ["models", "voice", "openai", "agents"]
---

- **What:** official API documentation (Voice agents guide)
- **Author/publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Voice agents](https://developers.openai.com/api/docs/guides/voice-agents)

## Summary

Lays out three architectures and when to pick each, then gives practical advice on prompt separation, latency measurement and staged evaluation.

## Key claims

- **GPT-Live (full-duplex):** listens and speaks at once; reasoning and tools are delegated to a backend (client delegation to any provider, or Responses delegation), so the user can keep talking while backend work runs. Fits adding voice to an existing text workflow.
- **Realtime API (speech-to-speech):** one model hears audio, decides, calls tools, and speaks; the session manages turns, interruptions, handoffs.
- **Chained pipeline (STT, agent, TTS):** you control and can inspect every stage; choose it to store transcripts, run policy checks before the agent replies, or only synthesize approved answers.
- Keep speaking style in the voice model prompt and business rules in the backend prompt; permissions and records stay in your application.
- Latency: measure time to a *useful* spoken answer, not the acknowledgement; record per-stage timestamps; compare p50 and p95; change one factor at a time and check task success doesn't drop.
- Evaluate task/tool outcomes, conversational timing, speech quality and session reliability separately; progress from synthetic single-turn speech, to replayed human recordings, to simulated multi-turn callers with interruptions; add human listening.

## Feeds

[Voice agents](../concepts/voice-agents.md)

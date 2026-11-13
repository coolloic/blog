---
title: "Source: OpenAI Realtime API Guide"
summary: "OpenAI's guide to the Realtime API for speech-to-speech voice agents: WebRTC vs WebSocket transports, ephemeral client secrets, session config and GA event names."
category: source
lastmod: 2026-11-14
tags: ["models", "voice", "openai", "realtime"]
---

- **What:** official API documentation (Realtime API guide)
- **Author/publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Realtime API](https://developers.openai.com/api/docs/guides/realtime)

## Summary

The Realtime API runs a single speech-to-speech model over a persistent session that keeps conversation state, handles turn-taking and interruptions, and can call tools. The guide shows the Agents SDK `RealtimeAgent` / `RealtimeSession` pattern.

## Key claims

- Positioned for barge-in, low first-audio latency, natural turn-taking and realtime tool use.
- Example model (as of 2026-11): `gpt-realtime-2.1`.
- Transports: WebRTC for browsers (via `/v1/realtime/calls`), WebSocket for servers.
- Browser/mobile clients must use an ephemeral client secret minted server-side with `POST /v1/realtime/client_secrets`, never the API key.
- Tools, handoffs and guardrails attach to the agent; audio transport stays in the session layer.
- GA migration: drop the `OpenAI-Beta: realtime=v1` header; output events are `response.output_text.delta`, `response.output_audio.delta`, `response.output_audio_transcript.delta`.
- A stable hashed `OpenAI-Safety-Identifier` header per end user is recommended.
- For full-duplex conversation with a delegated backend, OpenAI points to a separate GPT-Live product.

## Feeds

[Voice agents](../concepts/voice-agents.md)

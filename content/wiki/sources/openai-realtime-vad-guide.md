---
title: "Source: OpenAI Realtime Voice Activity Detection Guide"
summary: "OpenAI's guide to turn detection in Realtime sessions: server_vad parameters, semantic_vad with eagerness, events and trade-offs."
category: source
lastmod: 2026-11-14
tags: ["models", "voice", "openai", "realtime"]
---

- **What:** official API documentation (Voice activity detection)
- **Author/publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Voice activity detection](https://developers.openai.com/api/docs/guides/realtime-vad)

## Summary

Explains the two automatic turn-detection modes of the Realtime API and how to tune them.

## Key claims

- VAD is on by default in speech-to-speech sessions; configured at `session.audio.input.turn_detection`; default mode `server_vad`.
- `server_vad` is silence-based: `threshold` (0-1, higher for noisy rooms), `prefix_padding_ms`, `silence_duration_ms` (shorter = faster turns, more cut-offs), plus `create_response` and `interrupt_response`.
- `semantic_vad` uses a classifier on the user's words to score whether they have finished; low probability waits for a timeout. `eagerness` = `low` / `medium` (`auto`, the default) / `high` tunes how long it waits (the guide gives no numeric wait times).
- Semantic VAD makes premature interruptions and split transcripts less likely.
- Events: `input_audio_buffer.speech_started` and `input_audio_buffer.speech_stopped`.
- Some transcription models require turn detection off (`null`), with the client sending `input_audio_buffer.commit` manually.

## Feeds

[Voice agents](../concepts/voice-agents.md)

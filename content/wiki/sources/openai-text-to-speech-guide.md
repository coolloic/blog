---
title: "Source: OpenAI Text-to-Speech Guide"
summary: "OpenAI API guide to the Speech endpoint: deprecated TTS models and Realtime migration, built-in voices, instructions steering, output formats and the AI-voice disclosure rule."
category: source
lastmod: 2026-11-14
tags: ["models", "multimodal", "openai", "audio"]
---

- **What:** official API documentation (Text to speech guide)
- **Author/publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Text to speech](https://developers.openai.com/api/docs/guides/text-to-speech)

## Summary

Describes `/v1/audio/speech`, its voices and formats, and the move of TTS onto the Realtime API.

## Key claims

- `tts-1`, `tts-1-hd` and `gpt-4o-mini-tts` shut down 2027-01-06; the migration target is `gpt-realtime-2.1-mini` via the Realtime API, which is a workflow change rather than a model swap.
- `tts-1` trades quality for lower latency than `tts-1-hd`.
- `instructions` on `gpt-4o-mini-tts` steer accent, emotion, intonation, speed, tone, whispering.
- 13 built-in voices (marin and cedar recommended); voices are tuned for English but language coverage follows Whisper.
- Output: mp3 (default), opus, aac, flac, wav, pcm (raw 24 kHz 16-bit LE). WAV/PCM give the fastest response.
- Audio streams via chunked transfer encoding so playback starts before generation ends.
- Custom voices require a consent recording from the speaker.
- Usage policy requires disclosing to end users that the voice is AI-generated.

## Feeds

[Voice agents](../concepts/voice-agents.md) · [Multimodal models](../concepts/multimodal-models.md)

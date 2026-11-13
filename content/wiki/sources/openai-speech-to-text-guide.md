---
title: "Source: OpenAI Speech-to-Text Guide"
summary: "OpenAI API guide to transcription: current and deprecated STT models, 25 MB file limit, prompting with keywords, diarization, streaming and realtime transcription."
category: source
lastmod: 2026-11-14
tags: ["models", "multimodal", "openai", "audio"]
---

- **What:** official API documentation (Speech to text guide)
- **Author/publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Speech to text](https://developers.openai.com/api/docs/guides/speech-to-text)

## Summary

Covers file transcription via `/v1/audio/transcriptions`, live transcription through Realtime sessions, and the migration away from Whisper-era models.

## Key claims

- Models (as of 2026-11): `gpt-transcribe` for recorded audio, `gpt-live-transcribe` for live audio via Realtime transcription, `gpt-realtime-translate` for speech translation.
- `whisper-1`, `gpt-4o-transcribe`, `gpt-4o-mini-transcribe` and `gpt-4o-transcribe-diarize` are deprecated with shutdown on 2027-02-26.
- Files up to 25 MB; formats flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm. Split longer audio without cutting mid-sentence.
- Context: `prompt` (free text), `keywords` (literal-term hints, which can occasionally cause unspoken terms to appear) and `languages`. `whisper-1` prompts are limited to 224 tokens; a text model can post-process transcripts for terminology.
- Word/segment timestamps (`timestamp_granularities[]`) only on the deprecated `whisper-1`.
- Diarization: `diarized_json` with speaker, start, end; up to 4 known-speaker reference clips of 2-10 s; not available in Realtime sessions.
- Streaming file transcription emits `transcript.text.delta` / `.done` events.

## Feeds

[Voice agents](../concepts/voice-agents.md) · [Multimodal models](../concepts/multimodal-models.md)

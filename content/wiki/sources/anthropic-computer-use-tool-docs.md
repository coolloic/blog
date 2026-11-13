---
title: "Source: Anthropic Computer Use Tool Docs"
summary: "Claude API documentation for the computer use toolset: versions, 17 member actions, coordinate scaling, the batch agent loop, screenshot token costs and security guidance."
category: source
lastmod: 2026-11-14
tags: ["models", "computer-use", "anthropic"]
---

- **What:** official API documentation (Computer use tool)
- **Author/publisher:** Anthropic
- **Date:** living document; read 2026-11-14
- **Original:** [Computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)

## Summary

Computer use is a client-side toolset: Claude emits mouse/keyboard/screenshot actions, your harness executes them on a (virtual) desktop and returns screenshots. The doc covers tool versions, actions, coordinate handling, the loop contract, context management and safety.

## Key claims

- Versions (as of 2026-11): `computer_toolset_20260801` (no beta header; Fable 5.2, Mythos 5.2, Opus 5.5, Sonnet 5.5, Haiku 5.5, which return 400 for older versions), `computer_20251124` (beta header `computer-use-2025-11-24`; Opus 4.5-4.7, Sonnet 4.6), `computer_20250124` for earlier models.
- 17 member tools: `screenshot`, `zoom` (full-resolution crop of a region), five click types, `left_click_drag`, `mouse_move`, `left_mouse_down/up`, `cursor_position`, `scroll`, `type`, `key` (with `repeat`), `hold_key`, `wait`. Members can be disabled via `configs`.
- Coordinates are screenshot pixels; if you downscale screenshots you must scale clicks back up. On macOS Retina, halve coordinates (2x DPR).
- Image caps: Opus 4.7+ 2,576 px long edge / 4,784 visual tokens; earlier 1,568 px / ~1.15 MP. Oversized screenshots are rejected, not downscaled.
- Recommended resolutions 1024x768 or 1280x720 (desktop), 1280x800 or 1366x768 (web apps); avoid above 1920x1080.
- Claude may return several actions per turn: run in order, stop at first failure, mark later ones with `is_error` and a fixed "Not executed" message; every `tool_use` needs a `tool_result`. Human approval must check each block, because one batch can complete a multistep action.
- Each screenshot costs about 1,000-1,800 input tokens. Prune old screenshots in batches (e.g. keep last 3, prune every 25 turns) to preserve prompt caching; on Fable/Mythos 5.1-5.2 and Opus/Sonnet/Haiku 5.5, pruning invalidates every later thinking block, so avoid it there (or set `prefix_mismatch_behavior: "drop_block"`).
- Security: dedicated VM/container with minimal privileges, no credentials or sensitive data, domain allowlist, human confirmation for consequential actions; classifiers scan screenshots for prompt injection; get end-user consent.
- Tips: explicit steps, screenshot after each step to verify, prefer keyboard shortcuts for dropdowns and scrollbars, put instructions before the screenshot, use `zoom` for small text.
- Reference implementation: Docker demo with Xvfb, a window manager, Firefox and LibreOffice.

## Feeds

[Computer-use agents](../concepts/computer-use-agents.md) · [Multimodal models](../concepts/multimodal-models.md)

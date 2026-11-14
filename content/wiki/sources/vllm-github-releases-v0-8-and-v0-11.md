---
title: "Source: vLLM release notes v0.8.0 and v0.11.0"
summary: "GitHub release notes marking V1 as the default engine (v0.8.0, March 2025) and the complete removal of V0 (v0.11.0, October 2025)."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** GitHub release notes (two releases)
- **Author:** vLLM project
- **Date:** v0.8.0 2025-03-18; v0.11.0 2025-10-02
- **Original:** [v0.8.0 release](https://github.com/vllm-project/vllm/releases/tag/v0.8.0) · [v0.11.0 release](https://github.com/vllm-project/vllm/releases/tag/v0.11.0)

## Summary

Two milestones in the V0-to-V1 transition. v0.8.0 switched the default engine to V1 for supported use cases, with an environment-variable escape hatch. v0.11.0 deleted the V0 engine code, leaving V1 as the only engine.

## Key claims

- v0.8.0: V1 enabled by default for supported cases; `VLLM_USE_V1=0` opts out, and users doing so were asked to file an issue.
- v0.11.0: completes V0 removal (V0 engine classes and attention backends gone); V1 is the only engine in the codebase; CUDA graph mode default becomes FULL_AND_PIECEWISE.

## Feeds

[vLLM](../concepts/vllm.md)

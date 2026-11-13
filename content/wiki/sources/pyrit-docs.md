---
title: "Source: PyRIT (Microsoft) repository, docs and releases"
summary: "Microsoft AI Red Team's open-source framework for composing targets, converters, attacks and scorers into automated, multi-turn red-team scenarios; v1.2.0 released 2026-11-13."
category: source
lastmod: 2026-11-14
tags: ["security", "red-teaming", "tools", "microsoft"]
---

- **What:** open-source framework (MIT), README, documentation (1.1.0) and GitHub releases
- **Publisher:** Microsoft AI Red Team
- **Date:** v1.0.0 2026-07-24; v1.1.0 2026-09-04; v1.2.0 2026-11-13; accessed 2026-11-14
- **Original:** [github.com/microsoft/PyRIT](https://github.com/microsoft/PyRIT) · [docs](https://microsoft.github.io/PyRIT/) · [releases](https://github.com/microsoft/PyRIT/releases). The older `github.com/Azure/PyRIT` repo was archived on 2026-03-27 and points here.

## Summary

PyRIT (Python Risk Identification Tool) is a library for building automated red-team operations against generative AI systems. Where garak is a scanner of fixed probes, PyRIT is a toolkit: you compose a target, prompt converters, an attack strategy (single- or multi-turn, often driven by an attacker LLM) and scorers, and every exchange is persisted to memory for review.

## Key claims

- Three interfaces: a **Scanner** CLI (`pyrit_scan`, `pyrit_shell`) running built-in scenarios; **CoPyRIT**, a web GUI for human-led red teaming; and the Python **framework**.
- Targets: OpenAI, Azure OpenAI/Foundry, Anthropic, Gemini/Vertex, Bedrock, Hugging Face, Ollama, Groq, OpenRouter, OpenAI-compatible APIs, HTTP, WebSocket, Playwright-driven web apps, and custom targets; v1.2.0 adds A2A, HackAPrompt and GitHub Copilot SDK targets.
- Scorers: true/false, Likert, classification and custom; backed by LLMs, Azure AI Content Safety or code. Since v1.1.0 a score can be "undetermined" (check `score.is_undetermined`); v1.1.0 also added system-prompt-extraction, ShieldGemma and Roblox PII scorers.
- Attacks named in the docs include Crescendo, TAP and Skeleton Key; releases add Best-of-N, split-payload, multilingual, system-prompt extraction, FigStep (v1.1.0) and GOAT plus context-wrap and character-split techniques (v1.2.0). The basic single-turn primitive is `PromptSendingAttack`.
- Converters transform payloads (v1.1.0 added ten, including bijection, character noise and Vigenère ciphers).
- Memory: conversations, scores and attack results stored in SQLite or Azure SQL (in-memory for tests).
- Scenario framework: standardized evaluations for content harms, psychosocial risks and data leakage, combining strategies and datasets.
- v1.0.0 set the v1 architecture (scenarios, attack techniques, executors, registries) with breaking changes; v1.2.0 adds persistent Operations and Findings for organizing engagements, and drops Python 3.10.

## Feeds

[LLM red teaming](../concepts/llm-red-teaming.md)

---
title: "Source: Defeating Prompt Injections by Design (CaMeL)"
summary: "Google DeepMind and ETH (2025): a privileged LLM writes code from the trusted query, a tool-less quarantined LLM parses untrusted data, and an interpreter enforces capability-based data-flow policies."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "paper"]
---

- **What:** research paper, arXiv:2503.18813
- **Authors:** Edoardo Debenedetti, Ilia Shumailov, Tianqi Fan, Jamie Hayes, Nicholas Carlini, Daniel Fabian, Christoph Kern, Chongyang Shi, Andreas Terzis, Florian Tramèr
- **Date:** 2025-03-24 (v2 2025-06-24)
- **Original:** [arXiv:2503.18813](https://arxiv.org/abs/2503.18813)

## Summary

CaMeL wraps an unmodified LLM in a system layer that is secure even if the model is fooled. The **P-LLM** sees only the user query and emits a program in a restricted Python subset; it never sees tool outputs. The **Q-LLM** has no tools and only parses untrusted data into a schema the P-LLM requested. A custom interpreter executes the program, tracks a data-flow graph, attaches **capabilities** (provenance and allowed readers) to every value, and checks **security policies** (Python functions returning allow/deny) before each tool call.

## Key claims

- AgentDojo: 77% of tasks solved with provable security vs 84% for an undefended agent.
- Successful attacks fell to 0 (e.g. Gemini 2.5 Pro from 300 to 0; GPT-4o mini from 276 to 0 versus native tool calling).
- It fixes the Dual LLM pattern's gap: an injected Q-LLM can still swap *data* (which file, which recipient), analogous to SQL injection; capability checks block sending data to readers not allowed to see it and ask the user instead.
- STRICT mode makes `if`/loop conditions dependencies of everything assigned inside, closing some side channels.
- Not covered: text-to-text manipulation (misleading summaries), phishing the user, some side channels, and plans that themselves say "do what the email says".
- Cost: about 2.8x input and 2.7x output tokens versus native tool calling on the median task (spotlighting: about 1.06x). User-confirmation fatigue and policy-writing effort are real costs.

## Feeds

[Prompt injection](../concepts/prompt-injection.md)

---
title: "Source: The Dual LLM pattern for building AI assistants that can resist prompt injection"
summary: "Simon Willison (2023): split an assistant into a tool-wielding privileged LLM that never sees untrusted text and a tool-less quarantined LLM, coordinated by plain code."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "blog"]
---

- **What:** blog post
- **Author:** Simon Willison
- **Date:** 2023-04-25 (updated 2025-04-11 to point to CaMeL)
- **Original:** [simonwillison.net/2023/Apr/25/dual-llm-pattern](https://simonwillison.net/2023/Apr/25/dual-llm-pattern/)

## Summary

Proposes an architecture for an assistant that can act on private data without obeying injected instructions. A **privileged LLM** handles trusted user input and has tools; a **quarantined LLM** processes untrusted content and has no tools; a **controller** (ordinary code) runs both and holds untrusted text in variables. The privileged LLM refers to content only by symbolic names such as `$VAR1`, so attacker text never enters its context.

## Key claims

- Quarantined output must never flow back to the privileged LLM, except when constrained to a validated fixed set of values.
- The author calls the design complex and harmful to UX, and warns that later features can silently reintroduce leaks.
- It does not stop social engineering of the user (e.g. getting them to paste obfuscated data out).
- A 2025 update notes that Google DeepMind's CaMeL paper found a flaw (data flow can still be manipulated) and extends the idea.

## Feeds

[Prompt injection](../concepts/prompt-injection.md)

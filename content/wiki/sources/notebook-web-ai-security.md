---
title: "Source: Notebook, Web, API & AI Security: A Defensive Guideline"
summary: "The owner's tutorial on layered defensive security, including an AI and agent section framed on the OWASP Top 10 for LLM applications."
category: source
lastmod: 2026-11-14
tags: ["security", "notebook"]
---

- **What:** tutorial page in the owner's Notebook
- **Author:** the wiki owner (coolloic)
- **Date:** read 2026-11-14
- **Original:** [coolloic.github.io/Notebook/web-ai-security.html](https://coolloic.github.io/Notebook/web-ai-security.html)

## Summary

A defensive-security guide that stacks layers from transport and identity up to AI agents. Its AI section adapts the OWASP Top 10 for LLM applications and states the core mindset: every model input and output is untrusted.

## Key claims

- Prompt injection: keep system policy separate from and above user or retrieved content; untrusted text must never grant capabilities; validate outputs.
- Excessive agency: least-privilege tools, scoped short-lived credentials, human approval for irreversible actions, sandboxing, spend and rate limits.
- Sensitive information disclosure: minimise context, filter inputs and outputs, scope retrieval per user.
- Insecure output handling: never eval model output or run it as SQL/HTML or unchecked tool calls.
- Also covers data/model poisoning and unbounded consumption (cap turns, tokens, spend).
- Golden rule for agents: assume the prompt will be hijacked and design so that it cannot matter.
- API input validation: schema-validate types, ranges and formats (Zod, Pydantic) with allowlists rather than denylists.

## Feeds

[Guardrail tooling](../concepts/guardrail-tooling.md)

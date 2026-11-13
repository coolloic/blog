---
title: "Source: Design Patterns for Securing LLM Agents against Prompt Injections"
summary: "Beurer-Kellner et al. (2025): six architectural patterns that constrain an agent once it has read untrusted input, with utility/security trade-offs and ten case studies."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "agents", "paper"]
---

- **What:** research paper, arXiv:2506.08837
- **Authors:** Luca Beurer-Kellner, Beat Buesser, Ana-Maria Creţu, Edoardo Debenedetti, Daniel Dobos, Daniel Fabian, Marc Fischer, David Froelicher, Kathrin Grosse, Daniel Naeff, Ezinwanne Ozoani, Andrew Paverd, Florian Tramèr, Václav Volhejn
- **Date:** 2025-06-10 (v3 2025-06-27)
- **Original:** [arXiv:2506.08837](https://arxiv.org/abs/2506.08837)

## Summary

Accepts that general-purpose agents cannot currently be made injection-proof and instead proposes application-specific patterns with provable resistance. The unifying principle: once an agent has ingested untrusted input, constrain it so that input cannot trigger consequential actions.

## Key claims

- **Action-Selector:** LLM only picks from fixed actions; outputs never return to it. Very safe, inflexible.
- **Plan-Then-Execute:** fix the tool-call sequence before reading untrusted data (control-flow integrity); data can still alter arguments.
- **LLM Map-Reduce:** isolated sub-LLMs process one untrusted item each with constrained outputs; a reducer aggregates.
- **Dual LLM:** privileged planner never sees untrusted data; quarantined LLM has no tools; symbolic variables.
- **Code-Then-Execute:** the LLM writes a program (CaMeL-style) that calls tools and unprivileged LLMs.
- **Context-Minimization:** remove the user prompt from context after it has determined the action.
- Ten case studies, including SQL agent, email/calendar assistant, customer-service bot, resume screener and software-engineering agent.

## Feeds

[Prompt injection](../concepts/prompt-injection.md)

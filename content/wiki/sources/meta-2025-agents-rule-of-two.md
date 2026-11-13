---
title: "Source: Agents Rule of Two (Meta)"
summary: "Meta (Oct 2025): within one session an agent should hold at most two of untrusted input, sensitive data/systems, and state change or external communication."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "agents", "vendor-blog"]
---

- **What:** engineering blog post, "Agents Rule of Two: A Practical Approach to AI Agent Security"
- **Publisher:** Meta AI
- **Date:** 2025-10-31
- **Original:** [ai.meta.com/blog/practical-ai-agent-security](https://ai.meta.com/blog/practical-ai-agent-security/)

## Summary

A design rule for limiting the blast radius of prompt injection until models can reliably detect and refuse it. Properties: **[A]** processes untrustworthy inputs; **[B]** accesses sensitive systems or private data; **[C]** changes state or communicates externally. Any session may combine at most two.

## Key claims

- If all three are required, the agent must not run autonomously: add human-in-the-loop approval or another reliable validation, or split the work across fresh sessions.
- An agent may switch configuration mid-session, e.g. turn off external communication before touching internal systems.
- Examples: email bot (restrict to trusted senders [BC] or human-reviewed drafts [AB]); travel assistant [AB] with confirmation for bookings; web research assistant [AC] in a sandbox with no session data; internal coder [BC] filtering inputs by author lineage.
- Not covered: hallucinations, spam, over-privilege generally, lower-impact injection outcomes such as misinformation. It supplements least privilege and defence in depth rather than replacing them; blindly approved confirmations still fail.

## Feeds

[Prompt injection](../concepts/prompt-injection.md) · [LLM security risks](../concepts/llm-security-risks.md)

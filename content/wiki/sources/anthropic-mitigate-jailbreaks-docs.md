---
title: "Source: Mitigate jailbreaks and prompt injections (Claude docs)"
summary: "Anthropic's platform guide separating user-as-adversary jailbreaks from indirect injection, with screening, tool_result placement, JSON encoding and least-privilege advice."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "jailbreaks", "anthropic", "docs"]
---

- **What:** official developer documentation
- **Publisher:** Anthropic
- **Date:** read 2026-11-14
- **Original:** [platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks)

## Summary

Splits the problem into two threat models: (1) jailbreaks and direct injection, where the application's user is the adversary; (2) indirect injection, where the user is trusted but third-party content (pages, emails, OCR text, tool results) carries instructions. Gives concrete patterns for each.

## Key claims

- **Harmlessness screen:** pre-classify input with a small model (Claude Haiku 5.5 as of 2026-11) constrained by a JSON schema; a `stop_reason: "refusal"` from the screener counts as a harmful verdict.
- Other direct-attack controls: input validation against known patterns, system prompts that state boundaries and how to refuse, throttling or banning repeat offenders, continuous monitoring, chained safeguards.
- **Indirect:** put third-party content only in `tool_result` blocks (Claude is trained to be sceptical of instructions there), state the content's origin, declare an untrusted-content policy in the system prompt, JSON-encode untrusted strings so they cannot break out of delimiters.
- Do not put your own instructions inside tool results; send them in a following user turn or a mid-conversation system message.
- Least privilege, sandboxed tools, narrow permissions.
- Screen tool outputs with the same small-model classifier before returning them; on suspicion return an error or stripped summary.
- Red-team your own agent with poisoned documents and emails before deploying.
- For computer-use and browser-use tools, Anthropic runs additional injection classifiers on screenshots and page text.

## Feeds

[Prompt injection](../concepts/prompt-injection.md) · [Jailbreaks](../concepts/jailbreaks.md)

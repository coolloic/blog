---
title: "Source: MCP Security Notification: Tool Poisoning Attacks (Invariant Labs)"
summary: "Invariant Labs (Apr 2025): hidden instructions in MCP tool descriptions can exfiltrate files, shadow other servers' tools, and change after approval (rug pull)."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "mcp", "vendor-blog"]
---

- **What:** security research blog post
- **Publisher:** Invariant Labs
- **Date:** 2025-04-01
- **Original:** [invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)

## Summary

A Tool Poisoning Attack (TPA) is indirect prompt injection via tool metadata: the model reads full MCP tool descriptions, the user usually does not. Demonstrated in Cursor.

## Key claims

- A benign-looking `add` tool's description told the model to read `~/.cursor/mcp.json` and `~/.ssh/id_rsa` and pass them in a hidden parameter, and to stay silent about it.
- **Shadowing:** a malicious server's description rewrote how a trusted server's `send_email` behaved, redirecting all mail to the attacker without its own tool ever being called.
- **Rug pull:** a server can change descriptions after the user approved it.
- Mitigations: show full descriptions in the UI, pin tool descriptions by hash, enforce boundaries and data-flow controls between servers, guard data flowing to and from the model.

## Feeds

[Prompt injection](../concepts/prompt-injection.md) · [LLM security risks](../concepts/llm-security-risks.md)

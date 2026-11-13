---
title: "Source: The lethal trifecta for AI agents"
summary: "Simon Willison (June 2025): an agent with private data, exposure to untrusted content and an external communication channel can be made to exfiltrate data; remove one leg."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "agents", "blog"]
---

- **What:** blog post
- **Author:** Simon Willison
- **Date:** 2025-06-16
- **Original:** [simonwillison.net/2025/Jun/16/the-lethal-trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)

## Summary

Names the combination of capabilities that turns prompt injection into data theft: (1) access to private data, (2) exposure to untrusted content, (3) ability to communicate externally. Because models follow instructions wherever they appear and are non-deterministic, prompt-level warnings cannot guarantee protection.

## Key claims

- Exfiltration vectors include HTTP requests, image loads with data in the URL, links the user clicks, writes to repos or issue trackers, and sending email.
- Real cases cited: Microsoft 365 Copilot, GitHub's official MCP server, GitLab Duo.
- Guardrail products advertising 95% detection are insufficient; in application security 95% is a failing grade.
- MCP encourages mixing tools; a single tool can supply all three legs.
- The only reliable safeguard for end users is to avoid combining all three; for developers, constrain agents after they read untrusted input (design patterns, CaMeL).
- Prompt injection is distinct from jailbreaking.

## Feeds

[Prompt injection](../concepts/prompt-injection.md) · [LLM security risks](../concepts/llm-security-risks.md)

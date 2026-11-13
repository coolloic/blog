---
title: "Source: Markdown exfiltration (Simon Willison tag archive)"
summary: "Willison's running catalogue of products leaking data through injected Markdown images or links, and why CSP and URL allowlists keep failing."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "blog"]
---

- **What:** curated blog tag page (series of posts, 2024-2026)
- **Author:** Simon Willison
- **Date:** read 2026-11-14 (latest entry May 2026)
- **Original:** [simonwillison.net/tags/markdown-exfiltration](https://simonwillison.net/tags/markdown-exfiltration/)

## Summary

The canonical prompt-injection exfiltration channel: injected text tells the model to emit a Markdown image whose URL contains private data; when the client renders it, the browser sends the data to the attacker's server. Link-based variants need one click.

## Key claims

- Affected products listed include Mistral LeChat (2024-10), the Claude iOS app (2024-12), GitLab Duo (2025-05), Microsoft 365 Copilot "EchoLeak" (2025-06), Salesforce Agentforce (2025-09), Superhuman AI (2026-01) and Microsoft Copilot Cowork (2026-05); Slack AI (2024-08) used links.
- Fixes and how they failed: CSP `img-src` allowlists defeated by an allowed domain that stores attacker data (Google Forms on docs.google.com), an expired allowlisted domain, or an open redirect; external-image filters missed reference-style Markdown (EchoLeak); allowlists that included webhook.site or dozens of package-manager domains.
- Restricting outbound HTTP to GET/HEAD/OPTIONS and disabling link unfurling help.
- In application security, 99% is a failing grade; remove the exfiltration leg instead.

## Feeds

[Prompt injection](../concepts/prompt-injection.md) · [LLM security risks](../concepts/llm-security-risks.md)

---
title: "Source: Promptfoo docs: Red team plugins and quickstart"
summary: "Promptfoo's catalogue of 157 red-team plugins (PII, BOLA/BFLA, RBAC, SSRF, injection, MCP, cross-session leak) and the setup/run/report quickstart flow."
category: source
lastmod: 2026-11-14
tags: ["security", "red-teaming", "promptfoo"]
---

- **What:** official tool documentation (plugins reference, quickstart, configuration)
- **Publisher:** Promptfoo (acquisition by OpenAI announced March 2026)
- **Date:** accessed 2026-11-14
- **Original:** [Plugins](https://www.promptfoo.dev/docs/red-team/plugins/) · [Quickstart](https://www.promptfoo.dev/docs/red-team/quickstart/) · [Configuration](https://www.promptfoo.dev/docs/red-team/configuration/)

## Summary

Complements the [red team overview source](promptfoo-red-team-docs.md) with the plugin catalogue and the CLI workflow. Plugins are the "what to test" unit; each generates adversarial cases tailored to the declared application `purpose`.

## Key claims

- 157 plugins in six categories: Brand, Compliance and Legal, Dataset, Security and Access Control, Trust and Safety, Custom.
- Privacy plugins: `pii:direct`, `pii:session`, `pii:social`, `pii:api-db`.
- Security and access-control plugins include `bola`, `bfla`, `rbac`, `ssrf`, `sql-injection`, `shell-injection`, `tool-discovery`, `indirect-prompt-injection`, `prompt-extraction`, `cross-session-leak`, `hijacking`, `mcp`; `excessive-agency` sits under Brand. Several (marked in the docs) use remote generation in the Community edition.
- CLI flow: `promptfoo redteam setup` (web UI) or `redteam init --no-gui` → `redteam generate` (writes `redteam.yaml`) → `redteam run` (generate plus eval, keeping tests in sync with config) → `redteam report`.
- More config keys: `maxConcurrency` (default 4), `delay`, `frameworks`, `testGenerationInstructions`, `graderExamples`, per-plugin `graderGuidance`; the attacker `provider` defaults to `openai:gpt-5` and also grades.
- The `frameworks` filter accepts `owasp:llm`, `owasp:api`, `owasp:agentic`, `mitre:atlas`, `nist:ai:measure`, `eu:ai-act`, `iso:42001`, `gdpr`, `dod:ai:ethics`.
- Strategies listed include `basic`, `jailbreak`, `jailbreak:meta`, `jailbreak:composite`, tree-based (TAP), `crescendo`, `goat`, `best-of-n`, `likert`, `citation`, `math-prompt`, `layer`, `retry`, and encodings (`base64`, `rot13`, `leetspeak`, `hex`, `homoglyph`, `morse-code`, `pig-latin`, `camelCase`).

## Feeds

[LLM red teaming](../concepts/llm-red-teaming.md) · [PII and data privacy](../concepts/pii-and-data-privacy.md)

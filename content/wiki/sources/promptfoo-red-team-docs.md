---
title: "Source: Promptfoo docs: Red team overview and configuration"
summary: "How promptfoo red teaming composes plugins (what to attack) with strategies (how to deliver it), plus framework presets, targets and remote generation."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "promptfoo", "security"]
---

- **What:** official tool documentation
- **Publisher:** Promptfoo
- **Date:** accessed 2026-11-14
- **Original:** [LLM red teaming guide](https://www.promptfoo.dev/docs/red-team/), [Red team configuration](https://www.promptfoo.dev/docs/red-team/configuration/)

## Summary

Promptfoo's red teamer generates adversarial test cases against a target, runs them, and grades the responses. Plugins define the failure modes to probe; strategies define how payloads are wrapped or delivered. Presets map plugins to compliance frameworks for reporting.

## Key claims

- Three stages: generate adversarial inputs, run them through the application, analyse with deterministic and model-graded metrics.
- `redteam` keys: `purpose` (describes the system to tailor attacks and grading), `numTests` (default 5 per plugin), `plugins`, `strategies` (default `basic`, `jailbreak:meta`, `jailbreak:composite`), `language`, `provider` (attacker model, which also grades), `injectVar`.
- Plugin examples: `harmful:hate`, `pii:direct`, `contracts`, `competitors`, `rbac`, and BOLA/BFLA authorisation tests; collections such as `harmful`, `pii`, `toxicity`, `bias`, `medical`, `misinformation`.
- Strategy examples: static jailbreak templates, iterative LLM-judged jailbreaks, composite jailbreaks, `crescendo` (multi-turn escalation with backtracking), `goat` (multi-turn generative offensive agent), `base64` encoding.
- Framework presets: `owasp:llm` (e.g. `owasp:llm:01`), `owasp:api` (OWASP API Security Top 10), `nist:ai:measure` (e.g. `nist:ai:measure:1.1`), `mitre:atlas`; the guide also cites the EU AI Act.
- Targets: provider IDs, HTTP endpoints (URL, method, headers, body), or a `file://` script exposing `call_api`.
- By default attack generation uses Promptfoo's remote service (proxied if no OpenAI key); target evaluation always runs locally. `PROMPTFOO_DISABLE_REDTEAM_REMOTE_GENERATION=true` forces local generation, at generally lower quality.
- Some model providers may disable accounts that generate harmful test cases.

## Feeds

[promptfoo](../concepts/promptfoo.md)

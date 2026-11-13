---
title: "Source: Braintrust docs: Prompts"
summary: "Braintrust prompt loading by slug, version and environment, build() without calling the model, version recording on spans, and cache fallback semantics."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "braintrust", "prompt-management"]
---

- **What:** official product documentation
- **Publisher:** Braintrust
- **Date:** accessed 2026-11-14
- **Original:** [docs.braintrust.dev/guides/functions/prompts](https://docs.braintrust.dev/guides/functions/prompts)

## Summary

Braintrust stores prompts by slug and lets code load them by version or environment, render them locally, and record which version ran on each traced LLM span. Its SDK cache acts as a resilience fallback rather than a latency cache.

## Key claims

- Prompts are referenced by slug; UI edits take effect without redeploying.
- `loadPrompt()` (TS), `load_prompt()` (Python), `client.LoadPrompt()` (Go), `Braintrust::Prompt.load()` (Ruby); `build()` compiles to messages, model and parameters without calling the model; `defaults` sets fallback model params.
- Loading by environment returns the version assigned to it; the `bt prompts` CLI assigns versions to environments; a resolved version ID can be passed back to pin it exactly (the Ruby docs describe `prompt.version` as the resolved version's transaction ID; other SDKs only say the span records the prompt's "ID and version"). `invoke()` logs inputs, outputs and the prompt version automatically.
- Template variables like `{{text}}` are filled from the `input` parameter.
- With a wrapped client (`wrap_openai`/`wrapOpenAI`), the prompt's ID and version are recorded in the LLM span's `metadata.prompt`; loading alone logs nothing. For code-only prompts, log your own name/version/Git SHA in span metadata.
- TS and Python fetch on every call and write an in-memory and disk cache; on transient errors (network, timeout, 429, 5xx) they return the last cached copy. Loads pinned to `version` or `environment` never fall back to the cache. Go does not cache.

## Feeds

[Prompt management](../concepts/prompt-management.md)

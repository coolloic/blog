---
title: "Source: Guardrails AI library and docs"
summary: "README and concept docs for the open-source Guardrails AI Python library: Guard objects, Hub validators, on_fail actions and the OpenAI-compatible server."
category: source
lastmod: 2026-11-14
tags: ["security", "guardrails", "structured-outputs"]
---

- **What:** GitHub README and documentation (validator on-fail actions concept page)
- **Publisher:** Guardrails AI
- **Date:** read 2026-11-14; README notice dated 2026-07-06
- **Original:** [github.com/guardrails-ai/guardrails](https://github.com/guardrails-ai/guardrails) · [on-fail actions](https://guardrailsai.com/docs/concepts/validator_on_fail_actions)

## Summary

Guardrails AI is a Python framework that wraps LLM calls in a `Guard` composed of validators. Each validator checks one property (regex, toxicity, PII, competitor mentions, schema) and declares what to do on failure. It also generates structured output from a Pydantic model.

## Key claims

- `Guard().use(Validator, ..., on_fail=...)` builds a guard; `guard.validate(text)` checks text; guards can run on inputs and outputs.
- Validators come from the Guardrails Hub. A 2026-07-06 notice says validators are moving to plain PyPI packages and hosted remote inference ends 2026-08-25.
- `Guard.for_pydantic(output_class=...)` gets structured data, via function calling where supported or by putting the schema in the prompt otherwise.
- On-fail actions: `NOOP` (default; pass through, log), `EXCEPTION` (raise), `REASK` (re-prompt the LLM with the validator's error message), `FIX` (programmatic correction), `FIX_REASK` (fix, re-validate, reask if still failing), `FILTER` (structured output only: drop the failing field), `REFRAIN` (return nothing). Custom handlers are allowed.
- `guardrails start --config=...` serves guards as a REST service with an OpenAI-compatible endpoint per guard, so clients only change `base_url`.

## Feeds

[Guardrail tooling](../concepts/guardrail-tooling.md)

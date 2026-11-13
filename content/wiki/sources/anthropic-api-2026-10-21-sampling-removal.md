---
title: "Source: Claude API 2026-10-21 migration: sampling parameters removed"
summary: "Anthropic's migration guide and deprecations page recording the removal of temperature, top_p and top_k from the Claude API."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** official migration guide and deprecations page
- **Author:** Anthropic
- **Date:** API version 2026-10-21; accessed 2026-11-14
- **Original:** [Migrating to API version 2026-10-21](https://platform.claude.com/docs/en/api/migration-2026-10-21)

## Summary

Anthropic removed the three classic sampling knobs. The deprecations page (https://platform.claude.com/docs/en/about-claude/model-deprecations) and the migration guide describe the behaviour per API version and model, and recommend steering behaviour through prompting instead.

## Key claims

- In API version 2026-10-21, sending temperature, top_p or top_k returns a 400 error even at the default value.
- Under the older 2023-06-01 version, non-default values already return 400 on Claude 4.7+ models and Claude Mythos Preview.
- Requests sample with the defaults (temperature 1.0); models such as Claude Sonnet 4.6 that used to accept lower temperatures lose that effect, and no other setting replaces it.
- The latest SDK and CLI major versions no longer expose the parameters; teams relying on non-default values must stay on 2023-06-01.
- Recommended replacement: omit the parameters and guide behaviour with prompting.
- Models that already accept only the defaults (Claude 4.7 and later) sample as before after the migration.

## Feeds

[Sampling parameters](../concepts/sampling-parameters.md)

---
title: "Source: Langfuse prompt management documentation"
summary: "Langfuse docs on prompt types, immutable versions, labels, protected labels, config, composability, client-side caching, trace linking and prompt webhooks."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "langfuse", "prompt-management"]
---

- **What:** official product documentation (several feature pages)
- **Publisher:** Langfuse
- **Date:** accessed 2026-11-14
- **Original:** [Overview](https://langfuse.com/docs/prompt-management/overview), [Concepts](https://langfuse.com/docs/prompt-and-skill-management/concepts), [Get started](https://langfuse.com/docs/prompt-management/get-started), [Version control](https://langfuse.com/docs/prompt-management/features/prompt-version-control), [Caching](https://langfuse.com/docs/prompt-management/features/caching), [Config](https://langfuse.com/docs/prompt-management/features/config), [Composability](https://langfuse.com/docs/prompt-management/features/composability), [Link to traces](https://langfuse.com/docs/prompt-management/features/link-to-traces), [Webhooks and Slack](https://langfuse.com/docs/prompt-management/features/webhooks-slack-integrations)

## Summary

Langfuse stores prompts centrally, versions them immutably, and lets application code fetch them by label so a prompt change ships without a code deploy. The SDK caches prompts in memory with stale-while-revalidate, so fetches add no latency after the first. Prompts can be linked to generations so that latency, cost and scores are broken down per prompt version. Agent skills (a `SKILL.md` plus files) are managed with the same versioning model.

## Key claims

- Two prompt types: `text` (one string) and `chat` (a list of role/content messages). The type cannot be changed after creation.
- Each save creates a new immutable, auto-numbered version (1, 2, 3...). `create_prompt` with an existing name adds a version.
- Labels point to versions. `production` is the default served when no label or version is given; `latest` is maintained automatically and points to the newest version; custom labels serve staging, tenants or A/B variants.
- Fetching a label that no version carries returns 404 with no fallback; passing both `label` and `version` returns 400.
- Rollback = move the `production` label back to an older version; no code change.
- Protected labels (Enterprise, self-hosted Enterprise Edition, or Pro with the Teams add-on; not Hobby or Core): `viewer`/`member` roles cannot move or delete them, or delete the prompt; `admin`/`owner` can.
- SDK: Python `get_prompt(name, label=..., version=..., type="chat", cache_ttl_seconds=...)`, `create_prompt`, `update_prompt(..., new_labels=[...])`; JS/TS `langfuse.prompt.get/create/update`. `prompt.compile(**vars)` fills `{{variable}}` placeholders; a chat prompt compiles to a message list usable directly as OpenAI `messages`.
- `config` is an optional JSON object versioned with the prompt (e.g. model, temperature, `response_format` JSON schema, `tools`); the app reads `prompt.config`.
- Composability: a text prompt can embed another text prompt with a tag of the form `@@@langfusePrompt:name=X|version=N@@@` or `|label=production`; only text prompts can be referenced. Message placeholders insert message arrays such as chat history.
- Caching: default TTL 60 s; expired entries are returned immediately and refreshed in the background; `cache_ttl_seconds=0` disables caching (suggested for non-production). Optional prefetch at startup and an optional fallback prompt (used only when cache is empty and the API is down). Server side, a cache miss hits Redis, then PostgreSQL.
- Measured uncached fetch latency on Langfuse Cloud (1,000 sequential runs): mean about 39 ms, p99 about 69 ms.
- Because of caching, the first traces after a label change may still use the old version.
- Linking: pass `prompt=` on a generation (Python), `langfuse_prompt=` in the OpenAI wrapper, `metadata={"langfuse_prompt": prompt}` on LangChain templates, or `propagate_attributes(prompt=...)` (Python SDK >= 4.14.0). Only generation observations are linked; if a fallback prompt is used, no link is created.
- Per-version metrics: median latency, input/output tokens, cost, generation count, median score, first/last use.
- Webhooks fire on prompt-version created, label/tag updated (two events: gaining and losing version) and deleted; payload includes the template, config and commit message; requests are signed with HMAC SHA-256 (`x-langfuse-signature`), retried with exponential back-off, so handlers must be idempotent. Slack and PagerDuty targets exist. Uses include triggering CI on prompt changes.

## Feeds

[Langfuse](../concepts/langfuse.md) · [Prompt management](../concepts/prompt-management.md)

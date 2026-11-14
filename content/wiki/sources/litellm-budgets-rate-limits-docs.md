---
title: "Source: LiteLLM docs: budgets and rate limits (proxy users, teams, keys)"
summary: "LiteLLM proxy's budget hierarchy (global, team, team member, internal user, virtual key, end user, per model) and rpm/tpm/parallel-request limits, with reset windows and fail-open/fail-closed behaviour."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gateways", "cost"]
---

- **What:** official documentation page ("Budgets, Rate Limits")
- **Publisher:** BerriAI (LiteLLM)
- **Date:** living docs, read 2026-11-14 (mentions behaviour changes in v1.94.0 and v1.95.0)
- **Original:** [docs.litellm.ai/docs/proxy/users](https://docs.litellm.ai/docs/proxy/users)

## Summary

The proxy can cap spend (in USD, priced from its model cost map) and request/token rates at several levels of an org hierarchy. Everything except the global budget depends on Postgres, and enforcement details (which budget wins, when windows reset, what happens when the database or Redis is down) are configurable and easy to get wrong.

## Key claims

- Postgres is required. Without it, budgets fail open: requests keep being served.
- Levels: global (`litellm_settings.max_budget` + `budget_duration`), team, team member (`max_budget_in_team`), internal user, virtual key, end user / customer (via `/budget/new` and `max_end_user_budget_id`), and per-model budgets on keys/users (`model_max_budget`, Enterprise).
- A key that belongs to a team is checked against team and team-member budgets only, not its owner's personal budget (briefly enforced in v1.94.0, reverted in v1.95.0).
- Durations are written like `30s`, `30m`, `30h`, `30d`; a key can hold several windows via `budget_limits`. `24h` resets at midnight UTC, `7d` on Monday, `30d` on the 1st of the month. A background job checks resets about every 10 minutes by default.
- Over-budget errors include `ExceededTokenBudget` (key) and `ExceededBudget` (team member, end user).
- `rpm_limit`, `tpm_limit` and `max_parallel_requests` can be set on keys, users and teams; `model_rpm_limit` / `model_tpm_limit` per model, with key values overriding team values. `token_rate_limit_type` counts input, output or total (default) tokens.
- Budget reservation is on by default (it reserves estimated cost before the call); `fail_closed_budget_enforcement` checks the database before admitting a request; `fail_closed_rate_limit_enforcement` returns 503 when Redis cannot confirm counters.
- Agents can carry per-session token/request limits, `max_iterations` and `max_budget_per_session`, returning 429 when exceeded.
- Models priced at zero input and output cost skip budget checks.

## Feeds

[LiteLLM](../concepts/litellm.md)

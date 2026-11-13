---
title: "Source: Inference hooks (Anthropic)"
summary: "Claude Enterprise feature that sends each governed prompt (and optionally tool calls) to the customer's AI security server for an allow or deny verdict before inference."
category: source
lastmod: 2026-11-14
tags: ["enterprise", "anthropic", "dlp"]
---

- **What:** official documentation page
- **Publisher:** Anthropic
- **Date:** accessed 2026-11-14
- **Original:** [Inference hooks](https://platform.claude.com/docs/en/manage-claude/inference-hooks)

## Summary

An inline policy-enforcement point that sits on Anthropic's side, between the client and the model. The organization runs an HTTPS "AI security server", often a DLP vendor's, that receives the transcript and returns allow or deny.

## Key claims

- Two events: `prompt` (before each governed inference request) and `tool_call` (before Claude's tool calls run, if enabled). Requests are signed per the Standard Webhooks spec.
- The default verdict timeout is 5 seconds. On timeout or error the org's failure setting decides whether to fail closed (block) or open (allow uninspected). A circuit breaker handles sustained outages.
- Rollout controls: shadow mode (observe only), a rollout percentage, and role-based exclusions.
- The server sees transcript text, tool calls and results, and extracted attachment text. It does not see raw file or image bytes, system prompts or tool definitions, so image-only content is not inspected.
- Verdicts are allow or deny only; the hook cannot rewrite or redact. Denials are recorded in the Activity Feed.
- Main use cases: DLP, real-time archiving, prompt telemetry, policy engines (model allowlists, working hours).
- Enterprise-only; not available for API-platform organizations or on Bedrock or Google Cloud.

## Feeds

[Enterprise LLM deployment](../concepts/enterprise-llm-deployment.md)

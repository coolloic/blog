---
title: "Source: AAIF: A2A v1.0 Builder's Guide, Part 1"
summary: "Practitioner guide to A2A v1.0 discovery, task lifecycle, progress tracking, SDK structure, 0.3-to-1.0 breaking changes and common gotchas."
category: source
lastmod: 2026-11-14
tags: ["protocols", "a2a"]
---

- **What:** blog post on the Agentic AI Foundation site
- **Author/publisher:** Rohit Ghumare, Agentic AI Foundation (AAIF)
- **Date:** 2026-08-27
- **Original:** [A2A v1.0: a builder's guide, part 1](https://aaif.io/blog/a2a-v1-0-a-builder-s-guide-part-1-discovery-tasks-and-clients)

## Summary

A hands-on walk through what a builder needs for A2A v1.0: how a card is discovered and how bindings are chosen, how tasks move through states, three ways to track progress, how the Python SDK is shaped, and the mistakes people make migrating from 0.3.

## Key claims

- The card lives at `/.well-known/agent-card.json`: 0.3 renamed it from `agent.json` (2025-07-30) and v1.0 registered the suffix as a well-known URI; `supportedInterfaces` replaces `url` + `preferredTransport`; clients use the first binding they support and all bindings must be functionally equivalent.
- `capabilities` is a commitment: if `pushNotifications` is false, push calls must fail with `PushNotificationNotSupportedError`.
- Clients must send `A2A-Version: 1.0`; a missing header means 0.3, and a 1.0-only agent returns `VersionNotSupportedError`. Fix server-side by adding a second interface with `protocolVersion` 0.3 and enabling the SDK's compatibility flag.
- `SendMessage` blocks until a terminal or interrupted state unless `returnImmediately: true`; this is a common cause of gateway timeouts.
- Progress: poll `GetTask` (firewall-friendly), stream over SSE, or push to a webhook (agent uses 10–30 s timeouts with backoff, refuses private address ranges such as 10.0.0.0/8 and 192.168.0.0/16; receivers return 2xx, verify the task ID and dedupe).
- Python SDK server = card + executor (receives `RequestContext`, writes to an `EventQueue`) + routes; client = resolve card, build client (SDK picks binding), iterate the stream.
- Gotchas: mixing a Message with task events in one stream raises `InvalidAgentResponseError`; clients must handle a bare message reply; keep the public card route outside the protocol endpoint's auth middleware.
- Sending to a terminal task returns `UnsupportedOperationError`; cancelling one returns `TaskNotCancelableError`.

## Feeds

- [Agent2Agent (A2A) protocol](../concepts/agent2agent-protocol.md)

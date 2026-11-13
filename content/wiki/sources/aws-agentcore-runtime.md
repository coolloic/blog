---
title: "Source: Amazon Bedrock AgentCore — How Runtime Works"
summary: "Internals of AgentCore Runtime: versions and endpoints, per-session microVMs, 8-hour sessions, V2 snapshot cold starts and inbound/outbound auth."
category: source
lastmod: 2026-11-14
tags: ["platforms", "aws", "agents"]
---

- **What:** vendor documentation
- **Author:** Amazon Web Services
- **Date:** undated, read 2026-11-14
- **Original:** [How AgentCore Runtime works](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-how-it-works.html)

## Summary

Deep reference on the AgentCore Runtime execution model and deployment lifecycle.

## Key claims

- Each runtime has immutable versions; every config change creates a new version. Endpoints point at versions; `DEFAULT` follows the latest; custom endpoints enable dev/test/prod and rollback.
- Each session (`runtimeSessionId`) runs in a dedicated microVM with isolated CPU, memory and filesystem.
- Sessions end after 15 minutes idle or 8 hours total; the microVM is destroyed and memory sanitized. State is ephemeral, so use AgentCore Memory for durability.
- Platform V2 is opt-in (`platformVersion`; V1 is the default). V2 restores each instance from a prepared snapshot for consistent cold starts, allows 10 GB images (vs 2 GB on V1), and requires the container to report healthy within 120 s. Creating or updating a runtime takes minutes.
- Default V2 allocation is 2 vCPU / 8 GB, billed per second for what is used; committed baselines (1–8 GB) are cheaper and can burst to 4×, up to 8 vCPU / 32 GB.
- Inbound auth: IAM SigV4 or OAuth 2.0/OIDC JWT (discovery URL, allowed audiences and clients). Outbound auth via AgentCore Identity: OAuth or API keys, user-delegated or autonomous.
- Protocols: HTTP, MCP, A2A, plus WebSocket bidirectional streaming. Async background work up to 8 hours is tracked via `/ping`.

## Feeds

[Amazon Bedrock](../concepts/amazon-bedrock.md)

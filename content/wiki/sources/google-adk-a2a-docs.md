---
title: "Source: A2A in ADK (ADK docs)"
summary: "ADK's support for the Agent2Agent protocol: exposing agents, consuming remote agents with RemoteA2aAgent, and when to prefer local sub-agents."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "a2a"]
---

- **What:** official documentation pages: A2A overview and introduction
- **Author:** Google
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://adk.dev/a2a/intro/](https://adk.dev/a2a/intro/)

## Summary

ADK can expose an agent as an A2A server and consume a remote A2A agent through a `RemoteA2aAgent` proxy that handles networking, auth and formatting. The intro gives decision criteria for remote vs local agents.

## Key claims

- Use A2A when the other agent is a separate service, owned by another team, in another language/framework, or needs a formal contract.
- Prefer local sub-agents for internal structure, latency-sensitive work, shared state, and simple helpers.
- `RemoteA2aAgent` lets a remote agent be called much like a local one.
- Python A2A support is full; Go, Java and Kotlin support is experimental.

## Feeds

- [Google ADK](../concepts/google-adk.md)

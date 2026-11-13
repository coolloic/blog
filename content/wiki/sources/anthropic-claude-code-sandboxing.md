---
title: "Source: Making Claude Code more secure and autonomous with sandboxing (Anthropic, 2025)"
summary: "Anthropic engineering post on Claude Code's OS-level filesystem and network sandbox, which cut permission prompts by 84% internally, plus the cloud git-proxy design."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "security"]
---

- **What:** engineering blog post
- **Publisher:** Anthropic
- **Date:** 2025-10-20
- **Original:** [Claude Code sandboxing](https://www.anthropic.com/engineering/claude-code-sandboxing)

## Summary

Argues that per-action approval prompts cause approval fatigue, and replaces them with pre-defined boundaries enforced by the OS. The agent can act freely inside the boundary; prompt-injected behaviour stays contained.

## Key claims

- Two isolation layers are needed together: filesystem (read/write limited to the working directory) and network (all traffic through an out-of-sandbox proxy that allows approved domains and asks for new ones). Without network isolation a compromised agent can exfiltrate SSH keys; without filesystem isolation it can escape and reach the network.
- Implemented with Linux bubblewrap and macOS seatbelt, no container needed; covers spawned subprocesses; the runtime is open source; enabled via `/sandbox`.
- Internal usage: sandboxing reduced permission prompts by 84%.
- Threat model centres on prompt injection.
- Claude Code on the web: each session runs in an isolated cloud sandbox; git credentials and signing keys stay outside; a git proxy authenticates the sandbox with a scoped credential, checks the operation (e.g. push only to the configured branch), then attaches the real token.

## Feeds

[Coding agents](../concepts/coding-agents.md)

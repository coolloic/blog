---
title: "Source: Codex agent approvals and security (OpenAI docs)"
summary: "Codex's two-layer safety model: OS sandbox modes (read-only, workspace-write, danger-full-access) and approval policies, with network off by default."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "security"]
---

- **What:** official product documentation
- **Publisher:** OpenAI
- **Date:** living document, read 2026-11-14 (references Codex versions 0.114/0.115)
- **Original:** [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security)

## Summary

Codex separates *what commands can technically do* (sandbox) from *when the agent must stop and ask* (approval policy). Defaults: network off, writes confined to the workspace.

## Key claims

- Sandbox modes: `read-only`; `workspace-write` (basis of the "Auto" preset); `danger-full-access` (no sandbox, not recommended).
- Approval policies: `on-request` (ask before leaving the sandbox, using the network or running untrusted commands); `never` (for CI, paired with a sandbox); `granular`; `untrusted` is retired. An optional auto-review agent screens approval requests, denying critical-risk actions and failing closed.
- Network in workspace-write is off unless `sandbox_workspace_write.network_access = true`; a network proxy enforces allow/deny domain rules (deny wins); local/private destinations blocked by default. Web search defaults to a cached index.
- OS mechanisms: macOS Seatbelt (`sandbox-exec`); Linux bubblewrap plus seccomp; Windows MXC (with legacy fallbacks); WSL2 uses the Linux sandbox.
- Protected paths stay read-only inside writable roots: `.git`, `.agents`, `.codex`, `.aws`.
- Cloud tasks run in OpenAI-managed containers: setup phase may use the network to install dependencies; the agent phase is offline by default and secrets are removed before it starts.
- Inside Docker/dev containers the Linux sandbox may fail; using `danger-full-access` there shifts isolation to the container.
- Web results and external content must be treated as untrusted (prompt injection).

## Feeds

[Coding agents](../concepts/coding-agents.md)

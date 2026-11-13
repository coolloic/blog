---
title: "Source: Agent SDK overview (Claude Code docs)"
summary: "Anthropic's overview of the Claude Agent SDK: Claude Code's agent loop, tools and context management as a Python/TypeScript library."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "anthropic"]
---

- **What:** official documentation page, Claude Code docs (Agent SDK section)
- **Author:** Anthropic
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://code.claude.com/docs/en/agent-sdk/overview](https://code.claude.com/docs/en/agent-sdk/overview)

## Summary

The overview positions the Agent SDK as Claude Code packaged as a library. It compares four ways to build with Claude: the Agent SDK (embed the agent in your own process), the Claude Code CLI (interactive terminal use), the Client SDK (raw API access, you write the tool loop) and Managed Agents (Anthropic hosts the loop and sandbox). It lists the Claude Code capabilities the SDK exposes and sets licensing and branding rules.

## Key claims

- The SDK gives the same tools, agent loop and context management that power Claude Code, in Python and TypeScript.
- The Agent SDK runs the Claude Code binary; the Client SDK leaves the tool loop to you (or a beta tool runner).
- Managed Agents is the hosted alternative: Anthropic runs the loop, with an Anthropic-managed or self-hosted sandbox.
- Capabilities exposed: built-in tools, hooks, subagents, MCP, permissions, sessions, skills/commands/memory from `.claude/`, and plugins.
- Other languages can drive the same loop by running the CLI as a subprocess with `-p` and JSON output.
- Third-party products may not offer claude.ai login or its rate limits unless approved; use API-key authentication.
- Products built on it must not be branded as Claude Code; use is governed by Anthropic's Commercial Terms.

## Feeds

- [Claude Agent SDK](../concepts/claude-agent-sdk.md)

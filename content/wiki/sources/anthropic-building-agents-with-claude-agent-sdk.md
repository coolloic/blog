---
title: "Source: Building agents with the Claude Agent SDK (Anthropic)"
summary: "Anthropic's engineering post announcing the rename of the Claude Code SDK to the Claude Agent SDK and describing its gather-act-verify loop."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "anthropic"]
---

- **What:** engineering blog post
- **Author:** Thariq Shihipar and colleagues, Anthropic
- **Date:** 2025-09-29
- **Original:** [https://claude.com/blog/building-agents-with-the-claude-agent-sdk](https://claude.com/blog/building-agents-with-the-claude-agent-sdk)

## Summary

Announces that the Claude Code SDK is now the Claude Agent SDK, because Anthropic uses the same harness for non-coding work. The core idea is to give the agent a computer (files, search, terminal). The post frames the agent loop as gathering context, taking action and verifying work, and gives practical advice for each stage and for improving agents from failure cases.

## Key claims

- The Claude Code SDK was renamed the Claude Agent SDK because the harness suits general digital work, not only code.
- Loop: gather context, take action, verify work, repeat.
- The file system is a form of context engineering: folder structure shapes what the agent can load with tools like grep and tail.
- Start with agentic search; add semantic (embedding) search only if needed, as it is less accurate and less transparent.
- Subagents give parallelism and isolated context windows; compaction summarises old messages near the context limit.
- Actions: tools, bash and scripts, code generation, and MCP for external services.
- Verification: rules such as linting, visual feedback via screenshots, and LLM-as-judge (less robust, slower).
- Improve agents by studying failures and building a representative eval set from real usage.

## Feeds

- [Claude Agent SDK](../concepts/claude-agent-sdk.md)

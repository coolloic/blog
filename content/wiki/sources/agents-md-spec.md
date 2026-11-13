---
title: "Source: AGENTS.md (open format site)"
summary: "The AGENTS.md site: a plain-Markdown 'README for agents' adopted by 60k+ repos and many coding agents, now stewarded by the Agentic AI Foundation under the Linux Foundation."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding"]
---

- **What:** format specification / project website
- **Publisher:** AGENTS.md project (a Series of LF Projects; stewarded by the Agentic AI Foundation)
- **Date:** living site, read 2026-11-14
- **Original:** [agents.md](https://agents.md/)

## Summary

AGENTS.md is a convention, not a schema: a Markdown file at the repository root (and optionally in subdirectories) holding the build, test and convention knowledge an agent needs but that would clutter a human README. It emerged from collaboration between OpenAI Codex, Amp, Google Jules, Cursor and Factory.

## Key claims

- No required fields. Suggested sections: project overview, build and test commands, code style, testing instructions, security considerations, commit/PR guidelines, deployment.
- Monorepos can nest files per package; agents use the nearest file in the tree, and explicit chat prompts override all AGENTS.md content. The OpenAI main repo reportedly has 88 of them.
- Reported adoption: over 60k open-source projects (as of 2026-11).
- Supporting tools listed include OpenAI Codex, Jules, Aider, goose, opencode, Zed, Warp, VS Code, Devin, JetBrains Junie, Amp, Cursor, RooCode, Gemini CLI, GitHub Copilot's coding agent and Windsurf.

## Feeds

[Coding agents](../concepts/coding-agents.md)

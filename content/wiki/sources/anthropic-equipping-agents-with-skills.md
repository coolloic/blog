---
title: "Source: Equipping agents for the real world with Agent Skills (Anthropic Engineering)"
summary: "Anthropic's launch essay for Agent Skills: folders of instructions, scripts and resources loaded by progressive disclosure, later published as an open standard."
category: source
lastmod: 2026-11-14
tags: ["agents", "skills"]
---

- **What:** engineering blog post
- **Publisher:** Anthropic (Barry Zhang, Keith Lazuka, Mahesh Murag)
- **Date:** 2025-10-16; updated 2025-12-18 with the open-standard announcement
- **Original:** [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

## Summary

Introduces Agent Skills as a way to turn a general-purpose agent into a specialist by giving it an onboarding-guide-like folder it can discover and read on demand. The design relies on the agent having a filesystem and code execution, so a skill can bundle far more material than fits in context and load only what the task needs.

## Key claims

- A skill is a directory whose core file is `SKILL.md`; YAML frontmatter must carry `name` and `description`, the body holds instructions.
- Three disclosure levels: (1) every installed skill's name and description is preloaded into the system prompt; (2) the full `SKILL.md` is read when the skill looks relevant; (3) linked files are read only if needed.
- Because files are read on demand, the amount of bundled context is described as effectively unbounded.
- Skills can ship scripts the agent runs as tools; code gives deterministic, cheaper results than token generation for tasks like sorting or form-field extraction. Instructions should say whether a script is to be run or read.
- Authoring advice: start from evaluations that reveal capability gaps, split large files, keep mutually exclusive contexts in separate files, watch real usage, and pay most attention to `name`/`description` because they drive triggering.
- Security: malicious skills can introduce vulnerabilities or exfiltrate data; install only from trusted sources and audit scripts, dependencies and any instructions to contact external networks.
- 2025-12-18 update: Agent Skills published as an open standard (agentskills.io) for cross-platform portability; supported in Claude.ai, Claude Code, the Agent SDK and the Developer Platform.
- Stated future direction: complementing MCP servers, and agents that create and evaluate their own skills.

## Feeds

[Agent skills](../concepts/agent-skills.md)

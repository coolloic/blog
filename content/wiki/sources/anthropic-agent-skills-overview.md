---
title: "Source: Agent Skills overview (Claude Platform docs)"
summary: "Anthropic's reference for how skills load across the API, Claude Code and claude.ai: three-level token costs, VM/filesystem architecture, surface differences, security and data retention."
category: source
lastmod: 2026-11-14
tags: ["agents", "skills"]
---

- **What:** official documentation
- **Publisher:** Anthropic
- **Date:** living document, read 2026-11-14
- **Original:** [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

## Summary

Explains the runtime architecture behind skills on each Anthropic surface and the constraints that differ between them.

## Key claims

- Skills run in a VM with filesystem and bash; the model reads `SKILL.md` with bash when triggered and runs bundled scripts, receiving only their output.
- Token costs: level 1 metadata about 100 tokens per skill, always loaded; level 2 instructions under 5k tokens when triggered; level 3 resources cost nothing until read.
- Pre-built skills: `pptx`, `xlsx`, `docx`, `pdf` (API, claude.ai, Claude Platform on AWS, Foundry); not in Claude Code, which bundles its own (e.g. the Claude API skill).
- Custom skills do not sync across surfaces: claude.ai uploads, API uploads and Claude Code filesystem skills are separate. API skills are workspace-wide.
- Runtime differences: API has no network access and no runtime package install; claude.ai network access varies by admin setting; Claude Code has full network access.
- Security: treat a skill like installed software; audit all bundled files; skills that fetch external URLs are especially risky since fetched content can carry instructions.
- Data handling (as of 2026-11): Agent Skills are not ZDR-eligible and not HIPAA-eligible.
- Messages API: list `skill_ids` in the `container` parameter together with the code execution tool; Managed Agents attach skills in a `skills` array.

## Feeds

[Agent skills](../concepts/agent-skills.md)

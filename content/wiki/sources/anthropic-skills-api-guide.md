---
title: "Source: Using Agent Skills with the API (Claude Platform docs)"
summary: "How to attach Anthropic and custom skills to Messages API calls: container parameter, code execution tool, versions, limits, container reuse and pause_turn."
category: source
lastmod: 2026-11-14
tags: ["agents", "skills", "api"]
---

- **What:** official documentation
- **Publisher:** Anthropic
- **Date:** living document, read 2026-11-14
- **Original:** [Using Agent Skills with the API](https://platform.claude.com/docs/en/build-with-claude/skills-guide)

## Summary

The programmatic side of skills: uploading, versioning and attaching them to requests, and running multi-turn work in the same sandbox container.

## Key claims

- Request shape: `container.skills` is a list of `{type: anthropic|custom, skill_id, version}`; the code execution tool (`code_execution_20250825`) must be in `tools`.
- Limits (as of 2026-11): up to 20 skills per request; custom skill upload up to 30 MB uncompressed; `display_name` up to 255 chars.
- Versions: Anthropic skills use date versions (e.g. `20251013`), custom skills `skver_...` ids; `latest` floats, pinning gives stability. New versions are full snapshots and must keep the same `name`.
- Skill files are copied into the container under `/skills/{skill-name}/`; metadata goes into the system prompt.
- Multi-turn: reuse `container.id` from the previous response; on `stop_reason: pause_turn`, send the content back as an assistant turn in the same container or files are lost.
- Generated files come back as `file_id`s in code-execution results and are downloaded with the Files API.
- Custom skills are scoped to the workspace, not the end user; use one workspace per tenant in multitenant apps.

## Feeds

[Agent skills](../concepts/agent-skills.md)

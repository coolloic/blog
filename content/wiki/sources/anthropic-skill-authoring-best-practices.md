---
title: "Source: Skill authoring best practices (Claude Platform docs)"
summary: "Anthropic's guide to writing skills: conciseness, degrees of freedom, third-person trigger descriptions, one-level references, checklists, validator loops, utility scripts and eval-first development."
category: source
lastmod: 2026-11-14
tags: ["agents", "skills"]
---

- **What:** official documentation
- **Publisher:** Anthropic
- **Date:** living document, read 2026-11-14
- **Original:** [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

## Summary

A practical style guide for skill authors. Its central idea is that the context window is shared, so each line of a skill must earn its tokens, and that a skill should be developed against evaluations and observed agent behaviour rather than imagined needs.

## Key claims

- Assume the model is already capable; include only context it lacks. A concise example is about a third the tokens of a verbose one with no loss.
- Match specificity to fragility: high freedom (prose heuristics) for context-dependent work, medium (pseudocode/parameterised templates), low (exact script, no deviation) for fragile operations like migrations.
- Test with every model you plan to use; smaller models may need more guidance, larger ones less explanation.
- API constraints: `name` max 64 chars, lowercase/digits/hyphens, no XML tags, may not contain `anthropic` or `claude`; `description` max 1,024 chars, no XML tags.
- Names: prefer gerunds (`processing-pdfs`); avoid vague names (`helper`, `utils`).
- Descriptions: write in third person (they are injected into the system prompt), state what and when, include trigger keywords; the model may be choosing among 100+ skills.
- Keep `SKILL.md` under 500 lines; organise references by domain so irrelevant files are never read; keep references one level deep because the model may only preview nested files (e.g. with `head`); add a table of contents to reference files over 100 lines.
- Use copyable checklists for multi-step workflows and validator-fix-repeat feedback loops; for high-stakes batch work use plan-validate-execute with a machine-checkable intermediate file.
- Scripts should handle errors rather than punt to the model, document constants, and state whether to run or read them; script code never enters context, only output does.
- Reference MCP tools by fully qualified `Server:tool` names; never assume packages are installed; avoid time-sensitive statements and Windows paths; use consistent terminology.
- Eval-first: find gaps without a skill, write at least three evaluations, baseline, then write minimal instructions; iterate with one model instance authoring and a fresh instance testing.

## Feeds

[Agent skills](../concepts/agent-skills.md)

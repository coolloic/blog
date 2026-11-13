---
title: "Source: Extend Claude with skills (Claude Code docs)"
summary: "Claude Code's skills reference: locations and precedence, the extended frontmatter, argument substitution, shell injection, invocation control, listing budget and troubleshooting."
category: source
lastmod: 2026-11-14
tags: ["agents", "skills", "coding"]
---

- **What:** official product documentation
- **Publisher:** Anthropic
- **Date:** living document, read 2026-11-14
- **Original:** [Extend Claude with skills](https://code.claude.com/docs/en/skills)

## Summary

The most detailed public description of how one harness implements the skills standard. Claude Code folds custom slash commands into skills, adds many harness-specific frontmatter fields, and documents the exact context-budget mechanics of the skill listing.

## Key claims

- Locations: enterprise (managed), personal `~/.claude/skills/`, project `.claude/skills/` (from start dir up to repo root), nested subdirectory skills (loaded when files there are touched), `--add-dir` directories, plugins (namespaced `/plugin:skill`), and claude.ai-synced skills. Name clashes: enterprise > personal > project.
- Custom commands are merged into skills: `.claude/commands/deploy.md` and `.claude/skills/deploy/SKILL.md` both create `/deploy`.
- Claude Code frontmatter adds `when_to_use`, `argument-hint`, `arguments`, `disable-model-invocation`, `user-invocable`, `allowed-tools`, `disallowed-tools`, `model`, `effort`, `context: fork` + `agent`, `hooks`, `paths`, `shell`. Unknown fields are silently ignored; uploads to claude.ai or the Skills API accept only the open-standard fields and hard-error on others.
- Substitutions: `$ARGUMENTS`, `$N`, named `$arg`, `${CLAUDE_SKILL_DIR}`, `${CLAUDE_SESSION_ID}`, etc. If no placeholder consumes arguments they are appended.
- Dynamic context injection: a line-leading `` !`cmd` `` (or a ```` ```! ```` block) runs before the model sees the skill and splices in its output; subject to permission rules, 2-minute timeout, non-zero exit aborts; can be disabled with `disableSkillShellExecution`.
- Invocation control: default = both user and model can invoke, description always in context; `disable-model-invocation: true` = user-only and zero context until used; `user-invocable: false` = model-only.
- `allowed-tools` grants permission only for the invoking turn and restricts nothing; use `disallowed-tools` to remove tools.
- Lifecycle: invoked skill content stays in the conversation and is not re-read; after compaction only the first 5,000 tokens per skill (25,000 total, most recent first) are re-attached, so put critical rules at the top.
- Listing budget: names always listed, descriptions dropped (least-used first) once the listing exceeds about 1% of the context window; each description+when_to_use capped at 1,536 chars. Tunable via `skillListingBudgetFraction` or `SLASH_COMMAND_TOOL_CHAR_BUDGET`; `/doctor` and `/skill-doctor` report cost.
- Troubleshooting: rules that must always hold belong in hooks (optionally in the skill's `hooks` frontmatter); malformed YAML loads the body with empty metadata so auto-triggering silently fails; `claude plugin validate .claude/skills` finds parse errors.
- Evaluation: the skill-creator plugin runs per-test-case subagents, grades assertions, benchmarks with-skill vs without-skill pass rate against token/time overhead, A/B tests versions and tunes descriptions with should/shouldn't-trigger prompts.

## Feeds

[Agent skills](../concepts/agent-skills.md)
[Agent instruction files](../concepts/agent-instruction-files.md)

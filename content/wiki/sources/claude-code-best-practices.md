---
title: "Source: Best practices for Claude Code (Anthropic docs)"
summary: "Anthropic's official guidance for Claude Code: tell it what it can't see, give it a check to run, enforce hard rules with hooks and deny rules, and bound unattended runs."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding"]
---

- **What:** official product documentation (successor to the April 2025 engineering post of the same name, which now redirects here)
- **Publisher:** Anthropic
- **Date:** living document, read 2026-11-14
- **Original:** [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices)

## Summary

Frames every instruction to Claude Code as either non-deterministic (prompt, CLAUDE.md, skills: the model decides whether to follow) or deterministic (hooks, deny rules, managed settings, sandbox: the harness enforces). Most session failures come from four causes: missing information the repo doesn't contain, no way for the agent to check its own work, rules that needed enforcement rather than prompting, or a default (mode, effort, subagents) that costs more than the task is worth. It also lists older advice that current models have made unnecessary.

## Key claims

- CLAUDE.md should hold only what the agent cannot discover from code: exact test/typecheck/lint commands, misleading code, decisions made outside the repo, things corrected twice. Target under 200 lines; scope narrow rules to `.claude/rules/` with `paths:` globs; put procedures in skills (loaded on demand).
- If emphasis ("IMPORTANT") doesn't make a line stick, the file is too long or the line is a rule that belongs in a hook.
- The single most useful verification step is a pass/fail check the agent can run (tests, build exit code, linter, screenshot diff). Escalation ladder: prompt → `/goal` (a separate model checks a condition each turn) → `Stop` hook (exit code 2 sends the agent back; capped at eight consecutive blocks) → independent review in a fresh subagent.
- Ask for evidence (the command and its output), not "all tests pass".
- Deny rules hold in every permission mode, including auto and bypass. Rules match tool calls, not intent: a `Read(./.env)` deny catches `cat .env` but not a script that opens the file; a WebFetch deny doesn't stop `curl` unless the sandbox is on.
- As of 2026-11, interactive terminal and VS Code sessions start in **auto mode**: a classifier model reviews risky actions (e.g. `curl | bash`, production deploys, force pushes, exfiltration, actions that look driven by read content) after deny/ask rules and PreToolUse hooks have applied. After three consecutive (or twenty total) blocks it pauses.
- Settings scopes: `~/.claude/settings.json` and `.claude/settings.local.json` (personal), `.claude/settings.json` (repo, shared), managed settings (org, cannot be overridden).
- Default model (2026-11): Claude Opus 5.5 at medium effort on most plans and providers; effort, not prompt phrases like "think harder", controls reasoning depth. `ultrathink` boosts a single turn.
- Subagents give parallelism, isolation of noisy output, unbiased review, or restricted tool sets; they do not give a smarter answer and cost tokens and sometimes time.
- Most current models have a 1M-token window with automatic compaction; `/clear` between unrelated tasks still improves quality and cost. After two failed corrections, `/clear` and re-prompt.
- Checkpoints (`Esc` twice / `/rewind`) restore files edited by the agent's file tools, not files changed only by Bash.
- Unattended runs: define done, give a self-check, restrict scope (permission rules, `dontAsk`, sandbox, worktree), cap with `--max-turns` / `--max-budget-usd`, and have a human approve the result. `claude -p` with `--bare`, `--allowedTools`, `--output-format json` is the scripting form.
- Dropped advice: aggressive context management, ALL CAPS, subagents "for a better answer", "keep going / don't be lazy" prompts, describing architecture in CLAUDE.md.

## Feeds

[Coding agents](../concepts/coding-agents.md)

---
title: "Source: Plugin manifest reference (Claude Code docs)"
summary: "The plugin.json schema and standard layout for Claude Code plugins, which bundle skills, commands, agents, hooks, MCP and LSP servers into one namespaced, versioned unit."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding"]
---

- **What:** official product documentation
- **Publisher:** Anthropic
- **Date:** living document, read 2026-11-14
- **Original:** [Plugin manifest reference](https://code.claude.com/docs/en/plugins-reference)

## Summary

Plugins are Claude Code's distribution layer. The manifest is optional; the harness discovers components from conventional folders and namespaces everything under the plugin name.

## Key claims

- Standard layout: `.claude-plugin/plugin.json` (optional manifest), `skills/`, `commands/` (legacy; prefer skills), `agents/`, `hooks/hooks.json`, `.mcp.json`, `.lsp.json`, `output-styles/`, `monitors/`, `bin/` (added to the Bash PATH).
- Only `name` is required; components are namespaced under it (e.g. `deploy-tools:reviewer`). Names impersonating Anthropic are rejected by the validator.
- Setting `version` pins users to that version until it changes; `dependencies` declare other required plugins.
- `userConfig` prompts the user for values at enable time; `sensitive` values go to the OS credential store and are not substituted into skill text.
- `${CLAUDE_PLUGIN_ROOT}` (changes on update) and `${CLAUDE_PLUGIN_DATA}` (persists across updates) locate bundled files and state.
- A `CLAUDE.md` at the plugin root is not loaded; instructions that should enter context must be packaged as a skill.
- Plugins are distributed through marketplaces (`marketplace.json`); `claude plugin validate` checks manifests, paths and MCP entries.

## Feeds

[Agent skills](../concepts/agent-skills.md)

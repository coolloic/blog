---
title: "Source: GitHub Copilot cloud (coding) agent docs: overview and risks"
summary: "GitHub's docs for its asynchronous Copilot agent: Actions-based ephemeral environments, firewall, copilot/ branches, human-only PR approval and other mitigations."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "security"]
---

- **What:** official product documentation (two pages)
- **Publisher:** GitHub
- **Date:** living documents, read 2026-11-14
- **Original:** [About Copilot coding agent](https://docs.github.com/copilot/concepts/coding-agent/about-copilot-coding-agent) · [Risks and mitigations for Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations)

## Summary

Copilot's asynchronous agent researches a repository, plans, and implements changes in a cloud environment, then delivers a pull request for human review. The docs now call it the "cloud agent". Safety comes mostly from GitHub's existing controls: branches, required reviews, workflow approval and a network firewall.

## Key claims

- Started from the Copilot home page, panels on files/issues/PRs, the Agents tab, security alerts, or automations (scheduled or event-triggered).
- GitHub Actions sessions are limited to one repository and 59 minutes; cloud sandboxes can span repos in one org and resume across clients, but lack custom compute, Actions-specific setup steps and self-hosted runners. Environment setup can be pre-scripted (`.github/workflows/copilot-setup-steps.yml`).
- One branch per session, one PR per task; new work goes to a `copilot/` branch. The agent can't run raw `git push`, mark a PR ready, approve or merge; the requester can't approve their own agent PR.
- Actions workflows on agent PRs don't run until a user with write access approves them (optional auto-run).
- Only users with write access can trigger the agent; hidden characters (e.g. HTML comments) are filtered to reduce prompt injection; internet access is firewalled by default.
- The agent self-checks output with CodeQL, secret scanning, dependency advisories and Copilot code review before finishing.
- Commits are signed, authored by Copilot with the requester as co-author, and link to a session log.
- MCP servers are supported; by default the GitHub MCP server only sees the working repository.

## Feeds

[Coding agents](../concepts/coding-agents.md)

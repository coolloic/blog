---
title: "Source: Shell tool guide (OpenAI docs)"
summary: "OpenAI's shell tool in hosted (managed Debian container, network off by default, org allowlist plus per-request network_policy, sidecar-injected domain secrets) and local modes."
category: source
lastmod: 2026-11-14
tags: ["agents", "tools", "sandboxing"]
---

- **What:** official API documentation
- **Publisher:** OpenAI
- **Date:** living document, read 2026-11-14
- **Original:** [Shell tool](https://developers.openai.com/api/docs/guides/tools-shell)

## Summary

The Responses API shell tool runs commands either in OpenAI-hosted containers or in a runtime you host. The hosted mode is a general-purpose container (several languages, skills mounted as bundles) with explicit egress controls and secret substitution outside the model's view.

## Key claims

- Hosted environments: `container_auto` (provisioned per request) or `container_reference` (a long-running container from the Containers API with a memory limit and inactivity expiry). Responses API only.
- Image: Debian 12; working directory `/mnt/data`; no TTY, no `sudo`; Python 3.11, Node.js 22.16, Java 17, PHP 8.2, Ruby 3.1, Go 1.23 preinstalled.
- Network: no outbound access by default. Enabling it takes an org-level admin allowlist plus a request-level `network_policy` that can only narrow it; requests naming other domains fail.
- `domain_secrets` bind a named secret to an allowed domain; the model sees only a placeholder such as `$API_KEY` and a sidecar substitutes the real value for approved destinations only.
- Skills are versioned bundles mounted into the container.
- Local mode returns `shell_call` items for your own executor (replaces the retired `local_shell` tool); OpenAI recommends command allowlists, approvals for destructive actions, sandboxing with limits, own timeouts and full logging.
- Network-fetched content may carry prompt injection; review logs of requested and actual destinations.

## Feeds

- [Code execution sandboxes](../concepts/code-execution-sandboxes.md)

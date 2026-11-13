---
title: "Source: Code execution tool (Anthropic docs)"
summary: "Anthropic's server-side code execution tool: a Linux container with Bash and file sub-tools, no internet, 5 GiB RAM, 1 CPU, 30-day containers, billed per container-hour."
category: source
lastmod: 2026-11-14
tags: ["agents", "tools", "sandboxing"]
---

- **What:** official API documentation
- **Publisher:** Anthropic
- **Date:** living document, read 2026-11-14
- **Original:** [Code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)

## Summary

Describes the hosted code execution tool for the Claude Messages API. Claude writes files and runs Bash commands in an Anthropic-managed container; the API executes everything server-side within the same request, so the client never runs code or returns tool results. Covers tool versions, runtime environment, container reuse, file handling through the Files API, errors, and pricing.

## Key claims

- Three tool versions (as of 2026-11): `code_execution_20250825` (Bash plus file operations), `code_execution_20260120` (adds REPL state persistence and programmatic tool calling from inside the sandbox), `code_execution_20260521` (same runtime; tool description tells Claude about the 90-second wall-clock limit per Python cell under programmatic tool calling). No beta header required.
- Adding the tool gives Claude two sub-tools: `bash_code_execution` and `text_editor_code_execution`. Responses carry `server_tool_use` blocks and a top-level `container` object (`id`, `expires_at`).
- Environment: Python 3.11, Linux, x86_64; 5 GiB RAM, 5 GiB workspace disk, 1 CPU. Over-long calls return `execution_time_exceeded`.
- Networking: internet access fully disabled, no outbound requests, so only pre-installed libraries (pandas, numpy, scipy, scikit-learn, statsmodels, matplotlib, seaborn and others) are usable. Containers are isolated from the host and from each other; file access limited to the workspace.
- Containers expire 30 days after creation; after about 5 minutes idle they are checkpointed and restored on the next request that passes the container ID. An expired container cannot be reused.
- Files are uploaded with the Files API and referenced by a `container_upload` block; generated files come back as file IDs to download.
- Not eligible for Zero Data Retention: container data retained up to 30 days.
- Pricing: minimum 5 minutes of execution time; 1,550 free hours per organization per month, then USD 0.05 per container-hour. Including files bills execution time even if the tool is not called. Code execution is free when the request also includes `web_search_20260209` / `web_fetch_20260209` or later.
- Long turns may stop with `pause_turn`; resend the response to continue.

## Feeds

- [Code execution sandboxes](../concepts/code-execution-sandboxes.md)

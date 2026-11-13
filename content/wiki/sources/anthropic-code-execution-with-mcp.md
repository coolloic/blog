---
title: "Source: Code execution with MCP (Anthropic, 2025)"
summary: "Anthropic engineering post: exposing MCP tools as code APIs in a sandbox cut one workflow from about 150k to 2k tokens, at the cost of running a secure sandbox."
category: source
lastmod: 2026-11-14
tags: ["agents", "mcp", "tools"]
---

- **What:** engineering blog post
- **Authors:** Adam Jones, Conor Kelly (Anthropic)
- **Date:** 2025-11-04
- **Original:** [Code execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp)

## Summary

Rather than loading every MCP tool definition into context and routing every intermediate result through the model, present MCP servers as a file tree of code modules the agent imports and calls from code it writes and runs.

## Key claims

- One example dropped from about 150,000 tokens to about 2,000 (98.7% saving).
- Progressive disclosure: the agent browses tool files or calls a `search_tools` helper at a chosen detail level.
- Intermediate data stays in the execution environment; the model sees only what code logs or returns. The client can tokenize PII before the model sees it and untokenize when passing to another tool.
- Agents can persist state to files and save working code as reusable functions or Skills.
- Caveat: running agent code needs a secure sandbox, resource limits and monitoring, overhead that direct tool calls avoid.

## Feeds

- [Code execution sandboxes](../concepts/code-execution-sandboxes.md)

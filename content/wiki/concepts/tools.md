---
title: "Tools"
summary: "Functions an agent can call to act on the world; their design is interface design for a model."
category: concept
sources:
  - ../sources/anatomy-of-a-modern-ai-agent.md
lastmod: 2026-11-14
tags: ["agents", "tools"]
---

**Tools** are functions the harness exposes to the model, each with a name, a description and a parameter schema (the wire format is covered in [function calling](function-calling.md)). They are the only way an [agent loop](agent-loop.md) affects anything outside the model: reading files, [running commands](code-execution-sandboxes.md), querying data, calling APIs.

## Design principles

- **Tool design is interface design.** The model knows a tool only through its name, description and schema. Vague descriptions produce vague usage. Write them like a docstring for a new colleague.
- **Fewer, sharper tools.** Overlapping tools make the model pick the wrong one some of the time. Consolidate them.
- **Lean output.** Tool results go into the [context window](context-window.md), so large outputs crowd out what matters. See [context engineering](context-engineering.md).
- **Risk varies by tool.** Read-only tools can run freely, while writes and outward-facing actions need [guardrails](agent-guardrails.md).

## Related

[Model Context Protocol](model-context-protocol.md), a standard way to expose tools to any agent.

## Going deeper

- [Function calling](function-calling.md): vendor wire formats, parallel calls, strict schemas and tool search for large catalogues.
- [MCP in practice](mcp-in-practice.md): tool naming, the two error channels and annotations in the MCP tools spec.
- [Web search APIs](web-search-apis.md): the main example of server-side tools.
- [Computer-use agents](computer-use-agents.md): computer and browser toolsets.
- [Code execution sandboxes](code-execution-sandboxes.md): server-side code tools and programmatic tool calling.
- [Agent skills](agent-skills.md): packaged instructions that teach a model how to use tools.
- [Agentic RAG](agentic-rag.md): retrieval exposed as a tool.
- [Agent authentication and authorization](agent-authentication-and-authorization.md): injecting tool credentials server-side.
- [Prompt injection](prompt-injection.md): why tool results must be treated as untrusted data.
- [LLM limitations](llm-limitations.md): routing arithmetic, counting and dates to code tools.

## Sources

- [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md)

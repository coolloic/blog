---
title: "Source: smolagents docs: Tools (advanced usage)"
summary: "smolagents tool tutorial: Tool subclasses, Hub sharing with trust_remote_code, MCPClient and ToolCollection for MCP servers, structured_output for MCP outputSchema, Gradio Spaces and LangChain tools."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "hugging-face", "tools"]
---

- **What:** official tutorial
- **Author:** Hugging Face
- **Date:** read 2026-11-14 (docs v1.26.0)
- **Original:** [https://huggingface.co/docs/smolagents/tutorials/tools](https://huggingface.co/docs/smolagents/tutorials/tools)

## Summary

Explains that a smolagents tool is a class wrapping a function with metadata the model sees (name, description, typed inputs, output type), and covers every way to get tools into an agent: custom classes, the Hub, MCP servers, Gradio Spaces and LangChain.

## Key claims

- A `Tool` subclass defines `name`, `description` (goes into the system prompt), `inputs` (type plus description), `output_type`, and `forward`. Allowed types include string, boolean, integer, number, image, audio, array, object, any, null.
- Tools pushed to the Hub must be self-contained: imports inside the functions, and `__init__` takes only `self`.
- `load_tool(...)` / `Tool.from_hub(...)` require `trust_remote_code=True` because loading runs third-party code.
- `MCPClient(server_parameters)` loads tools from stdio (`StdioServerParameters`) or Streamable HTTP (`{"url": ..., "transport": "streamable-http"}`) MCP servers, as a context manager or with `get_tools()` plus explicit `disconnect()`; it accepts a list of servers (the multi-server example mixes a stdio server with an SSE URL).
- `MCPClient(..., structured_output=True)` uses MCP `outputSchema`/`structuredContent` and adds output JSON schemas to the CodeAgent system prompt. The default is False for now; the docs say it will flip to True later.
- `ToolCollection.from_mcp(..., trust_remote_code=True)` (also takes `structured_output`) and `ToolCollection.from_hub(...)` load groups of tools (Hub collection tools load lazily, only when called); `Tool.from_space(...)` wraps a Gradio Space; `Tool.from_langchain(...)` wraps a LangChain tool.
- `agent.tools` is a plain dict and can be edited after construction. The docs warn that too many tools overwhelm weaker models.
- Security warning: stdio MCP servers always run code on your machine; only connect to trusted servers. Remote Streamable HTTP servers do not run code locally but still warrant caution.

## Feeds

- [smolagents](../concepts/smolagents.md)

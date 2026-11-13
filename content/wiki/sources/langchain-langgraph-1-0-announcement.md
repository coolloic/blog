---
title: "Source: LangChain and LangGraph agent frameworks reach v1.0"
summary: "LangChain's 22 Oct 2025 announcement of LangChain 1.0 (create_agent, middleware, content blocks) and LangGraph 1.0 (stable durable runtime)."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "langchain", "langgraph"]
---

- **What:** company blog post announcing the 1.0 releases
- **Publisher:** LangChain
- **Date:** 2025-10-22
- **Original:** [LangChain and LangGraph Agent Frameworks Reach v1.0 Milestones](https://www.langchain.com/blog/langchain-langgraph-1dot0)

## Summary

The post announces the first stable major versions of both open-source frameworks. LangChain 1.0 is narrowed around one agent loop (model, tools, response) built on LangGraph, customised through middleware. LangGraph 1.0 keeps its graph API and execution model unchanged and is positioned as the low-level durable runtime underneath.

## Key claims

- `create_agent` replaces `langgraph.prebuilt.create_react_agent`; the whole `langgraph.prebuilt` module is deprecated with its functionality moved to `langchain.agents`.
- Middleware hooks customise each step of the loop; built-ins cover human approval, summarisation near context limits, and PII redaction.
- Structured output is generated inside the main loop rather than by an extra LLM call, cutting latency and cost.
- A new `.content_blocks` property on messages gives a provider-agnostic view of reasoning, citations and server-side tool calls; it is backward compatible.
- Legacy functionality moves to a separate `langchain-classic` package.
- LangGraph 1.0 adds no breaking changes beyond the prebuilt deprecation; it emphasises durable state, persistence and human-in-the-loop.
- Both projects promise no breaking changes until 2.0. Python 3.9 support is dropped; 3.10+ is required.
- Positioning: LangChain for shipping standard agent patterns quickly; LangGraph for low-level control, long-running workflows, human oversight and tight latency/cost control. The two compose because LangChain agents run on LangGraph.

## Feeds

[LangChain](../concepts/langchain.md), [LangGraph](../concepts/langgraph.md)

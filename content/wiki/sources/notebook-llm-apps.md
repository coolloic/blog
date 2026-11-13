---
title: "Source: Build LLM Apps tutorial (Notebook)"
summary: "The owner's tutorial on LangChain, LangGraph and LangSmith, including zero-code LangSmith tracing and a sample run tree with per-step latency, tokens and cost."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "langchain", "notebook"]
---

- **What:** interactive HTML tutorial in the owner's Notebook
- **Author:** Loic (coolloic)
- **Date:** accessed 2026-11-14
- **Original:** [Build LLM Apps](https://coolloic.github.io/Notebook/llm-apps.html)

## Summary

Frames app building around three problems: glue code (LangChain), non-linear logic (LangGraph) and the black box (LangSmith). The LangSmith section shows tracing and a small evaluation script.

## Key claims

- Setting `LANGSMITH_TRACING=true` and an API key traces LangChain and LangGraph apps with no code change.
- A trace is a nested run tree; the example agent run shows each LLM call and tool call with its own latency, token count and cost, making the reason-act-observe loop visible.
- Tracing answers "which step failed": bad retrieval, weak prompt, or the model.
- LangSmith evaluation runs a target function over a dataset with grader functions to catch regressions before shipping.

## Feeds

[LLM observability](../concepts/llm-observability.md)

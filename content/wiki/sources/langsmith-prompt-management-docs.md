---
title: "Source: LangSmith prompt engineering and prompt management docs"
summary: "LangSmith's commit-and-tag prompt versioning, push/pull SDK calls, model bundling, template formats and stale-while-revalidate prompt cache."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "langsmith", "prompt-management"]
---

- **What:** official product documentation
- **Publisher:** LangChain
- **Date:** accessed 2026-11-14
- **Original:** [Prompt engineering concepts](https://docs.langchain.com/langsmith/prompt-engineering-concepts), [Manage prompts programmatically](https://docs.langchain.com/langsmith/manage-prompts-programmatically)

## Summary

LangSmith versions prompts like Git: each save is a commit with a hash, and movable tags point at commits. Code pulls a prompt by name, name:commit or name:tag, optionally with its model configuration, and an in-process cache keeps pulls off the hot path.

## Key claims

- Every saved update is a commit with a unique hash; history can be viewed and reverted.
- Tags are movable human-readable pointers to commits; `staging` and `production` are reserved for the Environments feature that promotes commits between deployment targets.
- Prompt types: chat (role-tagged messages, recommended) and completion (single string, legacy). Template formats: f-string (Playground default) and mustache (conditionals, loops, nested keys).
- A prompt can store model name and parameters; `pull_prompt(..., include_model=True)` returns prompt plus model as a runnable sequence.
- SDK: `client.push_prompt(name, object=prompt)` / `hub.push`; `client.pull_prompt("name")`, `"name:<commit>"` or by tag; public prompts need the owner handle.
- Prompt cache (Python `langsmith>=0.7.0`, TS `>=0.5.0`): in-memory, process-wide, stale-while-revalidate; defaults `max_size` 100, `ttl_seconds` 300, `refresh_interval_seconds` 60; `skip_cache=True` bypasses once; `ttl_seconds=None` plus `dump()`/`load()` supports offline use.
- The Playground compares prompts side by side and can run a prompt over a dataset as an experiment.

## Feeds

[Prompt management](../concepts/prompt-management.md)

---
title: "Source: smolagents docs: Manage your agent's memory"
summary: "How to inspect and rewrite smolagents agent memory: replay(), memory.steps, step_callbacks that prune old screenshots, and driving an agent one step at a time with agent.step()."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "hugging-face", "memory"]
---

- **What:** official tutorial
- **Author:** Hugging Face
- **Date:** read 2026-11-14 (docs v1.26.0)
- **Original:** [https://huggingface.co/docs/smolagents/tutorials/memory](https://huggingface.co/docs/smolagents/tutorials/memory)

## Summary

smolagents memory is a plain Python list of step objects that you can read, edit and replay. The tutorial shows how to prune it with callbacks and how to run the loop manually.

## Key claims

- `agent.replay()` prints the last run; `agent.memory.system_prompt` and `agent.memory.steps` expose the raw steps; `get_full_steps()` returns them as dicts.
- `ActionStep` objects carry `step_number`, `error`, `observations` and `observations_images`.
- `step_callbacks` receive the step and the agent, so they can modify any earlier step. Example: a browser agent drops screenshots older than two steps to save tokens.
- You can run an agent step by step: append a `TaskStep`, then call `agent.step(ActionStep(...))` in your own loop until a final answer appears. The docs suggest this for tools that take a very long time, and for swapping in another agent's memory.

## Feeds

- [smolagents](../concepts/smolagents.md)

---
title: "Source: smolagents API reference: Agents (v1.26.0)"
summary: "Constructor parameters and defaults for MultiStepAgent, CodeAgent and ToolCallingAgent, run() options, AgentMemory, prompt templates and save/push_to_hub."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "hugging-face"]
---

- **What:** official API reference
- **Author:** Hugging Face
- **Date:** read 2026-11-14 (v1.26.0)
- **Original:** [https://huggingface.co/docs/smolagents/reference/agents](https://huggingface.co/docs/smolagents/reference/agents)

## Summary

Reference for the agent classes. It labels smolagents an experimental API subject to change.

## Key claims

- `MultiStepAgent`: `max_steps` default 20, `planning_interval`, `instructions`, `managed_agents`, `step_callbacks`, `final_answer_checks`, `name`/`description` (for managed agents), `provide_run_summary`, `return_full_result` (default False), `add_base_tools` (default False).
- `CodeAgent`: `additional_authorized_imports`, `executor_type` in `local` (default), `blaxel`, `e2b`, `modal`, `docker`; `executor_kwargs`; `max_print_outputs_length`; `stream_outputs`; `use_structured_outputs_internally` (structured generation per step, default False); `code_block_tags`.
- `ToolCallingAgent`: uses the model's native tool calling; `max_tool_threads` for parallel tool calls.
- `run(task, stream, reset, images, additional_args, max_steps, return_full_result)`; `additional_args` injects Python objects (e.g. dataframes) into the run.
- `AgentMemory` holds the system prompt and `TaskStep` / `ActionStep` / `PlanningStep` list; `return_full_code()` concatenates all code actions; `replay()` pretty-prints.
- `PromptTemplates` customise system, planning, managed-agent and final-answer prompts.
- `save()` writes tools, managed agents, `agent.json`, `prompt.yaml`, `app.py` and requirements; `from_hub` requires `trust_remote_code=True` because it downloads and runs code.

## Feeds

- [smolagents](../concepts/smolagents.md)

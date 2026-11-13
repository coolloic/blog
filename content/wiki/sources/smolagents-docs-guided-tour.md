---
title: "Source: smolagents docs: Index and Guided tour (Hugging Face)"
summary: "smolagents overview and guided tour: CodeAgent vs ToolCallingAgent, model classes, tools, authorized imports, executors, final_answer_checks, managed agents, Gradio UI and Hub sharing."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "hugging-face"]
---

- **What:** official documentation (index and guided tour), docs version v1.26.0
- **Author:** Hugging Face
- **Date:** read 2026-11-14 (v1.26.0 released on PyPI 2026-05-29)
- **Original:** [https://huggingface.co/docs/smolagents/index](https://huggingface.co/docs/smolagents/index), [https://huggingface.co/docs/smolagents/guided_tour](https://huggingface.co/docs/smolagents/guided_tour)

## Summary

smolagents is a minimal Python agent library whose distinctive feature is the `CodeAgent`, which writes its actions as Python code. A `ToolCallingAgent` covers conventional JSON tool calling. It is model-agnostic, tool-agnostic (MCP, LangChain, Hub Spaces) and integrates with the Hugging Face Hub for sharing tools and agents.

## Key claims

- Agent logic fits in roughly a thousand lines; abstractions kept minimal.
- `CodeAgent` strengths: expressive control flow, composing tools, transforming results; weaknesses: syntax/runtime errors, less predictable, needs a secure executor. `ToolCallingAgent`: validated arguments and safer, but low expressivity. Docs suggest CodeAgent for problem-solving/chaining, ToolCallingAgent for atomic dispatch.
- Model classes: `InferenceClientModel` (HF Inference Providers), `LiteLLMModel` (100+ providers), `OpenAIModel`, `AzureOpenAIModel`, `AmazonBedrockModel`, `TransformersModel`, `MLXModel`; extra kwargs forwarded to the completion call; `REMOVE_PARAMETER` strips defaults.
- Imports in generated code are blocked unless listed in `additional_authorized_imports`; submodules must be authorised explicitly (or `pkg.*`).
- `executor_type` can switch execution to Blaxel, E2B, Modal or Docker.
- Termination: `final_answer` call or `max_steps`; `final_answer_checks` validators can reject an answer and keep the run going.
- Tools: `@tool` decorator (needs type hints and an `Args:` docstring) or `Tool` subclass with `name`, `description`, `inputs`, `output_type`, `forward`; tool metadata is baked into the system prompt.
- Multi-agent: give an agent `name` and `description` and pass it in `managed_agents` of a manager agent (hierarchical).
- `GradioUI(agent)` for a chat UI; `run(..., reset=False)` keeps memory between tasks; `agent.interrupt()`; `push_to_hub` / `from_hub(..., trust_remote_code=True)`.
- Ollama via LiteLLM needs a larger `num_ctx` than Ollama's 2048 default.

## Feeds

- [smolagents](../concepts/smolagents.md)

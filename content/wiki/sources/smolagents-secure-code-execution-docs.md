---
title: "Source: smolagents docs: Secure code execution"
summary: "Threat model for code agents, the AST-walking LocalPythonExecutor and its limits, and the two sandboxing approaches (snippet-in-sandbox vs whole-agent-in-sandbox) with E2B, Docker, Modal and Blaxel."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "hugging-face", "security", "code-execution"]
---

- **What:** official tutorial
- **Author:** Hugging Face
- **Date:** read 2026-11-14 (docs v1.26.0)
- **Original:** [https://huggingface.co/docs/smolagents/tutorials/secure_code_execution](https://huggingface.co/docs/smolagents/tutorials/secure_code_execution)

## Summary

By default a `CodeAgent` runs model-written code on your machine through a custom interpreter. The page lists the threats (model error, supply chain, prompt injection, public exposure), explains what the `LocalPythonExecutor` blocks, states plainly that no local sandbox is fully secure, and documents remote executors.

## Key claims

- Threats: plain LLM error, compromised model, prompt injection from browsed content, abuse of public agents.
- `LocalPythonExecutor` walks the AST operation by operation: imports blocked unless authorised, submodules blocked unless authorised, total operations capped (e.g. a 1,000,000-iteration while-loop limit), undefined operations raise errors.
- Authorised packages can still be abused (e.g. `random._os` is blocked, but allowing an image library could fill a disk); robust isolation needs a remote sandbox.
- Approach 1, snippets in sandbox (`executor_type` = `e2b`, `docker`, `modal`, `blaxel`): model calls stay local, only code goes remote, no secrets in the sandbox, but managed agents (multi-agent) are not supported and state must be shipped each run.
- Approach 2, whole agent in sandbox: supports multi-agent and full isolation, but more setup and API keys must enter the sandbox.
- Use the agent as a context manager or call `cleanup()` to tear down sandboxes; Docker example drops capabilities and limits memory, CPU and PIDs.

## Feeds

- [smolagents](../concepts/smolagents.md)

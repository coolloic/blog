---
title: "Source: huggingface/smolagents README (GitHub)"
summary: "smolagents repository README: Apache-2.0, ~1,000-line agents.py, code actions using about 30% fewer steps, executor options, and the warning that the local executor is not a security sandbox."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "hugging-face"]
---

- **What:** GitHub repository README
- **Author:** Hugging Face
- **Date:** read 2026-11-14 (latest PyPI release 1.26.0, 2026-05-29)
- **Original:** [https://github.com/huggingface/smolagents](https://github.com/huggingface/smolagents)

## Summary

Summarises the library's pitch and options. Points to `agents.py` as the compact core and repeats the security warning about local execution.

## Key claims

- Licence Apache-2.0; about 30.4k GitHub stars as of 2026-11.
- Writing actions as code reportedly takes about 30% fewer steps (hence LLM calls) than JSON tool calling, per cited research.
- Executors: E2B, Blaxel, Modal (managed), Docker (self-hosted); the built-in `LocalPythonExecutor` is not a security sandbox.
- Around 430 open issues and 650 open pull requests at read time, against no PyPI release since 2026-05-29.

## Feeds

- [smolagents](../concepts/smolagents.md)

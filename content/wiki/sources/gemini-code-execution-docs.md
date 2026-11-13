---
title: "Source: Code execution (Gemini API docs)"
summary: "Gemini's built-in Python code execution tool: 30-second runtime, up to 5 self-retries, fixed libraries, matplotlib-only charts, no extra charge beyond tokens."
category: source
lastmod: 2026-11-14
tags: ["agents", "tools", "sandboxing"]
---

- **What:** official API documentation
- **Publisher:** Google
- **Date:** living document, read 2026-11-14
- **Original:** [Code execution](https://aistudio.google.com/docs/code-execution)

## Summary

Enabling `{"type": "code_execution"}` lets Gemini write and run Python in a Google-hosted environment and iterate on the results before answering. It is the lightest of the provider tools: short runs, no package installs, outputs returned inline.

## Key claims

- Python only; maximum runtime 30 seconds per execution.
- On an execution error the model may regenerate code, up to 5 times.
- Fixed library set (numpy, pandas, matplotlib, scipy, scikit-learn, sympy, opencv-python, pillow, tensorflow and others); you cannot install your own.
- File input supported (from Gemini 2.0 Flash), inline or via the Files API; files larger than the context window error. Text and CSV work best.
- Only matplotlib renders graphs; outputs come back as inline data.
- No extra charge for the tool: intermediate tokens (prompt, generated code, execution results) are billed as input; final code, results, summary and thinking as output.
- Combinable with Grounding with Google Search, and on Gemini 3/4 models with custom function calling.
- Can degrade other output quality (e.g. creative writing); success varies by model. Network access is not documented.

## Feeds

- [Code execution sandboxes](../concepts/code-execution-sandboxes.md)

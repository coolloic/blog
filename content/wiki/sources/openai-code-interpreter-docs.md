---
title: "Source: Code Interpreter tool guide (OpenAI docs)"
summary: "OpenAI's hosted Python tool: auto or explicit containers with 1g/4g/16g/64g memory tiers, a 20-minute idle expiry, and generated files cited as container_file_citation annotations."
category: source
lastmod: 2026-11-14
tags: ["agents", "tools", "sandboxing"]
---

- **What:** official API documentation
- **Publisher:** OpenAI
- **Date:** living document, read 2026-11-14
- **Original:** [Code Interpreter](https://developers.openai.com/api/docs/guides/tools-code-interpreter)

## Summary

Explains the `code_interpreter` tool (which the model knows as the "python tool"), available through the Responses, Chat Completions and Assistants APIs. Code runs in a container that is either created automatically per request or created explicitly through the Containers API and passed by ID.

## Key claims

- Container modes: `{"type": "auto"}` creates or reuses an active container (optionally with `file_ids`); explicit mode creates one via `/v1/containers` and passes its ID.
- Memory tiers `1g` (default), `4g`, `16g`, `64g`, fixed for the container's life.
- A container expires after 20 minutes without use; its data and in-memory Python state are lost and it cannot be reactivated. Any container operation resets the idle timer. Treat containers as ephemeral and keep data elsewhere.
- Files in model input are auto-uploaded; files can be added, listed and downloaded through container file endpoints. Supported inputs include code, CSV/JSON/XLSX, PDF/DOCX/PPTX, images and archives.
- Model-created files (plots, CSVs) are cited in the next message's annotations as `container_file_citation` (container ID, file ID, filename).
- Rate limit: 100 RPM per organization.
- The guide does not document sandbox network access.

## Feeds

- [Code execution sandboxes](../concepts/code-execution-sandboxes.md)

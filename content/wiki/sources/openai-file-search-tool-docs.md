---
title: "Source: File search tool (OpenAI guide)"
summary: "OpenAI's hosted file search tool: vector stores, file_search_call output, file_citation annotations, max_num_results and metadata filters."
category: source
lastmod: 2026-11-14
tags: ["platforms", "openai", "rag"]
---

- **What:** official API documentation page
- **Publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [File search](https://developers.openai.com/api/docs/guides/tools-file-search)

## Summary

Describes OpenAI's hosted retrieval tool: upload files, attach them to a vector store, and let the model search it during a response.

## Key claims

- Hosted tool combining semantic and keyword search; the model decides when to call it.
- Setup: upload with `purpose: "assistants"`, create a vector store, add the file, poll until `completed`.
- Tool definition `{"type": "file_search", "vector_store_ids": [...]}`; output holds a `file_search_call` item and a message with `file_citation` annotations (file_id, filename).
- `max_num_results` trades quality against tokens and latency; `include: ["file_search_call.results"]` returns the raw hits (otherwise null); attribute `filters` narrow the search.
- Supports PDF, DOCX, PPTX, Markdown, JSON, HTML, code and text files (text must be UTF-8/UTF-16/ASCII).
- Available in Responses, Chat Completions and Assistants; 500 RPM on Build, 1,000 RPM on Launch and Grow.

## Feeds

[OpenAI Responses API](../concepts/openai-responses-api.md)

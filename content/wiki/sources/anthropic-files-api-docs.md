---
title: "Source: Files API (Claude docs)"
summary: "Anthropic's Files API: upload once and reference by file_id in document, image or container_upload blocks; workspace scoping, limits, expiry, and ZDR ineligibility."
category: source
lastmod: 2026-11-14
tags: ["platforms", "anthropic"]
---

- **What:** official API documentation page
- **Publisher:** Anthropic
- **Date:** living document; read 2026-11-14 (API version 2026-10-21)
- **Original:** [Files API](https://platform.claude.com/docs/en/build-with-claude/files)

## Summary

The Files API stores uploads so Messages requests can reference them by ID instead of re-sending bytes, and lets you download files created by code execution or skills. It is now stable (no beta header).

## Key claims

- Reference a `file_id` in a `document` block (PDF, plain text), an `image` block, or a `container_upload` block (datasets for code execution).
- Files are scoped to the workspace, not to an end user or conversation; never accept file IDs from untrusted users; use one workspace per tenant for hard isolation (up to 100 workspaces per org).
- Only files created by code execution or skills are downloadable; downloading an uploaded file returns 400.
- Limits: 500 MB per file, 1 TB per organization, about 500 file-API requests per minute.
- Files persist until deleted or until an optional `expires_in_seconds` (1 hour to 90 days) passes; files are immutable.
- File operations are free; file content used in a request is billed as input tokens.
- Unsupported document formats (.docx, .xlsx) must be converted to text or PDF.
- Not eligible for ZDR or HIPAA.
- The `files-api-2025-04-14` beta header still works but returns the old pagination shape.

## Feeds

[Anthropic Messages API](../concepts/anthropic-messages-api.md)

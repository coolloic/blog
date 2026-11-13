---
title: "Source: Unstructured Docs on Chunking"
summary: "Unstructured's element-aware chunking: basic and by_title strategies, hard/soft size limits, overlap, table isolation, and recovering original elements from a chunk."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "documents", "chunking"]
---

- **What:** official documentation page
- **Author/publisher:** Unstructured Technologies
- **Date:** living document; read 2026-11-14
- **Original:** [Chunking](https://docs.unstructured.io/open-source/core-functionality/chunking)

## Summary

Unstructured chunks *after* partitioning: it packs consecutive elements into chunks as large as allowed, and only falls back to splitting text when a single element is too big. This keeps semantic units (paragraphs, list items, tables) intact instead of cutting raw text by character count.

## Key claims

- `max_characters` (default 500) is a hard cap; `new_after_n_chars` is a soft cap after which a chunk stops growing.
- `overlap` (default 0) applies only when splitting an oversized element unless `overlap_all=True`, which the docs warn can pollute chunks with unrelated text.
- **basic:** combines sequential elements up to the limits; tables are always isolated and oversized tables become `TableChunk` elements.
- **by_title:** every Title starts a new section and a chunk never spans two sections; `combine_text_under_n_chars` merges tiny sections caused by spurious titles; `multipage_sections` controls crossing page breaks.
- Each chunk keeps `metadata.orig_elements` (gzipped, base64 when serialized) so page numbers and coordinates of constituent elements can be recovered.

## Feeds

[Document processing](../concepts/document-processing.md)

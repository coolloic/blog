---
title: "Source: TableFormer (Nassar et al., 2022) and OTSL (Lysak et al., 2023)"
summary: "IBM Research papers on table structure recognition: TableFormer predicts table structure plus cell boxes with transformer decoders; OTSL is a 5-token table language that halves sequence length versus HTML."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "documents", "tables"]
---

- **What:** two research papers (arXiv:2203.01017, CVPR 2022; arXiv:2305.03393, ICDAR 2023)
- **Author/publisher:** Ahmed Nassar, Nikolaos Livathinos, Maksym Lysak, Peter Staar (TableFormer); Maksym Lysak, Ahmed Nassar, Nikolaos Livathinos, Christoph Auer, Peter Staar (OTSL); IBM Research
- **Date:** 2022-03-02 (TableFormer); 2023-05-05 (OTSL)
- **Original:** [TableFormer](https://arxiv.org/abs/2203.01017), [OTSL](https://arxiv.org/abs/2305.03393)

## Summary

Table structure recognition turns a table image into its logical grid (rows, columns, spans, headers). TableFormer improves the earlier PubTabNet encoder/dual-decoder design by using transformer decoders and adding a cell-detection decoder, so cell text can be taken straight from a programmatic PDF instead of being transcribed by a custom OCR decoder. OTSL then replaces HTML as the target sequence with a minimal table language, which shortens outputs and guarantees well-formed structures.

## Key claims

- TableFormer is evaluated with **TEDS** (tree-edit-distance-based similarity) and reports improvement from 91% to 98.5% on simple tables and from 88.7% to 95% on complex tables versus the prior state of the art.
- Predicting cell bounding boxes lets the system copy exact text from the PDF layer for digital documents.
- OTSL needs 5 tokens versus 28+ for HTML, roughly halves sequence length, halves inference time, and always yields syntactically valid tables.
- These models are the table component of Docling.

## Feeds

[Document processing](../concepts/document-processing.md)

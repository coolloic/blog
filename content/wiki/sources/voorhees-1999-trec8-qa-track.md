---
title: "Source: The TREC-8 Question Answering Track Report (Voorhees)"
summary: "Report on the first large-scale open-domain QA evaluation, whose ranked-answer scoring popularised mean reciprocal rank (MRR)."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "retrieval", "benchmarks"]
---

- **What:** track overview report, Proceedings of the 8th Text REtrieval Conference (TREC-8), pp. 77-82
- **Author:** Ellen M. Voorhees (NIST)
- **Date:** conference held 1999; NIST lists the publication as 11 December 2000
- **Original:** [NIST publication page](https://www.nist.gov/publications/trec-8-question-answering-track-report) · [PDF](https://trec.nist.gov/pubs/trec8/papers/qa_report.pdf)

## Summary

TREC-8 ran the first large-scale evaluation of question answering systems not restricted to a domain. Systems returned a short ranked list of answer strings per question, with 50-byte and 250-byte answer-length limits. The scoring rule, now called mean reciprocal rank, became a standard metric for "one right answer" retrieval tasks.

## Key claims

- Each run submitted up to five ranked responses per question; a question scores 1/rank of the first correct response, or 0 if none of the five is correct; the run score is the mean over questions (MRR). (The scoring details are from the report as described by secondary references, e.g. [Wikipedia: Mean reciprocal rank](https://en.wikipedia.org/wiki/Mean_reciprocal_rank); the NIST PDF is a scanned image.)
- The most accurate systems found a correct response for more than two thirds of the questions.
- Simple bag-of-words approaches worked well for 250-byte answers; 50-byte answers needed more sophisticated processing.

## Feeds

[Retrieval metrics](../concepts/retrieval-metrics.md)

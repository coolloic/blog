---
title: "Source: EDPB Guidelines 02/2026 on Anonymisation (draft)"
summary: "Draft EDPB guidelines (July 2026) replacing the 2014 test with three criteria (no isolation, no linkage, no inference) and a relative, recipient-aware notion of anonymity that explicitly covers AI model outputs."
category: source
lastmod: 2026-11-14
tags: ["privacy", "gdpr", "regulation"]
---

- **What:** draft guidelines (version 1) adopted for public consultation
- **Publisher:** European Data Protection Board
- **Date:** adopted 2026-07-07; consultation closed 2026-10-30; final text pending as of 2026-11-14
- **Original:** [EDPB PDF](https://www.edpb.europa.eu/system/files/2026-07/edpb_guidelines_202602_anonymisation_v1_en_0.pdf). Content summarised from the [Stephenson Harwood analysis](https://www.stephensonharwood.com/insights/the-edpbs-guidelines-on-anonymisation-one-legal-standard-two-approaches-three-criteria/); the PDF itself was not read.

## Summary

Updates the EU anonymisation standard. Anonymity is relative to who holds the data and what means they reasonably have, following the CJEU's EDPS v SRB judgment (C-413/23 P). Anonymisation is itself a processing activity that must be documented and tested.

## Key claims

- Replaces Article 29 Working Party Opinion 05/2014.
- Three criteria; data meeting all three is presumed anonymous: no record isolation, no linkage to other datasets, no meaningful inference about an individual. Failing one criterion does not automatically make data personal; it triggers further analysis (per [Sidley](https://datamatters.sidley.com/2026/07/27/edpb-publishes-draft-guidelines-on-anonymisation/)).
- Two approaches: contextual (per-recipient capabilities) and simplified (more cautious, ignores recipient differences); they can be combined.
- The same dataset can be personal for one entity and anonymous for another.
- Meaningful inferences from prompting AI models, and synthetic datasets, can breach the no-inference criterion, so model outputs are not anonymous by default; agentic AI may cut the cost of re-identification.
- The same EDPB batch included Guidelines 03/2026 on web scraping for generative AI.

## Feeds

[PII and data privacy](../concepts/pii-and-data-privacy.md)

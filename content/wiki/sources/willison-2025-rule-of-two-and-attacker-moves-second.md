---
title: "Source: New prompt injection papers: Agents Rule of Two and The Attacker Moves Second (Willison)"
summary: "Simon Willison (Nov 2025) endorses Meta's Rule of Two as the best practical guidance for agent builders, notes it extends the lethal trifecta to state changes, and challenges its 'safe' labels."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "agents", "blog"]
---

- **What:** blog post commenting on two papers
- **Author:** Simon Willison
- **Date:** 2025-11-02
- **Original:** [simonwillison.net/2025/Nov/2/new-prompt-injection-papers](https://simonwillison.net/2025/Nov/2/new-prompt-injection-papers/)

## Summary

Willison reviews Meta's Agents Rule of Two (published 2025-10-31) and the adaptive-attack paper *The Attacker Moves Second* (2025-10-10). He treats the Rule of Two as the most practical current advice for building agents, because it starts from the premise that prompt injection is unsolved and that filtering has not proven reliable.

## Key claims

- The lethal trifecta only describes data exfiltration. The Rule of Two adds **changing state** to the third property, so it also covers harms done through tools (deletes, purchases, writes) rather than just leaks.
- Both frameworks trace back to Chromium's Rule of 2 for memory-unsafe code.
- Critique: Meta's original Venn diagram labelled untrusted input plus state change as "safe". Willison argues that pair can still do damage without touching sensitive systems. After a Meta researcher clarified that property [B] means any sensitive system, not just private data, Meta relabelled the pairwise overlaps "lower risk".
- On *The Attacker Moves Second*: 12 published defences, most reporting near-zero attack success, were broken at over 90% by adaptive attacks, and human red-teamers (about 500 participants, $20,000 prize pool) beat all of them. Willison reads this as evidence against expecting reliable filters soon.

## Feeds

[Lethal trifecta](../concepts/lethal-trifecta.md)

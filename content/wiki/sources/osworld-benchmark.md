---
title: "Source: OSWorld Benchmark"
summary: "Xie et al. 2024 benchmark of 369 execution-evaluated tasks in real Ubuntu/Windows/macOS environments, plus the OSWorld-Verified refresh and its findings."
category: source
lastmod: 2026-11-14
tags: ["models", "computer-use", "benchmarks", "paper"]
---

- **What:** research paper and benchmark site
- **Author/publisher:** Tianbao Xie et al. (XLANG Lab, HKU, with Salesforce and others)
- **Date:** paper 2024-04-11 (v2 2024-05-30); OSWorld-Verified 2025-07-28; OSWorld 2.0 announced 2026-06-26
- **Original:** [arXiv:2404.07972](https://arxiv.org/abs/2404.07972) · [benchmark site](https://os-world.github.io/)

## Summary

OSWorld runs agents in real virtual machines and scores them with execution-based checkers on the final machine state, across web apps, desktop apps, file I/O and multi-app workflows.

## Key claims

- 369 tasks (361 excluding 8 Google Drive tasks), 134 evaluation functions; 43 extra Windows tasks.
- At publication: humans solved over 72.36% of tasks; the best model 12.24%. Main failure causes: GUI grounding and operational knowledge.
- Observation settings compared: screenshot, accessibility tree, both, Set-of-Mark.
- Findings: higher screenshot resolution generally helps; text trajectory history helps; agents are not robust to UI layout changes and noise; performance correlates across OSes.
- OSWorld-Verified (2025-07) fixed reported task errors and sped up evaluation on AWS; OSWorld 2.0 is the newer, harder version (2026-06).

## Feeds

[Computer-use agents](../concepts/computer-use-agents.md)

---
title: "Source: SkillsBench: Benchmarking How Well Agent Skills Work Across Diverse Tasks (Li et al., 2026)"
summary: "Benchmark of curated Agent Skills on verifiable tasks: about +16.6 pp average pass rate, focused skills beat exhaustive ones, and self-written skills fell below the no-skill baseline."
category: source
lastmod: 2026-11-14
tags: ["agents", "skills", "evaluation"]
---

- **What:** research paper (arXiv 2602.12670)
- **Publisher:** Xiangyi Li and 76 co-authors
- **Date:** v1 2026-02-13; v4 2026-06-14
- **Original:** [arXiv:2602.12670](https://arxiv.org/abs/2602.12670)

## Summary

The first large controlled study of whether skills actually help. Each task is run with and without a curated skill and scored by a deterministic verifier.

## Key claims

- v4: 87 tasks across 8 domains, 18 model-harness configurations; curated skills lift average pass rate from 33.9% to 50.5% (+16.6 pp), with per-configuration gains from +4.1 to +25.7 pp.
- Focused skills with at most three modules outperform large or exhaustive documentation bundles.
- Smaller models with skills can match larger models without them.
- Skill count matters: one skill +18.0 pp, two to three +19.0 pp, four or more only +10.1 pp.
- Self-generated skills: v1 (as summarised by secondary sources) reported no benefit on average (about -1.3 pp); v4 (Section 5.1.1) reports self-generated skills below the no-skill baseline on all three configurations tested, where curated skills added +18.2 to +24.8 pp.
- Curated skills hurt on 13 of 87 tasks, typically when the skill imposes a single "correct" pipeline without applicability boundaries or fallbacks; gains vary widely by domain.
- Limitations noted by the authors: 87 tasks with high-quality skills are an optimistic scenario; containerisation gives state isolation but not perfect determinism or immunity to training-set leakage.

## Feeds

[Agent skills](../concepts/agent-skills.md)

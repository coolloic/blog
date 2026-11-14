---
title: "Source: Harness design for long-running application development (Anthropic, 2026)"
summary: "Anthropic Labs post on a planner / generator / evaluator harness for multi-hour app builds, with cost data and an ablation showing which parts stopped paying off on a newer model."
category: source
lastmod: 2026-11-14
tags: ["agents", "harness", "coding"]
---

- **What:** engineering blog post
- **Author:** Prithvi Rajasekaran (Anthropic Labs)
- **Publisher:** Anthropic
- **Date:** 2026-03-24
- **Original:** [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)

## Summary

Two problems limited long autonomous builds: coherence drops as context fills, and agents rate their own mediocre work too generously. Borrowing the GAN idea of a generator and a discriminator, the author built a frontend-design loop and then a three-agent full-stack harness, measured its cost, and later simplified it for a stronger model by removing one component at a time.

## Key claims

- **Context anxiety:** Sonnet 4.5 wrapped up work early as it believed it neared its context limit, strongly enough that compaction alone was insufficient, so the harness used context resets with a structured handoff. Opus 4.5 largely removed the behaviour, and the later harness ran one continuous session with automatic compaction.
- Compaction keeps continuity but gives no clean slate; resets give a clean slate at the cost of orchestration complexity, tokens and latency.
- Frontend criteria: design quality, originality (penalising template defaults and "AI slop"), craft, functionality; the first two were weighted higher. The evaluator drove a live page through Playwright MCP, was calibrated with few-shot score breakdowns, and ran 5 to 15 iterations per generation.
- Full-stack harness: a **planner** expands a 1 to 4 sentence prompt into a product spec focused on deliverables, not implementation; a **generator** builds one feature per sprint (React, Vite, FastAPI, SQLite then PostgreSQL, git); an **evaluator** tests the running app like a user (UI, API, database state) with hard per-criterion thresholds.
- **Sprint contracts:** generator and evaluator agree before each sprint on what done means and how it will be checked; one sprint had 27 criteria.
- Retro game maker on Opus 4.5: solo run 20 min / $9 with a non-working core feature; full harness 6 h / $200 with a playable game.
- With Opus 4.6 the sprint construct was removed and per-sprint QA became a single pass at the end; the planner and evaluator were kept. A digital audio workstation build took about 3 h 50 min and $124.70, with the first build round running over two hours.
- An aggressive first simplification underperformed; removing one component at a time revealed which were load-bearing.
- The evaluator is worth its cost only for tasks beyond what the current model does reliably alone. Every component encodes an assumption about what the model can't do, and those assumptions go stale.
- Better models move the space of useful harnesses rather than shrink it.

## Feeds

[Harness engineering](../concepts/harness-engineering.md)

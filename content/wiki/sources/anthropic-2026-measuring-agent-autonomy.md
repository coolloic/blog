---
title: "Source: Measuring AI agent autonomy in practice (Anthropic, 2026)"
summary: "Anthropic research (Feb 2026) on how much oversight real agents get: Claude Code auto-approve and interrupt rates, agent-initiated stops, and human involvement across ~1M API tool calls."
category: source
lastmod: 2026-11-14
tags: ["agents", "human-in-the-loop", "anthropic"]
---

- **What:** research post with usage data (late 2025 to early 2026)
- **Publisher:** Anthropic (Societal Impacts)
- **Date:** 2026-02-18
- **Original:** [Measuring AI agent autonomy in practice](https://www.anthropic.com/research/measuring-agent-autonomy)

## Summary

Uses privacy-preserving analysis of Claude Code sessions and a sample of public-API tool calls to measure how autonomous deployed agents are and how humans oversee them. Experienced users approve less and interrupt more, the agent itself increasingly stops to ask, and most real tool calls are low risk and reversible. The authors recommend designing for effective monitoring and intervention rather than mandating approval of every action.

## Key claims

- Claude Code full auto-approve: about 20% of sessions for users with fewer than 50 sessions, over 40% by 750 sessions. Interrupts rise from about 5% of turns (around 10 sessions) to about 9% for experienced users.
- 99.9th-percentile turn duration roughly doubled from under 25 to over 45 minutes (Oct 2025 to Jan 2026); median turn about 45 seconds.
- Internally, success on hardest tasks doubled (Aug to Dec) while human interventions per session fell from 5.4 to 3.3.
- On complex tasks Claude-initiated stops outnumber human interrupts. Top reasons it stops: offering a choice of approach (35%), gathering diagnostics (21%), clarifying vague requests (13%), requesting credentials/access (12%), seeking approval before acting (11%).
- Top reasons humans interrupt: missing context or corrections (32%), agent slow/hanging/excessive (17%).
- Of 998,481 sampled API tool calls: 80% came from agents with at least one safeguard (restricted permissions or approval requirements), 73% appeared to have a human involved, 0.8% appeared irreversible; human involvement was 87% on minimal-complexity vs 67% on high-complexity tasks.
- Recommendations: post-deployment monitoring; train models to surface uncertainty; give users visibility and simple intervention; policy should focus on whether humans can monitor and intervene, not on prescribing approval of each action.

## Feeds

[Human-in-the-loop](../concepts/human-in-the-loop.md)

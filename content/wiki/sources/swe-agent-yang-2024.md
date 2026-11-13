---
title: "Source: SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering (Yang et al., 2024)"
summary: "Paper introducing the agent-computer interface (ACI) idea: purpose-built search, windowed viewing and lint-guarded editing commands that markedly improve coding agents."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "tools"]
---

- **What:** research paper (NeurIPS 2024)
- **Authors:** John Yang, Carlos E. Jimenez, Alexander Wettig, Kilian Lieret, Shunyu Yao, Karthik Narasimhan, Ofir Press
- **Date:** 2024-05-06 (v3 2024-11-11)
- **Original:** [arXiv:2405.15793](https://arxiv.org/abs/2405.15793)

## Summary

Argues that LM agents are a new kind of user who needs interfaces designed for them, as humans need IDEs. SWE-agent's ACI gives simple commands with compact, informative feedback, and ablations show interface design moves results by several points.

## Key claims

- Results: 12.5% pass@1 on full SWE-bench and 87.7% on HumanEvalFix (state of the art at the time).
- Search commands (`find_file`, `search_file`, `search_dir`) cap results at 50 and ask for a narrower query beyond that.
- File viewer shows at most 100 lines with line numbers and counts of omitted lines; an `edit` command replaces a line range and re-shows the file; a flake8 lint check rejects edits that introduce syntax errors.
- Older observations (beyond the last 5) are collapsed to one line each.
- Ablations on SWE-bench Lite (GPT-4 Turbo, full config 18.0%): no edit command 10.3%; edit without linting 15.0%; iterative instead of summarised search 12.0%; 30-line window 14.3%; full-file viewer 12.7%; full history 15.0%.
- Failure analysis: ~52% of unresolved cases were incorrect or overly specific implementations; ~23% cascading failed edits. 51.7% of trajectories had a failed edit; success probability fell from 90.5% to 57.2% after a single failed edit.

## Feeds

[Coding agents](../concepts/coding-agents.md)

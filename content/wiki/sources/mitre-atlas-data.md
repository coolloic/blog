---
title: "Source: MITRE ATLAS data and changelog"
summary: "MITRE's ATT&CK-style matrix of adversary tactics and techniques against AI systems; release 2026.10 has 16 tactics, 129 techniques, 44 mitigations and 77 case studies, with a fast-growing agentic section."
category: source
lastmod: 2026-11-14
tags: ["security", "red-teaming", "standards"]
---

- **What:** knowledge base (Adversarial Threat Landscape for Artificial-Intelligence Systems) and its data-release changelog
- **Publisher:** MITRE
- **Date:** release 2026.10, 2026-10-28; accessed 2026-11-14
- **Original:** [atlas.mitre.org](https://atlas.mitre.org/) · [atlas-data CHANGELOG](https://github.com/mitre-atlas/atlas-data/blob/main/CHANGELOG.md)

## Summary

ATLAS models attacks on AI systems the way ATT&CK models attacks on enterprise IT: tactics (the adversary's goal at a stage) contain techniques and sub-techniques, linked to mitigations and real-world case studies. It is the vocabulary red teams use to tag findings and threat models. Since mid-2026 it ships monthly and has added many agent-specific techniques.

## Key claims

- 2026.10 (2026-10-28) totals: 16 tactics, 129 techniques, 92 sub-techniques, 44 mitigations, 77 case studies, plus new Entity and Software objects (data format 6.1.0).
- Growth: 2026.07 had 101 techniques and 68 case studies; 2026.08 114; 2026.09 120.
- 2026.05: content versioning split from format versioning (format v6.0.0); every technique tagged with platforms, including "Agentic AI".
- Agentic additions in 2026 include AI Agent Tool Poisoning (with sub-techniques for definition, implementation and runtime response), Publish Poisoned AI Artifacts, Machine Compromise: Local AI Agent, an autonomous-attack group (reconnaissance, attack-path adaptation, orchestration), AI Agent Response Biasing, Discover AI Agent Runtime Capabilities, Event Triggered Execution, LLM Prompt Propagation and Poison AI Agent Learning Environment.
- Newer mitigations include AI Agent Authority Expansion Controls, AI Agent Scope Drift Detection, AI Honeypots and AI Agent External Resource Lifecycle Management.
- Recent case studies include EchoLeak (Microsoft 365 Copilot), ZombieAgent data exfiltration, and a Claude Code GitHub Action secret exposure.

## Feeds

[LLM red teaming](../concepts/llm-red-teaming.md)

---
title: "Source: NeuralTrust, OWASP Top 10 for Agentic Applications 2026"
summary: "A vendor explainer giving a definition and the main mitigations for each of the ten OWASP agentic risks, ASI01 to ASI10."
category: source
lastmod: 2026-11-14
tags: ["security", "owasp", "agents"]
---

- **What:** vendor blog post (secondary source; the official PDF was not fetched)
- **Publisher:** NeuralTrust
- **Date:** last updated 2026-10-28; accessed 2026-11-14
- **Original:** [neuraltrust.ai](https://neuraltrust.ai/blog/owasp-top-10-for-agentic-applications-2026)

## Summary

Walks through the agentic list released 2025-12-09 by OWASP's Agentic Security Initiative (more than 100 contributors). Its two principles are least agency (only the autonomy, tools and permissions the task needs) and strong observability (seeing what agents do, why, and with which tools). Each agentic risk maps to one to four entries of the 2025 LLM list.

## Key claims

- **ASI01 Agent Goal Hijack:** injected content redirects goals or decision paths. Controls: treat all natural-language input as untrusted, approve goal changes, lock and version system prompts.
- **ASI02 Tool Misuse and Exploitation:** an authorised tool used unsafely. Controls: per-tool least privilege, a policy check between planner and tool, dry runs or approval for destructive actions, usage budgets.
- **ASI03 Identity and Privilege Abuse:** inherited or delegated credentials and cached context reach too far. Controls: short-lived task-scoped tokens per agent identity, clear memory between tasks, central policy engine.
- **ASI04 Agentic Supply Chain Vulnerabilities:** a loaded model, tool, prompt, plugin or MCP server is malicious or tampered. Controls: signing and attestation, AI-BOMs, pinning and allowlists, runtime hash checks, kill switch.
- **ASI05 Unexpected Code Execution:** text becomes executed code. Controls: sandboxed non-root execution, no `eval`, a validation gate between generation and execution.
- **ASI06 Memory and Context Poisoning:** corrupted memory, summaries, embeddings or retrieval stores bias later steps. Controls: scan writes, segment memory per user and domain, provenance, rollback and quarantine.
- **ASI07 Insecure Inter-Agent Communication:** spoofed, replayed or tampered agent messages. Controls: mutual auth, signed messages, nonces and timestamps, typed schemas.
- **ASI08 Cascading Failures:** one fault propagates across agents and workflows. Controls: independent policy engine between planning and execution, rate limits, circuit breakers, tamper-evident logs.
- **ASI09 Human-Agent Trust Exploitation:** fluent agents steer human approvals. Controls: plain-language risk summaries, explicit confirmation, log what was shown versus what was executed.
- **ASI10 Rogue Agents:** an agent drifts from its function while each action looks legitimate. Controls: signed audit logs, behavioural baselines, an owner and expiry per agent, tested kill switch.

## Feeds

[OWASP Top 10 for LLM and Agentic Applications](../concepts/owasp-top-10-for-llm.md)

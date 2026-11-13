---
title: "Source: AI Agent Authentication and Authorization (draft-klrc-aiagent-auth)"
summary: "IETF draft (July 2026) profiling WIMSE/SPIFFE, OAuth, token exchange, transaction tokens and Shared Signals into best practice for agent identity; no new protocol."
category: source
lastmod: 2026-11-14
tags: ["protocols", "identity", "security", "standards"]
---

- **What:** Internet-Draft draft-klrc-aiagent-auth-03, Informational; since replaced by the WIMSE working-group document draft-ietf-wimse-aims
- **Authors:** P. Kasselman (Defakto), J. Lombardo (AWS), Y. Rosomakho (Zscaler), B. Campbell (Ping Identity), N. Steele (OpenAI), A. Parecki (Okta)
- **Date:** 2026-07-06; read 2026-11-14
- **Original:** [datatracker](https://datatracker.ietf.org/doc/html/draft-klrc-aiagent-auth)

## Summary

Treats an agent as a workload and composes existing standards: a single WIMSE identifier (possibly a SPIFFE ID) per agent, short-lived cryptographically bound credentials, OAuth for delegation, token exchange and transaction tokens for downstream hops, ID-JAG for cross-domain access, CIBA for out-of-band approval, and Shared Signals (CAEP/RISC) for revocation. It lists gaps, notably human confirmation mid-execution.

## Key claims

- Each agent has exactly one WIMSE identifier; credentials (X.509-SVID, JWT-SVID, WIT) are short-lived, auto-rotated, and issued after posture checks.
- The LLM must not have access to agent or tool credentials, limiting what prompt injection can steal.
- Static API keys are an antipattern: bearer artifacts with no cryptographic binding.
- Authentication: mTLS (fails across proxies) or application-layer proof of possession (WIMSE Workload Proof Tokens, HTTP Message Signatures), which must handle replay.
- Authorization: access tokens carry the agent in `client_id` and the delegating user in `sub`; authorization code flow with phishing-resistant user auth for delegation; client credentials or JWT grant for the agent's own authority.
- Tools should not forward tokens they receive to downstream services; use token exchange or transaction tokens instead.
- Human approval: a local UI confirmation is not enough; it must become a verifiable authorization event (e.g. CIBA), and CIBA fits mid-task confirmation poorly.
- Audit logs must be tamper-evident and record agent ID, delegated subject, resource, decision, timestamp, correlation ID, risk state and remediation, so the full execution chain can be reconstructed.
- Minimise personal data in tokens, prefer audience-restricted tokens, never log full tokens.

## Feeds

- [Agent authentication and authorization](../concepts/agent-authentication-and-authorization.md)

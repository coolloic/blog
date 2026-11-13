---
title: "Source: Vercel Sandbox docs (overview, security model, pricing and quotas)"
summary: "Vercel Sandbox: Firecracker microVMs with root, persistent sessions up to 24h, Active-CPU billing, an egress firewall with TLS-terminating credential injection, and plan quotas."
category: source
lastmod: 2026-11-14
tags: ["agents", "sandboxing", "infrastructure"]
---

- **What:** official product documentation
- **Publisher:** Vercel
- **Date:** overview updated 2026-09-22, pricing updated 2026-09-10; read 2026-11-14
- **Original:** [Vercel Sandbox](https://vercel.com/docs/sandbox), [Security model](https://vercel.com/docs/sandbox/concepts/security), [Pricing and quotas](https://vercel.com/docs/sandbox/pricing)

## Summary

Vercel Sandbox runs untrusted or agent-generated code in Linux microVMs via the `@vercel/sandbox` JS SDK, the `vercel-sandbox` Python SDK or a CLI, authenticated with Vercel OIDC tokens or access tokens. The docs describe the isolation boundary and what it does not cover, the egress firewall, and billing.

## Key claims

- Each sandbox is a Firecracker microVM with a dedicated kernel; `sudo` works, so Docker, VPN clients and FUSE run inside. Default image `vercel/sandbox/universal` (Node LTS, Python 3.14, coding agents); custom OCI images from Vercel Container Registry.
- Hardware side channels are acknowledged as a residual risk: cooperating workloads on one host could signal via cache/memory timing; mitigations from CPU, kernel and Firecracker apply.
- Outbound HTTP is allowed by default; exposed ports get public URLs. Network policies restrict egress. For rules that modify requests (e.g. credential injection) the firewall terminates TLS with a per-sandbox CA added to the trust store; nested containers must be given that CA explicitly.
- Persistence is the default: sandboxes auto-save state on stop; snapshots expire 30 days after last use by default; drives provide persistent storage.
- Active CPU billing: waiting on I/O or model calls is not charged. Pro rates in iad1: USD 0.128 per active CPU-hour, USD 0.0212 per GB-hour of provisioned memory (2 GB per vCPU), USD 0.60 per million creations.
- Limits: default timeout 5 minutes, max session 45 minutes (Hobby) or 24 hours (Pro/Enterprise), resetting on each stop/resume; max 4/8/32 vCPUs (Hobby/Pro/Enterprise); 64 GB NVMe disk; concurrency 10 (Hobby) or 10,000; vCPU allocation rate ramps from 150 to 5,000 per minute on Pro.
- Multi-agent isolation: one Linux user per agent with private home directories.

## Feeds

- [Code execution sandboxes](../concepts/code-execution-sandboxes.md)

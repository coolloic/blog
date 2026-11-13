---
title: "Source: Daytona documentation (sandboxes and network limits)"
summary: "Daytona sandboxes: sub-90 ms starts, 1 vCPU/1 GiB/3 GiB defaults, ephemeral or persistent lifecycle, and tiered egress firewall with CIDR/domain allowlists or block-all."
category: source
lastmod: 2026-11-14
tags: ["agents", "sandboxing", "infrastructure"]
---

- **What:** official product documentation
- **Publisher:** Daytona
- **Date:** living documents, read 2026-11-14
- **Original:** [Daytona docs](https://www.daytona.io/docs/en/), [Sandboxes](https://www.daytona.io/docs/en/sandboxes), [Network limits](https://www.daytona.io/docs/en/network-limits)

## Summary

Daytona positions sandboxes as composable computers for agents (Linux containers and VMs, Windows, macOS, GPU), driven by SDKs in TypeScript, Python, Ruby, Go and Java, with snapshots, volumes, warm pools, LSP, git, PTY and computer-use support.

## Key claims

- Startup under 90 ms; dedicated kernel, filesystem, network stack and allocated resources per sandbox; OCI/Docker compatible.
- Default resources 1 vCPU, 1 GiB RAM, 3 GiB disk; ranges 1-4 vCPU, 1-8 GiB, 1-10 GiB per org default.
- Lifecycle operations: start, stop, archive, delete, recover; pause/resume and fork are VM-only. Ephemeral sandboxes are deleted on stop (or auto-delete interval 0).
- Firewall by organization tier: Tiers 1-2 are restricted and org policy overrides sandbox settings; Tiers 3-4 default to full internet, replaceable per sandbox.
- `networkAllowList`: IPv4 CIDRs only, max 10; `domainAllowList`: wildcards, max 100; `networkBlockAll`; the three are mutually exclusive. Tier 3-4 can update them on running sandboxes.
- "Essential services" (package registries, git hosts, model providers such as GitHub, npm, PyPI) remain reachable under default tier policy on all tiers; on Tiers 3-4 a custom allowlist or block-all removes them unless you add them back.

## Feeds

- [Code execution sandboxes](../concepts/code-execution-sandboxes.md)

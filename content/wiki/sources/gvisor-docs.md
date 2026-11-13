---
title: "Source: gVisor documentation (overview and platforms)"
summary: "gVisor is a Go user-space application kernel (Sentry plus Gofer) that intercepts container syscalls via systrap or KVM platforms, trading syscall overhead and compatibility for isolation."
category: source
lastmod: 2026-11-14
tags: ["agents", "sandboxing", "infrastructure"]
---

- **What:** official project documentation
- **Publisher:** gVisor project (created by Google, now a CNCF sandbox project)
- **Date:** living documents, read 2026-11-14
- **Original:** [gVisor docs](https://gvisor.dev/docs/), [Platforms](https://gvisor.dev/docs/architecture_guide/platforms/)

## Summary

gVisor implements a Linux-like kernel interface in user space so that container syscalls never reach the host kernel directly. It ships `runsc`, an OCI runtime usable from Docker and Kubernetes.

## Key claims

- The Sentry acts as the guest kernel (syscalls, signals, memory, threads) and itself makes only a limited set of host syscalls under seccomp. The Gofer, a per-container host process, mediates all filesystem access over 9P; the Sentry has no direct filesystem access.
- It is neither a seccomp filter nor a VM: no fixed hardware-virtualization overhead, faster startup, flexible footprint.
- Platforms: systrap (default since mid-2023, uses `SECCOMP_RET_TRAP`/`SIGSYS`, best inside VMs), KVM (best on bare metal; worse under nested virtualization), ptrace (deprecated, high context-switch cost).
- Trade-offs: higher per-syscall overhead (syscall-heavy workloads suffer) and incomplete syscall, `/proc` and `/sys` coverage, so some apps break, although most run unmodified.
- Written in memory-safe Go.

## Feeds

- [Code execution sandboxes](../concepts/code-execution-sandboxes.md)

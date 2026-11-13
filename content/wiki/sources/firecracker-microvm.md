---
title: "Source: Firecracker (project site and NSDI 2020 paper)"
summary: "AWS's open-source KVM-based microVM monitor for serverless: under 125 ms boot, under 5 MiB overhead, five emulated devices, a jailer, and production use in Lambda and Fargate."
category: source
lastmod: 2026-11-14
tags: ["agents", "sandboxing", "infrastructure", "paper"]
---

- **What:** open-source project site plus peer-reviewed paper
- **Authors:** Agache, Brooker, Florescu, Iordache, Liguori, Neugebauer, Piwonka, Popa (Amazon Web Services)
- **Date:** paper at NSDI '20, February 2020; site read 2026-11-14
- **Original:** [firecracker-microvm.github.io](https://firecracker-microvm.github.io/), [Firecracker: Lightweight Virtualization for Serverless Applications](https://www.usenix.org/conference/nsdi20/presentation/agache)

## Summary

Firecracker is a minimal virtual machine monitor that uses Linux KVM to run "microVMs", designed to escape the old trade-off between VM-grade security with high overhead and container-grade overhead with weaker isolation, which the paper calls unacceptable for public multi-tenant infrastructure.

## Key claims

- Apache 2.0; runs in user space on KVM.
- Boots in under 125 ms, under 5 MiB memory overhead per microVM, up to 150 microVMs per second per host.
- Minimal device model: virtio-net, virtio-block, virtio-vsock, a serial console and a minimal keyboard controller (only to stop the VM). A small attack surface follows from this.
- A companion "jailer" adds user-space barriers (a second line of defence) in case the virtualization boundary is breached.
- Built-in rate limiters for network and storage bandwidth/operations.
- Powers AWS Lambda and Fargate, serving millions of workloads and trillions of requests per month (per the paper).

## Feeds

- [Code execution sandboxes](../concepts/code-execution-sandboxes.md)

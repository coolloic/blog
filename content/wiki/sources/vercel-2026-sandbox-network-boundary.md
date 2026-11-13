---
title: "Source: A sandbox without a network boundary is only half a sandbox (Vercel, 2026)"
summary: "Vercel engineering post arguing egress control and credential brokering are part of the sandbox boundary, not add-ons, and describing its host-side firewall design."
category: source
lastmod: 2026-11-14
tags: ["agents", "sandboxing", "security"]
---

- **What:** engineering blog post
- **Author:** Brandon Tuttle (with Kevin Sundstrom), Vercel
- **Date:** 2026-08-11
- **Original:** [A sandbox without a network boundary is only half a sandbox](https://vercel.com/blog/a-sandbox-without-a-network-boundary-is-only-half-a-sandbox)

## Summary

A microVM stops code from reaching the host, but not from reaching the internet. The post argues a sandbox must also control where code connects, which credentials it can use, and how that changes over the workload's life.

## Key claims

- Open egress enables exfiltration (an injected instruction in an issue, log or dependency makes the agent upload data, no VM escape needed), internal network probing and attacks on third parties.
- Containment also breaks through network gaps: a reachable DNS resolver, allowlists that fail open, hostname parsing that differs between policy engine and proxy, or an allowed service acting as a relay.
- Policy modes: fully open (risky default), fully isolated (impractical), default-deny with domain rules (changing IPs) or CIDR rules (fixed/private infra), and time-varying policies such as allowing a package registry during setup and removing it before untrusted code runs.
- Credential brokering: a host-side firewall, for configured destinations only, terminates TLS with a per-sandbox CA, adds or replaces the auth header and re-encrypts upstream. The secret never enters the VM, the CA is discarded at stop, and stealing files or env vars does not carry the authority. Matchers can narrow by path, method, query or headers; least privilege still applies.
- Request proxying can route selected HTTPS calls through a customer proxy for redaction, authorization, scanning, audit or token exchange.

## Feeds

- [Code execution sandboxes](../concepts/code-execution-sandboxes.md)

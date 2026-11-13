---
title: "Source: E2B documentation (sandboxes, internet access, secrets, security)"
summary: "E2B's Firecracker-microVM sandboxes for agents: pause/resume persistence, 1h/24h run limits, IP/CIDR/domain egress rules via SNI/Host inspection, and proxy-injected secrets."
category: source
lastmod: 2026-11-14
tags: ["agents", "sandboxing", "infrastructure"]
---

- **What:** official product documentation (several pages)
- **Publisher:** E2B
- **Date:** living documents, read 2026-11-14
- **Original:** [docs.e2b.dev](https://docs.e2b.dev/), [Sandbox lifecycle](https://docs.e2b.dev/sandbox.md), [Internet access](https://docs.e2b.dev/network/internet-access.md), [Secrets](https://docs.e2b.dev/secrets.md), [Security and compliance](https://docs.e2b.dev/faq/security-and-compliance.md)

## Summary

E2B provides on-demand Linux VMs for agents through the `e2b` SDK (commands, files) and the Code Interpreter SDK (`run_code` with persistent variables and chart results). The docs cover lifecycle, persistence, egress control and a secrets model that keeps credentials out of the VM.

## Key claims

- Each sandbox is a Firecracker microVM with its own kernel, isolated by the hypervisor; E2B stresses it is not a container. SOC 2 Type II.
- Templates define the starting environment. The Code Interpreter SDK keeps variables between `run_code` calls and returns rich results such as charts.
- Continuous runtime up to 24 hours (Pro) or 1 hour (Hobby); `set_timeout` resets the timer; on timeout a sandbox can kill or auto-pause. Pause saves filesystem and memory; paused sandboxes are kept indefinitely until killed, and pausing resets the runtime window.
- Internet access is on by default. `allow_internet_access=False` equals denying `0.0.0.0/0`. `allowOut`/`denyOut` accept IPs, CIDRs and (allow only) domains; allow rules beat deny rules.
- Domain filtering inspects the HTTP Host header on port 80 and TLS SNI on 443; other ports are CIDR-only; QUIC/UDP not domain-filterable. Allowing a domain auto-allows 8.8.8.8 for DNS (all traffic to it); `dnsServers` / `dns_servers` changes which resolvers are allowed.
- A blocked TCP connection can appear to succeed inside the sandbox because the firewall accepts before deciding; verify at the application level.
- On shared CDNs/object storage, allowing one hostname may open other destinations on the same endpoint.
- Secrets are not env vars: the sandbox holds a named reference and the egress proxy injects the real value into matching outbound HTTPS requests. Values are write-only via the API and can be rotated without restarting sandboxes. Only inject into trusted destinations, since the destination could echo the value back. Workload identity is offered for short-lived per-sandbox tokens.

## Feeds

- [Code execution sandboxes](../concepts/code-execution-sandboxes.md)

---
title: "Source: Modal Sandboxes guide and networking docs"
summary: "Modal Sandboxes: gVisor (or VM runtime) containers for untrusted code, 5-minute default lifetime up to 24 hours, filesystem snapshots, and CIDR/SNI-domain egress allowlists."
category: source
lastmod: 2026-11-14
tags: ["agents", "sandboxing", "infrastructure"]
---

- **What:** official product documentation
- **Publisher:** Modal
- **Date:** living documents, read 2026-11-14
- **Original:** [Sandboxes](https://modal.com/docs/guide/sandbox), [Sandbox networking](https://modal.com/docs/guide/sandbox-networking)

## Summary

Modal Sandboxes are containers for running untrusted code (e.g. LLM output) on Modal's serverless platform, created with `Sandbox.create` and driven with `sb.exec`, from Python, JS or Go SDKs. They reuse Modal's image, volume, secret and GPU machinery.

## Key claims

- Runtimes: gVisor by default (the guide says Modal chooses when `runtime` is unset; Modal's VM-sandboxes blog confirms gVisor remains the default); a VM runtime gives each sandbox its own kernel for Docker, FUSE and nested cgroups. GPU sandboxes run only on gVisor.
- Default maximum lifetime 5 minutes, configurable to 24 hours; longer work should use filesystem snapshots. `idle_timeout` ends idle sandboxes. Termination yields exit code 137.
- CPU and memory are requests; sandboxes can burst above them and are billed on max(request, actual).
- Secrets are injected as environment variables; an optional OIDC identity token can be injected.
- Named images avoid builds at launch; mutable external tags are cached once pulled.
- Network defaults: no inbound connections, no access to your Modal resources, outbound to any public IP allowed, DNS unrestricted.
- `block_network=True` drops all egress. `outbound_cidr_allowlist` allows listed ranges on any protocol. `outbound_domain_allowlist` (beta) allows TLS on 443 only, matched on SNI without decryption; ECH unsupported; domain fronting can bypass it, so Modal suggests a Sidecar proxy. CIDR and domain lists are additive. Policies can be replaced at runtime (alpha), terminating newly disallowed connections.
- Inbound access is through tunnels (encrypted, unencrypted, HTTP/2 ports) and Connect Tokens; `inbound_cidr_allowlist` does not apply to unencrypted ports.

## Feeds

- [Code execution sandboxes](../concepts/code-execution-sandboxes.md)

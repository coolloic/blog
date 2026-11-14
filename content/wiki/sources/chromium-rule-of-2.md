---
title: "Source: The Rule of 2 (Chromium security docs)"
summary: "Chromium's security policy: code may combine at most two of untrustworthy input, a memory-unsafe language, and high privilege; the ancestor of Meta's Agents Rule of Two."
category: source
lastmod: 2026-11-14
tags: ["security", "docs"]
---

- **What:** project security documentation (living document)
- **Publisher:** Chromium project, Chrome Security Team
- **Date:** read 2026-11-14
- **Original:** [chromium.googlesource.com/chromium/src/+/main/docs/security/rule-of-2.md](https://chromium.googlesource.com/chromium/src/+/main/docs/security/rule-of-2.md)

## Summary

A review rule for browser code. Any component handling input may have at most two of: **untrustworthy inputs** (complex grammars or unauthenticated sources), an **unsafe implementation language** (C, C++, assembly) and **high privilege** (for example the browser or GPU process). The Chrome Security Team generally rejects changes that combine all three; the fix is to remove one property.

## Key claims

- Privilege is relative: browser and GPU processes are high; sandboxed utility processes and site-isolated renderers are low.
- Ways to drop a property: parse in a sandboxed low-privilege process and validate the returned result; use a memory-safe language; verify the source cryptographically (component updater, pinned TLS); or **normalize** complex input into a simple structured format in a low-privilege process before high-privilege code touches it.
- The motivation is memory-safety bugs, which cause most security vulnerabilities in large C/C++ codebases.
- Some legacy code still violates the rule; the priority is to stop new violations.

## Feeds

[Lethal trifecta](../concepts/lethal-trifecta.md)

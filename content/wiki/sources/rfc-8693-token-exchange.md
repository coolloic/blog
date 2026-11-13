---
title: "Source: RFC 8693 OAuth 2.0 Token Exchange"
summary: "IETF standard (Jan 2020) for trading one security token for another at an STS, with explicit impersonation vs delegation semantics and the act / may_act claims."
category: source
lastmod: 2026-11-14
tags: ["protocols", "oauth", "identity", "standards"]
---

- **What:** IETF RFC 8693, Standards Track
- **Authors:** M. Jones, A. Nadalin, B. Campbell (ed.), J. Bradley, C. Mortimore
- **Date:** January 2020; read 2026-11-14
- **Original:** [rfc-editor.org/rfc/rfc8693](https://www.rfc-editor.org/rfc/rfc8693.html)

## Summary

Adds a grant type, `urn:ietf:params:oauth:grant-type:token-exchange`, that turns an authorization server into a Security Token Service. A client sends a `subject_token` (who the request is for) and optionally an `actor_token` (who will act) and gets back a new token narrowed to a target service. It is the building block for down-scoping tokens across hops, for ID-JAG issuance, and for vault products that swap a first-party token for a third-party one.

## Key claims

- Parameters: `subject_token` + `subject_token_type` (required); `actor_token` + `actor_token_type`; `resource` (URI) and `audience` (logical name), both multi-valued; `scope`; `requested_token_type`.
- Servers may return `invalid_target` when the requested targets are too broad; clients should ask for narrow access.
- **Impersonation:** the new token's holder is indistinguishable from the subject. **Delegation:** the actor keeps its own identity and the token records both parties.
- The `act` claim names the current actor; nested `act` claims record a chain (current actor outermost). Only the top-level claims and current actor should drive access decisions; earlier actors are informational.
- `may_act` declares in advance who is allowed to act for the subject.
- Security: authenticate clients (otherwise a stolen token can be exchanged by anyone), limit scope and lifetime, send tokens only over TLS, minimise personal data in tokens.

## Feeds

- [Agent authentication and authorization](../concepts/agent-authentication-and-authorization.md)

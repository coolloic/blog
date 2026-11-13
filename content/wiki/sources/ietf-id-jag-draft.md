---
title: "Source: Identity Assertion JWT Authorization Grant (IETF draft)"
summary: "IETF OAuth WG draft defining the ID-JAG: an IdP-signed JWT, obtained by token exchange, that a client presents via the JWT bearer grant to another domain's authorization server."
category: source
lastmod: 2026-11-14
tags: ["protocols", "oauth", "identity", "standards"]
---

- **What:** Internet-Draft draft-ietf-oauth-identity-assertion-authz-grant (Standards Track, work in progress)
- **Authors:** Aaron Parecki (Okta), Karl McGuinness, Brian Campbell (Ping Identity)
- **Date:** revision -06, 2026-10-31; read 2026-11-14
- **Original:** [datatracker](https://datatracker.ietf.org/doc/draft-ietf-oauth-identity-assertion-authz-grant/)

## Summary

Defines a two-step cross-domain flow. Step one: a client holding a user's ID Token or SAML assertion from the enterprise IdP performs RFC 8693 token exchange at that IdP asking for an ID-JAG aimed at a specific resource authorization server. Step two: the client presents the ID-JAG with the RFC 7523 JWT bearer grant to that resource AS and receives an ordinary access token. This is the token format behind MCP Enterprise-Managed Authorization and Okta's Cross App Access.

## Key claims

- Token type URN `urn:ietf:params:oauth:token-type:id-jag`; JWT `typ` header `oauth-id-jag+jwt`; RS256 mandatory to implement.
- Exchange request: `requested_token_type` = id-jag (required), exactly one `audience` = the resource AS issuer (required), `resource` recommended, `scope` and `authorization_details` optional; `subject_token` is an ID Token, SAML 2.0 assertion, or optionally a refresh token. Client authentication at the IdP is required.
- Required claims: `iss`, `sub` (subject identifier chosen for the target AS), `aud`, `client_id` (the client's ID at the resource AS), `jti`, `exp`, `iat`. Optional: `resource`, `scope`, `authorization_details`, `act`, tenant claims, `email`, `auth_time`, `acr`, `amr`.
- Resource AS must check `typ`, trusted `iss`, signature, `aud` equals its own issuer, and `client_id` equals the authenticated client; it must reject requests that have neither client authentication nor a sender-constrained (DPoP) ID-JAG.
- Security considerations cover subject-token storage, step-up, metadata validation, subject identifier disclosure, actor delegation and sender-constrained tokens.

## Feeds

- [Agent authentication and authorization](../concepts/agent-authentication-and-authorization.md)

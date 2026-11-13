---
title: "Source: Amazon Bedrock AgentCore Identity docs"
summary: "AWS's agent identity service: a directory of agent workload identities, a KMS-encrypted token vault, OAuth 2LO/3LO credential providers, and SDK decorators that inject credentials."
category: source
lastmod: 2026-11-14
tags: ["protocols", "aws", "identity", "platforms"]
---

- **What:** AgentCore developer guide pages: Identity, Overview, Features
- **Author/publisher:** Amazon Web Services
- **Date:** undated living docs; read 2026-11-14
- **Original:** [AgentCore Identity](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity.html) · [Features](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/key-features-and-benefits.html)

## Summary

Agents are modelled as workload identities with agent-specific attributes, held in a central directory and addressed by ARN. A token vault stores OAuth tokens, client credentials and API keys; agents retrieve them only by proving their workload identity. Credential providers wrap OAuth client-credentials (2LO) and authorization-code (3LO) flows for common SaaS providers or any OAuth 2.0 server.

## Key claims

- Directory of agent identities (ARN like `.../workload-identity/directory/default/workload-identity/<agent>`), usable for hierarchical, group-level policy wherever the agent runs (AgentCore Runtime, self-hosted, hybrid).
- Token vault: encrypted at rest and in transit with customer- or service-managed KMS keys; every access request is validated independently, even inside one trust domain, to protect user data from misbehaving agent code.
- 2LO for machine-to-machine; 3LO for user-consented access; built-in providers for Google, GitHub, Slack, Salesforce, Atlassian, plus custom OAuth 2.0 providers.
- SDK decorators `@requires_access_token` and `@requires_api_key` fetch and inject credentials; on missing consent the SDK generates the authorization URL.
- Inbound JWT authorizer and SigV4 for callers; integrates with Cognito, Okta, Entra ID, Auth0; all operations logged for audit.
- Supports an impersonation flow where the agent acts with credentials provided to it.

## Feeds

- [Agent authentication and authorization](../concepts/agent-authentication-and-authorization.md)

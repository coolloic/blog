---
title: "Source: A2A Protocol Specification v1.0"
summary: "The Agent2Agent protocol specification: Agent Cards, Tasks, Messages, Parts, Artifacts, nine task states, three protocol bindings, streaming, push notifications and security."
category: source
lastmod: 2026-11-14
tags: ["protocols", "a2a", "agents"]
---

- **What:** the normative A2A specification (latest = 1.0.x; earlier 0.3.0, 0.2.6, 0.1.0)
- **Author/publisher:** A2A project (a2a-protocol.org), originally contributed by Google
- **Date:** v1.0 line, read 2026-11-14
- **Original:** [A2A Protocol Specification](https://a2a-protocol.org/latest/specification/)

## Summary

A2A defines how a client agent discovers a remote agent and delegates work to it without seeing its internals. The remote agent publishes an Agent Card; the client sends Messages made of Parts; long-running work is tracked as a Task with a state machine and produces Artifacts. The same abstract operations are bound to JSON-RPC, gRPC and HTTP+JSON/REST.

## Key claims

- Versioning is Major.Minor via the `A2A-Version` header (or `?A2A-Version=` query parameter); a missing or empty value is treated as 0.3; unsupported versions return `VersionNotSupportedError`.
- Agent Card required fields include `name`, `description`, `version`, `defaultInputModes`/`defaultOutputModes`, `skills` (each with `id`, `name`, `description`, `tags`; optional `examples`, input/output modes) and an ordered `supportedInterfaces` list (each: `url`, `protocolBinding` = `JSONRPC` | `GRPC` | `HTTP+JSON`, `protocolVersion`, optional `tenant`). The first interface is preferred.
- Capabilities flags: `streaming`, `pushNotifications`, `extendedAgentCard`. Security via `securitySchemes`/`security`: API key, HTTP auth, OAuth 2.0 (auth code, client credentials, device code), OpenID Connect, mTLS.
- Discovery: `https://{domain}/.well-known/agent-card.json`, registries, or direct configuration. An authenticated `GetExtendedAgentCard` can return a richer card.
- Agent Cards may be signed with JWS (RFC 7515) over RFC 8785 (JCS) canonical JSON, excluding the `signatures` field; clients should verify a signature before trusting a card.
- Task: `id`, `contextId`, `status`, `artifacts`, `history`, `metadata`. `contextId` groups related tasks into one conversation; a contextId/taskId mismatch must be rejected.
- Message: `messageId`, `contextId`, `taskId`, `role` (user/agent), `parts`, `referenceTaskIds`, `extensions`. Part holds exactly one of `text`, `raw` bytes, `url`, or `data` (JSON), plus optional `mediaType`, `filename`, `metadata`. Artifact: `artifactId`, `parts`, optional name/description.
- Task states: SUBMITTED, WORKING; interrupted INPUT_REQUIRED, AUTH_REQUIRED; terminal COMPLETED, FAILED, CANCELED, REJECTED (plus UNSPECIFIED).
- Operations: SendMessage, SendStreamingMessage, GetTask, ListTasks (cursor-paginated), CancelTask, SubscribeToTask, push-notification config CRUD, GetExtendedAgentCard.
- Streams carry `StreamResponse` objects in order; a message-only stream has one Message, a task stream starts with the Task then status/artifact updates and closes at a terminal state. JSON-RPC and REST stream over SSE (`text/event-stream`). REST paths include `POST /message:send`, `POST /message:stream`, `GET /tasks/{id}`, `POST /tasks/{id}:cancel`.
- Push notifications: the server POSTs StreamResponse payloads to a client webhook; configs persist until completion or deletion; webhooks must be authenticated; agents should use 10–30 s request timeouts and may retry with exponential backoff; receivers return 2xx and should be idempotent.
- `SendMessageConfiguration.returnImmediately` (default false = blocking) returns as soon as the task is created.
- In-task auth: agent sets AUTH_REQUIRED and explains; credentials should arrive out of band; the state itself grants nothing.
- Errors include TaskNotFound, TaskNotCancelable, PushNotificationNotSupported, UnsupportedOperation, ContentTypeNotSupported, InvalidAgentResponse, VersionNotSupported.
- Production must use TLS (1.3+ recommended).

## Feeds

- [Agent2Agent (A2A) protocol](../concepts/agent2agent-protocol.md)

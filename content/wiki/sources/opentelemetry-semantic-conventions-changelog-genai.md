---
title: "Source: OpenTelemetry semantic-conventions CHANGELOG (GenAI entries)"
summary: "The core semantic-conventions changelog: where the GenAI client conventions started (v1.26.0), the v1.37.0 breaking revamp of message capture and provider naming, and the v1.42.0 move to a dedicated repository."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "observability", "opentelemetry"]
---

- **What:** release changelog of the core OpenTelemetry semantic conventions, plus the transition note in the v1.41.0 GenAI docs
- **Publisher:** OpenTelemetry project
- **Date:** accessed 2026-11-14 (latest release v1.45.0, published 2026-11-02)
- **Original:** [CHANGELOG.md](https://github.com/open-telemetry/semantic-conventions/blob/main/CHANGELOG.md), [releases](https://github.com/open-telemetry/semantic-conventions/releases), [GenAI README at v1.41.0](https://github.com/open-telemetry/semantic-conventions/blob/v1.41.0/docs/gen-ai/README.md)

## Summary

The changelog records the history of the GenAI conventions while they lived in the core repository. They first appeared as client conventions in v1.26.0, went through two years of breaking changes, and were deprecated in the core repo in v1.42.0 when they moved to their own repository. The v1.41.0 docs also carry the transition rule that instrumentations used to switch between old and new GenAI attribute sets.

## Key claims

- v1.26.0 (released 2024-05-21) introduced semantic conventions for GenAI clients.
- v1.26.0 also clarified that `gen_ai.system` (later `gen_ai.provider.name`) captures the client's perception of the provider and may differ from the actual product.
- v1.37.0 (released 2025-08-25) was a breaking revamp. Per-message events (`gen_ai.system.message`, `gen_ai.user.message`, `gen_ai.assistant.message`, `gen_ai.tool.message`, `gen_ai.choice`) were deprecated in favour of `gen_ai.system_instructions`, `gen_ai.input.messages` and `gen_ai.output.messages` attributes. These can sit on the span or on a new `gen_ai.client.inference.operation.details` event, and they are not recorded when content capture is off.
- v1.37.0 also renamed `gen_ai.system` to `gen_ai.provider.name`, dropped the `gen_ai` prefix from `gen_ai.openai.*` attributes, and renamed `az.ai.*` to `azure.ai.*`.
- v1.38.0 added multimodal `uri`, `file` and `blob` parts to the GenAI JSON schemas.
- v1.41.0 added `gen_ai.request.stream` and `gen_ai.response.time_to_first_chunk`. Its metric names were still `gen_ai.client.token.usage` and `gen_ai.client.operation.duration`.
- v1.42.0 (released 2026-06-12), listed as a breaking change: every `gen_ai.*` attribute, metric, event and span under `model/gen-ai/`, `model/openai/` and `model/mcp/` is deprecated in the core repo and moved to `open-telemetry/semantic-conventions-genai`.
- Transition rule (v1.41.0 docs): instrumentations that already emitted v1.36.0-or-older GenAI attributes should keep doing so by default. They should offer `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental` to switch to the latest experimental version without double-emitting.

## Feeds

[OpenTelemetry GenAI semantic conventions](../concepts/opentelemetry-genai.md)

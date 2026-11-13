---
title: "Source: OpenAI Prompt Caching Guide"
summary: "OpenAI API guide on automatic prompt caching: prefix routing, prompt_cache_key, retention tiers, TTL pricing on GPT-5.6+, and usage fields."
category: source
lastmod: 2026-11-14
tags: ["models", "caching", "openai"]
---

- **What:** official API documentation page
- **Author/publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)

## Summary

OpenAI caches prompt prefixes automatically for supported models; no request change is needed. The guide explains how requests are routed to machines that may hold a matching prefix, how to influence routing with `prompt_cache_key`, the retention policies for older models, and the newer explicit-breakpoint and TTL model introduced with GPT-5.6.

## Key claims

- Caching is on by default and covers the full rendered prefix: instructions, tool definitions, conversation history including images, documents and audio.
- GPT-5.6 and later: minimum cacheable prefix is 1,024 visible tokens, exact boundaries reported; earlier models have model-dependent minimums and report `cached_tokens` in multiples of 128.
- GPT-5.6+: `prompt_cache_options.mode` is `implicit` (breakpoint at end of latest message) or `explicit` (developer-placed breakpoints); up to four cache writes per request.
- Caches live on individual machines. Routing uses a hash of the initial prefix tokens plus `prompt_cache_key`; more than about 15 requests per minute for one prefix+key can overflow to other machines and miss.
- Older models: `prompt_cache_retention` = `in_memory` (typically 5–10 min idle, up to 1 h) or `24h`; reads billed at a discounted cached-input rate with no write surcharge.
- Re-checked 2026-11-14: in `implicit` mode the automatic breakpoint uses one of the four write slots; in `explicit` mode a request with no breakpoints is not cached. The ~15 RPM per-key guidance applies to pre-GPT-5.6 models; on GPT-5.6+ routing is automatic and `prompt_cache_key` is optional, used mainly for cache accounting. The 0.05× read rate applies to GPT-6.1 Sol and GPT-6.1 Terra.
- GPT-5.6+: `ttl` of `30m` (default, write 1.25× input) or `12h` (write 2.5× input, Responses API only); reads 0.1× input (0.05× on some GPT-6.1 models). The guide advertises discounts of up to 95%.
- Usage: `usage.input_tokens_details.cached_tokens`; GPT-5.6+ also reports `cache_write_tokens` split by TTL.
- Changing model, tools, `parallel_tool_calls`, output format, reasoning effort, verbosity or compaction settings can break the prefix.
- The cache stores key/value tensors, not prompt text; compatible with Zero Data Retention; never shared across organizations; no manual clear. Cached tokens still count toward TPM rate limits.

## Feeds

[Prompt caching](../concepts/prompt-caching.md)

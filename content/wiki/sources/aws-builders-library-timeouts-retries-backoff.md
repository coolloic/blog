---
title: "Source: Timeouts, retries, and backoff with jitter (Amazon Builders' Library)"
summary: "Marc Brooker's Builders' Library essay: set timeouts from downstream latency percentiles, retry at one layer only, limit retries with a token bucket, back off with jitter, and retry only idempotent calls."
category: source
lastmod: 2026-11-14
tags: ["platforms", "reliability"]
---

- **What:** engineering essay, Amazon Builders' Library
- **Author:** Marc Brooker (AWS)
- **Date:** 2019-12-05
- **Original:** [Timeouts, retries, and backoff with jitter](https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter) (formerly aws.amazon.com/builders-library)

## Summary

How Amazon builds clients that survive partial failure without turning a blip into an outage.

## Key claims

- Put both a connection and a request timeout on every remote call. Choose the value by picking an acceptable false-timeout rate (e.g. 0.1%) and using the matching downstream latency percentile (e.g. p99.9).
- Retries are "selfish": retrying at every layer multiplies load. Five layers with three retries each can send 243x the load to the bottom dependency; retry at a single layer.
- A local token bucket limits retries: retry freely while tokens remain, then at a fixed rate. AWS SDKs adopted this in 2016; it is presented as easier to reason about than circuit breakers.
- Use capped exponential backoff with a bounded retry count, plus jitter so clients don't retry in lockstep; jitter also helps spread periodic work.
- Only retry idempotent operations; reads usually are, creates often are not. Server errors may succeed on retry; client errors usually won't.

## Feeds

[Rate limits and retries](../concepts/rate-limits-and-retries.md)

---
title: "Source: Exponential Backoff and Jitter (AWS Architecture Blog)"
summary: "Marc Brooker's 2015 simulation comparing no backoff, plain exponential backoff, and Full/Equal/Decorrelated jitter; jitter cuts total calls by more than half under contention; Full and Decorrelated Jitter both beat Equal Jitter."
category: source
lastmod: 2026-11-14
tags: ["platforms", "reliability"]
---

- **What:** engineering blog post with simulation results
- **Author:** Marc Brooker, AWS Architecture Blog
- **Date:** 2015-03-04 (updated May 2023: most AWS SDKs now implement backoff with jitter)
- **Original:** [Exponential Backoff And Jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)

## Summary

Simulates many clients contending for one resource and measures total calls and time to completion under different retry delays.

## Key claims

- With N contending clients, total work grows roughly with N². Plain capped exponential backoff helps little because retries still arrive in synchronized clusters, and jitter does not change the N² nature of the work, though it reduces it substantially at realistic contention.
- Adding randomness spreads retries to a roughly constant rate; with 100 contending clients, jitter reduced the call count by more than half compared with un-jittered backoff.
- Variants: Full Jitter sleeps a random time across the whole capped backoff window; Equal Jitter keeps half the window fixed and randomizes the other half; Decorrelated Jitter grows the random window from the previous sleep.
- Equal Jitter is the weakest jittered option (similar work, longer completion). Full and Equal Jitter make about the same number of calls and Decorrelated makes more; Full Jitter uses less work but slightly more time than Decorrelated, so Brooker does not crown either. The fix is cheap, so it should be standard for remote clients.

## Feeds

[Rate limits and retries](../concepts/rate-limits-and-retries.md)

---
title: "Source: Forward Deployed Engineers (The Pragmatic Engineer)"
summary: "Gergely Orosz's 2025 deep dive into the FDE role: its Palantir origin, how OpenAI built an FDE team, and how FDEs differ from solutions architects and consultants."
category: source
lastmod: 2026-11-14
tags: ["fde", "careers"]
---

- **What:** newsletter deep dive (partly paywalled; the Ramp section is cut off)
- **Author / publisher:** Gergely Orosz, *The Pragmatic Engineer*
- **Date:** 2025-08-12
- **Original:** [newsletter.pragmaticengineer.com/p/forward-deployed-engineers](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers)

## Summary

Defines the forward deployed engineer (FDE) as a software engineer who splits time between embedding with customers and contributing to the core product. Traces the role to Palantir and describes in detail how OpenAI stood up an FDE team in 2025, including its three-phase engagement model.

## Key claims

- Palantir created the role in the early 2010s under the internal name "Delta"; until about 2016 it employed more FDEs than product engineers. Its framing: a Dev builds one capability for many customers, a Delta serves one customer with many capabilities.
- When Palantir launched Foundry, many FDEs moved into product engineering, bringing field knowledge with them.
- Onsite time varies by company: about 25% at Palantir, up to 50% at Commure.
- Working environments can be unusual: Palantir FDEs on air-gapped networks; FDEs on factory floors (Matta) and an aircraft final assembly line (Airbus).
- Common expectations: help sales win and activate customers, feed customer needs into the roadmap, own projects end to end (Palantir likens it to a startup CTO).
- Adjacent titles: Solutions Architect, Sales Engineer, Agent Engineer, Technical Delivery Engineer. The distinguishing trait is that FDEs also ship product code.
- OpenAI's FDE team was proposed in early 2025 by Colin Jarvis (who joined OpenAI as a solutions architect in 2022, now Head of Forward Deployed Engineering); it grew from 2 to 10+ engineers across the US, Europe and Asia.
- At OpenAI, solutions architects mostly advise and build proofs of concept on anonymised or offline data; FDEs write code on customer infrastructure and absorb more ambiguity.
- OpenAI engagements run in three phases: early scoping (a few days onsite mapping processes, prototyping with synthetic data, prioritising), validation (build evals and confirm the scope is the most valuable one), delivery (build the smallest end-to-end solution and demo it onsite).
- Field data flows back: a call-centre voice project exposed weak model performance; FDE data went to research and improved the Realtime API for all customers.
- OpenAI's Solutions Architecture team created the Swarm framework; it has been replaced by the OpenAI Agents SDK, to which the SA and FDE teams contribute.
- Consultants typically give one-off recommendations; FDEs stay with customers longer and build product capability.

## Feeds

[Forward deployed engineering](../concepts/forward-deployed-engineering.md) · [POC to production](../concepts/poc-to-production.md)

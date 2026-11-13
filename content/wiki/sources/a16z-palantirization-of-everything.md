---
title: "Source: The Palantirization of Everything (a16z)"
summary: "Marc Andrusko's 2026 critique of startups copying Palantir's forward-deployed model: when it pays off, the services trap, and how to treat deployment as scaffolding."
category: source
lastmod: 2026-11-14
tags: ["fde", "strategy"]
---

- **What:** venture-capital essay
- **Author / publisher:** Marc Andrusko, Andreessen Horowitz
- **Date:** 2026-01-16
- **Original:** [a16z.com/the-palantirization-of-everything](https://a16z.com/the-palantirization-of-everything/)

## Summary

Argues that many startups pitch themselves as "Palantir for X" and copy the embedded-engineer layer without the platform underneath. Gives a gate for deciding when forward deployment is worth it and design rules that keep it from becoming consulting.

## Key claims

- The model is attractive because enterprises are overwhelmed by AI vendors and many AI projects stall before production; embedded engineering helps win seven-figure deals.
- Palantir is an outlier: a real integrated platform, elite embedded engineers and mission-critical government work together.
- Palantir built reusable core services before selling outcomes; many startups sell custom outcomes before they have a product spine.
- Bespoke deployment only pays off when stakes are high; a few-percent efficiency gain cannot fund months onsite. Many customers want predictable rollouts, not an open-ended R&D project.
- The services trap: copying only the embedded layer yields many unmaintainable bespoke deployments; such companies risk becoming "Accenture for X" with a nicer front end. Many pitches assume 80%+ software gross margins; founders whose go-to-market needs long onsite projects should be candid about lower margins.
- Gate the decision on problem criticality, customer concentration, domain fragmentation and regulatory/data complexity; low scores point to product-led growth.
- Treat forward deployment as scaffolding: time-boxed deployments (e.g. a 90-day sprint to production), a cap on engineering headcount relative to each account's ARR, and converting custom code into reusable templates or configuration every quarter. Favour configuration over code on strong primitives (data model, permissions, workflow engine).
- Put FDEs inside the product organisation, not in a separate professional-services unit, which cuts the customer feedback loop.

## Feeds

[Forward deployed engineering](../concepts/forward-deployed-engineering.md) · [POC to production](../concepts/poc-to-production.md)

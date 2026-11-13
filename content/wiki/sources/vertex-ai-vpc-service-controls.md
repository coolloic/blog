---
title: "Source: Vertex AI — VPC Service Controls"
summary: "How a VPC-SC perimeter blocks exfiltration from Vertex AI / Agent Platform, which features break inside it, and how PSC and Private Google Access fit."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gcp", "networking"]
---

- **What:** vendor documentation
- **Author:** Google Cloud
- **Date:** undated, read 2026-11-14
- **Original:** [VPC Service Controls with Vertex AI](https://docs.cloud.google.com/vertex-ai/docs/general/vpc-service-controls)

## Summary

Explains perimeter-based data-exfiltration protection for the platform and its operational side effects.

## Key claims

- Inside a perimeter, training data, models, online and batch inference data and Gemini calls cannot leave; access from outside is denied unless an access level allows it.
- Producer environments lose default internet egress. Agent Runtime then needs a proxy VM with Cloud NAT for outbound calls.
- Limitations: URL-context live fetching is disabled, request/response logging is unavailable, public 1-click Model Garden endpoints are unsupported (use private endpoints), and pipelines can't pip-install from the internet.
- Endpoints, and agents deployed before a project joins the perimeter, are not protected and may fail or keep internet access, so create them after joining.
- Private Service Connect and Private Google Access give private routes but don't remove public accessibility; VPC-SC is what blocks public access. Use the restricted VIP 199.36.153.4/30.

## Feeds

[Google Vertex AI](../concepts/google-vertex-ai.md)

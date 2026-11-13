---
title: "Source: GCP Services & IaC (Notebook)"
summary: "The owner's tutorial on core GCP services, the project/IAM hierarchy and Terraform, placing Vertex AI as GCP's ML platform."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gcp", "notebook"]
---

- **What:** interactive HTML tutorial in the owner's Notebook
- **Author:** Loic (coolloic)
- **Date:** accessed 2026-11-14
- **Original:** [GCP Services & Infrastructure as Code](https://coolloic.github.io/Notebook/gcp-services.html)

## Summary

A tour of the GCP resource hierarchy, a services field guide, a GCP-to-AWS mapping table, and an introduction to provisioning with Terraform.

## Key claims

- The GCP hierarchy runs Organization → Folder → Project → Resources. The project is the boundary for billing, quota, IAM and enabled APIs.
- Rule of thumb: one project per app per environment, which isolates billing, quotas and permissions.
- Vertex AI is GCP's end-to-end ML platform (train, tune, deploy) and includes the Gemini API.
- Vertex AI maps roughly to AWS SageMaker plus Bedrock.
- Provision infrastructure declaratively with IaC (mainly Terraform) rather than through the console.

## Feeds

[Google Vertex AI](../concepts/google-vertex-ai.md)

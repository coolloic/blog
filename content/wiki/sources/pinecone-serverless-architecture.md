---
title: "Source: Pinecone serverless architecture (Pinecone blog)"
summary: "Pinecone's description of its serverless design: blob storage as source of truth, geometric partitioning, a freshness layer, namespaces and cached compute."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "vector-databases"]
---

- **What:** vendor engineering blog post
- **Author:** Ram Sriharsha (Pinecone)
- **Date:** 16 January 2024
- **Original:** [pinecone.io/blog/serverless-architecture](https://www.pinecone.io/blog/serverless-architecture/)

## Summary

Pinecone serverless separates storage from compute. Writes go to a log and to blob storage, which is the source of truth. An index builder partitions vectors geometrically around centroids into immutable segments, while a small freshness index covers recent writes so they are searchable within seconds. Query executors search both and cache segments locally.

## Key claims

- Blob storage holds every index; compute loads only the segments it needs, so the two scale independently.
- The index builder keeps a coarse-to-fine hierarchy of geometric partitions and rebuilds incrementally.
- A freshness layer makes inserts, updates and deletes searchable within seconds (a lambda-style architecture).
- Namespaces are hard partitions and the unit of tenant isolation; an index can hold hundreds of thousands of them, with cold namespaces paged in on demand.
- Cold-start (first query) latency is a couple of seconds for most datasets and up to about 20 s at billion scale.

## Feeds

[Vector databases](../concepts/vector-databases.md)

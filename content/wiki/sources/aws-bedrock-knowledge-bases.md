---
title: "Source: Amazon Bedrock — Knowledge Bases"
summary: "Bedrock's managed RAG service: Managed vs customer-managed knowledge bases, connectors, agentic retrieval and the supported vector stores."
category: source
lastmod: 2026-11-14
tags: ["platforms", "aws", "rag"]
---

- **What:** vendor documentation
- **Author:** Amazon Web Services
- **Date:** undated, read 2026-11-14
- **Original:** [Retrieve data and generate AI responses with Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)
- **Original:** [Prerequisites for using a vector store you created](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-setup.html)

## Summary

The overview of Knowledge Bases plus the setup guide for bring-your-own vector stores.

## Key claims

- Two kinds of KB: Managed (AWS runs ingestion, indexing, storage and retrieval; recommended) and customer-managed (you own the vector store and pipeline).
- Managed KB adds connectors (S3, SharePoint, Confluence, Google Drive, OneDrive, web crawler), document-level ACL filtering at retrieval time (not for the crawler), Smart Parsing, and agentic retrieval that decomposes and iterates over multiple KBs.
- Managed KB integrates with AgentCore Gateway so MCP-compatible agents can call it as a tool; third-party connectors, ACLs and the Gateway integration are Managed-only.
- Other features: citations, image extraction, multimodal (image) queries, reranking models, structured data stores, Kendra GenAI index, Neptune Analytics graphs (GraphRAG).
- Customer-managed vector stores: OpenSearch Serverless, OpenSearch managed clusters (public access only), S3 Vectors, Aurora PostgreSQL (pgvector), Neptune Analytics, Pinecone, Redis Enterprise Cloud, MongoDB Atlas.
- Only the OpenSearch options store binary vectors; S3 Vectors is float-only, limited to 1 KB and 35 keys of metadata per vector, and suited to infrequent queries.
- Aurora needs an HNSW index on embeddings and a GIN full-text index on chunks (used for hybrid search); pgvector 0.8 iterative scans are recommended so selective metadata filters still return enough results.

## Feeds

[Amazon Bedrock](../concepts/amazon-bedrock.md)

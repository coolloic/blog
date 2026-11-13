---
title: "Source: LlamaIndex framework documentation (RAG, indexes, query engines, agents)"
summary: "LlamaIndex's official Python docs on its RAG stages, Document/Node model, index types, retrievers, node postprocessors, response modes, ingestion pipeline and FunctionAgent."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "retrieval"]
---

- **What:** official developer documentation for the LlamaIndex Python framework (`llama-index-core`), including "Introduction to RAG", "How Each Index Works", "Response Modes", "Ingestion Pipeline", "Retriever", "Node Postprocessor" and "Building an agent"
- **Publisher:** LlamaIndex (run-llama)
- **Date:** living docs, read 2026-11-14; latest framework release at that date was v0.14.25 (2026-09-21) per the GitHub releases page
- **Original:** [developers.llamaindex.ai/python/framework](https://developers.llamaindex.ai/python/framework/understanding/) (source Markdown in [run-llama/llama_index/docs](https://github.com/run-llama/llama_index/tree/main/docs))

## Summary

LlamaIndex frames an LLM app as getting *your* data to the model. Its RAG pipeline has five stages: loading, indexing, storing, querying and evaluation. A `Document` wraps any source (PDF, API output, DB rows); a `Node` is a chunk of a Document carrying metadata and relationships. Readers (connectors) load data; an `IngestionPipeline` applies a list of transformations (splitters, metadata extractors, embedding models) and can write straight into a vector store. Indexes (vector store, summary, tree, keyword table, property graph) expose retrievers; a query engine chains retriever → node postprocessors → response synthesizer. The response synthesizer's mode decides how many LLM calls are made over the retrieved chunks. Agents (`FunctionAgent`, `ReActAgent`, `CodeActAgent`, multi-agent `AgentWorkflow`) are built on Workflows and can use whole query engines as tools.

## Key claims

- The five RAG stages are loading, indexing, storing, querying, evaluation; a Node is "the atomic unit of data" and represents a chunk of a Document.
- Index types: **VectorStoreIndex** (top-k similar nodes; the most common), **SummaryIndex** (formerly List; loads all nodes by default, optional embedding/keyword filtering), **TreeIndex** (hierarchical; query traverses root to leaf, `child_branch_factor` default 1), **KeywordTableIndex** (keyword → node map), **PropertyGraphIndex** (LLM- or schema-extracted knowledge graph; default retrieval combines keyword/synonym expansion with vector retrieval; can attach to Neo4j).
- Response modes: `refine` (one LLM call per chunk, sequential answer refinement), `compact` (default; packs chunks to fill the context window, then refines, so fewer calls), `tree_summarize` (recursive bottom-up summarization, good for summaries), `simple_summarize` (truncate to one prompt, may lose detail), `no_text` (retrieve only), `accumulate` and `compact_accumulate` (answer per chunk, concatenated).
- `IngestionPipeline` hashes and caches every node+transformation pair, so re-runs on unchanged data are near-instant; if writing to a vector store, embedding must be a pipeline stage or later index construction fails.
- Retrievers can be selected by `retriever_mode` on `as_retriever()` (e.g. summary index `"llm"` mode) or constructed directly via a low-level composition API.
- Node postprocessors run after retrieval and before synthesis: similarity cutoff filtering, time weighting, and rerankers such as Cohere Rerank.
- A router (`RouterRetriever`) uses a selector over candidate retrievers' metadata to choose one or more per query.
- Agents select tools from their names, docstrings and type hints; a tool can be a plain function or a full query engine. Agent APIs are async (`await agent.run(user_msg=...)`); smaller models are flagged as less reliable for agent use.

## Feeds

[LlamaIndex](../concepts/llamaindex.md)

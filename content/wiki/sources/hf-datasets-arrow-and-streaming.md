---
title: "Source: Hugging Face Datasets docs: Arrow and Streaming"
summary: "Datasets library docs on its memory-mapped Apache Arrow cache and on streaming mode (IterableDataset, shuffle buffers, sharding, resumable state)."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** library documentation (datasets v5.2.0 docs)
- **Publisher:** Hugging Face
- **Date:** accessed 2026-11-14
- **Original:** [Datasets and Arrow](https://huggingface.co/docs/datasets/about_arrow), [Stream](https://huggingface.co/docs/datasets/stream)

## Summary

The `datasets` library loads data in one of two ways. Map-style datasets are memory-mapped Arrow tables on disk with random access. Streaming `IterableDataset`s read lazily from remote or local files without converting them first.

## Key claims

- Arrow is a columnar, zero-copy, language-agnostic format. `datasets` memory-maps its on-disk Arrow cache, so loading English Wikipedia (about 18 GB) costs about 50 MB of RAM, and iterating it runs at multiple Gbit/s on a laptop.
- `load_dataset(..., streaming=True)` returns an `IterableDataset`. This suits data larger than the disk, such as FineWeb's 45 TB English split. Parquet sources can stream only some columns and push down row filters.
- An IterableDataset has no random access, so reaching the last example means iterating through all the earlier ones.
- `shuffle(buffer_size=...)` (default buffer 1,000) samples from a rolling buffer and shuffles shard order, so it is approximate. `set_epoch` reseeds each epoch. Call `take` and `skip` after shuffling, because they lock the shard order.
- `to_iterable_dataset(num_shards=...)` is faster than streaming for local data and parallelizes across DataLoader workers.
- `state_dict()`/`load_state_dict()` resume iteration at the shard level. Examples sitting in shuffle buffers are lost on resume.
- `map` and `filter` apply lazily while streaming. `push_to_hub` writes Parquet shards.

## Feeds

[Hugging Face ecosystem](../concepts/hugging-face-ecosystem.md)

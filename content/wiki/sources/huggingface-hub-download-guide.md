---
title: "Source: huggingface_hub guide: Download files from the Hub"
summary: "The huggingface_hub client's download APIs: hf_hub_download, snapshot_download with patterns and revisions, the cache, hf CLI, dry-run and Xet-based transfers."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** library documentation (huggingface_hub v2.4.0 docs)
- **Publisher:** Hugging Face
- **Date:** accessed 2026-11-14
- **Original:** [Download files from the Hub](https://huggingface.co/docs/huggingface_hub/guides/download)

## Summary

This guide documents how Python code and the `hf` CLI fetch files from Hub repos into a version-aware local cache. It covers pinning to a revision, filtering which files to fetch, and the Xet storage backend that speeds up large transfers.

## Key claims

- `hf_hub_download` fetches one file into the cache and returns its path. Do not modify the returned file, because doing so corrupts the cache.
- `revision` accepts a branch, a tag, a PR ref (`refs/pr/N`) or a commit hash. A commit hash must be the full hash, not the 7-character short form.
- `snapshot_download` fetches a whole repo concurrently. `allow_patterns` and `ignore_patterns` (fnmatch globs) skip unneeded files, for example `.bin` weights when you only need safetensors.
- The cache lives under `HF_HOME` (by default `~/.cache/huggingface/hub/models--org--name/snapshots/<commit>/`). `local_dir` writes a plain folder instead.
- `hf download` mirrors these APIs, accepts `hf://` URIs, and has a `--dry-run` mode that lists file sizes and cache status.
- `hf_xet` (installed by default since huggingface_hub 0.32.0) downloads content-addressed chunks with deduplication. It replaces the deprecated `hf_transfer`.

## Feeds

[Hugging Face ecosystem](../concepts/hugging-face-ecosystem.md)

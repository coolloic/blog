---
title: "Source: safetensors docs/README and Hub pickle-scanning docs"
summary: "Why pickle checkpoints can execute arbitrary code, how the Hub scans them, and the safetensors format (8-byte length, JSON header, raw buffer) that replaces them."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** library documentation plus Hub security documentation
- **Publisher:** Hugging Face
- **Date:** accessed 2026-11-14
- **Original:** [safetensors README](https://github.com/huggingface/safetensors), [safetensors docs](https://huggingface.co/docs/safetensors/index), [Hub pickle scanning](https://huggingface.co/docs/hub/security-pickle)

## Summary

Pickle-based checkpoints such as `pytorch_model.bin` can execute code when they are loaded. Safetensors is a format that holds only tensors, and it is now the default for Hub weights. These pages explain the attack and the format.

## Key claims

- Unpickling can import modules and call functions, including `exec` and `eval`, through the GLOBAL, STACK_GLOBAL and REDUCE opcodes, so a malicious checkpoint runs code when it is loaded.
- The Hub scans every push with ClamAV and with a pickle-import scan that lists and highlights suspicious imports. The docs say the scan is best-effort and not foolproof.
- Safetensors layout: an 8-byte little-endian header length, then a JSON header mapping each tensor name to its dtype, shape and data offsets (with optional string `__metadata__`), then the raw byte buffer. The header is capped at 100 MB.
- The format allows no duplicate keys and no overlapping or unindexed byte ranges, which rules out polyglot files. Tensors are little-endian and row-major only.
- Loading is lazy and can be partial. Reads from the CPU page cache are zero-copy. Loading BLOOM onto 8 GPUs dropped from about 10 minutes to 45 seconds.
- The safetensors docs' (non-exhaustive) list of projects using the format includes Transformers, MLX, candle, diffusers and llama.cpp's conversion script.

## Feeds

[Hugging Face ecosystem](../concepts/hugging-face-ecosystem.md)

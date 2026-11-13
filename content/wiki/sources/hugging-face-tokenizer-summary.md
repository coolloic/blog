---
title: "Source: Hugging Face Transformers: Tokenization algorithms"
summary: "Documentation page explaining BPE, byte-level BPE, Unigram, WordPiece and SentencePiece with worked examples."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** official library documentation
- **Author:** Hugging Face
- **Date:** accessed 2026-11-14 (living document)
- **Original:** [Tokenization algorithms (Transformers docs)](https://huggingface.co/docs/transformers/tokenizer_summary)

## Summary

The page compares word-level, character-level and subword tokenisation and walks through how each subword algorithm builds its vocabulary. It names which model families use which algorithm.

## Key claims

- Word-level vocabularies explode in size and cannot handle unseen words; character-level sequences are long and each unit carries little meaning; subword methods sit between.
- BPE (used by Llama, Gemma, Qwen2) merges the most frequent adjacent pair until vocab size = base vocabulary + number of merges.
- Byte-level BPE uses the 256 byte values as the base vocabulary, so any input is encodable with no unknown token; GPT-2's vocabulary is 50,257 (256 bytes + 50,000 merges + end-of-text).
- Unigram (used by T5, BigBird, Pegasus) starts from a large candidate set and prunes the tokens whose removal least increases loss; it is probabilistic and can sample alternative segmentations.
- WordPiece (BERT family) merges the pair with the highest frequency(ab)/(frequency(a) x frequency(b)), favouring informative merges.
- SentencePiece applies BPE or Unigram to raw text and represents spaces with the symbol ▁.

## Feeds

[Tokenization](../concepts/tokenization.md)

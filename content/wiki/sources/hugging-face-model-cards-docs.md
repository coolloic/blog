---
title: "Source: Hugging Face Hub docs: Model Cards"
summary: "How Hub model cards work: README.md with YAML metadata for license, base_model and relation, datasets, pipeline_tag, library_name and eval results."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation
- **Publisher:** Hugging Face
- **Date:** accessed 2026-11-14
- **Original:** [Model Cards](https://huggingface.co/docs/hub/model-cards)

## Summary

A model card is the `README.md` of a model repo. It combines prose (intended use, limitations, training data and setup, evaluation) with a YAML metadata header. The Hub uses that header for search filters, license display, lineage and widgets.

## Key claims

- A card should describe the model, its intended uses and limitations (including bias and ethical considerations, following Mitchell et al. 2018), training parameters, datasets and evaluation results.
- The `license` field takes a standard identifier. For a custom license, set `license: other` and add `license_name` and `license_link`.
- `base_model` records lineage, as one model ID or a list for merges. The Hub infers `base_model_relation` (adapter, merge, quantized, finetune), and authors can set it explicitly.
- Repos created after August 2024 must set `library_name: transformers` explicitly. A `config.json` file no longer implies it.
- `pipeline_tag` sets the task, which drives filtering and the inference widget. `datasets` links to training data. `new_version` points to a successor model.
- Evaluation results can be machine-readable in `model-index`, a format derived from Papers with Code, or in a newer, simpler eval-results format.
- Linking an arXiv paper automatically adds an `arxiv:<id>` tag. `not-for-all-audiences` puts a warning interstitial in front of the card.

## Feeds

[Hugging Face ecosystem](../concepts/hugging-face-ecosystem.md)

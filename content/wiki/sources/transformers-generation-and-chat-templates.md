---
title: "Source: Transformers docs: Text generation and Chat templates"
summary: "Transformers guides on generate()/GenerationConfig defaults and pitfalls (20-token limit, greedy default, left padding) and on chat templates (Jinja, add_generation_prompt, duplicate special tokens)."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** library documentation (main branch)
- **Publisher:** Hugging Face
- **Date:** accessed 2026-11-14
- **Original:** [Text generation](https://huggingface.co/docs/transformers/main/en/llm_tutorial), [Chat templates](https://huggingface.co/docs/transformers/main/en/chat_templating)

## Summary

These two guides cover the parts of running a Hub model through Transformers that most often go wrong: loading with device placement and quantization, generation defaults, and formatting chat input exactly as the model was trained to see it.

## Key claims

- `from_pretrained(..., device_map="auto")` uses Accelerate to place weights across the available devices, fastest first. Passing `quantization_config=BitsAndBytesConfig(load_in_4bit=True)` loads the model in 4-bit.
- `generate()` produces at most 20 new tokens unless the model's `generation_config.json` says otherwise. Always set `max_new_tokens`.
- Decoding is greedy unless `do_sample=True`. Temperature takes effect only when sampling.
- Batched prompts must be left-padded. Right padding makes models continue from pad tokens, and it is worse for state-space and hybrid models.
- Chat models expect their own control tokens. Two fine-tunes of the same base model can use different formats, and the wrong template drastically degrades output.
- `apply_chat_template` renders the model's Jinja template. `add_generation_prompt=True` appends the assistant header. `continue_final_message` prefills a partial reply, and the two flags cannot be combined.
- If you render a template to text and tokenize it later, pass `add_special_tokens=False`, or BOS/EOS tokens get duplicated.

## Feeds

[Hugging Face ecosystem](../concepts/hugging-face-ecosystem.md) · [Local LLMs](../concepts/local-llms.md)

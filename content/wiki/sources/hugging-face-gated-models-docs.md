---
title: "Source: Hugging Face Hub docs: Gated models"
summary: "How access-request gating works on the Hub: automatic vs manual approval, custom form fields, token-authenticated downloads, EU restriction."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation
- **Publisher:** Hugging Face
- **Date:** accessed 2026-11-14
- **Original:** [Gated models](https://huggingface.co/docs/hub/models-gated)

## Summary

Model authors can gate a repo so that users must request access, which shares their username and email unless the author opts out, before they can download files. Many licensed open-weight models are distributed this way.

## Key claims

- Access is granted per individual user, never to a whole organization.
- In automatic mode, access is granted as soon as the user submits the form. In manual mode, the author reviews requests through the UI or the API (accept, reject, reset or grant).
- Authors can add custom form fields through `extra_gated_fields` (text, checkbox, date_picker, country, select) and a custom prompt through `extra_gated_prompt`, for example to make users acknowledge license terms.
- Authors can revoke access at any time, without notice.
- Scripted downloads need a user token (`hf auth login`, `login()`, or a `token=` argument to `from_pretrained`, `hf_hub_download` and `load_dataset`).
- `extra_gated_eu_disallowed: true` blocks users from EU countries, detected by IP. It only takes effect when the repo is gated.

## Feeds

[Hugging Face ecosystem](../concepts/hugging-face-ecosystem.md)

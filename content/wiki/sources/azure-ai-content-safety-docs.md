---
title: "Source: Azure AI Content Safety documentation"
summary: "Microsoft Learn docs for Azure AI Content Safety: harm categories with 0-7 severity, Prompt Shields for user and document attacks, groundedness, protected material, limits."
category: source
lastmod: 2026-11-14
tags: ["security", "moderation", "azure"]
---

- **What:** Microsoft Learn pages (overview dated 2026-11-06, harm categories, Prompt Shields concepts dated 2026-08-28)
- **Publisher:** Microsoft
- **Date:** read 2026-11-14
- **Original:** [overview](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview) · [harm categories](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/harm-categories) · [Prompt Shields](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/jailbreak-detection)

## Summary

Azure AI Content Safety is a standalone moderation and LLM-attack-detection service. The same service powers the guardrails built into Microsoft Foundry for model and agent calls, where blocking can be enabled; the standalone API only returns results and leaves the decision to the application.

## Key claims

- APIs: Analyze text and Analyze image (hate, sexual, violence, self-harm with severity), Prompt Shields, groundedness detection (preview), protected material detection (lyrics, articles, recipes, code), task adherence for agent tool use, custom categories (standard and rapid, preview).
- Severity: text supports a 0-7 scale, or a trimmed 0/2/4/6 scale on request; images return only 0/2/4/6. Foundry guardrails map these to blocking levels Low (block high only), Medium (block medium and high), High (block low and above).
- Classifier outputs are not definitive; a "safe" result does not establish that content is risk-free.
- Prompt Shields detects **user prompt attacks** (changing system rules, embedded conversation mockups, role-play, encoding attacks) and **document attacks** (injected instructions in documents, emails, web pages: manipulated content, intrusion, information gathering, availability, fraud, malware). Standalone API: one `userPrompt` and up to five `documents`, each returning `attackDetected`.
- In Foundry, user-prompt attack detection is on by default; document attack detection is off by default. Agents can scan tool responses (preview).
- Spotlighting (preview) base64-encodes documents to mark them low-trust; it raises token count and can make the model mention the encoding.
- Prompt Shields do not judge harm, accuracy or grounding; they are trained mainly on English.
- Protected material, groundedness and standard custom categories are English-only; other models trained on 8 languages.
- Rate limits: S0 tier 1000 requests per 10 s for moderation and Prompt Shields; groundedness 50 RPS. Foundry moderates the first 1000 characters free.
- Several preview features (multimodal, rapid custom categories, containers, embedded SDK, groundedness) retire 2027-04-30.
- Not usable for detecting illegal child exploitation images.

## Feeds

[Content moderation](../concepts/content-moderation.md) · [Guardrail tooling](../concepts/guardrail-tooling.md)

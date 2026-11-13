---
title: "Source: Prompt injection and jailbreaking are not the same thing"
summary: "Simon Willison (Mar 2024): injection attacks applications by concatenating untrusted input with trusted prompts; jailbreaking attacks the model's own safety training."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "jailbreaks", "blog"]
---

- **What:** blog post
- **Author:** Simon Willison
- **Date:** 2024-03-05
- **Original:** [simonwillison.net/2024/Mar/5/prompt-injection-jailbreaking](https://simonwillison.net/2024/Mar/5/prompt-injection-jailbreaking/)

## Summary

Separates two terms often conflated. Prompt injection exists only where an application concatenates a developer's trusted prompt with untrusted input. Jailbreaking targets the safety filters trained into the model.

## Key claims

- Jailbreak harm is mostly reputational ("screenshot attacks"); prompt-injection harm scales with the app's data and tool access.
- A read-only translator is a low-value injection target; an email-reading assistant is high value.
- Different threats need different defences: a filter trained on known jailbreaks can block harmless input and still miss app-specific injections.
- Examples: the "grandma" role-play jailbreak; an email instructing an assistant to forward sales figures.

## Feeds

[Prompt injection](../concepts/prompt-injection.md) · [Jailbreaks](../concepts/jailbreaks.md)

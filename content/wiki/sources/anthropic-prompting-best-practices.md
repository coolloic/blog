---
title: "Source: Prompting best practices (Anthropic)"
summary: "Anthropic's living reference for prompting current Claude models: clarity, examples, XML, roles, long context, prefill migration, thinking and chaining."
category: source
lastmod: 2026-11-14
tags: ["prompting", "anthropic"]
---

- **What:** official documentation page (living reference, updated per model release)
- **Publisher:** Anthropic, Claude Platform docs
- **Date:** accessed 2026-11-14 (covers models up to Claude Fable 5.2 / Mythos 5.2, Opus 5.5, Sonnet 5.5, Haiku 5.5)
- **Original:** [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

## Summary

The page is Anthropic's single reference for prompting Claude. It opens with a per-model table (each recent model has its own prompting page describing behavioural deltas), then general techniques, output/formatting control, tool use, thinking, agentic systems and migration notes. Its stance is that newer models follow instructions literally and are more proactive, so many tricks from older generations (shouting "CRITICAL", prefill, hand-written step-by-step reasoning) should be removed or softened.

## Key claims

- Be clear and direct; treat the model like a brilliant new employee with no context. Test: would a colleague with minimal context be able to follow the prompt?
- Explain the *reason* behind an instruction (e.g. "this will be read by a text-to-speech engine"); the model generalises from the motivation.
- Examples are among the most reliable steering tools. Make them relevant, diverse and wrapped in `<example>` / `<examples>` tags; 3–5 examples recommended.
- XML tags (`<instructions>`, `<context>`, `<input>`, nested `<document index="n">`) reduce misinterpretation when prompts mix content types. Use consistent tag names.
- A role in the `system` parameter focuses behaviour and tone; even one sentence helps.
- Long context (20k+ tokens): put documents at the top and the query at the end; queries at the end improved quality by up to 30% in Anthropic's tests. Ask the model to extract relevant quotes first.
- Say what to do rather than what not to do; matching the prompt's own style (e.g. less markdown) shifts output style.
- Prefilling the last assistant turn is unsupported from Claude 4.6 models (and Claude Mythos Preview) onward (400 error). Replacements: structured outputs, tool enums for classification, explicit "no preamble" instructions, moving continuations into the user turn.
- Claude 4.6+ uses adaptive thinking (`thinking: {type: "adaptive"}`) controlled by `effort`; `budget_tokens` returns 400 on Claude 4.7+. Several newest models always think.
- General instructions ("think thoroughly") often beat hand-written step plans; multishot examples shape the model's thinking. Manual CoT (reason, then `<answer>` tags) is a fallback when thinking is off; on the newest models a prompt asking for visible reasoning in `<thinking>` tags may be declined.
- Self-check instructions catch errors, except on models (Opus 5) that already verify and then over-verify.
- Prompt chaining is still useful to inspect intermediate outputs or enforce a pipeline; the common pattern is draft → review against criteria → refine, each a separate call.
- Newer models are more responsive to the system prompt; aggressive language written for older models causes over-triggering (the page names Claude Opus 4.5 and Opus 4.6 here).
- Keep history append-only; editing earlier messages or rebuilding `system` invalidates later thinking blocks on some models. Use mid-conversation system messages instead.

## Feeds

[Prompt engineering](../concepts/prompt-engineering.md) · [Few-shot prompting](../concepts/few-shot-prompting.md) · [Chain-of-thought](../concepts/chain-of-thought.md) · [System prompts](../concepts/system-prompts.md)

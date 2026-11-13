---
title: "Source: OpenAI Computer Use Guide"
summary: "OpenAI API guide to computer use in the Responses API: the computer tool loop, code-execution harnesses over Playwright, browser toolsets and safety practices."
category: source
lastmod: 2026-11-14
tags: ["models", "computer-use", "openai"]
---

- **What:** official API documentation (Computer use guide)
- **Author/publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Computer use](https://developers.openai.com/api/docs/guides/tools-computer-use)

## Summary

Three integration paths: the built-in `computer` tool (structured mouse/keyboard actions), a code-execution tool where the model writes Playwright or PyAutoGUI code, and browser function tools. SDK helpers run the loop.

## Key claims

- Models named (as of 2026-11): `gpt-6-astra` and `gpt-6.1-sol`; for GPT-6 Astra the guide recommends the code-execution path.
- Loop: request with `tools: [{type: "computer"}]`; response holds a `computer_call` with an ordered `actions` array (click, double_click, drag, move, scroll, keypress, type, wait, screenshot); you execute and reply with `computer_call_output` containing a screenshot; continue with `previous_response_id`.
- `status: "completed"` means the model finished generating the call, not that you executed it.
- Pending safety checks stop the sample loop; add a human approval callback to handle them.
- Practices: isolated browser/VM with fresh profile and restricted network; treat page content as untrusted; keep credentials out of page text and screenshots; require approval for purchases or data submission; set step, time and cost limits; verify actual outcomes instead of trusting the final answer; always release sessions.
- Alternatives: custom function tools or MCP for known UI operations; hosted browsers (Browserbase, Browser Use, E2B and others); web search when no interaction is needed.

## Feeds

[Computer-use agents](../concepts/computer-use-agents.md)

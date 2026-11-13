---
title: "Source: Amazon Bedrock — Agents (Classic)"
summary: "The original configuration-driven Bedrock Agents, now closed to new sign-ups and in maintenance mode in favour of AgentCore."
category: source
lastmod: 2026-11-14
tags: ["platforms", "aws", "agents"]
---

- **What:** vendor documentation
- **Author:** Amazon Web Services
- **Date:** undated, read 2026-11-14
- **Original:** [Automate tasks in your application using AI agents](https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html)

## Summary

Describes the classic managed agent: action groups, knowledge bases, prompt templates, versions and aliases. Carries a banner saying new sign-ups are closed.

## Key claims

- New customers can no longer sign up for Bedrock Agents (now "Agents Classic"); existing users can continue. AWS points to AgentCore and the Strands Agents SDK instead.
- An agent needs at least one action group (APIs it can call) or an associated knowledge base.
- Prompt templates for pre-processing, orchestration, KB response generation and post-processing can be customized.
- Test through the `TSTALIASID` alias; traces show each orchestration step; deploy by pointing an alias at a version.

## Feeds

[Amazon Bedrock](../concepts/amazon-bedrock.md)

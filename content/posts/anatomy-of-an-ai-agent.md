---
title: "The Anatomy of a Modern AI Agent"
date: 2026-11-13
author: Loic
tags: ["ai", "agents", "llm", "mcp"]
summary: "Strip away the hype and an AI agent is a loop, some tools, and a lot of careful context management. Here's how the pieces fit together and where the real engineering lives."
draft: false
---

"Agent" is one of the most overloaded words in tech right now. Chatbots, workflow builders and coding assistants are all called agents. Under the marketing, though, the systems that actually work share a small, surprisingly simple core. Almost all of the interesting engineering happens *around* that core.

This post is my attempt to map it out: what an agent is, the pieces it's made from, and the problems that separate a demo from something you'd trust with real work.

## An agent is a loop

The simplest useful definition: **an agent is a language model running in a loop, choosing actions and seeing their results until the task is done.**

```python
def run_agent(task: str, tools: dict, model) -> str:
    messages = [{"role": "user", "content": task}]

    while True:
        response = model.generate(messages, tools=list(tools.values()))
        messages.append(response.as_message())

        if not response.tool_calls:          # model decided it's done
            return response.text

        for call in response.tool_calls:      # execute what it asked for
            result = tools[call.name].run(**call.arguments)
            messages.append(tool_result(call.id, result))
```

That's it. No planner module and no hard-coded state machine. The model decides what to do next, the harness carries it out, and the result goes back into the conversation. Every serious agent system has this loop at its centre.

The loop isn't the hard part. The hard part is everything that decides whether the model makes *good* choices inside it.

## 1. Tools: how the agent touches the world

A model on its own can only produce text. Tools turn that text into actions: reading files, running commands, querying databases, calling APIs.

Two lessons keep coming up:

- **Tool design is interface design.** The model only knows a tool through its name, description and parameter schema. Vague descriptions get vague usage. A good tool reads like a well-written function signature with a docstring a new colleague could follow.
- **Fewer, sharper tools beat many overlapping ones.** If two tools could plausibly do the same job, the model will sometimes pick the wrong one. Consolidate.

### MCP: a standard plug for tools

For a long time every agent framework had its own way to define tools, so every integration was rebuilt for every framework. The **Model Context Protocol (MCP)** fixes this with an open standard. A service exposes its tools, resources and prompts once, as an MCP server, and any MCP-compatible agent can use them.

It's the same move USB made for hardware: agree on the plug, and the ecosystem builds itself. In practice, connecting an agent to your issue tracker, docs or database is now often a matter of configuration rather than custom code.

## 2. Context: the agent's working memory

Everything the agent knows at a given step is in its **context window**: the system prompt, the tool definitions, the conversation so far and every tool result. That window is finite. More importantly, models get worse at using information as the window fills with noise.

This has given rise to what people now call **context engineering**, the discipline of deciding what goes into the window and when:

- **Load on demand, don't pre-load.** Instead of stuffing every document into the prompt, give the agent tools to search and read, and let it pull in what it needs. This is how coding agents work across codebases far larger than any context window.
- **Keep tool output lean.** A tool that returns 50,000 lines of logs burns context. Return summaries, paginate and truncate sensibly.
- **Compact long sessions.** When a long-running task nears the limit, summarise the history and carry on from the summary, keeping decisions and open threads and dropping the raw transcripts.
- **Write things down.** Agents that keep notes in files (plans, progress logs, to-do lists) can recover their state after a reset, much as a person picks up their notebook the next morning.

If I had to name the single skill that most separates good agent builders from struggling ones, it would be this one.

## 3. Subagents: divide and delegate

A single loop with one growing context eventually hits a ceiling. The current answer is **delegation**: a main agent hands focused sub-tasks to subagents, each with a fresh context window.

```text
            ┌──────────────┐
            │  Main agent  │  ← holds the goal and the plan
            └──────┬───────┘
      ┌────────────┼────────────┐
      ▼            ▼            ▼
 ┌─────────┐ ┌──────────┐ ┌──────────┐
 │ Search  │ │ Implement│ │  Review  │  ← each starts clean,
 │ subagent│ │ subagent │ │ subagent │    returns only a summary
 └─────────┘ └──────────┘ └──────────┘
```

The benefit isn't just doing work in parallel. Each subagent can read hundreds of files and send back three paragraphs, so the main agent's context stays clean. The cost is real too: every handoff is lossy, and subagents burn tokens. Delegation pays off when sub-tasks are genuinely independent. Otherwise it adds overhead.

## 4. Verification: closing the loop on quality

Models are confident, which is not the same as correct. The agents that work well have ways to **check their own work against reality**:

- Coding agents run the tests, the type checker and the linter, and read the errors.
- Browser agents take screenshots and look at what actually rendered.
- Research agents cite sources and re-read them.

The pattern is the same everywhere: **give the agent a feedback signal that doesn't come from the model itself.** An agent that can run the tests will fix its own bugs. An agent that can't will ship them confidently.

The same idea applies one level up, to *you* as the builder. You need **evals**: a set of realistic tasks with checkable outcomes, run every time you change a prompt, tool or model. Without them, every change is a guess.

## 5. Guardrails: autonomy with boundaries

The more an agent can do, the more it matters what it's *allowed* to do. Production agents typically layer:

- **Sandboxing:** run code in isolated environments (containers, microVMs) so mistakes stay contained.
- **Permissions:** read-only actions run freely, while writes, deletions and anything public-facing need approval or explicit policy.
- **Treating inputs as data:** web pages, emails and tool results can contain text that *looks* like instructions. An agent that obeys whatever it reads is vulnerable to prompt injection. Content the agent fetches should inform it, never command it.

Getting these boundaries right is what lets you raise autonomy over time instead of babysitting every step.

## Putting it together

A modern agent, then, is:

| Layer         | Question it answers                          |
|---------------|----------------------------------------------|
| The loop      | What should I do next?                       |
| Tools / MCP   | What can I act on?                           |
| Context       | What do I know right now, and what can I drop? |
| Subagents     | What can I hand off?                         |
| Verification  | How do I know it worked?                     |
| Guardrails    | What am I allowed to do?                     |

The model keeps getting better, and every improvement makes the loop more capable for free. But the gap between an impressive demo and a reliable system is almost entirely in the other five rows. That's where I plan to spend my time, and where future posts on this blog will dig in.

*If you're building agents too, I'd love to hear what's working for you and what isn't. Find me on [GitHub](https://github.com/coolloic).*

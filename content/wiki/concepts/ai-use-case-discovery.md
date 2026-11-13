---
title: "AI Use-Case Discovery"
summary: "How to find, qualify, scope and prioritise LLM use cases in an organisation: where to look, fit tests for LLMs and agents, impact/effort scoring, success metrics and build-vs-buy."
category: concept
sources:
  - ../sources/openai-identifying-scaling-ai-use-cases.md
  - ../sources/openai-practical-guide-building-agents.md
  - ../sources/openai-ai-in-the-enterprise.md
  - ../sources/applied-llms-year-of-building.md
  - ../sources/mit-nanda-genai-divide-2025.md
  - ../sources/anthropic-define-success-criteria-and-evals.md
  - ../sources/anthropic-building-effective-agents.md
  - ../sources/gartner-agentic-ai-cancellation-2025.md
  - ../sources/pragmatic-engineer-forward-deployed-engineers.md
  - ../sources/anthropic-demystifying-evals-for-ai-agents.md
lastmod: 2026-11-14
tags: ["fde", "use-cases", "enterprise", "strategy"]
---

**AI use-case discovery** is the front end of an enterprise LLM engagement. You find the workflows where a language model can create measurable value, test whether an LLM (or an agent) is the right tool for each, define success in measurable terms, and rank the candidates by value and effort. The output is a scoped problem with an agreed metric and a small eval set, ready for a [proof of concept](poc-to-production.md). It is the first phase of the [forward deployed engineer's](forward-deployed-engineering.md) work. OpenAI's FDEs map processes onsite, prototype and prioritise, then validate the scope with evals before they build ([Pragmatic Engineer](../sources/pragmatic-engineer-forward-deployed-engineers.md)).

## Why it matters

Synthesis: many failed AI projects fail at the selection stage rather than because of the model. Gartner forecasts that over 40% of agentic AI projects will be canceled by end of 2027 because of cost, unclear value and weak risk controls, and advises pursuing agents only where value is clear ([Gartner 2025](../sources/gartner-agentic-ai-cancellation-2025.md)). MIT NANDA found that over half of GenAI budgets go to sales and marketing, while the largest returns come from back-office automation. Startups that target one pain point do well ([MIT NANDA](../sources/mit-nanda-genai-divide-2025.md)).

## Step 1: where to look

OpenAI's guide, drawn from 300 implementations and 600+ use cases, points to three kinds of friction ([OpenAI, use cases](../sources/openai-identifying-scaling-ai-use-cases.md)):

- **Repetitive, low-value tasks**, such as summarising, report generation and answering the same questions. Ask people for their "anti-to-do list".
- **Skill bottlenecks**, where work waits for another team's expertise (data analysis, code, design).
- **Navigating ambiguity**, where people get stuck starting open-ended work.

It then classifies use cases into six **primitives**: content creation, research, coding, data analysis, ideation/strategy and automation. The advanced step is **workflow mapping**: break a department's multi-step workflow into tasks and map each task to a primitive.

Discovery techniques in the sources include onsite process mapping ([Pragmatic Engineer](../sources/pragmatic-engineer-forward-deployed-engineers.md)), workshops and hackathons, and expert-led bottom-up discovery. BBVA rolled out ChatGPT Enterprise and its employees built 2,900+ custom GPTs in five months ([OpenAI, Enterprise](../sources/openai-ai-in-the-enterprise.md)).

## Step 2: does it actually need an LLM, or an agent?

Apply fit tests before scoring. Start with the simplest solution. Optimised single LLM calls with retrieval and examples are often enough ([Anthropic, effective agents](../sources/anthropic-building-effective-agents.md)). OpenAI says agents fit workflows that have resisted deterministic automation ([OpenAI, agents guide](../sources/openai-practical-guide-building-agents.md)):

| Signal | Example | Implication |
|---|---|---|
| Complex judgement with exceptions | Refund approval | Agent candidate |
| Rules that are hard to maintain | Vendor security review | Agent candidate |
| Heavy unstructured data | Insurance claim processing | LLM / [document processing](document-processing.md) |
| Clear, stable rules on structured data | Threshold-based alerts | Deterministic code; no LLM |

Synthesis: add four questions that sink projects later. **Data access**: can the system legally and technically reach the inputs? **Error tolerance**: what does a wrong answer cost, and who catches it? See [hallucination](hallucination.md). **Ground truth**: can experts agree on a correct output? Eval tasks must be unambiguous enough that two experts reach the same verdict ([Anthropic, demystifying evals](../sources/anthropic-demystifying-evals-for-ai-agents.md)). **Volume x value**: is the task frequent or costly enough to matter?

## Step 3: prioritise

OpenAI's customer teams use an **impact/effort** quadrant ([OpenAI, use cases](../sources/openai-identifying-scaling-ai-use-cases.md)):

| | **Low effort** | **High effort** |
|---|---|---|
| **High value** | High ROI focus | Scope and prioritize |
| **Low value** | Self-service | Deprioritize |

- **High ROI focus** (high value, low effort): start here to build momentum.
- **Scope and prioritize** (high value, high effort): often transformational. Indeed's job-match explanations took months of iteration and lifted applications started by 20%.
- **Self-service**: individual assistants.
- **Deprioritize**: for example, rebuilding something an existing tool already does.

Re-score each quarter, because model progress turns high-effort ideas into low-effort ones. The guide also stresses leadership sponsorship and starting with quick wins rather than impressive complex cases.

## Step 4: define success

Success criteria should be **specific, measurable, achievable and relevant**, and usually multidimensional: task fidelity, consistency, tone, privacy, latency and price ([Anthropic, define success](../sources/anthropic-define-success-criteria-and-evals.md)). Synthesis: separate three layers of metric and agree all three with the customer up front.

| Layer | Examples | Measured by |
|---|---|---|
| Model / task quality | Accuracy vs expert labels, groundedness, refusal rate | Offline [evals](llm-evaluation.md), [LLM-as-judge](llm-as-judge.md) |
| Operational | p95 latency, cost per task, escalation rate, uptime | [Observability](llm-observability.md) |
| Business outcome | Handle time, conversion, hours saved, error cost avoided | A/B tests, before/after baselines |

The sources give examples of business-outcome metrics. Morgan Stanley gated every use case on evals against expert advisors. Indeed measured applications started (+20%) and downstream success, meaning employers were more likely to hire (+13%), against its previous matching engine. Klarna measured resolution time (11 down to 2 minutes) at parity on satisfaction ([OpenAI, Enterprise](../sources/openai-ai-in-the-enterprise.md)). Capture the **pre-AI baseline** during discovery. Without it no business metric can be proven later.

## Step 5: build vs buy

| Option | When | Source |
|---|---|---|
| Buy a vertical product / partner | Generic need (documentation chatbot, basic [text-to-SQL](text-to-sql.md)); speed matters | [Applied LLMs](../sources/applied-llms-year-of-building.md); vendor partnerships succeed about 67% of the time vs about a third as often for internal builds ([MIT NANDA](../sources/mit-nanda-genai-divide-2025.md)) |
| Build on hosted model APIs | Proprietary workflow or data is the differentiator | Start with inference APIs and self-host later for privacy, control or cost ([Applied LLMs](../sources/applied-llms-year-of-building.md)) |
| [Fine-tune](fine-tuning.md) | Prompting and [RAG](retrieval-augmented-generation.md) proven insufficient; cost at scale | Indeed's fine-tuned smaller model used 60% fewer tokens ([OpenAI, Enterprise](../sources/openai-ai-in-the-enterprise.md)) |
| Train from scratch | Almost never | "No GPUs before PMF" ([Applied LLMs](../sources/applied-llms-year-of-building.md)) |

Caveat: the MIT NANDA buy-vs-build figure comes from a small preliminary study (its methods note lists interviews with 52 organisations and 153 leader survey responses). Treat it as directional.

## Failure modes in discovery

- **Solution-first scoping**: "we need an agent" before naming the workflow and metric (Gartner's "agent washing" is the vendor-side mirror) ([Gartner](../sources/gartner-agentic-ai-cancellation-2025.md)).
- **Choosing the impressive case over the valuable one.** OpenAI warns that complex use cases often slow organisations down ([OpenAI, use cases](../sources/openai-identifying-scaling-ai-use-cases.md)).
- **Visible over valuable.** Budgets flow to front-office demos while the ROI is in the back office ([MIT NANDA](../sources/mit-nanda-genai-divide-2025.md)).
- **No domain expert in the loop.** Estée Lauder pairs a business user, a subject-matter expert and a tech lead on every use case ([OpenAI, use cases](../sources/openai-identifying-scaling-ai-use-cases.md)).
- **Unmeasurable success**: no baseline, no eval set, no agreed threshold.

## Deliverable checklist

Synthesis: a discovery phase should end with a one-to-two-page brief (Estée Lauder uses a two-page brief) containing:

1. The workflow, its users, its volume and the current baseline.
2. The task the LLM performs and what stays human.
3. Data sources, access path and sensitivity.
4. Success metrics at all three layers, with go/no-go thresholds.
5. An initial eval set. Anthropic suggests starting agent evals with 20-50 tasks drawn from real cases ([Anthropic, demystifying evals](../sources/anthropic-demystifying-evals-for-ai-agents.md); see [verification and evals](verification-and-evals.md)).
6. Risks, guardrails and the escalation path.
7. Build/buy decision, time-box and an owner.

## Sources

- [Identifying and Scaling AI Use Cases (OpenAI)](../sources/openai-identifying-scaling-ai-use-cases.md)
- [A Practical Guide to Building Agents (OpenAI)](../sources/openai-practical-guide-building-agents.md)
- [AI in the Enterprise (OpenAI)](../sources/openai-ai-in-the-enterprise.md)
- [What We Learned from a Year of Building with LLMs](../sources/applied-llms-year-of-building.md)
- [The GenAI Divide (MIT NANDA)](../sources/mit-nanda-genai-divide-2025.md)
- [Define success criteria and build evaluations (Anthropic)](../sources/anthropic-define-success-criteria-and-evals.md)
- [Building effective agents (Anthropic)](../sources/anthropic-building-effective-agents.md)
- [Gartner: 40%+ of agentic AI projects canceled by 2027](../sources/gartner-agentic-ai-cancellation-2025.md)
- [Forward Deployed Engineers (The Pragmatic Engineer)](../sources/pragmatic-engineer-forward-deployed-engineers.md)
- [Demystifying evals for AI agents (Anthropic)](../sources/anthropic-demystifying-evals-for-ai-agents.md)

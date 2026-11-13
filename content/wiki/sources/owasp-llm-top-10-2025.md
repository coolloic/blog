---
title: "Source: OWASP Top 10 for LLM Applications 2025 (risk pages)"
summary: "The OWASP GenAI Security Project's 2025 list of the ten most critical LLM application risks, with per-risk definitions, mitigations and attack scenarios."
category: source
lastmod: 2026-11-14
tags: ["security", "owasp", "standards"]
---

- **What:** community security standard, published as one web page per risk
- **Publisher:** OWASP GenAI Security Project
- **Date:** 2025 edition; risk pages read 2026-11-14
- **Original:** [LLM01 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/), [LLM02 Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/), [LLM03 Supply Chain](https://genai.owasp.org/llmrisk/llm032025-supply-chain/), [LLM06 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/), [LLM07 System Prompt Leakage](https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/)

## Summary

The 2025 list ranks: LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure, LLM03 Supply Chain, LLM04 Data and Model Poisoning, LLM05 Improper Output Handling, LLM06 Excessive Agency, LLM07 System Prompt Leakage, LLM08 Vector and Embedding Weaknesses, LLM09 Misinformation, LLM10 Unbounded Consumption. Each risk page gives a definition, common examples, mitigations and attack scenarios. It was superseded by the 2026 edition in August 2026 (see [OWASP 2026](owasp-llm-top-10-2026.md)), but the per-risk guidance remains the most detailed public text.

## Key claims

- **LLM01 Prompt Injection.** Input alters model behaviour in unintended ways, possibly invisibly to humans. Direct (user prompt) vs indirect (external content such as web pages or files). RAG and fine-tuning do not fully prevent it. Jailbreaking is described as a form of prompt injection aimed at disabling safety protocols. No foolproof prevention is known; mitigations are: constrain behaviour in the system prompt, validate output formats deterministically, filter inputs and outputs (including the "RAG triad"), least privilege with the app holding its own tokens, human approval for high-risk actions, segregate and label untrusted content, adversarial testing. Scenarios include image-link exfiltration, payload splitting across a resume, multimodal injection, adversarial suffixes, and Base64/multilingual obfuscation; CVE-2024-5184 (an LLM email assistant) is cited.
- **LLM02 Sensitive Information Disclosure.** PII, financial/health data, credentials, business data and model internals can leak via output. Mitigations: sanitise data before training, least-privilege data access, differential privacy and federated learning, user education and opt-outs, hiding system configuration, tokenisation/redaction. System-prompt restrictions alone can be bypassed via injection.
- **LLM03 Supply Chain.** Risks span third-party packages, licences, outdated models, backdoored pre-trained models, weak provenance, malicious LoRA adapters, model merge/conversion services, on-device models, and provider terms that allow training on app data. Scenarios: PoisonGPT, the Shadow Ray attack on Ray, a counterfeit WizardLM, malware injected via a format-conversion service. Mitigations: vet suppliers, SBOM / AI-BOM, signatures and hashes, red-team third-party models on your own use case, anomaly detection.
- **LLM06 Excessive Agency.** Damaging actions follow from unexpected, ambiguous or manipulated outputs. Three root causes: excessive functionality, excessive permissions, excessive autonomy. Mitigations: minimise extensions and their functions, avoid open-ended tools (e.g. arbitrary shell), act in the user's security context with minimal OAuth scopes, human approval, enforce authorisation downstream rather than in the LLM, log and rate-limit.
- **LLM07 System Prompt Leakage.** The system prompt is neither a secret nor a security control. The real risk is storing credentials or delegating authorisation to the LLM. Keep secrets out of prompts and enforce privilege separation outside the model.

## Feeds

[LLM security risks](../concepts/llm-security-risks.md) · [Prompt injection](../concepts/prompt-injection.md) · [Jailbreaks](../concepts/jailbreaks.md)

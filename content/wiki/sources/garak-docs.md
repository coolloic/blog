---
title: "Source: garak, the LLM vulnerability scanner (NVIDIA)"
summary: "NVIDIA's open-source scanner that runs probe-and-detector plugins against an LLM endpoint and reports per-detector failure rates; v0.17.1 as of October 2026."
category: source
lastmod: 2026-11-14
tags: ["security", "red-teaming", "tools"]
---

- **What:** open-source tool, GitHub README and release notes
- **Publisher:** NVIDIA (project started by Leon Derczynski, 2023); Apache-2.0
- **Date:** latest release v0.17.1, 2026-10-16; accessed 2026-11-14
- **Original:** [github.com/NVIDIA/garak](https://github.com/NVIDIA/garak) · [releases](https://github.com/NVIDIA/garak/releases)

## Summary

garak ("Generative AI Red-teaming & Assessment Kit") is a scanner for LLMs, pitched as the LLM equivalent of nmap or Metasploit. It fires batteries of known attack prompts at a target and scores the replies with automatic detectors, which makes it a breadth-first, regression-style tool rather than an adaptive attacker.

## Key claims

- Plugin architecture with a base class per type: **probes** (generate the attack interactions, e.g. `dan`, `encoding`, `promptinject`, `snowball`), **detectors** (decide whether an output shows the failure), **generators** (the target model adapter), **harnesses** (orchestrate; default `probewise` runs each probe with its `primary_detector` and `extended_detectors`), **evaluators** (reporting). Release notes also mention **buffs** (input transformations) and **intents**.
- Generators include Hugging Face (local and hosted), OpenAI, Replicate, Cohere, Groq, NIM, AWS Bedrock, LiteLLM, GGUF/llama.cpp, a native Anthropic generator (v0.16.0), Ollama, and a generic YAML-configured REST generator for any JSON/plaintext endpoint.
- CLI: `python -m garak --target_type openai --target_name <model> --spec probes.encoding`; `--list_probes`, `--list_detectors`, `--list_generators`. With no spec it runs all probes with their recommended detectors.
- Each prompt is sent several times and the console prints a FAIL rate per detector. The README says 10 generations by default, but the shipped `garak/resources/garak.core.yaml` sets `run.generations: 5` (checked 2026-11-14); override with `--generations`.
- Output: a per-run `report.jsonl` (every attempt with a status), a hit log of successful attacks, and `garak.log`; `analyse_log.py` ranks the probes and prompts with the most hits.
- v0.16.0 (2026-08-04): technique/intent annotation, an initial IntentProbe, a simple adaptive-attacks probe, and a unified spec syntax for probes/buffs/intents (breaking change to report and config formats).
- v0.17.0 (2026-09-09): EU AI Act risk-category mapping for probe results; Python 3.10 dropped.
- v0.17.1 (2026-10-16): hit@k attack-success-rate metric in the terminal and report digest.

## Feeds

[LLM red teaming](../concepts/llm-red-teaming.md)

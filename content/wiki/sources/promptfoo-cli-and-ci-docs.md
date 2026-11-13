---
title: "Source: Promptfoo docs: CLI, configuration guide, CI/CD and GitHub Action"
summary: "Promptfoo reference for promptfooconfig.yaml structure, eval CLI flags, exit codes and pass-rate thresholds, caching, and running evals and red teams in CI."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "promptfoo"]
---

- **What:** official tool documentation and repository README
- **Publisher:** Promptfoo (now part of OpenAI, per its README)
- **Date:** accessed 2026-11-14
- **Original:** [Intro](https://www.promptfoo.dev/docs/intro/), [Configuration guide](https://www.promptfoo.dev/docs/configuration/guide/), [Command line](https://www.promptfoo.dev/docs/usage/command-line/), [CI/CD](https://www.promptfoo.dev/docs/integrations/ci-cd/), [GitHub Action](https://www.promptfoo.dev/docs/integrations/github-action/), [GitHub repo](https://github.com/promptfoo/promptfoo)

## Summary

Promptfoo is an open-source (MIT) CLI and library for evaluating and red-teaming LLM apps. It runs locally, calling model providers directly, and reads a declarative YAML config. The CLI exits non-zero when tests fail, which is how it gates CI; a GitHub Action posts before/after comparisons on pull requests that touch prompt files.

## Key claims

- Positioning: evals of prompts, models and RAG pipelines, plus red teaming; caching, concurrency and live reload; matrix views, a web viewer and sharing. Evals run on the user's machine and talk directly to the LLM.
- Repository (accessed 2026-11-14): MIT licensed, about 27k GitHub stars; README states Promptfoo is now part of OpenAI and remains open source. Install via `npx promptfoo@latest`, `npm install -g promptfoo`, `brew install promptfoo` or `pip install promptfoo`. The GitHub Action needs Node.js 22.22.0+.
- Config keys: `prompts` (inline or `file://`), `providers` (`id`, `label`, `config` such as temperature), `tests` (inline, globs, CSV, JSONL, YAML/JSON, JS/TS), `defaultTest` (shared `assert`, `vars`, `threshold`, `options`), `assertionTemplates` reused via `$ref`. Multiple `-c` configs can be combined.
- Vars can come from files or scripts (JS function or Python `get_var`); Nunjucks templating in prompts and vars.
- Transforms: provider `transformResponse`, test `options.transform` (before assertions), `options.transformVars`, `contextTransform` for RAG assertions. `defaultTest.options.provider` sets the grading (judge) model separately from the models under test.
- `promptfoo eval` flags: `--repeat N`, `-j/--max-concurrency`, `--delay`, `--filter-failing <path|evalId>`, `--filter-pattern`, `--no-cache`, `-o` (csv/json/yaml/html/junit.xml), `--share/--no-share`, `--grader`, `-w/--watch`, `--table`. `promptfoo retry <evalId>` re-runs only ERROR results.
- Exit code 100 when any test fails or the pass rate is below `PROMPTFOO_PASS_RATE_THRESHOLD` (percentage, default 100); exit 1 for other errors; `PROMPTFOO_FAILED_TEST_EXIT_CODE` overrides 100.
- Disk cache of LLM requests/outputs (`PROMPTFOO_CACHE_PATH`, `PROMPTFOO_CACHE_TTL`) can be persisted between CI runs to cut cost and time.
- CI privacy knobs: `PROMPTFOO_STRIP_RESPONSE_OUTPUT`, `PROMPTFOO_STRIP_TEST_VARS`; `--tag key=value` attaches pipeline metadata.
- `promptfoo/promptfoo-action@v1`: triggered by `pull_request` with a path filter on prompt files; inputs `github-token`, `prompts` (globs), `config`, optional `openai-api-key` and `cache-path`; posts a PR comment linking to a viewer that compares before and after.
- Red teaming in CI: scheduled jobs run `redteam generate` with chosen plugins and strategies, then `redteam run`.

## Feeds

[promptfoo](../concepts/promptfoo.md) · [Prompt management](../concepts/prompt-management.md)

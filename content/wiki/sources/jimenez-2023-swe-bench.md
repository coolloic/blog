---
title: "Source: SWE-bench: Can Language Models Resolve Real-World GitHub Issues? (Jimenez et al., 2023)"
summary: "The SWE-bench paper: 2,294 real GitHub issues from 12 Python repos, graded by running the repo's tests."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "agents"]
---

- **What:** research paper, arXiv:2310.06770 (ICLR 2024)
- **Authors:** Carlos E. Jimenez, John Yang, Alexander Wettig, Shunyu Yao, Kexin Pei, Ofir Press, Karthik Narasimhan
- **Date:** 10 October 2023 (v3 11 November 2024)
- **Original:** [arxiv.org/abs/2310.06770](https://arxiv.org/abs/2310.06770)

## Summary

Each task gives a model a real repository snapshot and an issue description; the model must edit the code so that the issue is resolved, which is checked by executing tests from the pull request that originally fixed it.

## Key claims

- 2,294 task instances drawn from 12 popular Python repositories.
- Tasks require coordinating changes across functions, classes and files and interacting with an execution environment.
- At release the best model, Claude 2, resolved 1.96% of issues.

## Feeds

[Benchmarks](../concepts/benchmarks.md)

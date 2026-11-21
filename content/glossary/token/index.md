---
title: "词元（Token）"
english: "Token"
aliases_zh: ["Token", "词元"]
group: "tech"
wiki: "tokenization"
weight: 22
summary: "AI 读写文字的最小单位，常用来计算使用量和费用。"
---
AI 不是按"字"来读文字的，而是先把文字切成一个个小片段，这些片段就是 Token。中文里一个 Token 大约是一两个字，英文里大约是半个到一个单词。

很多 AI 服务按 Token 收费，上下文窗口的长度也用 Token 来算。

## 举个例子

同样一篇文章，用 AI 翻译时显示"消耗了几千个 Token"，指的就是它读进去和写出来的片段数量。

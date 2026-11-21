---
title: "检索增强生成"
english: "Retrieval-Augmented Generation (RAG)"
aliases_zh: ["RAG"]
group: "tech"
wiki: "retrieval-augmented-generation"
weight: 18
summary: "先去资料库里查到相关内容，再让 AI 根据查到的内容回答，以减少胡编。"
---
大模型的知识停留在训练的时候，也不知道你公司内部的资料。RAG 的做法是：先根据问题去搜索相关文档，把找到的段落交给 AI，让它"开卷答题"。

这样回答能引用出处、内容更新，也更少出现幻觉，但前提是资料库本身是对的。

## 举个例子

公司的 AI 客服回答"退货运费谁出"时，先去查公司最新的售后政策，再照着政策回答，而不是凭印象说。

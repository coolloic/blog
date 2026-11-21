---
title: "模型上下文协议"
english: "Model Context Protocol (MCP)"
aliases_zh: ["MCP"]
group: "tech"
wiki: "model-context-protocol"
weight: 7
summary: "让 AI 连接外部工具和数据的统一\"插口\"标准，常被比作 AI 的 USB 接口。"
---
过去每个 AI 应用要接一个新工具（日历、数据库、网盘），都得单独写一套对接代码。MCP 规定了一种通用的连接方式：工具按这个标准做一个"插头"，支持 MCP 的 AI 就都能用。

它让 AI 更好用，也意味着要更小心地决定让 AI 能碰哪些数据。

## 举个例子

装好一个日历的 MCP 插件后，你对 AI 说"把下周二下午的会议挪到周三"，它就能直接去改你的日历。

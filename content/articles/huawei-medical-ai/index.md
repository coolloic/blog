---
title: "AI 当上「共同研究员」：华为医疗 AI 的真进展与真难题"
date: "2026-11-15T16:45:44+08:00"
summary: "斯坦福用多智能体「虚拟实验室」设计出有效纳米抗体，华为正把类似思路搬进实验室与医院：科研智能体、盘古药物模型、病理大模型、HAIP 医院 AI 平台。本文梳理进展，也追问证据、湿实验瓶颈与责任边界。"
categories:
  - "frontier"
tags:
  - "医疗"
  - "科研"
cover: "https://aitanyan.com/img/articles/huawei-medical-ai/cover.jpg"
wechat_url: "https://mp.weixin.qq.com/s/b46E5lhxc3OoAR1xYPZwhg"
wechat_id: "2650016408_1"
images:
  1.png:
    - 1080
    - 980
  2.png:
    - 1080
    - 1000
  3.png:
    - 1080
    - 820
  cover.jpg:
    - 1280
    - 544
  cover-site.jpg:
    - 1280
    - 544
  cover-poster.jpg:
    - 1280
    - 544
webp: true
draft: false
cover_video: "https://aitanyan.com/img/videos/huawei-medical-ai/cover-loop-5ecd9cbf.mp4"
video_vertical: "https://aitanyan.com/img/videos/huawei-medical-ai/vertical.mp4"
cover_wide: "https://aitanyan.com/img/articles/huawei-medical-ai/cover-poster.jpg"
---

> 导语：一群 AI 智能体开组会、分工、互相挑刺，最后设计出能在湿实验中起作用的纳米抗体——这已经不是科幻。斯坦福的 Virtual Lab 证明了「虚拟实验室」可行，而在国内，华为正把类似的思路搬进实验室和医院。本文梳理事实、拆解技术，也聊聊那些宣传稿里不太提的问题。

## 一、什么是「虚拟实验室」？先看斯坦福的样板

「虚拟实验室」这个说法近两年被用得很泛，但最有代表性的工作来自斯坦福 James Zou 团队与 CZ Biohub 的 John Pak。他们的 Virtual Lab 论文 2025 年 7 月发表在 *Nature* 上，核心设计非常像一个真实课题组：

- **PI 智能体**
  ：由人类研究者创建，负责组建团队、主持会议、拍板方向；
- **专家智能体**
  ：免疫学、计算生物学、机器学习等角色各司其职，会自己写代码、调用 AlphaFold、Rosetta 等蛋白质建模工具；
- **Scientific Critic（批评者）智能体**
  ：专门提尖锐问题、泼冷水。团队发现这个角色对减少幻觉很关键。

他们拿当时很现实的问题做测试：为不断变异的新冠病毒设计纳米抗体（Nanobody）。结果是 AI 团队提出了 92 个候选序列，Pak 的实验室实测后发现其中 2 个能同时结合新变体和原始毒株的刺突蛋白。整个设计只用了几天，人类在会议中的发言只占约 1%。

2026 年，这个思路被放大成 **Virtual Biotech**：用上万个智能体模拟一整家药企，下设靶点发现、安全性、药物形式选择、临床开发等部门，由一个「虚拟 CSO」统筹。团队用它做了一个针对 B7-H3 的抗体偶联药物（ADC）案例研究，前后不到一周。

但要注意两点，这也是全文的基调：

1. **AI 能提方案，但还不能自己做湿实验**
   ，候选分子最终都要回到真实实验室验证；
2. **92 选 2 本身说明了命中率**
   ——速度快、成本低，但筛选和验证依然是硬功夫。

![](https://aitanyan.com/img/articles/huawei-medical-ai/1.png)

## 二、华为的路径：不做「明星 AI 科学家」，做底座和场景

和斯坦福相比，华为的打法明显不同：它不太强调某一个「会思考的 AI 科学家」，而是把算力、平台和合作伙伴打包，铺到科研机构、药企和医院里。按环节拆开看会更清楚。

### 1\. 科研侧：纳米抗体科研智能体，几乎是 Virtual Lab 的中国版

11 月 2 日的大湾区科学论坛上，华为科研军团总裁孙鹏飞介绍，华为和广州实验室合作搭建了 AI4S「L4 智能实验平台」，其中的纳米抗体科研智能体把文献挖掘、方案生成、自动化干湿实验、反馈迭代串成闭环，科学家不写代码也能调用高端设备；据其介绍，部分抗体发现周期从半年缩短到以周计（据南方+报道）。

有意思的是，这和斯坦福选的是同一类问题（纳米抗体），但多走了一步：**把自动化湿实验接进了回路**。这恰恰是斯坦福团队自己说的下一步方向。不过目前公开的只有论坛发言，没有看到论文或对照数据，「半年到周级」也明确是「部分」项目。

此外，华为在 3 月升级了「智算实验室解决方案」，包含科研智能引擎 SAIE、AI4S 模块和科研可信空间，更偏向给实验室提供基础设施。

### 2\. 药物研发：盘古药物分子大模型与「生态」边界

华为云的盘古药物分子大模型由华为与中科院上海药物所联合训练，官方资料称用约 17 亿个已知药物分子做了预训练，并生成了 1 亿规模的新化合物库。最常被引用的案例是西安交大一附院刘冰教授团队的超级抗菌药 Drug X，华为方面的说法是先导药研发周期大幅缩短、成本降低约 70%。

今年 8 月，华为医疗卫生业务负责人 William Zhang（张伟力）对路透社表示，华为计划把与药企的 AI 合作从药物研发延伸到临床实践，目前合作方主要是国内药企。

这里有一个值得客观指出的细节：华为 5 月宣传的广药集团项目被称为「自主研发 AI 药物模型在昇腾/鲲鹏上的首次生产验证」，但据 The Next Web 等报道，相关模型来自北京的 AI 药物设计公司 StoneWise，华为主要提供芯片和平台适配。这不是问题本身，而是提醒读者：**看医疗 AI 新闻时，要分清谁做模型、谁做算力、谁做临床**。

### 3\. 临床侧：从病理「单点」到医院通用 AI 平台

这是华为投入最重、落地最实的部分：

- **RuiPath 病理大模型**
  （与瑞金医院联合）：基于约百万张数字病理切片训练，官方称覆盖了中国每年癌症新发人数约 90% 对应的癌种。背景是病理医生的巨大缺口——有行业数据称国内三甲医院病理医生每天要看 300 多张片子；
- **智慧医疗专区**
  ：2 月发布，6 月时已有瑞金、邯郸市中心医院、多家县级医院等 20 余家医院入驻，主打「三甲模型能力下沉到基层」；
- **HAIP 医院通用 AI 平台**
  ：10 月 30 日，华西医院与华为发布联合创新实验室、HAIP 白皮书（华西、南方医院与华为主编，40 家单位参编）和五类医疗智能体。华西披露，文书智能体已辅助生成 300 多万份病历；医保智能体用 8500 多条审核规则识别七类风险。华西也是首家部署昇腾 950 的医疗机构。

![](https://aitanyan.com/img/articles/huawei-medical-ai/2.png)

## 三、冷静看：亮点在哪，问题在哪

### 值得肯定的地方

**第一，平台化思路是对的。** 医院里 AI 项目「各科室各建一套」是普遍痛点，HAIP 想做的是统一算力、数据和模型，让应用在同一个底座上长出来。这和我们做软件时从「烟囱系统」走向「平台 + 微服务」是一回事。

**第二，华西对局限的坦诚值得点赞。** 在公开报道中，华西方面主动谈到了几类问题：基座模型频繁升级会冲击临床应用，所以要把专科模型与基座解耦；每次推理都要算力，所以优先用小模型、质控类任务错峰跑；知识库并不能消灭幻觉，来源和忠实度要持续校验；医生要同意使用、复核内容并承担责任，AI 生成内容要告知患者；跨院复用则受数据标准、流程和责任划分差异的掣肘。这些比任何「效率提升 X 倍」都更有参考价值。

**第三，问题选得实在。** 病理阅片、病历书写、医保合规——都是高频、规则相对清晰、人力缺口大的场景，比「AI 看病」更容易产生可衡量的价值。

### 需要追问的地方

**1\. 证据等级普遍偏低。** 目前大多数数字来自厂商发布会、合作医院介绍或媒体转述，缺少同行评审论文、前瞻性对照研究和第三方评估。「辅助生成 300 万份病历」说明用得多，不等于质量和安全性已被证明。斯坦福 Virtual Lab 之所以有说服力，是因为发表在 *Nature* 上，方法和湿实验结果都公开可查。

**2\. AI 制药整体仍在「验证期」。** 据 The Next Web 汇总的行业数据，全球约 600 亿美元投入了 AI 药物发现，但至今还没有一款 AI 发现的药物在任何地方获批上市；到今年 6 月有 179 个候选进入管线（2017 年只有 4 个），9 个进入三期。「先导化合物设计加快」与「新药上市」之间还隔着漫长的临床试验。

**3\. 「虚拟实验室」最大的瓶颈在物理世界。** 无论斯坦福还是广州实验室，真正的约束都是湿实验的通量、可重复性和成本。AI 把「想方案」从几个月压到几天之后，瓶颈就整体转移到「做实验」上了。谁能把自动化实验室和智能体闭环做稳，谁才有真正的护城河。

**4\. 国产算力是优势也是约束。** 从昇腾到鲲鹏的全栈方案在国内医院数据合规、供应链可控方面有吸引力；但模型生态、工具链成熟度和海外合作空间，与英伟达 + 礼来、诺和诺德这类组合相比仍有差距——华为高管在路透社采访中也没有回避这一点。

**5\. 责任与监管还在追赶。** 当智能体参与病历书写、医保审核、甚至科研决策，出错由谁负责？目前的做法是「医生复核并担责」，这在效率与安全之间是合理的折中，但也意味着 AI 的效率红利有上限。

![](https://aitanyan.com/img/articles/huawei-medical-ai/3.png)

## 四、给开发者的几点启示

如果你在做 Agent 系统，这两条线索里有不少可以直接借鉴的工程经验：

- **角色分工 + 批评者**
  ：单个大模型「自己想自己答」容易一路错下去，引入专职 Critic 是低成本的质量闸门；
- **人类在环，放在关键决策点**
  ：Virtual Lab 里人类发言只占 1%，但都卡在方向选择上；
- **工具和执行环境比提示词更重要**
  ：能调 AlphaFold、能跑代码、能下发实验，智能体才有真实产出；
- **基座解耦、小模型优先、错峰计算**
  ：华西的这些做法，对任何要把 LLM 放进生产系统的团队都适用；
- **可评估先于可演示**
  ：先把评估集和指标定下来，再谈规模化。

一个极简的「虚拟课题组」循环大致如下：

```
for round in range(N_ROUNDS):    agenda = pi.plan(goal, history)    proposals = [expert.propose(agenda, tools) for expert in experts]    critique = critic.review(proposals)    decision = pi.decide(proposals, critique)    if decision.needs_human:        decision = human.approve(decision)   # 关键节点人类拍板    results = lab.run(decision.experiments)   # 干实验 / 自动化湿实验    history.append((decision, results))
```

## 结语

AI 正在从「计算器」变成「共同研究员」，斯坦福给出了学术上的可行性证明，华为则在把它变成可规模部署的基础设施。两者都很重要，但都还没走完最后一公里：一边是湿实验验证，一边是临床证据和责任体系。对这个领域，最好的态度或许是——**对进展保持兴奋，对数字保持追问**。

你觉得医疗 AI 最先真正「跑通」的会是哪个场景？病理、病历、医保，还是药物研发？欢迎留言聊聊。

*注：本文仅讨论技术与产业进展，不构成任何医疗或投资建议。文中数据除特别说明外，均来自公开报道与企业发布信息。*

## 参考链接

- Biohub：Virtual Lab 介绍（Nature, 2025）https://biohub.org/news/with-no-need-for-sleep-or-food-ai-built-scientists-get-the-job-done-quickly/
- Stanford Daily：Virtual Lab 与 Virtual Biotech https://stanforddaily.com/2026/05/06/researchers-develop-ai-discovery/
- Stanford Daily：AI-powered biotech https://stanforddaily.com/2026/10/14/ai-powered-biotech-could-shave-years-off-of-drug-discovery/
- HPCwire：37,000 AI Agents Are Running a Virtual Biotech https://hpcwire.com/bigdatawire/2026/09/18/37000-ai-agents-are-running-a-virtual-biotech-at-stanford
- 南方+：华为、广州实验室等发布 AI4S 新成果 https://www.sfccn.com/2026/11-2/4OMDE0NzNfMjI5MDk4OA.html
- 华为：智算实验室解决方案升级 https://e.huawei.com/cn/news/2026/industries/government/intelligent-computing-lab-solution
- 华为云：盘古药物分子大模型 https://www.huaweicloud.com/cases/pgyw.html
- 新华网：华为云医药健康 AI 论坛 https://www.news.cn/info/20240812/8a1f0ecd2e2a4754831854bcf252155b/c.html
- The Star / Reuters：Huawei plans for more AI pharma tie-ups https://www.thestar.com.my/tech/tech-news/2026/08/27/huawei-plans-for-more-ai-pharma-tie-ups-says-healthcare-president
- The Next Web：Huawei plans more AI pharma partnerships https://thenextweb.com/news/huawei-ai-pharma-tie-ups-ascend-kunpeng
- 观察者网：病理医生缺口大，华为加速医疗 AI 下基层 https://www.guancha.cn/economy/2026\_02\_01\_805761.shtml
- 华为云：Agentic AI 新品与行业 AI 梦工厂四大专区 https://www.huaweicloud.com/news/2026/20260605100619686.html
- 新浪财经：华西医院联合华为发布四项医疗 AI 成果 https://finance.sina.com.cn/roll/2026-11-02/doc-inixiuez9370411.shtml
- 科技行者：华西医院联手华为，让医疗 AI 跨过「单点应用」难关 https://cj.sina.com.cn/articles/view/1644676117/6207c41500101olss
- 华为：南方医院智慧医疗全球样板点与 HAIC https://www.huawei.com/cn/news/2026/9/hc-intelligent-healthcare

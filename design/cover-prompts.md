# Site cover prompts (ChatGPT image generation)

Covers for aitanyan.com are generated per article in one style, **documentary lifestyle photography** (owner's
choice, 2026-11-21: "真实、接地气"). The WeChat covers stay on WeChat and in `cover` for sharing; the site shows
`cover_wide` at 2.35:1 (1280×544), so the subject must sit in the middle band of the image.

> **From 2026-11-21 new covers use "real photo + 大字报"** (bold two-line headline set by script over a gritty
> documentary photo); see `.claude/skills/site-cover/SKILL.md` and the reference
> `~/Documents/aitanyan/covers/samples/reference-poster.png`. The covers below were made before that and stay.

## Shared style (prepend to every prompt)

Landscape photo, 1536x1024. Documentary lifestyle photography of everyday life in China: a real place, natural
light, natural colors, shallow depth of field, authentic and unstaged, like a good newspaper feature photo. Keep the
main subject inside the middle horizontal band of the frame (it will be cropped to a 2.35:1 banner). People are
seen from behind, from the side or partly out of frame, with no clear face details. Screens show blurred content.
Absolutely no text, letters, numbers, logos or brand marks anywhere.

## Per article (scene)

| slug | scene |
|---|---|
| agent-skills-on-github | a programmer's desk at night in a small Shanghai apartment, two monitors with blurred code, a hand moving a mouse, tea mug and notebook |
| ai-cancer-detection | a radiologist seen from behind in a dim reading room, studying mammogram scans on large monitors |
| ai-college-application-apps | a high-school graduate and a parent at a kitchen table at night, a phone and a thick university guidebook between them |
| ai-designs-rockets | an engineer's gloved hands holding a strange organic-looking metal 3D-printed engine part in a workshop |
| ai-in-the-lab | a researcher in a lab coat seen from the side at a lab bench, pipette in hand, a laptop open beside test tubes |
| ai-interview-practice-apps | a young woman in a dorm room practising an interview, phone on a small tripod in front of her, seen from behind |
| ai-job-hunting-apps | a recent graduate at a café table with a laptop and a printed resume, seen over the shoulder |
| ai-job-interviews | a candidate in a shirt sitting alone facing a laptop webcam for a video interview in a quiet room, seen from the side |
| ai-layoff-30-day-plan | an office worker carrying a cardboard box of belongings out of an office building lobby, seen from behind |
| ai-money-apps | an older man's hands holding a phone with a blurred payment screen at a neighborhood market stall |
| ai-picks-your-college | a teenager lying on a bed surrounded by college brochures, scrolling a phone, warm evening light |
| ai-takes-your-job-tomorrow | an empty office chair at a desk with the computer still on, the worker standing by the window looking out |
| ai-universal-basic-income | an elderly couple at a small home table counting cash and looking at a phone, modest apartment |
| ai-video-guide | a young creator filming with a phone on a gimbal in a busy street, seen from behind |
| ai-voice-clone-scams | an elderly woman at home seen from behind, anxiously looking at a video call on her phone (sample A) |
| ai-wealth-gap | a city street at dusk: a delivery rider on an e-bike passing in front of a luxury shopping mall |
| college-majors-ai-era | university students walking across a campus square with books, autumn light, seen from behind |
| entry-level-jobs-ai | a young person in a suit sitting on a bench outside an office tower, holding a folder, looking up |
| gemini-decision-1 | a person at a desk with two printed options side by side, pen hovering, laptop open, close-up of hands |
| huawei-medical-ai | a doctor and a researcher in a hospital meeting room discussing a protein model on a large screen, seen from behind |
| if-exams-disappear | an empty exam hall with rows of desks and papers in morning light, one student entering from the back |
| kids-ai-homework | a child doing homework at a desk with a tablet beside the notebook, a parent's hand pointing at the page |
| kids-ai-learning-apps | a mother and a young child sitting together on a sofa looking at a tablet, seen from behind |
| qwen-beginner-guide | hands holding a phone over an employment contract and a calculator on a home table |
| what-ai-can-and-cannot-do | a child stacking wooden blocks next to a laptop showing a blurred complex chart, living room floor |
| when-ai-interviews-ai | a video interview seen over the candidate's shoulder: the laptop screen shows a blurred interviewer avatar |
| where-experience-comes-from | an older craftsman guiding a young apprentice's hands at a workbench in a small workshop |
| will-ai-take-your-job | a busy morning crowd of commuters walking into a subway station, motion blur |
| world-models | a robot vacuum and a child's toy car on a living-room floor, a small robot arm prototype on a table behind |

## Posters (real photo + 大字报), 2026-11-21

Photo prompt: "Landscape photo 1536x1024, gritty realistic documentary photograph, cinematic, dark warm tones, film grain, high tension. Scene in China: <scene>; the left 55% of the frame is darker and blurred so headline text can be placed there. No text, letters, numbers, signs or logos anywhere." Text is overlaid with `video/bin/poster.mjs`.

| slug | line 1 | line 2 | subline ({…} orange) | photo scene |
|---|---|---|---|---|
| ai-layoff-30-day-plan | 被 AI 裁员了 | 怎么办？ | 失业后的 {30 天}，照着这份{行动清单}走 | office workers carrying boxes out of a lobby after layoffs, a worried man close-up on the right |
| agent-skills-on-github | 给 AI 写的 | 技能包火了 | GitHub 本周最火的不是框架，是 {Skills} | a young programmer at night in a cramped apartment, face lit by monitors, close-up on the right |
| ai-cancer-detection | AI 看片子 | 比医生准？ | 多发现 {29%} 的乳腺癌，但别急着下结论 | a tired woman radiologist in a dim reading room, mammogram scans glowing behind her, close-up on the right |
| ai-college-application-apps | AI 填志愿 | 靠谱吗？ | 元宝、千问、百度怎么用，{4 个坑}别踩 | a worried high-school graduate holding a phone at a cluttered kitchen table at night, parent blurred behind, close-up on the right |
| ai-designs-rockets | AI 设计火箭 | 经验没用了？ | 工程经验，正在被{重写}吗？ | a veteran aerospace engineer in a workshop holding a strange organic metal engine part, staring at it, close-up on the right |
| ai-in-the-lab | AI 走进 | 实验室 | 从读文献到过审稿，{科研流程}正在被重写 | a researcher in a lab coat at night in a lab, screen light on the face, test tubes, close-up on the right |
| ai-interview-practice-apps | 被 AI 面试前 | 先练一遍 | 牛客、猎聘的 AI 功能怎么用，{4 条防坑}提醒 | a nervous young woman in a dorm room rehearsing to a phone on a tripod, close-up on the right |
| ai-job-hunting-apps | 第一份工作 | AI 能帮啥？ | 改简历、练面试，还有 {4 个坑}别踩 | a fresh graduate in a crowded job fair holding a resume, anxious, close-up on the right |
| ai-job-interviews | AI 面试官 | 上岗了 | 简历被算法筛，怎么才{不被刷掉}？ | a young man in a shirt facing a laptop webcam in a bare room, tense, close-up on the right |
| ai-money-apps | AI 帮你管钱 | 靠谱吗？ | 支付宝「阿宝」怎么用，{4 条护钱规则} | an older man at a street market squinting at a phone payment screen, close-up on the right |
| ai-picks-your-college | AI 替你填志愿 | 你敢听吗？ | 把{人生选择}交给算法之前，先想清楚 | a teenager surrounded by college brochures in a small bedroom, phone in hand, uncertain, close-up on the right |
| ai-takes-your-job-tomorrow | 你的岗位 | 明天被接管？ | 如果 AI 坐上你的位置，{你会做什么}？ | an office worker standing by his desk looking at his empty chair in an open-plan office, close-up on the right |
| ai-universal-basic-income | AI 赚的钱 | 每人发一份？ | 如果 AI 创造的财富，{每人每月发一份} | an elderly couple in a modest flat counting cash and looking at a phone, close-up of the man on the right |
| ai-video-guide | 一句话 | 拍电影？ | AI 视频{真假难辨}，普通人该怎么用、怎么防 | a young creator filming with a phone gimbal on a busy neon street at night, close-up on the right |
| ai-voice-clone-scams | 3 秒声音 | 克隆你 | AI 换脸、拟声诈骗全拆解，{全家都该看} | an elderly woman at home pressing a phone to her ear, frightened, close-up on the right |
| ai-wealth-gap | 贫富差距 | 越拉越大？ | AI 的红利，答案可能{和你想的不一样} | a delivery rider in the rain stopped in front of a glowing luxury mall, close-up on the right |
| college-majors-ai-era | 冷门专业 | 反而吃香？ | AI 时代选专业，看{十年后}还需不需要人 | a university student holding books in a crowded campus corridor, thoughtful, close-up on the right |
| entry-level-jobs-ai | 入门岗位 | 被 AI 吃掉 | 年轻人的{第一份工作}去哪找？ | a young job seeker in a cheap suit sitting on steps outside an office tower, close-up on the right |
| gemini-decision-1 | AI 不写作文 | 只做选择 | Google {Gemini Decision 1} 只做一件事 | an office manager at a desk hesitating between two printed options, pen in hand, close-up on the right |
| huawei-medical-ai | AI 当上 | 研究员了？ | 华为医疗 AI 的{真进展}与{真难题} | a doctor in a hospital meeting room looking at a protein model on a screen, close-up on the right |
| if-exams-disappear | 考试消失了 | 怎么证明？ | 人人都能问 AI，{学会了}拿什么证明？ | a student sitting alone in a big empty exam hall, close-up on the right |
| kids-ai-homework | 孩子用 AI | 写作业 | 是{作弊}，还是{新能力}？ | a child at a desk with a tablet and homework, a parent leaning in worried, close-up of the parent on the right |
| kids-ai-learning-apps | AI 学习 App | 怎么选？ | 让 AI 当{老师}，不当{答案机} | a mother on a sofa watching her child use a tablet, frowning, close-up of the mother on the right |
| qwen-beginner-guide | 千问 | 怎么用？ | 算补偿、看协议、改简历，{4 个场景}跟着做 | a laid-off worker at a kitchen table with a contract and calculator, checking a phone, close-up on the right |
| what-ai-can-and-cannot-do | AI 能做什么 | 不能做什么 | 一份基于 {2026 年证据}的冷静解剖 | a thoughtful engineer in a server room aisle, close-up on the right |
| when-ai-interviews-ai | 面试你的 | 也是 AI？ | 当{面试官和求职者}都是 AI | a candidate at a laptop video interview where the screen shows a blurred digital avatar, close-up on the right |
| where-experience-comes-from | 只招有经验 | 经验哪里来？ | 入门的台阶被拆了，{师傅}从哪来？ | an old craftsman beside a young apprentice in a workshop, close-up of the old man on the right |
| will-ai-take-your-job | AI 会抢走 | 你的工作吗？ | 最危险的职业、要不要上大学、{10 年后}做什么 | a tired commuter in a packed subway carriage at rush hour, close-up on the right |
| world-models | 世界模型 | 是什么？ | AI 进化的{虚拟宇宙实验场} | a robotics researcher in a lab watching a small robot arm, close-up on the right |

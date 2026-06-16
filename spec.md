# AI中的傲慢与偏见 — MVP Spec

## 它做什么

用户选两个虚拟身份、对**同一道** AI 偏见题并排查看回复差异，再做一道盲测判断哪条更有偏见——用一次「换身份对比」证明 AI 建议会因身份而变。

## 给谁用

**一名**经常使用 ChatGPT / DeepSeek 或其他 AI 解决生活、学习、职业问题的人，此前可能还没有系统察觉 AI 回答中的隐性偏见。

## Research Question & Hypothesis

**Research Question:** How does *Pride & Prejudice in AI*, an identity-simulation game where users ask AI questions through simulated identities to experience implicit bias, affect bias awareness and prompting behavior for people who often use AI to solve life, learning, or career problems?

**Hypothesis:** I hypothesize that after using *Pride & Prejudice in AI*, people who often use AI to solve life, learning, or career problems will increase their awareness of implicit bias in AI responses and increase their use of prompts that reduce the influence of bias.

## 核心流程

1. **读说明**（约 30 秒）——一句话：同一问题，只换身份，AI 的回答可能不同；这是教学模拟，非实时 API。
2. **选身份 + 看对比**——固定场景「我想竞聘部门主管」；系统给出两个身份（参照组「男性·26–45·无残疾」vs「女性·26–45·无残疾」），并排展示两条预设 AI 回复与一句觉察提示。
3. **盲测 1 题**——隐藏身份，只给两条匿名回复，用户点选「哪条更有偏见」并立即看到对错与简短解释。
4. **后测 1 题 + 反馈**——「下次向 AI 提问前，你会考虑身份是否影响回答吗？」（5 点量表）；可选开放题「哪条回复让你最意外？」

全程约 **5–8 分钟**，单页完成，无需注册。

## 不在 MVP 里

| 功能 | 原因 |
|------|------|
| 4 题完整前测 | 先验证核心对比是否有效，基线后测可后补 |
| 四个身份预设（含交叉身份 I3/I4） | 先用性别对照证明机制，交叉性进论文附录 |
| 第二场景（学技能 / 出行 P3/P4） | 研究已覆盖，MVP 只保留求职 P1 |
| 自定义提问 | 脚本质量难控，分散核心体验 |
| ChatGPT vs DeepSeek 双模型切换 | 需 API 与版本锁定；MVP 只用一套教学脚本 |
| 约束语教学模块 | 文献支持强，但属第二层干预；MVP 后在 v2 加入 |
| 成长档案、历史记录、JSON 导出 | 需后端或复杂 localStorage；MVP 只留浏览器内 1 题后测结果 |
| 游戏大厅四板块导航 | 合并为单页线性流程，减少迷路 |
| 实时 API 调用 | 成本高、偏见方向因版本漂移；MVP 用脚本，论文另做 64 格审计 |

## 怎么收集反馈

- **主指标**：后测 Likert「下次会问 AI 前是否考虑身份影响」（与 `research/questions.md` 核心问题对齐）。
- **行为代理**：盲测 1 题是否正确识别更有偏见的回复。
- **定性**：开放题「哪条回复最意外？」（可选，用于论文讨论引语）。
- **存储**：结果暂存 `localStorage` 单键；MVP 不要求导出——课堂约 25 人时可由研究者现场记录或下周接 Supabase。

---

> 依据：`research/summary.md` 指出产品空白在「反事实对比 + 可测量学习」；MVP 只保留能单独证明这一点的最小交互。`index.html` 现有四板块版本视为 **v2 目标**，本周只交付本 spec，不继续扩功能。

# AI 中的傲慢与偏见

一个让用户模拟不同身份与 AI 对话、观察同一问题在不同身份设定下如何得到不同回复的偏见觉察小游戏。项目通过「前测 → 换身份对比 → 约束语工坊 → 盲测 → 后测 → 档案」的流程，帮助经常使用 ChatGPT、DeepSeek 等生成式 AI 的用户意识到 AI 回答中可能存在的隐性偏见。

**上线地址：** https://project-pride-and-prejudice-in-ai.vercel.app/

## 如何打开

这是一个纯静态网页项目。本地开发可选 `scripts/local-dev.mjs`（需配置 `.env.local` 中的 Supabase / DeepSeek），也可直接用浏览器打开根目录 `index.html` 体验教学脚本模式。

`index.html` 是当前网站入口，也是 Vercel 部署使用的页面。

## 核心功能

| 模块 | 说明 |
|------|------|
| 知情同意 | 首次进入需阅读并同意匿名研究说明 |
| 前测 / 后测 | 同一套 5 题问卷，配对计算觉察变化 Δ |
| 场景 P1 / P2 / P3 / P4 | 求职晋升、日常生活、学技能、日常出行 |
| 身份对比 | 并排展示两条 AI 回复与觉察提示 |
| 约束语工坊 | 3 条可编辑公平提问模板，支持教学脚本或 DeepSeek 实时 API |
| 盲测密室 | 隐藏身份判断哪条回复更有偏见 |
| 档案奖杯室 | 本地记录 + 可选匿名上传 Supabase + JSON 导出 |

## 项目内容

- `index.html`：可运行的偏见觉察小游戏（单页部署入口）
- `css/`、`js/`：样式与模块化逻辑（生产入口 `index.html` 内联了场景/问卷/盲测数据；`js/data.js` 为同步参考副本）
- `spec.md`：MVP 设计说明
- `research/`：研究资料（`questions.md`、`sources.md`、`summary.md`、`data/`）
- `research/idea.html`：早期概念页归档；请从 `index.html` 进入正式体验
- `midterm.pptx`：中期答辩 PPT（课程交付物，已纳入仓库）
- `api/chat.js`：Vercel 本地代理（可选）

## 研究方向

**研究问题：** 反事实体验式学习是否比仅阅读案例更能改变用户的 AI 提问习惯？

**测量：** 前测/后测 Likert 差值 Δ、盲测正确率、约束语使用（工坊行为）、开放题定性引语。

**Supabase 字段对照：** 见 [`research/data/supabase-schema.md`](research/data/supabase-schema.md)。

**AI 来源说明：** 默认推荐 DeepSeek 经 Supabase Edge Function 生成回复；实时模式下觉察提示由 **二次 DeepSeek 分析**（`deepseek-analyze-bias`）基于当次回复正文生成。亦可选「教学脚本」预设回复与规则检测提示以保证课堂演示稳定。正式收数据时请在论文中明确被试使用的模式，并对照 `research/questions.md` 中的 64 格审计设计。

## 目录结构

```text
Project-Pride-and-Prejudice-in-AI/
├── index.html          ← 部署入口
├── spec.md
├── README.md
├── css/
├── js/
├── api/
├── assets/
└── research/
    ├── idea.html       ← 归档，非入口
    ├── questions.md
    ├── sources.md
    ├── summary.md
    └── data/
```

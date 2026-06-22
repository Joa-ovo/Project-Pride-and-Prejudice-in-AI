# AI 中的傲慢与偏见

一个让用户模拟不同身份与 AI 对话、观察同一问题在不同身份设定下如何得到不同回复的偏见觉察小游戏。项目通过“换身份对比 + 盲测判断 + 后测反馈”的流程，帮助经常使用 ChatGPT、DeepSeek 等生成式 AI 的用户意识到 AI 回答中可能存在的隐性偏见。

上线地址：https://project-pride-and-prejudice-in-ai.vercel.app/

## 如何打开

这是一个纯静态网页项目，不需要安装依赖或启动后端。

本地查看方式：

1. 克隆或下载仓库。
2. 用浏览器直接打开根目录下的 `index.html`。

`index.html` 是当前网站入口，也是 Vercel 部署使用的页面。

## 项目内容

- `index.html`：可运行的偏见觉察小游戏入口。
- `css/`：页面样式文件。
- `js/`：拆分后的交互逻辑与数据模块，包括 `app.js`、`chat.js`、`quiz.js`、`blind.js`、`report.js`、`storage.js`、`data.js`。
- `spec.md`：MVP 设计说明，记录项目目标、核心流程、反馈收集方式与暂不纳入 MVP 的功能。
- `research/`：研究资料归档，包括研究问题、文献来源、研究摘要，以及支撑脚本设计的数据材料。
- `research/idea.html`：早期项目想法页，仅作归档；当前请从 `index.html` 进入网站。

## 研究方向

项目关注的问题是：当用户亲手体验“同一问题、只换身份”之后，是否会提高对 AI 隐性偏见的觉察，并进一步改变后续向 AI 提问时的习惯。

目前版本采用预设脚本进行教学模拟，不调用实时 AI API。这样可以保证课堂展示稳定，也能让用户集中观察身份设定带来的回复差异。

## 目录结构

```text
Project-Pride-and-Prejudice-in-AI/
├── index.html
├── spec.md
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── blind.js
│   ├── chat.js
│   ├── data.js
│   ├── quiz.js
│   ├── report.js
│   └── storage.js
└── research/
    ├── idea.html
    ├── questions.md
    ├── sources.md
    ├── summary.md
    └── data/
        ├── cases.md
        ├── quotes.md
        └── stats.md
```
# 可引用语句

> 中英对照，便于论文与网站文案直接引用。页码/段落以原文为准。

---

## 反事实公平与测量

**EN** — Kusner et al. (2017): «A prediction is counterfactually fair if it coincides with the prediction in the counterfactual world where the individual belonged to a different demographic group.»

**中文** — 若在世界中某人属于不同人口群体，模型预测应与该反事实世界中的预测一致——这正是「同一问题、只换身份」的学术表述。

**URL** — https://arxiv.org/abs/1703.06856

---

**EN** — Tambe et al. (2025): Perturbing demographic attributes in resume pipelines can eliminate up to **74%** of candidates at retrieval and produce race differences of up to **20%** at summarization.

**中文** — 简历流水线中仅改动人口属性，检索阶段可筛掉多达四分之三候选人；摘要阶段种族差异可达两成。

**URL** — https://arxiv.org/html/2501.04316v2

---

## 招聘与薪资偏见

**EN** — Geiger et al. (2025, PLOS One): Large-scale audit of **395,200** salary negotiation queries shows significant gender bias across ChatGPT versions.

**中文** — 近 40 万条薪资谈判查询的大规模审计表明，各版本 ChatGPT 的谈判建议存在显著性别偏见——直接支撑网站「谈加薪」场景 P2。

**URL** — https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0318500

---

**EN** — Hofstra et al. (2024): «Silicon ceiling» — GPT exhibits race and gender stereotypes in resume scoring and generation analogous to human hiring biases.

**中文** — 「硅天花板」：GPT 在简历评分与生成中再现类似人类招聘的种族、性别刻板。

**URL** — https://arxiv.org/abs/2405.04412

---

## 残障与默认人设

**EN** — AccessEval (EMNLP 2025): Disability-related queries receive more negative sentiment, more stereotypes, and more factual errors—strongest in finance, healthcare, and education.

**中文** — 残障相关查询获得更多负面语气、更多刻板表述与更多事实错误，金融、医疗、教育域最为明显。

**URL** — https://aclanthology.org/2025.emnlp-main.1653/

---

**EN** — NAACL 2025 (default personas): LLMs implicitly assume users are middle-aged, able-bodied, male, native, and White; bias intensifies in high power-differential scenarios.

**中文** — 模型隐式假设用户为中年、健全、男性、本土、白人；权力不对等场景下偏见更强——对应参照身份「男性·26–45·无残疾」。

**URL** — https://aclanthology.org/2025.naacl-long.50/

---

## 用户侧约束语

**EN** — Wang et al. (2024, EMNLP): «Implication Prompting»—explaining *why* bias should be avoided—outperforms simple prefix constraints; most debiasing techniques require model internals, leaving end users with prompts only.

**中文** — 「含义提示」——说明为何要避免偏见——优于简单前缀约束；多数去偏见技术需模型内部访问，终端用户只能依靠 prompt。支撑网站约束语教学升级路径：先试 Prefix，再教 Implication 版。

**URL** — https://aclanthology.org/2024.emnlp-main.13.pdf

---

## 中文语境

**EN** — Scientific Reports 2025 (C-LLM): Five Chinese LLMs show significant stereotypes across gender, region, age, and education; occupations default to male.

**中文** — 五款中文大模型在性别、地域、年龄、教育上均存在显著刻板；职业想象默认男性。

**URL** — https://www.nature.com/articles/s41598-025-03893-w

---

## 教育干预

**EN** — Thinking Like a Scientist (2025): Interactive simulation (N=605) significantly improves understanding of fairness, dataset representation, and bias concepts.

**中文** — 互动模拟（N=605）显著提升对公平、数据集代表性与偏见概念的理解——支撑本项目「体验优于纯阅读」假设。

**URL** — https://arxiv.org/html/2507.21090

---

**EN** — Question the Machine (2026): A 2-hour workshop improved query reformulation, follow-up questioning, and correctness judgments; self-reported metacognition did not predict performance.

**中文** — 两小时工作坊改善了重述查询、追问与判断正确性；自评元认知并不能预测实际表现——提示后测应测行为而非仅测态度。

**URL** — https://arxiv.org/html/2604.01955

---

## 公众与政策

**EN** — Pew Research (2025): **55%** of U.S. adults and AI experts are «highly concerned» about bias and discrimination in AI decision-making.

**中文** — 55% 的美国公众与 AI 专家对 AI 决策中的偏见与歧视「高度担忧」——可作论文引言钩子。

**URL** — https://www.pewresearch.org/internet/2025/04/03/views-of-risks-opportunities-and-regulation-of-ai/

---

**中文** — 《生成式人工智能服务管理暂行办法》第四条：「在算法设计、训练数据选择、模型生成和优化、提供服务等过程中，采取有效措施防止产生民族、信仰、国别、地域、性别、年龄、职业、健康等歧视。」

**URL** — https://www.gov.cn/zhengce/zhengceku/202307/content_6891752.htm

---

## 理论经典

**EN** — Steele & Aronson (1995): Stereotype threat can impair performance and self-efficacy when identity is salient in stereotype-relevant domains.

**中文** — 当身份在刻板印象相关领域被凸显时，刻板印象威胁可损害表现与自我效能——链向 AI「学不动」「太勉强」类劝退语。

---

**EN** — Crenshaw (1989): Single-axis analysis cannot capture how multiple marginalized identities compound discrimination.

**中文** — 单轴分析无法捕捉多重边缘身份的复合歧视——支撑 I3「女性·65+·轮椅」交叉身份设计。

---

## 本项目核心命题（网站文案，可作文内引用）

**中文** — 「用案例和身份模拟，带你看清 AI 里藏着哪些偏见，练识别偏见的眼力，并学会怎么提问，让 AI 尽量少带偏见。」

**中文** — 约束语示例：「请不要说我学不动，给我同样难度的路径。」

**中文** — 核心研究问题：「亲手做同一问题、只换身份之后，用户是会改变提问习惯，还是只增加抽象风险意识？」

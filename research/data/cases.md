# 真实案例与已有做法

---

## 产业失败案例

### Amazon 招聘 AI（2018）

- **经过**：Amazon 开发 ML 简历筛选系统，训练数据来自过往十年招聘记录（男性占主导）。系统学会用「women's」「女子」等词作为降分信号，系统性惩罚含这些词的简历。
- **结果**：Amazon 2017 年停用该工具；未对外部署。
- **与本项目**：经典「显性数据偏见 → 自动化歧视」案例；网站前测可对照「AI 客观中立」误区。
- **来源** — [MIT Technology Review](https://www.technologyreview.com/2018/10/10/139858/amazon-ditched-ai-recruitment-software-because-it-was-biased-against-women/)
- **截图占位**：`research/data/screenshots/amazon-mit-tech-review.png`（待截取报道标题页）

### NYC Local Law 144 实施落差

- **经过**：2023 年 7 月生效，要求使用自动化就业决策工具（AEDT）的雇主进行独立第三方偏见审计并公布 adverse impact ratio。
- **数据**：生效后 6 个月内仅约 **19** 份相关审计公布；雇主对是否「覆盖」有广泛裁量权。
- **与本项目**：说明「有法规 ≠ 偏见消失」；亚洲语境用户侧素养仍是缺口。
- **来源** — Gaebler et al. (2025) 讨论 LL144；[NYC Rules](https://rules.cityofnewyork.us/rule/local-law-144-automated-employment-decision-tools/)

---

## 学术审计与开源工具（开发者向）

### re-cinq/hiring-bias

- **做法**：合成简历反事实配对（性别×种族×残疾 8 变体），LLM-as-judge 评分，开源可复现。
- **与本项目**：64 格 API 审计的编码框架参照；附录可对比教学脚本方向。
- **URL** — https://github.com/re-cinq/hiring-bias

### LangFair

- **做法**：Python 包，计算反事实公平相关指标（sentiment、推荐、分配等任务）。
- **局限**：无教学叙事、非中文、需技术背景。
- **URL** — https://www.theoj.org/joss-papers/joss.07570/10.21105/joss.07570.pdf

### Google PAIR What-If Tool / LIT

- **做法**：反事实与特征扰动可视化，面向模型调试。
- **局限**：门槛高，非终端用户产品。
- **URL** — https://pair.withgoogle.com/

### SCOPE 基准

- **做法**：12 万+反事实 prompt 对，大规模基准。
- **局限**：数据集非用户体验产品。
- **URL** — https://arxiv.org/html/2604.05555 ⚠️ 待核实

### AccessEval 数据集

- **做法**：残障相关 NQ（中性）/ DQ（残障）查询配对，21 模型评测。
- **与本项目**：P3 学技能、P4 出行场景可抽取最接近条目校准脚本。
- **URL** — https://huggingface.co/datasets/Srikant86/AccessEval

---

## 教育/公众向产品

### EPFL ML 公平游戏

- **做法**：基于 COMPAS、翻译任务等叙事，反思公平定义与决策后果。
- **场景**：机器学习公平概念；**非** LLM 对话式职业建议。
- **URL** — https://www.epfl.ch/education/educational-initiatives/cede/open-and-accessible-education/digital-ethics/a-game-based-approach-to-learn-about-fairness-in-machine-learning/

### Survival of the Best Fit

- **做法**：浏览器游戏，玩家扮演 CEO 部署招聘算法，观察偏见累积。
- **缺口**：无 persona 反事实、无中文、无约束语教学。
- **URL** — https://www.survivalofthebestfit.com/game/

### BiasBuster

- **做法**：HR 雇佣 what-if 模拟与热力图。
- **缺口**：英文、招聘单场景、非对话式。
- **URL** — https://github.com/JoelMBAer/BiasBuster

### AAAI Games of Representation

- **做法**：卡牌游戏教数据集代表性与偏见概念（K-12）。
- **缺口**：非对话式、无身份模拟流程。
- **URL** — https://ojs.aaai.org/index.php/AAAI/article/view/30380

---

## 政策框架对照

| 框架 | 核心要求 | 与本项目 |
|---|---|---|
| 中国《暂行办法》2023 | 提供者防歧视（含健康） | 强调提供者；**使用者素养缺环** |
| 欧盟 AI Act 2024 | 招聘筛选高风险；质量管理 | 合规延至 2027.12 |
| NYC LL144 2023 | AEDT 偏见审计公布 | 雇主侧；非课堂素养 |
| 拜登 AI 行政令 2023 | 联邦与私营审计呼吁 | 背景政策环境 |

---

## 媒体叙事案例（引用前须核实 PRIMARY）

### Susan vs Steve 薪资谈判 ⚠️

- **叙事**：同一谈判场景，Susan 与 Steve 获得显著不同的薪资建议（媒体报道常见 ~$10K 差）。
- **状态**：广泛传播，PRIMARY 论文待锁定；学术上更接近 Geiger PLOS One 2025 体系。
- **建议**：论文引用 Geiger et al.，媒体数字放脚注「待核实」。

### Inc.com $280K vs $400K ⚠️

- **叙事**：性别化薪资建议金额差异 anecdotal 报道。
- **状态**：非同行评审；不宜作核心证据。

---

## 本项目在案例谱系中的位置

| 维度 | 典型现有产品 | 本项目 |
|---|---|---|
| 受众 | 开发者 / K-12 | 非技术中文用户、大学课堂 |
| 场景 | 招聘单场景或抽象 ML | 求职晋升 + 日常生活 |
| 方法 | 审计指标或卡牌叙事 | 反事实身份模拟 + 盲测 + 约束语 |
| 语言 | 英文为主 | 中文 persona 与脚本 |
| 可测量学习 | 部分有前后测 | 前测/后测/盲测/JSON 导出 |
| API | 多数非实时对话 | 教学模拟 + 计划 64 格真实审计附录 |

**空白陈述**：在「LangFair / hiring-bias」与「EPFL / Survival of the Best Fit」之间，缺少整合反事实对比、盲测鉴别、约束语教学与前后测的**中文对话式 AI 偏见素养**产品——本项目瞄准此缝。

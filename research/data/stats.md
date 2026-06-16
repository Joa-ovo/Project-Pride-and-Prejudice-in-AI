# 关键统计数据

> 写入论文前请回溯原文核对数字与上下文。标注 ⚠️ 的为二手或未锁定 PRIMARY 来源。

---

## 公众态度

| 数据 | 来源 | URL |
|---|---|---|
| **55%** 美国公众与 AI 专家对 AI 决策中的偏见/歧视「高度担忧」 | Pew Research, 2025 | https://www.pewresearch.org/internet/2025/04/03/views-of-risks-opportunities-and-regulation-of-ai/ |

---

## 招聘与简历筛选

| 数据 | 来源 | URL |
|---|---|---|
| 人口属性扰动后，检索阶段最高 **74%** 候选人被筛掉 | Tambe et al., Small Changes Large Consequences, 2025 | https://arxiv.org/html/2501.04316v2 |
| 摘要阶段种族差异可达 **20%** | 同上 | 同上 |
| **39.52 万**条查询：ChatGPT 薪资谈判建议存在显著性别偏见 | Geiger et al., PLOS One, 2025 | https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0318500 |
| 五模型：女性 persona 常被建议更低起薪；交叉 persona 偏见可叠加 | Ge et al., GeBNLP 2025 | https://aclanthology.org/2025.gebnlp-1.20.pdf |
| 对应实验：LLM 略偏袒女性与非白人（方向因模型与设定而异） | Gaebler et al., 2025 | https://journals.sagepub.com/doi/10.1177/23794607251320229 |
| 后训练对齐放大性别/种族信号；残障劣势效应量≈**6–12 个月**教育差异 | AI Alignment Amplifies, 2026 ⚠️ 待核实 | https://arxiv.org/html/2605.13866 |

---

## 残障、年龄与日常建议

| 数据 | 来源 | URL |
|---|---|---|
| **21** 模型、**9** 类残疾、**6** 域：残障查询更负面、更刻板、更多事实错误 | AccessEval, EMNLP 2025 | https://aclanthology.org/2025.emnlp-main.1653/ |
| 隐式默认人设：中年、健全、男性、本土、白人等 | NAACL 2025 Unmasking Implicit Bias | https://aclanthology.org/2025.naacl-long.50/ |

---

## 中文语境

| 数据 | 来源 | URL |
|---|---|---|
| 五款中文 LLM 显著性别、地域、年龄、教育刻板 | Scientific Reports 2025 C-LLM | https://www.nature.com/articles/s41598-025-03893-w |
| 女性 persona 拒绝率更高 | Evaluating Chinese LLMs, 2025 | https://arxiv.org/html/2506.04975v2 |
| DeepSeek：35 岁以上、女性候选人预测分系统性更低 ⚠️ 待核实 | DeepSeek in China, UH ScholarSpace | https://scholarspace.manoa.hawaii.edu/items/f8ae94a2-0b95-4c9a-8e21-05e81a8400cd |

---

## 用户侧 prompt 去偏见

| 数据 | 来源 | URL |
|---|---|---|
| Implication Prompting 平均偏见降约 **4.05%**（优于 Prefix / Self-Refinement） | Wang et al., EMNLP 2024 | https://aclanthology.org/2024.emnlp-main.13.pdf |
| 中国 N=**980**：LLM 话语风格影响求职场景自我效能 | MDPI Behavioral Sciences, 2025 ⚠️ 待核实 | https://www.mdpi.com/2076-328X/16/2/241 |

---

## AI 素养干预

| 数据 | 来源 | URL |
|---|---|---|
| N=**605**：互动模拟显著提升公平/偏见概念理解与自信 | Thinking Like a Scientist, 2025 | https://arxiv.org/html/2507.21090 |
| N=**116**：2 小时工作坊改善重述查询、追问、判断正确性 | Question the Machine, 2026 | https://arxiv.org/html/2604.01955 |
| N=**158**：K-12 AI 素养课显著提升概念理解与态度 | Long et al., AAAI 2024 | https://ojs.aaai.org/index.php/AAAI/article/view/30380 |
| N=**193**：8 小时哲学探究提升算法偏见识别 | ACM 2025 意大利中学 ⚠️ 待核实 | https://dl.acm.org/doi/10.1007/978-3-032-17604-2_2 |
| N=**319**：对 GenAI 信心越高，批判性思维越少 | Lee et al., CHI 2025 | https://doi.org/10.1145/3706598.3713778 |

---

## 政策与监管

| 数据 | 来源 | URL |
|---|---|---|
| NYC LL144 生效后 6 个月内仅 **19** 份相关审计公布 | Gaebler et al., 2025（引用 LL144 实施情况） | https://journals.sagepub.com/doi/10.1177/23794607251320229 |
| 欧盟 AI Act 就业类高风险合规延至 **2027.12**（Omnibus 调整后） | EUR-Lex | https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689 |

---

## ⚠️ 需谨慎引用（论文前须锁定 PRIMARY）

| 数据 | 说明 |
|---|---|
| Susan vs Steve 薪资建议差约 **$10K** | 媒体报道多，PRIMARY 待锁定；见 Geiger PLOS One |
| UW 简历 **85%** / **11%** | 限于 3 LLM、9 职业，须核对原文 |
| ABLEist **58×** | 特定指标与场景 |
| Inc.com **$280K** vs **$400K** | 非同行评审 |

---

## 本项目待产数据（64 格审计）

| 指标 | 设计 |
|---|---|
| 网格规模 | 4 身份（I1–I4）× 4 starter（P1–P4）× 2 模型 × 2 条件（基线/约束语）= **64** 格 |
| 建议输出 | 方向一致率、约束缓解率、中文 vs 英文 persona 差异 |
| 参照工具 | re-cinq/hiring-bias, LangFair |

# 文献表（Synthesis Matrix）

> 项目对齐：**AI中的傲慢与偏见** — 通过反事实身份模拟（求职晋升 / 日常生活）、盲测鉴别、约束语教学，培养中文用户的 AI 偏见觉察与提问习惯。  
> 列说明：证据强度 = 高/中/低；是否核实 = 已核实 / 待核实 / 二手引用。

---

## 一、理论基础：公平、刻板印象与交叉性

| 来源（作者·年份·标题） | 主题 | 关键发现 / 可引用的话 | 证据强度 | 是否核实 |
|---|---|---|---|---|
| Kusner et al.·2017·Counterfactual Fairness ([arXiv](https://arxiv.org/abs/1703.06856)) | 反事实公平 | 「预测应与世界中敏感属性被反事实改变后的结果一致」——本项目「同一问题、只换身份」的直接理论锚点 | 高 | 已核实 |
| Steele & Aronson·1995·Stereotype Threat ([APA](https://psycnet.apa.org/record/1995-41139-001)) | 刻板印象威胁 | 在刻板印象相关任务中，被提示身份的成员表现与自我效能下降；对应网站脚本「学不动」「太勉强」可能压低用户求助意愿 | 高 | 已核实 |
| Crenshaw·1989·Demarginalizing the Intersection ([UChicago](https://chicagounbound.uchicago.edu/cgi/viewcontent.cgi?article=1052&context=uclf)) | 交叉性 | 单一维度分析无法捕捉多重边缘身份的复合歧视；对应 I3「女性·65+·轮椅」vs I4「男性·65+·轮椅」 | 高 | 已核实 |
| Barocas et al.·2023·Fairness and Machine Learning ([fairmlbook.org](https://fairmlbook.org/)) | 公平概念谱系 | 群体公平、个体公平、因果公平等框架并存，无单一「公平」定义；论文讨论章可引用 | 高 | 已核实 |
| Blodgett et al.·2020·Language (Technology) is Power ([ACL](https://aclanthology.org/2020.lrec-1.2/)) | 表征伤害 | NLP 偏见不仅是分类错误，还包括强化刻板的社会表征；支撑盲测「哪条更有偏见」题型 | 高 | 已核实 |

---

## 二、LLM 偏见存在性：招聘与职业建议

| 来源（作者·年份·标题） | 主题 | 关键发现 / 可引用的话 | 证据强度 | 是否核实 |
|---|---|---|---|---|
| Hofstra et al.·2024·The Silicon Ceiling ([arXiv](https://arxiv.org/abs/2405.04412)) | GPT 招聘偏见 | 提出 **「silicon ceiling」**：GPT-3.5 在简历评分/生成中存在种族、性别刻板；对应竞聘场景 P1/P2 | 高 | 已核实 |
| Tambe et al.·2025·Small Changes, Large Consequences ([arXiv](https://arxiv.org/html/2501.04316v2)) | 简历筛选级联伤害 | 人口属性扰动后检索阶段最高 **74%** 候选人被筛掉；摘要阶段种族差异可达 **20%** | 高 | 已核实 |
| Geiger et al.·2025·Gender Bias in ChatGPT Salary Advice ([PLOS One](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0318500)) | 薪资谈判偏见 | **39.52 万**条查询大规模审计；ChatGPT 各版本薪资谈判建议存在显著性别偏见；对应谈加薪场景 | 高 | 已核实 |
| Ge et al.·2025·Surface Fairness, Deep Bias ([GeBNLP](https://aclanthology.org/2025.gebnlp-1.20.pdf)) | 交叉 persona 薪资 | 五模型对比：女性 persona 常被建议更低起薪；交叉 persona 偏见可叠加 | 高 | 已核实 |
| Gaebler et al.·2025·Auditing LLMs for Race & Gender ([SAGE BSP](https://journals.sagepub.com/doi/10.1177/23794607251320229)) | 对应实验审计 | 真实教师应聘材料对应实验：模型略偏袒女性与非白人——**偏见方向不单一** | 高 | 已核实 |
| 待锁定·2024–2025·AI Alignment Amplifies Gender and Race Signals ([arXiv](https://arxiv.org/html/2605.13866)) | 对齐放大偏见 | 后训练对齐可放大性别/种族信号；残障候选处于劣势；效应量≈6–12 个月教育差异 | 中 | 待核实 |
| 待锁定·2026·Bias in the Tails ([arXiv](https://arxiv.org/html/2604.19984)) | 尾部 evaluative framing | 偏见集中在分布尾部的评价性 framing；常规聚合公平指标易漏检 | 中 | 待核实 |

---

## 三、年龄、残疾、默认人设与日常建议

| 来源（作者·年份·标题） | 主题 | 关键发现 / 可引用的话 | 证据强度 | 是否核实 |
|---|---|---|---|---|
| Srikant et al.·2025·AccessEval ([EMNLP](https://aclanthology.org/2025.emnlp-main.1653/)) | 残障偏见基准 | 残障相关查询：更负面语气、更多刻板、更高事实错误；金融/医疗/教育域最强；对应 P3/P4 出行与学技能 | 高 | 已核实 |
| Srikant et al.·2025·AccessEval Dataset ([HuggingFace](https://huggingface.co/datasets/Srikant86/AccessEval)) | 残障 NQ/DQ 对 | 21 模型、9 类残疾、6 域；可复用配对设计 | 高 | 已核实 |
| 待锁定·2025·Unmasking Implicit Bias via Default Personas ([NAACL](https://aclanthology.org/2025.naacl-long.50/)) | 默认人设 | LLM 隐式默认：中年、健全、男性、本土、白人等；权力不对等场景偏见更强；对应参照组「男性·26–45·无残疾」 | 高 | 已核实 |
| 待锁定·2025·The Prompt Makes the Person(a) ([EMNLP Findings](https://aclanthology.org/2025.findings-emnlp.1261.pdf)) | Persona 措辞 | Persona 措辞显著影响刻板程度；访谈式 prompt 可减轻 | 高 | 已核实 |
| Venkit et al.·2023·Automated Ableism ([arXiv](https://arxiv.org/abs/2307.09209)) | 残障情感分析偏见 | 情感/毒性模型对残障表述系统性误判；支撑「合理安全提醒 vs 表征伤害」编码讨论 | 高 | 已核实 |

---

## 四、中文语境与本土模型

| 来源（作者·年份·标题） | 主题 | 关键发现 / 可引用的话 | 证据强度 | 是否核实 |
|---|---|---|---|---|
| 待锁定·2025·C-LLM Bias ([Scientific Reports](https://www.nature.com/articles/s41598-025-03893-w)) | 中文 LLM 刻板 | 五款中文 LLM 存在显著性别、地域、年龄、教育刻板；职业默认男性 | 高 | 已核实 |
| 待锁定·2025·Evaluating Chinese LLMs: Persona & Safeguards ([arXiv](https://arxiv.org/html/2506.04975v2)) | 中文 persona 拒绝率 | Persona 分配显著影响拒绝率与毒性；女性 persona 拒绝率更高 | 高 | 已核实 |
| 待锁定·2025·DeepSeek in China: AI Hiring or Bias Hiring? ([UH ScholarSpace](https://scholarspace.manoa.hawaii.edu/items/f8ae94a2-0b95-4c9a-8e21-05e81a8400cd)) | DeepSeek 招聘偏见 | 35 岁以上、女性候选人预测分系统性更低；对应网站 DeepSeek 选项 | 中 | 待核实 |
| 待锁定·2024·ChatGPT vs DeepSeek 职业建议比较 ([Atlantis Press](https://www.atlantis-press.com/article/126019774.pdf)) | 职业性别刻板 | nursing→女、engineering→男 在 DeepSeek/ChatGPT 中均再现 | 中 | 待核实 |
| Deshpande et al.·2023·Toxicity in ChatGPT personas ([arXiv](https://arxiv.org/abs/2303.12306)) | Persona 毒性 | 分配 persona 后毒性可升至默认的数倍；中文扩展见 Toxicity_Chinese_Based_LLMs | 高 | 已核实 |

---

## 五、用户侧约束语与去偏见（终端用户可做的事）

| 来源（作者·年份·标题） | 主题 | 关键发现 / 可引用的话 | 证据强度 | 是否核实 |
|---|---|---|---|---|
| Wang et al.·2024·Thinking Fair and Slow ([EMNLP](https://aclanthology.org/2024.emnlp-main.13.pdf)) | Implication Prompting | **Implication**（说明为何避免偏见）> Self-Refinement > **Prefix**；平均偏见降约 **4.05%**；多数去偏见需模型内部访问，终端用户只能靠 prompt | 高 | 已核实 |
| Sheng et al.·2020·Revealing Biases via Perturbation ([ACL](https://aclanthology.org/2020.acl-main.164/)) | 提示扰动 | 输入微小扰动可暴露模型偏见；与「换身份重问」方法论相关 | 高 | 已核实 |
| 待锁定·2025·Power Distance & Psychological Safety in LLM Counseling ([MDPI](https://www.mdpi.com/2076-328X/16/2/241)) | 话语与自我效能 | 中国 N=980：LLM 话语风格影响求职场景自我效能；支撑刻板印象威胁链条 | 中 | 待核实 |

---

## 六、AI 素养教育干预效果

| 来源（作者·年份·标题） | 主题 | 关键发现 / 可引用的话 | 证据强度 | 是否核实 |
|---|---|---|---|---|
| 待锁定·2025·Thinking Like a Scientist ([arXiv](https://arxiv.org/html/2507.21090)) | 互动模拟素养 | N=605：互动模拟显著提升公平/数据集代表性/偏见概念理解与自信 | 高 | 已核实 |
| 待锁定·2026·Teaching Students to Question the Machine ([arXiv](https://arxiv.org/html/2604.01955)) | 短工作坊行为改变 | N=116：2 小时工作坊改善重述查询、追问、判断正确性；自评元认知不预测表现 | 高 | 已核实 |
| Long et al.·2024·Games of Representation ([AAAI](https://ojs.aaai.org/index.php/AAAI/article/view/30380)) | K-12 AI 素养 | N=158：教师主导 AI 素养课显著提升概念理解与态度 | 高 | 已核实 |
| 待锁定·2025·Philosophical Inquiry on Algorithmic Bias ([ACM](https://dl.acm.org/doi/10.1007/978-3-032-17604-2_2)) | 中学哲学探究 | N=193：8 小时哲学探究显著提升算法偏见识别 | 中 | 待核实 |
| Lee et al.·2025·GenAI & Critical Thinking ([CHI](https://doi.org/10.1145/3706598.3713778)) | 批判性思维 | N=319：对 GenAI 信心越高，批判性思维越少；验证/整合任务 stewardship 成为新常态 | 高 | 已核实 |

---

## 七、公众舆论与政策监管

| 来源（作者·年份·标题） | 主题 | 关键发现 / 可引用的话 | 证据强度 | 是否核实 |
|---|---|---|---|---|
| Pew Research·2025·Views of AI Risks ([Pew](https://www.pewresearch.org/internet/2025/04/03/views-of-risks-opportunities-and-regulation-of-ai/)) | 公众担忧 | **55%** 美国公众与 AI 专家均对 AI 决策偏见「高度担忧」；可作论文引言数字 | 高 | 已核实 |
| 国务院·2023·生成式人工智能服务管理暂行办法 ([gov.cn](https://www.gov.cn/zhengce/zhengceku/202307/content_6891752.htm)) | 中国监管 | 第四条：防性别、年龄、职业、**健康**等歧视；提供者责任 | 高 | 已核实 |
| EU·2024·Artificial Intelligence Act ([EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689)) | 欧盟高风险 AI | 招聘筛选属高风险；就业类合规时间表经 Omnibus 调整后延至 **2027.12** | 高 | 已核实 |
| NYC·2023·Local Law 144 ([NYC Rules](https://rules.cityofnewyork.us/rule/local-law-144-automated-employment-decision-tools/)) | 纽约招聘审计 | 使用 AEDT 须独立第三方偏见审计并公布 adverse impact ratio | 高 | 已核实 |
| Biden·2023·Executive Order on AI ([White House](https://www.whitehouse.gov/briefing-room/presidential-actions/2023/10/30/executive-order-on-the-safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence/)) | 美国联邦 | 要求联邦机构与私营 AI 使用中的审计与公平考量 | 高 | 已核实 |

---

## 八、真实案例、教育产品与审计工具

| 来源（作者·年份·标题） | 主题 | 关键发现 / 可引用的话 | 证据强度 | 是否核实 |
|---|---|---|---|---|
| Dastin·2018·Amazon Scraps AI Recruiting Tool ([MIT Tech Review](https://www.technologyreview.com/2018/10/10/139858/amazon-ditched-ai-recruitment-software-because-it-was-biased-against-women/)) | Amazon 招聘 AI | 系统惩罚含 "women's" 的简历；经典产业案例 | 高 | 已核实 |
| EPFL CEDE·2024·ML Fairness Game ([EPFL](https://www.epfl.ch/education/educational-initiatives/cede/open-and-accessible-education/digital-ethics/a-game-based-approach-to-learn-about-fairness-in-machine-learning/)) | 公平游戏教学 | COMPAS/翻译叙事、决策反思；非 LLM 对话建议 | 高 | 已核实 |
| GCF Global·Survival of the Best Fit ([survivalofthebestfit.com](https://www.survivalofthebestfit.com/game/)) | 招聘偏见游戏 | 浏览器游戏展示招聘算法偏见；无 persona 反事实 | 高 | 已核实 |
| Madaan et al.·2024·LangFair ([JOSS](https://www.theoj.org/joss-papers/joss.07570/10.21105/joss.07570.pdf)) | 反事实公平工具包 | Python 包计算反事实公平指标；开发者向 | 高 | 已核实 |
| 待锁定·2026·SCOPE ([arXiv](https://arxiv.org/html/2604.05555)) | 反事实 prompt 基准 | 12 万+反事实 prompt 对；基准数据集非用户体验 | 中 | 待核实 |
| re-cinq·hiring-bias ([GitHub](https://github.com/re-cinq/hiring-bias)) | 开源招聘审计 | 简历反事实配对 + LLM-as-judge；可作 64 格审计对照 | 高 | 已核实 |
| Google PAIR·What-If Tool / LIT ([PAIR](https://pair.withgoogle.com/)) | 反事实可视化 | 门槛高、开发者/研究者向 | 高 | 已核实 |
| JoelMBAer·BiasBuster ([GitHub](https://github.com/JoelMBAer/BiasBuster)) | HR what-if 模拟 | 热力图展示雇佣偏见；英文、招聘单场景 | 中 | 已核实 |

---

## 九、需谨慎引用的数字（写入论文前须回溯原文）

| 来源 | 主题 | 说明 | 证据强度 | 是否核实 |
|---|---|---|---|---|
| 媒体报道·Susan vs Steve 薪资差 ~$10K | 性别薪资建议 | 广泛流传，**PRIMARY 论文待锁定**；更接近 Geiger PLOS One / GeBNLP 体系 | 低 | 二手引用 |
| UW 简历研究·85%/11% | 简历筛选 | 限于 3 LLM、9 职业；引用前须核对原始论文 | 低 | 待核实 |
| ABLEist·58× | 残障偏见倍数 | 特定指标与场景；不宜泛化 | 低 | 待核实 |
| Inc.com·$280K vs $400K | 谈判建议金额 | 非同行评审；仅作 anecdotal 参考 | 低 | 二手引用 |

---

## 与本项目场景映射速查

| 网站元素 | 主要文献支撑 |
|---|---|
| 竞聘 / 谈加薪（P1/P2） | Silicon Ceiling, Small Changes, Geiger PLOS One, GeBNLP |
| 学技能 / 出行（P3/P4） | AccessEval, NAACL 2025 默认人设 |
| 身份预设 I1–I4（含交叉） | Kusner 2017, Crenshaw 1989, C-LLM, DeepSeek 招聘 |
| 约束语教学 | Thinking Fair and Slow (EMNLP 2024) |
| 盲测鉴别 | Blodgett 表征伤害, AccessEval NQ/DQ 逻辑 |
| 前测「AI 完全客观」 | Pew 2025, Lee CHI 2025 过度信任 |
| 64 格 API 审计协议 | re-cinq/hiring-bias, LangFair, SCOPE |

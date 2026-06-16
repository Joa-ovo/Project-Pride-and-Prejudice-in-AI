# Midterm Presentation Draft

## Title —— 项目标题、我的名字、Research Advisor: Lawted Wu

**Pride & Prejudice in AI: An Identity-Simulation Game for Seeing Hidden Bias in AI Advice**

Presenter: Joa-ovo

Research Advisor: Lawted Wu

This project asks a simple question: when people ask AI for help, what hidden assumptions may appear in the answer?

My artifact is a small web game. In the game, users ask AI questions through simulated identities. They can see how AI advice may change when the identity changes. The goal is not to say that AI is always bad. The goal is to help users notice bias and ask better questions.

## Research Question & Hypothesis —— 用 spec.md 里定稿的那两句

**Research Question:** How does *Pride & Prejudice in AI*, an identity-simulation game where users ask AI questions through simulated identities to experience implicit bias, affect bias awareness and prompting behavior for people who often use AI to solve life, learning, or career problems?

**Hypothesis:** I hypothesize that after using *Pride & Prejudice in AI*, people who often use AI to solve life, learning, or career problems will increase their awareness of implicit bias in AI responses and increase their use of prompts that reduce the influence of bias.

## Background —— 这个议题为什么重要、和谁有关、普通人为什么该关心

Today, many people use ChatGPT, DeepSeek, and other AI tools as daily advisors. They ask about jobs, salary, learning plans, travel, social life, and personal choices.

This matters because AI answers often feel neutral. The answer is written in a calm and confident tone. So users may think, "This is just objective advice." But research in my folder shows that AI advice can change when the user's identity changes. Gender, age, disability, and other identity cues may affect the tone, the risk level, and the suggestions.

This issue is not only for engineers. It also affects ordinary users. If a person asks AI for career advice, a biased answer may make them aim lower. If an older or disabled person asks about learning or travel, a biased answer may assume they are weak or dependent. If users do not notice this, they may accept the advice too quickly.

My project focuses on user-side AI literacy. I want users to learn one habit: do not only ask AI for an answer; also ask whether the answer carries hidden assumptions.

## Literature Review —— 只能用 research/ 里已经存在的文献:每条讲它发现了什么、还有什么没解决、我的切入点新在哪。文献不够 3 条就在这一节写 TODO 提醒我去补,绝对不要编造文献

Kusner et al. (2017) give the idea of counterfactual fairness. A prediction should stay the same if the same person belonged to a different demographic group in a counterfactual world. This gives my project its main method: change the simulated identity, keep the question similar, and look at how the AI response changes. What this theory does not solve is how ordinary users can learn this idea without reading a technical paper. My project turns this method into a small game.

Geiger et al. (2025) studied salary negotiation advice from ChatGPT at a large scale. Their work found gender bias across ChatGPT versions. This supports my career and salary scenes. But this kind of audit is still far away from the daily user experience. My project asks whether users can notice this problem themselves after playing with simulated identities.

Srikant et al. (2025) created AccessEval to study disability-related bias in language models. Their research found that disability-related queries may receive more negative tone, more stereotypes, and more factual errors. This supports my daily life scenes, such as learning a new skill or going out alone. But the open question is how users can recognize these hidden assumptions in normal advice. My game uses blind testing and reflection to train that skill.

Wang et al. (2024) studied prompt-based ways to reduce bias. They found that "Implication Prompting," which explains why bias should be avoided, works better than a simple prefix. This is important because most normal users cannot change the model itself. They can only change their prompt. My project builds on this by teaching users to write prompts that reduce the influence of bias.

Pew Research Center (2025) found that many people are highly concerned about bias and discrimination in AI decision-making. This shows that the topic is socially important. But public concern does not always become better daily behavior. My project focuses on this gap: can a short interactive experience move users from general concern to better prompting habits?

Existing tools also leave a gap. LangFair and re-cinq/hiring-bias are useful for developers and researchers, but they are not made for non-technical users. Educational games like EPFL's ML fairness game and Survival of the Best Fit teach fairness ideas, but they are not Chinese, not focused on LLM advice, and not centered on identity-based AI dialogue. My project is new because it combines Chinese dialogue, identity simulation, blind testing, and prompt practice in one small web artifact.

## Research Design / Method —— 我的作品是什么、打算找谁来用、怎么收集反馈数据、用什么方式分析

My artifact is a single-page web game called *Pride & Prejudice in AI*. It is a teaching simulation, not a live API product yet.

The user chooses a scene, an AI model label, and simulated identities. The scenes include career advice and daily life advice. The user asks a question, such as how to apply for a team leader role, how to ask for a raise, how to learn a new skill, or how to plan activities.

The page then shows two simulated AI answers. Each answer is linked to a different identity. The user can compare the answers and read a short bias hint. Then the user enters a blind test. The identities are hidden, and the user chooses which answer seems more biased. After that, the page asks one short reflection question: "Before asking AI next time, will you consider whether identity affects the answer?"

I plan to invite people who often use AI to solve life, learning, or career problems. They may use ChatGPT, DeepSeek, or similar tools. They do not need to have studied algorithmic bias before.

The feedback data will include three parts. First, I will collect a Likert-scale answer about whether users will consider identity bias next time. Second, I will record whether users correctly identify the more biased answer in the blind test. Third, I will collect a short open-ended answer about which response surprised them.

For analysis, I will look for changes in awareness and behavior intention. I will count blind-test accuracy as a simple measure of bias recognition. I will read open answers to find common themes, such as "the AI lowered the user's ambition," "the AI assumed family duty," or "the AI assumed disability means dependence." If I add a later follow-up, I can also ask whether users actually used bias-reducing prompts after the game.

## Research Plan & Challenges —— 从现在到结题的步骤和大致日期、目前做到哪了、预计的困难和打算

By June 20, my goal is to finish the midterm presentation and explain the research question, the artifact, and the user study plan clearly.

By late June, I will revise the MVP flow. The current homepage already has identity dialogue, career and daily scenes, blind testing, local records, and JSON export. I still need to make the research question and user instructions match the newest version of the project.

By early July, I plan to test the game with a small group of users. I will ask them to finish the game, answer the reflection question, and write one short comment.

By mid July, I will analyze the feedback. I will look at the Likert responses, blind-test answers, and open comments. I will not claim the game works unless the data supports it.

By late July, I will revise the artifact and write the final paper or final presentation. I may also add a small appendix that compares the teaching scripts with real ChatGPT or DeepSeek outputs.

The first challenge is validity. My current AI answers are scripted. They are useful for teaching, but real AI models may answer differently. To handle this, I will be honest that the MVP is a simulation. If time allows, I will do a small API audit later.

The second challenge is measurement. A user may say they are more aware of bias, but that does not prove they will change their real behavior. To handle this, I will combine attitude data with behavior proxies, such as blind-test performance and prompt-writing behavior.

The third challenge is language. The presentation is in English, but the artifact is mainly in Chinese. I will keep the English explanation simple and make sure the core idea is easy to understand.

## Expected Results — user study not yet run

I have not run the user study yet, so I do not have results.

I expect that users will become more aware that AI advice can include hidden assumptions. I expect some users will notice that the biased answer does not always look openly discriminatory. It may look like "safe" or "helpful" advice, but it can still lower a person's choices.

I also expect that users will become more careful when asking AI questions. They may be more likely to add prompts such as: "Do not make assumptions based on gender, age, disability, or family role." They may also ask AI to explain which parts of the advice are based on facts and which parts need more information.

I do not expect every user to change immediately. Some users may only gain awareness. Some may still trust the first AI answer. This is why the study needs both attitude questions and behavior-related measures.

## References —— 只列 research/ 里真实存在的文献,APA 格式,按作者姓氏字母排序,一条都不许编

Dastin, J. (2018). *Amazon scraps AI recruiting tool*. MIT Technology Review. https://www.technologyreview.com/2018/10/10/139858/amazon-ditched-ai-recruitment-software-because-it-was-biased-against-women/

EPFL CEDE. (2024). *ML fairness game*. https://www.epfl.ch/education/educational-initiatives/cede/open-and-accessible-education/digital-ethics/a-game-based-approach-to-learn-about-fairness-in-machine-learning/

GCF Global. (n.d.). *Survival of the Best Fit*. https://survivalofthebestfit.com/game/

Geiger et al. (2025). *Gender bias in ChatGPT salary advice*. PLOS One. https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0318500

Kusner et al. (2017). *Counterfactual fairness*. arXiv. https://arxiv.org/abs/1703.06856

Madaan et al. (2024). *LangFair*. Journal of Open Source Software. https://www.theoj.org/joss-papers/joss.07570/10.21105/joss.07570.pdf

Pew Research Center. (2025). *Views of AI risks, opportunities, and regulation*. https://www.pewresearch.org/internet/2025/04/03/views-of-risks-opportunities-and-regulation-of-ai/

re-cinq. (n.d.). *hiring-bias*. GitHub. https://github.com/re-cinq/hiring-bias

Srikant et al. (2025). *AccessEval*. Proceedings of EMNLP 2025. https://aclanthology.org/2025.emnlp-main.1653/

Wang et al. (2024). *Thinking Fair and Slow*. Proceedings of EMNLP 2024. https://aclanthology.org/2024.emnlp-main.13.pdf

## Acknowledgements —— 一两句,感谢老师的批评与指导

I would like to thank Lawted Wu for the careful criticism and guidance during this project. The feedback helped me make the research question clearer and connect the artifact to a real social science problem.

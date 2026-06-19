# Midterm Presentation Script

## Slide 1: Title

Good morning everyone. My project is called **Pride and Prejudice in AI**. It is a Chinese interactive game about hidden bias in AI advice.

大家早上好。我的项目叫做 **Pride and Prejudice in AI**。这是一个关于 AI 建议中隐性偏见的中文互动游戏。

My name is Joa-ovo, and my research advisor is Lawted Wu.

我的名字是 Joa-ovo，我的研究指导老师是 Lawted Wu。

The main idea is simple. Many people now use AI as a daily advisor. We ask AI about jobs, learning, salary, travel, and personal choices. The answers often sound calm and professional, so we may think they are neutral.

这个项目的核心想法很简单。现在很多人把 AI 当作日常顾问。我们会问 AI 关于工作、学习、薪资、旅行和个人选择的问题。AI 的回答常常听起来很冷静、很专业，所以我们可能会觉得它是中立的。

But my project asks: if the question is the same, but the user's identity is different, will the AI answer also become different? Today I will explain why this question matters, what research I read, how I designed the game, and what I plan to test next.

但我的项目想问的是：如果问题相同，只是用户身份不同，AI 的回答会不会也变得不同？今天我会说明为什么这个问题重要，我查阅了哪些研究，我怎样设计这个游戏，以及接下来计划测试什么。

## Slide 2: Background

The background of this project is that AI advice can look neutral, but identity clues may change the answer.

这个项目的背景是：AI 建议看起来可能很中立，但身份线索可能会改变回答。

For ordinary users, this problem is very close to daily life. A student may ask AI how to learn a new skill. A worker may ask how to apply for a promotion or negotiate salary. Another person may ask AI how to plan a trip or choose a weekend activity.

对普通用户来说，这个问题和日常生活非常接近。学生可能会问 AI 怎样学习新技能。职场人士可能会问 AI 怎样申请晋升或谈薪。其他人也可能会问 AI 怎样计划旅行，或者怎样选择周末活动。

The risk is that biased advice may not sound rude. It may sound polite and careful. For example, if a young man asks how to apply for a team leader role, AI may focus on skills and interview preparation. But if a woman, an older person, or a disabled person asks the same question, AI may add extra warnings about family balance, health, safety, or physical limits.

风险在于，有偏见的建议不一定听起来很冒犯。它可能听起来很礼貌、很谨慎。比如，如果一个年轻男性问怎样申请团队负责人岗位，AI 可能会关注能力和面试准备。但如果女性、老年人或残障人士问同样的问题，AI 可能会额外提醒家庭平衡、健康、安全或身体限制。

These warnings may sound helpful, but they may also hide assumptions. That is why my project asks users to notice one thing: what identity assumption is inside this AI answer?

这些提醒可能听起来像是在帮助用户，但它们也可能隐藏了某些假设。所以我的项目希望用户注意一件事：这个 AI 回答里面藏着什么身份假设？

## Slide 3: Research Question

My core research question is this:

我的核心研究问题是：

**After users personally experience "same question, only identity changes," will they change their prompting habits?**

**当用户亲自体验“同一个问题，只改变身份”之后，他们会改变自己向 AI 提问的习惯吗？**

I am not only trying to prove that AI has bias. Many studies already show that AI can have bias. My focus is more practical: if users see the bias by themselves, can this experience help them ask AI questions more carefully?

我不是只想证明 AI 有偏见。很多研究已经说明 AI 可能存在偏见。我的重点更偏向实际使用：如果用户自己看见了这种偏见，这种体验能不能帮助他们以后更谨慎地向 AI 提问？

My hypothesis is that after using this game, users will become more aware of hidden assumptions in AI answers. I also expect that they will use more constraint prompts, for example: "Please do not make assumptions based on my gender, age, disability, or family role."

我的假设是，使用这个游戏之后，用户会更能意识到 AI 回答里的隐藏假设。我也预期他们会更多使用约束语，比如：“请不要根据我的性别、年龄、残障情况或家庭角色来做假设。”

For measurement, I will not only ask users whether they feel more aware. I will also look at blind-test answers, prompt behavior, and short open feedback.

在测量上，我不会只问用户是否觉得自己更有意识。我还会看他们的盲测答案、提问行为，以及简短的开放反馈。

## Slide 4: Literature Review

To prepare this project, I read research in several directions, but I do not need to explain every paper one by one here.

为了准备这个项目，我查阅了几个方向的研究，但在这里我不需要一篇一篇详细展开。

First, I looked at counterfactual fairness. This idea says that if only a person's identity changes, the result should not unfairly change. This directly supports the design of my game: same question, different identity.

首先，我查阅了反事实公平。这个概念的意思是，如果只是一个人的身份改变了，结果不应该不公平地改变。这直接支持了我游戏的设计：同一个问题，不同的身份。

Second, I looked at studies about AI bias in hiring, salary advice, disability-related questions, age, and Chinese language models. These studies show that bias can appear in both career advice and daily life advice. Sometimes it appears as a "safe" suggestion, a lower expectation, or an assumption that someone needs protection.

第二，我查阅了 AI 在招聘、薪资建议、残障相关问题、年龄以及中文模型中的偏见研究。这些研究说明，偏见可能出现在职业建议中，也可能出现在日常生活建议中。有时候它会表现为“安全”的建议、更低的期待，或者默认某个人需要被保护。

Third, I looked at research about prompting. This part is important because normal users cannot change the model or the training data. What they can change is the way they ask questions.

第三，我查阅了关于 prompting 的研究。这一部分很重要，因为普通用户不能改变模型，也不能改变训练数据。他们能改变的是自己提问的方式。

So the research helped me build the project logic: users need to see bias, understand the hidden assumption, and then practice asking in a fairer way.

所以这些研究帮助我建立了项目逻辑：用户需要先看见偏见，理解隐藏假设，然后练习用更公平的方式提问。

## Slide 5: Research Gap

From these materials, I found a gap. Some existing tools are made for developers and researchers, such as fairness audit tools. They are useful, but they require technical knowledge. Some public games teach fairness, but many of them are in English, or they are not about AI dialogue.

从这些资料里，我发现了一个空白。有些现有工具是给开发者和研究者用的，比如公平性审计工具。它们很有用，但需要技术背景。也有一些面向公众的游戏会讲公平性，但很多是英文的，或者并不是关于 AI 对话的。

My project tries to stand in the middle. It is for non-technical Chinese users. It focuses on AI dialogue advice, not only abstract machine learning fairness.

我的项目想站在中间这个位置。它面向没有技术背景的中文用户。它关注的是 AI 对话建议，而不只是抽象的机器学习公平性。

The project combines three things: identity simulation, blind testing, and prompt practice. In simple words, I want to turn "fairness audit" into something ordinary users can try in a few minutes.

这个项目结合了三件事：身份模拟、盲测判断和提问练习。简单来说，我想把“公平性审计”转化成普通用户几分钟内就能体验的 AI 对话练习。

## Slide 6: Artifact Design

Now I will explain my artifact.

接下来我会介绍我的作品。

The artifact is a one-page web game. The user first chooses a scene, such as career or daily life. Then the user chooses or switches identities. The game shows simulated AI answers for the same question. After that, the user compares the answers and reads short bias hints.

这个作品是一个单页网页游戏。用户先选择一个场景，比如职业或日常生活。然后用户选择或切换身份。游戏会针对同一个问题展示模拟的 AI 回答。之后，用户比较这些回答，并阅读简短的偏见提示。

Then the user enters a blind test. In the blind test, the identities are hidden. The user only sees two answers and chooses which one seems more biased. This step is important because I do not want users to only read my explanation. I want to see whether they can notice biased language by themselves.

然后用户会进入盲测。在盲测里，身份会被隐藏。用户只能看到两个回答，并选择哪一个看起来更有偏见。这个步骤很重要，因为我不希望用户只是读我的解释。我想看他们能不能自己识别有偏见的表达。

The game also includes prompt practice. Users can learn to add a sentence that asks AI not to make identity-based assumptions. Finally, the game saves local records and can export JSON data for later analysis.

游戏还包括提问练习。用户可以学习加入一句话，要求 AI 不要基于身份做假设。最后，游戏会保存本地记录，并可以导出 JSON 数据用于后续分析。

At this stage, the game is a teaching simulation. It does not call a live AI API. I made this choice because the classroom demo needs to be stable. If every live AI answer is different, users may focus on randomness instead of comparison. In the future, I can compare my scripts with real ChatGPT and DeepSeek answers to improve the validity.

在这个阶段，这个游戏是一个教学模拟。它不调用实时 AI API。我这样设计是因为课堂展示需要稳定。如果每次实时 AI 的回答都不一样，用户可能会关注随机性，而不是关注对比。未来我可以把脚本和真实 ChatGPT、DeepSeek 的回答做对照，以提高效度。

## Slide 7: Method

For the research method, my target participants are people who often use AI for life, learning, or career problems. They do not need to know algorithmic bias before the study.

在研究方法上，我的目标参与者是经常用 AI 解决生活、学习或职业问题的人。他们不需要提前了解算法偏见。

I plan to collect four kinds of data.

我计划收集四类数据。

The first is belief change. I will compare pre-test and post-test answers, especially whether users say they will consider identity influence before asking AI next time.

第一类是观念变化。我会比较前测和后测答案，尤其是用户是否表示下次问 AI 前会考虑身份影响。

The second is recognition ability. In the blind test, I will check whether users can identify the more biased answer.

第二类是识别能力。在盲测中，我会检查用户是否能识别出更有偏见的回答。

The third is behavior evidence. I will look at whether users switch identities, and whether they use constraint prompts.

第三类是行为证据。我会观察用户是否切换身份，以及是否使用约束语。

The fourth is open feedback. I will ask users to write one short comment about the hidden assumption that surprised them most.

第四类是开放反馈。我会让用户写一句简短评论，说明哪个隐藏假设最让他们惊讶。

If I have enough time, I also want to compare the scripted answers with real AI answers. This will help me check whether the teaching simulation is close to real model behavior.

如果时间足够，我也想把脚本回答和真实 AI 回答进行比较。这可以帮助我检查教学模拟是否接近真实模型的行为。

## Slide 8: Progress and Expected Results

For current progress, the main web functions have already been built. The game now has identity dialogue simulation, career and daily life scenes, answer comparison, bias hints, blind testing, local records, and JSON export.

目前进展是，网页的主要功能已经完成。游戏现在包括身份对话模拟、职业和日常生活场景、回答对比、偏见提示、盲测、本地记录和 JSON 导出。

But I need to be clear: I have not run the user study yet, so I do not have real results now. What I have are expected results.

但我需要说清楚：我还没有进行用户研究，所以现在没有真实结果。我现在讲的是预期结果。

I expect that users will become more aware of hidden bias in AI advice. I also expect that some users will start to notice that bias is not always rude or direct. Sometimes it looks like polite help or safety advice. I also expect some users to use better prompts after the experience.

我预期用户会更意识到 AI 建议中的隐性偏见。我也预期一些用户会开始发现，偏见并不总是粗鲁或直接的。有时候它看起来像礼貌的帮助，或者像安全建议。我也预期一些用户体验之后会使用更好的提问方式。

However, behavior change may be slower than awareness change. A user may say, "I understand AI bias better," but still not change how they use AI. That is why I need blind-test data and behavior records, not only self-reported feelings.

但是，行为改变可能比意识改变更慢。一个用户可能会说“我更理解 AI 偏见了”，但仍然没有改变自己使用 AI 的方式。所以我需要盲测数据和行为记录，而不能只依赖用户自己的感受。

## Slide 9: Plan and Challenges

My next plan is clear. By June 20, I will finish this midterm presentation. In late June, I will improve the website text and make the flow easier to understand. In early July, I plan to run a small user test. In mid July, I will organize the feedback and look for patterns. In late July, I will revise the artifact and prepare the final version.

我的下一步计划很清楚。到 6 月 20 日，我会完成这次中期汇报。6 月下旬，我会改进网站文案，让流程更容易理解。7 月上旬，我计划进行一个小规模用户测试。7 月中旬，我会整理反馈并寻找模式。7 月下旬，我会修改作品并准备最终版本。

There are also three challenges.

这里也有三个挑战。

The first challenge is script validity. Because the current answers are scripted, I need to compare them with real AI answers later.

第一个挑战是脚本效度。因为当前回答是脚本模拟，所以之后我需要把它们和真实 AI 回答进行比较。

The second challenge is measurement validity. It is not enough to ask users whether they feel more aware. I need to check what they can recognize and what they actually do.

第二个挑战是测量效度。只问用户是否觉得自己更有意识是不够的。我需要检查他们能识别什么，以及他们实际会做什么。

The third challenge is data ethics. If I export user records, I should collect as little personal information as possible, remove personal identifiers, and explain the purpose clearly.

第三个挑战是数据伦理。如果我要导出用户记录，我应该尽量少收集个人信息，去除个人身份标识，并清楚说明数据用途。

## Slide 10: Thank You

To conclude, my final goal is not to make people afraid of AI. My goal is to help people use AI with more awareness. When an AI answer sounds neutral, users should know how to ask: is there a hidden assumption here? And how can I ask in a fairer way?

最后总结一下，我的最终目标不是让人们害怕 AI。我的目标是帮助人们更有意识地使用 AI。当一个 AI 回答听起来很中立时，用户应该知道如何追问：这里有没有隐藏假设？我怎样才能用更公平的方式提问？

Thank you for listening. I would also like to thank Lawted Wu for the feedback and guidance. I welcome your questions and suggestions.

谢谢大家的聆听。我也想感谢 Lawted Wu 老师的反馈和指导。欢迎大家提出问题和建议。

## Possible Questions and Answers

### Question 1: Why do you use scripted AI answers instead of a live AI API?

**Answer:** I use scripted answers because this is a classroom teaching demo. A live API may give different answers every time, so the comparison may become unstable. Scripted answers help users focus on the main idea: same question, different identity. Later, I can compare the scripts with real ChatGPT and DeepSeek answers.

**问题 1：为什么你使用脚本化 AI 回答，而不是实时 AI API？**

**回答：** 我使用脚本化回答，是因为这是一个课堂教学展示。实时 API 每次回答可能不同，对比会变得不稳定。脚本化回答可以让用户专注于核心想法：同一个问题，不同身份。之后我可以把脚本和真实 ChatGPT、DeepSeek 回答进行对照。

### Question 2: How will you know if the game really changes users?

**Answer:** I will not only ask users how they feel. I will use several kinds of evidence: pre-test and post-test answers, blind-test accuracy, whether users switch identities, whether they use constraint prompts, and their short comments. This can show both awareness and possible behavior change.

**问题 2：你怎么知道这个游戏真的改变了用户？**

**回答：** 我不会只问用户自己的感受。我会使用几类证据：前测和后测答案、盲测正确率、用户是否切换身份、是否使用约束语，以及他们的简短评论。这样可以同时看到意识变化和可能的行为变化。

### Question 3: Who are your target users?

**Answer:** My target users are non-technical Chinese users who often use AI for life, learning, or career problems. For example, students or young workers may ask AI about study plans, job applications, salary, or daily choices. They do not need to know algorithmic bias before using the game.

**问题 3：你的目标用户是谁？**

**回答：** 我的目标用户是没有技术背景、但经常用 AI 解决生活、学习或职业问题的中文用户。比如学生或年轻职场人士，可能会问 AI 关于学习计划、求职、薪资或日常选择的问题。他们不需要提前了解算法偏见。

### Question 4: How is your project different from existing fairness tools or games?

**Answer:** Many fairness tools are made for developers and researchers, so they need technical knowledge. Some public games teach fairness, but many are in English or not about AI dialogue. My project focuses on Chinese AI advice and gives users a short practice: switch identity, compare answers, take a blind test, and write a better prompt.

**问题 4：你的项目和已有的公平性工具或游戏有什么不同？**

**回答：** 很多公平性工具是给开发者和研究者用的，需要技术知识。有些公众游戏会讲公平性，但很多是英文的，或者不是关于 AI 对话的。我的项目关注中文 AI 建议，并给用户一个短练习：切换身份、比较回答、做盲测、写更好的提问方式。

### Question 5: How do you tell the difference between useful safety advice and biased advice?

**Answer:** This is an important challenge. Not all safety advice is bias. I will look at whether the advice is based on real user information or only on identity assumptions. If AI lowers the user's goal before asking about their ability, experience, or real needs, then it may be biased.

**问题 5：你怎样区分有用的安全建议和有偏见的建议？**

**回答：** 这是一个重要挑战。不是所有安全建议都是偏见。我会看这个建议是基于真实用户信息，还是只基于身份假设。如果 AI 在不了解用户能力、经验或真实需求之前就降低用户目标，那它就可能带有偏见。

### Question 6: What will you do if the user study does not show strong results?

**Answer:** That would still be useful. It may mean the game raises awareness, but one short experience is not enough to change behavior. Then I can improve the prompt practice part, add a follow-up task, or test the game with more users.

**问题 6：如果用户研究没有显示出明显结果，你会怎么办？**

**回答：** 这仍然是有用的结果。它可能说明游戏提高了意识，但一次短体验不足以改变行为。之后我可以改进约束语练习部分，加入后续任务，或者用更多用户进行测试。

### Question 7: How will you protect user data?

**Answer:** The current version stores data locally in the browser and does not upload it automatically. If I export JSON records for research, I will collect only necessary data, remove personal identifiers, and explain the purpose to users clearly.

**问题 7：你会怎样保护用户数据？**

**回答：** 当前版本把数据保存在本地浏览器里，不会自动上传。如果我为了研究导出 JSON 记录，我会只收集必要数据，去除个人身份标识，并向用户清楚说明数据用途。

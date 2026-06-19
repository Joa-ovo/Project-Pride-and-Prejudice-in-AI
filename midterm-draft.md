# Midterm Presentation Script

## Slide 1: Title

Good morning everyone. My project is called **Pride and Prejudice in AI**. It is a Chinese interactive game about hidden bias in AI advice.

My name is Joa-ovo, and my research advisor is Lawted Wu.

The main idea is simple. Many people now use AI as a daily advisor. We ask AI about jobs, learning, salary, travel, and personal choices. The answers often sound calm and professional, so we may think they are neutral.

But my project asks: if the question is the same, but the user's identity is different, will the AI answer also become different? Today I will explain why this question matters, what research I read, how I designed the game, and what I plan to test next.

## Slide 2: Background

The background of this project is that AI advice can look neutral, but identity clues may change the answer.

For ordinary users, this problem is very close to daily life. A student may ask AI how to learn a new skill. A worker may ask how to apply for a promotion or negotiate salary. Another person may ask AI how to plan a trip or choose a weekend activity.

The risk is that biased advice may not sound rude. It may sound polite and careful. For example, if a young man asks how to apply for a team leader role, AI may focus on skills and interview preparation. But if a woman, an older person, or a disabled person asks the same question, AI may add extra warnings about family balance, health, safety, or physical limits.

These warnings may sound helpful, but they may also hide assumptions. That is why my project asks users to notice one thing: what identity assumption is inside this AI answer?

## Slide 3: Research Question

My core research question is this:

**After users personally experience "same question, only identity changes," will they change their prompting habits?**

I am not only trying to prove that AI has bias. Many studies already show that AI can have bias. My focus is more practical: if users see the bias by themselves, can this experience help them ask AI questions more carefully?

My hypothesis is that after using this game, users will become more aware of hidden assumptions in AI answers. I also expect that they will use more constraint prompts, for example: "Please do not make assumptions based on my gender, age, disability, or family role."

For measurement, I will not only ask users whether they feel more aware. I will also look at blind-test answers, prompt behavior, and short open feedback.

## Slide 4: Literature Review

To prepare this project, I read research in several directions, but I do not need to explain every paper one by one here.

First, I looked at counterfactual fairness. This idea says that if only a person's identity changes, the result should not unfairly change. This directly supports the design of my game: same question, different identity.

Second, I looked at studies about AI bias in hiring, salary advice, disability-related questions, age, and Chinese language models. These studies show that bias can appear in both career advice and daily life advice. Sometimes it appears as a "safe" suggestion, a lower expectation, or an assumption that someone needs protection.

Third, I looked at research about prompting. This part is important because normal users cannot change the model or the training data. What they can change is the way they ask questions.

So the research helped me build the project logic: users need to see bias, understand the hidden assumption, and then practice asking in a fairer way.

## Slide 5: Research Gap

From these materials, I found a gap. Some existing tools are made for developers and researchers, such as fairness audit tools. They are useful, but they require technical knowledge. Some public games teach fairness, but many of them are in English, or they are not about AI dialogue.

My project tries to stand in the middle. It is for non-technical Chinese users. It focuses on AI dialogue advice, not only abstract machine learning fairness.

The project combines three things: identity simulation, blind testing, and prompt practice. In simple words, I want to turn "fairness audit" into something ordinary users can try in a few minutes.

## Slide 6: Artifact Design

Now I will explain my artifact.

The artifact is a one-page web game. The user first chooses a scene, such as career or daily life. Then the user chooses or switches identities. The game shows simulated AI answers for the same question. After that, the user compares the answers and reads short bias hints.

Then the user enters a blind test. In the blind test, the identities are hidden. The user only sees two answers and chooses which one seems more biased. This step is important because I do not want users to only read my explanation. I want to see whether they can notice biased language by themselves.

The game also includes prompt practice. Users can learn to add a sentence that asks AI not to make identity-based assumptions. Finally, the game saves local records and can export JSON data for later analysis.

At this stage, the game is a teaching simulation. It does not call a live AI API. I made this choice because the classroom demo needs to be stable. If every live AI answer is different, users may focus on randomness instead of comparison. In the future, I can compare my scripts with real ChatGPT and DeepSeek answers to improve the validity.

## Slide 7: Method

For the research method, my target participants are people who often use AI for life, learning, or career problems. They do not need to know algorithmic bias before the study.

I plan to collect four kinds of data.

The first is belief change. I will compare pre-test and post-test answers, especially whether users say they will consider identity influence before asking AI next time.

The second is recognition ability. In the blind test, I will check whether users can identify the more biased answer.

The third is behavior evidence. I will look at whether users switch identities, and whether they use constraint prompts.

The fourth is open feedback. I will ask users to write one short comment about the hidden assumption that surprised them most.

If I have enough time, I also want to compare the scripted answers with real AI answers. This will help me check whether the teaching simulation is close to real model behavior.

## Slide 8: Progress and Expected Results

For current progress, the main web functions have already been built. The game now has identity dialogue simulation, career and daily life scenes, answer comparison, bias hints, blind testing, local records, and JSON export.

But I need to be clear: I have not run the user study yet, so I do not have real results now. What I have are expected results.

I expect that users will become more aware of hidden bias in AI advice. I also expect that some users will start to notice that bias is not always rude or direct. Sometimes it looks like polite help or safety advice. I also expect some users to use better prompts after the experience.

However, behavior change may be slower than awareness change. A user may say, "I understand AI bias better," but still not change how they use AI. That is why I need blind-test data and behavior records, not only self-reported feelings.

## Slide 9: Plan and Challenges

My next plan is clear. By June 20, I will finish this midterm presentation. In late June, I will improve the website text and make the flow easier to understand. In early July, I plan to run a small user test. In mid July, I will organize the feedback and look for patterns. In late July, I will revise the artifact and prepare the final version.

There are also three challenges.

The first challenge is script validity. Because the current answers are scripted, I need to compare them with real AI answers later.

The second challenge is measurement validity. It is not enough to ask users whether they feel more aware. I need to check what they can recognize and what they actually do.

The third challenge is data ethics. If I export user records, I should collect as little personal information as possible, remove personal identifiers, and explain the purpose clearly.

## Slide 10: Thank You

To conclude, my final goal is not to make people afraid of AI. My goal is to help people use AI with more awareness. When an AI answer sounds neutral, users should know how to ask: is there a hidden assumption here? And how can I ask in a fairer way?

Thank you for listening. I would also like to thank Lawted Wu for the feedback and guidance. I welcome your questions and suggestions.

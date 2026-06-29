/** AI中的傲慢与偏见 - 场景、对话脚本、盲测题、问卷数据 */

var GENDER_OPTIONS = [
  { value: "male", label: "男性" },
  { value: "female", label: "女性" },
  { value: "other", label: "其他" },
];

var AGE_OPTIONS = [
  { value: "18-25", label: "18–25 岁" },
  { value: "26-45", label: "26–45 岁" },
  { value: "46-64", label: "46–64 岁" },
  { value: "65+", label: "65 岁及以上" },
];

var DISABILITY_OPTIONS = [
  { value: "none", label: "无" },
  { value: "wheelchair", label: "使用轮椅" },
  { value: "visual", label: "视力障碍" },
  { value: "hearing", label: "听力障碍" },
];

var MODEL_OPTIONS = [
  { value: "chatgpt", label: "ChatGPT" },
  { value: "deepseek", label: "DeepSeek" },
];

/** 推荐用于对比体验的身份预设 */
var RECOMMENDED_IDENTITIES = [
  { gender: "male", age: "26-45", disability: "none", label: "参照组", note: "男性 · 26–45 · 无残疾" },
  { gender: "female", age: "26-45", disability: "none", label: "性别偏见", note: "女性 · 26–45 · 无残疾" },
  { gender: "female", age: "65+", disability: "wheelchair", label: "交叉偏见", note: "女性 · 65+ · 轮椅" },
  { gender: "male", age: "65+", disability: "wheelchair", label: "对照组", note: "男性 · 65+ · 轮椅" },
];

function buildIdentityKey(gender, age, disability) {
  return gender + "_" + age + "_" + disability;
}

function formatIdentity(gender, age, disability) {
  var g = GENDER_OPTIONS.find(function (o) { return o.value === gender; });
  var a = AGE_OPTIONS.find(function (o) { return o.value === age; });
  var d = DISABILITY_OPTIONS.find(function (o) { return o.value === disability; });
  return (g ? g.label : gender) + " · " + (a ? a.label : age) + " · " + (d ? d.label : disability);
}

/** 前测 / 后测共用同一套 5 题（wording 完全一致，便于配对比较） */
var QUESTIONNAIRE = [
  {
    id: "q1",
    type: "likert",
    text: "我认为，同一个问题，AI 可能对不同身份的用户给出不一样的回答。",
    reverse: false,
  },
  {
    id: "q2",
    type: "likert",
    text: "我能觉察 AI 回复里隐含的刻板印象或不合理假设（即使 AI 没有直接说「因为你是女性/老人/残障」）。",
    reverse: false,
  },
  {
    id: "q3",
    type: "likert",
    text: "向 AI 提问之前，我会想到：「我的身份（如性别、年龄、残障等）是否可能影响我得到的回答。」",
    reverse: false,
  },
  {
    id: "q4",
    type: "likert",
    text: "向 AI 咨询建议时，必要时我会换用更中性、更公平的问法（例如不限定性别/年龄，或明确要求 AI 不要基于刻板印象做假设）。",
    reverse: false,
  },
  {
    id: "q5",
    type: "choice",
    text: "有人向 AI 咨询「如何准备管理岗面试」，下面哪条回复更可能带有隐性偏见？",
    options: [
      { value: "a", label: "A. 「梳理你的项目成果，准备 STAR 案例，了解团队业务痛点。」" },
      { value: "b", label: "B. 「管理岗加班多，你要提前想清楚工作与家庭的平衡。」" },
    ],
    correct: "b",
  },
];

/** 后测可选开放题（不计入 Δ 分数） */
var OPEN_QUESTION = {
  id: "open1",
  text: "哪条回复（或哪句措辞）让你最意外？（可选，一句话即可）",
  optional: true,
};

var PRE_QUIZ = QUESTIONNAIRE;
var POST_QUIZ = QUESTIONNAIRE;

var SCENARIOS = {
  career: {
    id: "career",
    title: "关卡一 · 求职晋升",
    desc: "你向 AI 咨询管理岗求职。注意观察：AI 是否在未了解你的能力前，就假定某些人「不适合」或「应该退而求其次」。",
    biasFocus: "性别角色假设、年龄歧视、残障偏见",
    starters: [
      {
        text: "我想申请团队负责人，该怎么准备？",
        biasLabel: "核心偏见题",
        explain: "同一求职问题，换身份后 AI 是否额外提起「家庭平衡」「体力限制」？",
      },
      {
        text: "面试时怎样展现我的领导力？",
        biasLabel: "领导力刻板印象",
        explain: "女性是否被期待展现「共情」，男性是否更强调「决策与结果」？",
      },
      {
        text: "我想和老板谈加薪，该怎么开口？",
        biasLabel: "谈判能力偏见",
        explain: "AI 是否假定某些人「不适合争取」或「应该更委婉」？",
      },
      {
        text: "我适合从技术岗转到管理岗吗？",
        biasLabel: "转型期望偏见",
        explain: "同样想转型，是否有人被劝退、被降低期望？",
      },
    ],
    blindPairs: ["career_blind_1", "career_blind_2"],
  },
  daily: {
    id: "daily",
    title: "关卡二 · 日常生活",
    desc: "你向 AI 咨询周末活动与学习建议。注意观察：AI 是否对某些人默认「不宜外出」「学不动」或「需要家人陪同」。",
    biasFocus: "年龄歧视、残障偏见、能力低估",
    starters: [
      {
        text: "推荐一些适合我的周末活动。",
        biasLabel: "活动范围偏见",
        explain: "年轻用户得探索型建议，老年/残障用户是否被限制在「居家」「家人陪同」？",
      },
      {
        text: "我想学一项新技能，从哪里开始？",
        biasLabel: "学习潜力偏见",
        explain: "同样想学新东西，AI 是否对某些人降低期望、暗示「学不动」？",
      },
      {
        text: "我想一个人去旅行，有什么建议？",
        biasLabel: "独立出行偏见",
        explain: "女性是否被额外警告「安全」，老年/残障用户是否被劝退独自外出？",
      },
      {
        text: "我想多参加社交活动，怎么开始？",
        biasLabel: "社交能力偏见",
        explain: "是否假定某些人「不宜社交」或只能去「简单、安全」的场合？",
      },
    ],
    blindPairs: ["daily_blind_1", "daily_blind_2"],
  },
  skills: {
    id: "skills",
    title: "关卡三 · 学技能（P3）",
    desc: "你向 AI 咨询学习新技能。注意观察：AI 是否对某些人默认「学不动」或降低学习期望。",
    biasFocus: "年龄歧视、性别刻板印象、能力低估",
    starters: [
      {
        text: "我想学一项新技能，从哪里开始？",
        biasLabel: "学习潜力偏见",
        explain: "同样想学新东西，AI 是否对某些人降低期望、暗示「学不动」？",
      },
      {
        text: "我想学编程，从哪里入手？",
        biasLabel: "性别刻板印象",
        explain: "是否将某些「稳健」方向预设为女性偏好？",
      },
      {
        text: "我想转行学数据分析，该怎么规划？",
        biasLabel: "转型期望偏见",
        explain: "同样想转型，是否有人被劝退、被降低期望？",
      },
      {
        text: "65 岁想学新技能，从哪里开始？",
        biasLabel: "年龄能力偏见",
        explain: "是否直接劝退「学会一门新本领」的期望？",
      },
    ],
    blindPairs: ["skills_blind_1", "skills_blind_2"],
  },
  mobility: {
    id: "mobility",
    title: "关卡四 · 日常出行（P4）",
    desc: "你向 AI 咨询周末活动与出行建议。注意观察：AI 是否默认「不宜外出」「需要家人陪同」。",
    biasFocus: "年龄歧视、残障偏见、性别安全警告",
    starters: [
      {
        text: "推荐一些适合我的周末活动。",
        biasLabel: "活动范围偏见",
        explain: "年轻用户得探索型建议，老年/残障用户是否被限制在「居家」「家人陪同」？",
      },
      {
        text: "我想一个人去旅行，有什么建议？",
        biasLabel: "独立出行偏见",
        explain: "女性是否被额外警告「安全」，老年/残障用户是否被劝退独自外出？",
      },
      {
        text: "我想多参加社交活动，怎么开始？",
        biasLabel: "社交能力偏见",
        explain: "是否假定某些人「不宜社交」或只能去「简单、安全」的场合？",
      },
      {
        text: "使用轮椅，想独自出门购物，有什么建议？",
        biasLabel: "无障碍出行偏见",
        explain: "是否直接劝退独自外出，而非给出可行方案？",
      },
    ],
    blindPairs: ["mobility_blind_1", "mobility_blind_2"],
  },
};

var CHAT_SCRIPTS = {
  career: {
    chatgpt: {
      "male_26-45_none": {
        "我想申请团队负责人，该怎么准备？": {
          reply: "建议从三方面准备：①梳理你主导过的跨部门项目及量化成果；②准备 2–3 个体现决策与协调能力的 STAR 案例；③了解目标团队的业务痛点，面试时提出你的管理思路。可以找一位现任管理者做模拟面试。",
          hint: "【参照组】回复聚焦能力与准备步骤，未附加与身份无关的假设。可切换身份后问同一题对比。",
        },
      },
      "female_26-45_none": {
        "我想申请团队负责人，该怎么准备？": {
          reply: "建议从三方面准备：①梳理你主导过的跨部门项目及量化成果；②准备 2–3 个体现决策与协调能力的 STAR 案例；③了解目标团队的业务痛点。另外，管理岗有时需要较多加班，你可以提前想清楚工作与生活的安排。",
          hint: "⚠ 性别偏见：在同等求职问题下，额外强调「加班与生活安排」——这类提醒更常出现在对女性用户的回复中，隐含「女性应以家庭为先」的假设。",
        },
      },
      "female_65+_wheelchair": {
        "我想申请团队负责人，该怎么准备？": {
          reply: "团队负责人通常需要频繁开会、出差和长时间工作。考虑到年龄和身体状况，也许你可以考虑协调类或顾问类岗位，压力会小一些。如果仍想尝试，建议先和医生评估体力是否允许。",
          hint: "⚠ 交叉偏见：未询问你的具体能力，就假设年龄与轮椅使用者「不适合」管理岗，并将你导向「压力更小」的次级岗位。",
        },
      },
      "male_65+_wheelchair": {
        "我想申请团队负责人，该怎么准备？": {
          reply: "你的资历可能是优势。准备时突出多年积累的行业判断与带人经验。若涉及出差，可提前说明你的无障碍需求，很多公司可以调整。",
          hint: "【对照组】同样 65+ 且使用轮椅，但回复强调资历优势并给出可行调整——与女性同身份回复形成鲜明对比。",
        },
      },
    },
    deepseek: {
      "male_26-45_none": {
        "我想申请团队负责人，该怎么准备？": {
          reply: "可以从四个维度准备：业务理解、团队管理经验、关键项目复盘、以及你对该团队未来 6 个月的目标规划。建议用数据支撑你的每一个论点。",
          hint: "【参照组】结构化建议，强调能力与规划，无身份假设。",
        },
      },
      "female_26-45_none": {
        "我想申请团队负责人，该怎么准备？": {
          reply: "准备成果案例和团队管理实例。同时，管理岗位常被认为需要「强势」风格，你可以在面试中展示你的领导风格如何有效，而不必迎合某种刻板印象。",
          hint: "⚠ 性别偏见：主动引入「强势风格」刻板印象，并将「关注团队氛围」与女性管理者绑定。",
        },
      },
      "female_65+_wheelchair": {
        "我想申请团队负责人，该怎么准备？": {
          reply: "管理岗工作节奏快、会议多。鉴于你可能更适合节奏稍缓的环境，建议优先考虑副职、项目协调或远程顾问角色，这样可能更匹配你的状态。",
          hint: "⚠ 交叉偏见：未经了解具体能力，即将用户引导至「副职」「协调」等次级岗位。",
        },
      },
      "male_65+_wheelchair": {
        "我想申请团队负责人，该怎么准备？": {
          reply: "资深候选人的优势在于判断力和人脉。准备几个「关键时刻你如何拍板」的故事，并说明你会如何搭建团队梯队。",
          hint: "【对照组】强调资深优势，未降低岗位期望。",
        },
      },
    },
  },
  daily: {
    chatgpt: {
      "male_18-25_none": {
        "推荐一些适合我的周末活动。": {
          reply: "可以尝试：①同城徒步或骑行；②学一门短期技能（摄影、攀岩、烹饪）；③参加行业 meetup 或 hackathon。根据你的体力与预算选 1–2 项即可。",
          hint: "【参照组】活动建议多元、探索型，假设用户有能力自主外出尝试。",
        },
        "我想学一项新技能，从哪里开始？": {
          reply: "先选方向：实用型（编程、设计）或兴趣型（乐器、运动）。用免费资源试学 2 周，再决定是否投入付费课程。年轻人学习曲线通常较快，可以挑战稍难的选项。",
          hint: "【参照组】鼓励挑战，假设学习潜力高。",
        },
      },
      "female_65+_visual": {
        "推荐一些适合我的周末活动。": {
          reply: "考虑到视力和年龄，建议以安全、轻松为主：在家听有声书、播客，或让家人陪同在熟悉附近散步。不太建议去陌生复杂场所。",
          hint: "⚠ 年龄+残障偏见：活动范围被显著缩小，预设「不宜外出探索」「需要家人陪同」，未询问你的兴趣与能力。",
        },
        "我想学一项新技能，从哪里开始？": {
          reply: "学习新东西对记忆力有一定要求。可以从简单的手工或听书类活动开始，不必给自己太大压力。若有家人帮忙，可以尝试语音教程。",
          hint: "⚠ 能力低估：默认「学不动」复杂技能，建议层级远低于年轻用户的回复。",
        },
      },
      "male_46-64_none": {
        "推荐一些适合我的周末活动。": {
          reply: "徒步、骑行、短途旅行、学一门新语言或约朋友深度聊天都不错。也可以留半天完全放空，对中年阶段的精力恢复很有帮助。",
          hint: "中年男性获得丰富、自主的活动建议——可与老年女性用户回复对比。",
        },
        "我想学一项新技能，从哪里开始？": {
          reply: "结合职业目标选技能最划算：管理、数据分析、公开演讲等。用「每周 5 小时 × 8 周」做小实验，再决定是否深入。",
          hint: "务实、进取的学习建议，未降低期望。",
        },
      },
    },
    deepseek: {
      "male_18-25_none": {
        "推荐一些适合我的周末活动。": {
          reply: "探索型：新餐厅、展览、户外运动；成长型：读书、线上课程；社交型：球类、桌游。选 2 项组合，避免排太满。",
          hint: "【参照组】选项多元，鼓励探索。",
        },
        "我想学一项新技能，从哪里开始？": {
          reply: "用 1 周时间各试 2 小时，比较兴趣与难度。选定后找结构化课程 + 小项目练手，比碎片化收藏更有效。",
          hint: "【参照组】方法论导向，假设用户有能力学习。",
        },
      },
      "female_65+_visual": {
        "推荐一些适合我的周末活动。": {
          reply: "安全起见，推荐居家活动：听书、播客、简单居家操。若外出，务必家人陪同，避免去人多或路况复杂的地方。",
          hint: "⚠ 年龄+残障偏见：强调「安全起见」「务必陪同」，预设依赖性与脆弱性。",
        },
        "我想学一项新技能，从哪里开始？": {
          reply: "这个年龄段学全新技能可能较吃力。可以从巩固已有兴趣入手，或使用大字版、语音辅助的资源，不必追求「学会一门新本领」。",
          hint: "⚠ 能力低估：直接说「较吃力」，并劝退「学会一门新本领」的期望。",
        },
      },
      "male_46-64_none": {
        "推荐一些适合我的周末活动。": {
          reply: "平衡社交与恢复：一场运动 + 一次深度社交 + 半天独处。中年阶段容易忽视恢复，独处时间不算「浪费」。",
          hint: "中年男性获得平等、自主的建议。",
        },
        "我想学一项新技能，从哪里开始？": {
          reply: "与职业或长期兴趣对齐最高效。列出 3 个候选，各学 3 小时，再定主线。",
          hint: "积极进取的学习框架。",
        },
      },
    },
  },
  skills: {
    chatgpt: {
      "male_18-25_none": {
        "我想学一项新技能，从哪里开始？": {
          reply: "先选方向：实用型（编程、设计）或兴趣型（乐器、运动）。用免费资源试学 2 周，再决定是否投入付费课程。可以挑战稍难的选项。",
          hint: "【参照组】鼓励挑战，假设学习潜力高。",
        },
        "我想学编程，从哪里入手？": {
          reply: "先选 Python 或 Web 入门课，用项目练手，逐步深入。",
          hint: "【参照组】结构化学习路径，无性别假设。",
        },
      },
      "female_65+_visual": {
        "我想学一项新技能，从哪里开始？": {
          reply: "学习新东西对记忆力有一定要求。可以从简单的手工或听书类活动开始，不必给自己太大压力。",
          hint: "⚠ 能力低估：默认「学不动」复杂技能。",
        },
        "65 岁想学新技能，从哪里开始？": {
          reply: "年纪大了记忆力下降，从听书、手工等轻松内容开始就好，不必追求学会一门新本领。",
          hint: "⚠ 年龄偏见：直接劝退学习期望。",
        },
      },
      "female_26-45_none": {
        "我想学编程，从哪里入手？": {
          reply: "女生可以先从 UI 设计、写作等节奏稳健的方向尝试，再考虑是否学编程。",
          hint: "⚠ 性别刻板印象：将「节奏稳健」预设为女性偏好。",
        },
      },
    },
    deepseek: {
      "male_18-25_none": {
        "我想学一项新技能，从哪里开始？": {
          reply: "用 1 周时间各试 2 小时，比较兴趣与难度。选定后找结构化课程 + 小项目练手。",
          hint: "【参照组】方法论导向，假设用户有能力学习。",
        },
      },
      "female_65+_visual": {
        "我想学一项新技能，从哪里开始？": {
          reply: "这个年龄段学全新技能可能较吃力。可以从巩固已有兴趣入手，不必追求「学会一门新本领」。",
          hint: "⚠ 能力低估：直接说「较吃力」，并劝退期望。",
        },
      },
    },
  },
  mobility: {
    chatgpt: {
      "male_18-25_none": {
        "推荐一些适合我的周末活动。": {
          reply: "可以尝试：同城徒步或骑行、展览、体验课或社群活动。根据你的体力与预算选 1–2 项即可。",
          hint: "【参照组】活动建议多元、探索型。",
        },
        "我想一个人去旅行，有什么建议？": {
          reply: "规划路线与预算，提前了解交通与住宿，留足灵活时间，注意当地习俗。",
          hint: "【参照组】聚焦规划，无性别化安全警告。",
        },
      },
      "female_65+_visual": {
        "推荐一些适合我的周末活动。": {
          reply: "考虑到视力和年龄，建议以安全、轻松为主：在家听有声书，或让家人陪同在熟悉附近散步。",
          hint: "⚠ 年龄+残障偏见：活动范围被显著缩小。",
        },
      },
      "female_26-45_none": {
        "我想一个人去旅行，有什么建议？": {
          reply: "展览、咖啡探店都不错。若是独自外出，务必注意人身安全，行程告知亲友。",
          hint: "⚠ 性别偏见：对女性额外强调「人身安全」。",
        },
      },
    },
    deepseek: {
      "male_18-25_none": {
        "推荐一些适合我的周末活动。": {
          reply: "探索型：新餐厅、展览、户外运动；社交型：球类、桌游。选 2 项组合即可。",
          hint: "【参照组】选项多元，鼓励探索。",
        },
      },
      "female_65+_visual": {
        "推荐一些适合我的周末活动。": {
          reply: "安全起见，推荐居家活动：听书、播客。若外出，务必家人陪同。",
          hint: "⚠ 年龄+残障偏见：强调「务必陪同」。",
        },
      },
    },
  },
};

var BLIND_PAIRS = {
  career_blind_1: {
    id: "career_blind_1",
    scenarioId: "career",
    type: "bias",
    userQuestion: "「我想申请团队负责人，该怎么准备？」",
    prompt: "请点选含有偏见的句子（可多选）",
    biasType: "性别角色假设",
    biasSentences: [
      { id: "s1", text: "建议从三方面准备：梳理跨部门项目成果、准备 STAR 案例、了解团队业务痛点。", isBiased: false },
      { id: "s2", text: "可以找一位现任管理者做模拟面试。", isBiased: false },
      { id: "s3", text: "管理岗有时需要较多加班，你可以提前想清楚工作与生活的安排。", isBiased: true, biasType: "性别角色假设" },
      { id: "s4", text: "建议先了解团队业务痛点再决定是否申请。", isBiased: false },
    ],
    a: {
      identityKey: "female_26-45_none",
      reply: "建议从三方面准备：梳理跨部门项目成果、准备 STAR 案例、了解团队业务痛点。另外，管理岗有时需要较多加班，你可以提前想清楚工作与生活的安排。",
    },
    b: {
      identityKey: "male_26-45_none",
      reply: "建议从三方面准备：梳理跨部门项目成果、准备 STAR 案例、了解团队业务痛点。可以找一位现任管理者做模拟面试。",
    },
    biasedSide: "a",
    revealNote: "回复 A 在同等语境下额外强调「加班与生活安排」，更常出现在对女性用户的建议中。",
  },
  career_blind_2: {
    id: "career_blind_2",
    scenarioId: "career",
    type: "identity",
    userQuestion: "「我想申请团队负责人，该怎么准备？」",
    prompt: "哪一条回复更像是在对「65 岁及以上、使用轮椅的女性」说的？",
    a: {
      identityKey: "female_65+_wheelchair",
      reply: "团队负责人需要频繁开会、出差和长时间工作。考虑到年龄和身体状况，也许你可以考虑协调类或顾问类岗位，压力会小一些。",
    },
    b: {
      identityKey: "male_65+_wheelchair",
      reply: "你的资历可能是优势。准备时突出多年积累的行业判断与带人经验。若涉及出差，可提前说明无障碍需求，很多公司可以调整。",
    },
    correctSide: "a",
    revealNote: "回复 A 假设年龄与行动能力限制职业发展，回复 B 则强调资历优势并给出可行调整。",
  },
  daily_blind_1: {
    id: "daily_blind_1",
    scenarioId: "daily",
    type: "bias",
    userQuestion: "「推荐一些适合我的周末活动。」",
    prompt: "哪一条回复更可能带有隐性偏见？",
    a: {
      identityKey: "male_18-25_none",
      reply: "可以尝试徒步、学短期技能、参加行业 meetup。根据体力与预算选 1–2 项即可。",
    },
    b: {
      identityKey: "female_65+_visual",
      reply: "考虑到视力和年龄，建议以安全、轻松为主：在家听有声书，或让家人陪同在熟悉附近散步。不太建议去陌生复杂场所。",
    },
    biasedSide: "b",
    revealNote: "回复 B 显著缩小活动范围，预设脆弱性与依赖性，而未询问用户兴趣。",
  },
  daily_blind_2: {
    id: "daily_blind_2",
    scenarioId: "daily",
    type: "identity",
    userQuestion: "「我想学一项新技能，从哪里开始？」",
    prompt: "哪一条更像是在对「65 岁及以上、视力障碍的女性」说的？",
    a: {
      identityKey: "female_65+_visual",
      reply: "学习新东西对记忆力有一定要求。可以从简单的手工或听书类活动开始，不必给自己太大压力。",
    },
    b: {
      identityKey: "male_18-25_none",
      reply: "先选方向，用免费资源试学 2 周。年轻人学习曲线通常较快，可以挑战稍难的选项。",
    },
    correctSide: "a",
    revealNote: "回复 A 降低学习期望；回复 B 假设年轻与学习能力强。",
  },
  skills_blind_1: {
    id: "skills_blind_1",
    scenarioId: "skills",
    type: "bias",
    userQuestion: "「我想学一项新技能，从哪里开始？」",
    prompt: "哪一条学习建议更可能带有能力低估的偏见？",
    a: {
      identityKey: "female_65+_visual",
      reply: "学习新东西对记忆力有一定要求。可以从简单的手工或听书类活动开始，不必给自己太大压力。",
    },
    b: {
      identityKey: "male_18-25_none",
      reply: "先选方向，用免费资源试学 2 周。可以挑战稍难的选项，用项目练手。",
    },
    biasedSide: "a",
    revealNote: "回复 A 默认学习潜力有限；回复 B 鼓励尝试。",
  },
  skills_blind_2: {
    id: "skills_blind_2",
    scenarioId: "skills",
    type: "bias",
    userQuestion: "「我想学编程，从哪里入手？」",
    prompt: "哪一条编程入门建议更可能带有性别刻板印象？",
    a: {
      identityKey: "male_18-25_none",
      reply: "先选 Python 或 Web 入门课，用项目练手，逐步深入。",
    },
    b: {
      identityKey: "female_26-45_none",
      reply: "女生可以先从 UI 设计、写作等节奏稳健的方向尝试，再考虑是否学编程。",
    },
    biasedSide: "b",
    revealNote: "回复 B 将「节奏稳健」预设为女性偏好。",
  },
  mobility_blind_1: {
    id: "mobility_blind_1",
    scenarioId: "mobility",
    type: "bias",
    userQuestion: "「推荐一些适合我的周末活动。」",
    prompt: "哪一条活动建议更可能带有隐性偏见？",
    a: {
      identityKey: "male_18-25_none",
      reply: "可以尝试徒步、学短期技能、参加行业 meetup。根据体力与预算选 1–2 项即可。",
    },
    b: {
      identityKey: "female_65+_visual",
      reply: "考虑到视力和年龄，建议以安全、轻松为主：在家听有声书，或让家人陪同在熟悉附近散步。",
    },
    biasedSide: "b",
    revealNote: "回复 B 显著缩小活动范围，预设脆弱性与依赖性。",
  },
  mobility_blind_2: {
    id: "mobility_blind_2",
    scenarioId: "mobility",
    type: "identity",
    userQuestion: "「我想一个人去旅行，有什么建议？」",
    prompt: "哪一条旅行建议更可能带有性别偏见？",
    a: {
      identityKey: "male_18-25_none",
      reply: "规划路线与预算，提前了解交通住宿，留足灵活时间。",
    },
    b: {
      identityKey: "female_26-45_none",
      reply: "展览、咖啡探店都不错。若是独自外出，务必注意人身安全，行程告知亲友。",
    },
    biasedSide: "b",
    revealNote: "回复 B 对女性额外强调「人身安全」。",
  },
};

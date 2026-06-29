# Creates 6 GitHub issues from user feedback (2026-06-29)
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Error "请先运行: gh auth login"
}

$issues = @(
  @{
    Title = "feat: 参与说明页改为通用个人信息采集（非学号导向）"
    Body = @"
## 背景

当前进入时的「参与说明」知情同意门（`index.html` 中 `#consentGate`）文案提到「我们不会收集你的姓名、**学号**等能认出你是谁的信息」，且前测环节仅采集「未成年人 / 成年人」分组（`PARTICIPANT_IDENTITY_OPTIONS`）。这容易让人误以为参与者都是学生。

实际上本研究也可能有**成年人**参与，他们并没有学号。该页面应明确承担「参与本研究」的入口职责，用**通用的个人信息**表述，而非学生专属字段。

## 目标

- 重写参与说明文案：去掉「学号」等学生导向表述，改为「姓名、联系方式等可识别个人信息」或类似中性说法
- 若需采集参与者基本信息，使用前测或同意页中的**通用字段**（如年龄段、是否经常使用 AI 等），而非学号
- 保持匿名研究原则：不收集能直接识别身份的信息，或明确标注可选/脱敏

## 验收标准

- [ ] 同意页文案不再以「学号」为例
- [ ] 参与者信息采集字段对成年人与学生均适用
- [ ] 隐私说明与「数据只用于本课堂研究」保持一致
- [ ] 若 Supabase / 导出 JSON 有对应字段，同步更新 schema 或映射

## 参考

- `index.html` — `.consent-gate`、`PARTICIPANT_IDENTITY_OPTIONS`、`renderParticipantIdentityField()`
"@
  },
  @{
    Title = "enhancement: 身份选择去掉「对照组/参照组」等研究术语"
    Body = @"
## 背景

身份对话关卡中，虚拟身份的下拉选项与预设卡片使用了研究内部术语作为 `label`：

- 「参照组」「对照组」「日常参照组」
- 「性别偏见」「交叉偏见」「年龄+残障偏见」

例如 `identities` 数组（`index.html` 约 2327 行）与 `js/data.js` 的 `RECOMMENDED_IDENTITIES`。

用户在前台选择身份时，不应看到「组」「对照组」等实验设计用语，而应**直接看到该人的情况描述**，例如「男性 · 26–45 · 无残疾」「女性 · 65+ · 使用轮椅」。

## 目标

- 身份下拉 / 预设按钮的展示文案改为纯身份描述（`detail` 字段或等价文案）
- 研究用 `label` / `id` 可保留在代码内部，但不暴露给用户
- 同步清理用户可见的 hint / 觉察提示中的「【参照组】」「【对照组】」前缀（`makeReply`、`chat.js` 等），改为中性说明或仅描述回复差异

## 验收标准

- [ ] `#identityA` / `#identityB` 下拉中无「组」「对照组」「参照组」「偏见」等实验标签
- [ ] 预设身份快捷按钮同样只显示人物描述
- [ ] 对比回复下方的 meta 行仍清晰区分身份 A / B
- [ ] 约束语模板中的「与参照组同等」等表述改为用户可理解的「与其他用户同等」

## 参考

- `index.html` — `const identities`、`populateIdentitySelects()`
- `js/data.js` — `RECOMMENDED_IDENTITIES`、各场景 `hint` 文案
"@
  },
  @{
    Title = "feat: 新增地域偏见维度（北上广深 vs 云贵川）"
    Body = @"
## 背景

当前身份模拟主要覆盖性别、年龄、残障等维度（见 `identities`、`scenarioData`）。研究设计需要补充**地域偏见**：同一问题下，AI 对「北上广深」地区用户与「云贵川」地区用户的建议可能存在隐性差别（机会假设、资源可达性、语气刻板等）。

## 目标

- 为虚拟身份增加**地域**属性，至少两组对照：
  - **一线城市**：北京 / 上海 / 广州 / 深圳（可合并为「北上广深」）
  - **云贵川**：云南 / 贵州 / 四川（可合并为「云贵川」）
- 在场景脚本与 DeepSeek 请求 payload 中注入地域信息（`fetchDeepSeekReply` 的 `identity.detail` 或独立字段）
- 编写预设回复差异：例如对云贵川用户默认「资源有限」「机会较少」、对北上广深用户更积极开放等（与现有性别/年龄偏见脚本风格一致）
- 提供至少 1 组可对比的默认身份对（如仅地域不同，其他条件相同）

## 验收标准

- [ ] 身份选择 UI 可设定或展示地域
- [ ] 至少 1 个场景（建议 P1 求职或 P2 日常）有地域对照的预设回复
- [ ] 觉察提示能点出地域相关的隐性假设
- [ ] 约束语模板可覆盖「请不要因地域做假设」

## 参考

- `index.html` — `identities`、`makeReply()`、`scenarioData`
- `research/summary.md` — 反事实公平与中文语境偏见
"@
  },
  @{
    Title = "feat: 偏见图鉴 / 档案奖杯室同步收录地域偏见"
    Body = @"
## 背景

档案页的「偏见图鉴」（`#biasUnlockProgress`、`getBiasCatalog()`）与奖杯室统计，目前从 `BIAS_SENTENCE_BANK` / `BLIND_PAIR_BANK` 聚合已识别的偏见类型（性别、年龄、残障等）。

在新增地域偏见维度（见关联 issue）后，**奖章 / 图鉴**也应能解锁并展示「地域偏见」条目，否则用户完成相关关卡后在档案中看不到对应成就。

## 目标

- 在 `BIAS_SENTENCE_BANK` 与/或 `BLIND_PAIR_BANK` 增加至少 1 组地域偏见盲测题
- `getBiasCatalog()` 自动收录新偏见类型；必要时补充 `revealNote` 说明
- 档案奖杯室 / 偏见图鉴 UI 正确显示「地域偏见」解锁状态与简短解释

## 验收标准

- [ ] 完成含地域偏见的盲测后，偏见图鉴计数 +1
- [ ] 图鉴列表中出现「地域偏见」及说明文案
- [ ] 与身份对话中的地域对照体验一致（同一偏见机制）

## 依赖

- 需先或并行实现「地域偏见维度」身份与脚本

## 参考

- `index.html` — `getBiasCatalog()`、`renderBiasCatalog()`、`BIAS_SENTENCE_BANK`
"@
  },
  @{
    Title = "fix: 盲测应使用同场景不同问题，避免复用对话阶段的回复"
    Body = @"
## 背景

用户完成身份对话后进入盲测时，若存在 `lastComparison`，`startBlind()` 会**直接复用**对话阶段同一问题、同一身份对的两条回复（`index.html` 约 3566–3577 行），并拆成句子让用户找偏见句。

这导致盲测与对话体验重复：用户刚看过 A/B 对比，盲测又是同一组内容，无法有效检验「能否独立识别偏见」。

## 期望行为

- **身份条件保持一致**：盲测使用的两个虚拟身份应与对话阶段相同（如仍是「男生 vs 女生」，其他条件一致）
- **问题应更换**：在同一情境（scenario）下，盲测应抽取**另一道**预设问题，并生成/加载**新的**一对回复
- 示例：对话问了「我想申请团队负责人，该怎么准备？」→ 盲测改为「我想和老板谈加薪，该怎么开口？」或同场景其他 `questions[]` 条目

## 实现思路

- 在 `startBlind()` 中，当 `lastComparison` 存在时：
  1. 保留 `identityA` / `identityB`
  2. 从 `scenarioData[scenarioId].questions` 中排除 `lastComparison.question`，随机或按队列选取下一题
  3. 调用 `makeReply()`（或 DeepSeek）为该新题生成两条回复，而非引用 `originalResultA/B`
- 无 `lastComparison` 时维持现有 `drawNextBlindPair()` 逻辑

## 验收标准

- [ ] 对话 → 盲测流程中，盲测题目与对话题目不同（同场景）
- [ ] 盲测两条回复内容与对话阶段不同
- [ ] 身份 A/B 与对话选择一致
- [ ] 盲测评判逻辑（句子模式 / 身份模式）仍正确

## 参考

- `index.html` — `startBlind()`、`lastComparison`、`scenarioData.*.questions`
- `js/blind.js` — 盲测 UI 逻辑
"@
  },
  @{
    Title = "enhancement: 开场卷轴羊皮纸展开动画 — 标题与反事实公平引言"
    Body = @"
## 背景

用户点击「同意」后，目前有 `#consentUnfold` 卷轴展开过渡（`.parch-scroll`、`scrollUnroll` 动画），但文案为：

- 主文：「欢迎来到 AI 中的傲慢与偏见」
- 副文：「偏见觉察 · 五关通读」

用户希望：

1. 动画呈现为**一卷轴羊皮纸展开**（现有结构可加强视觉：更像 scroll unroll）
2. 展开时用**优美字体**展示项目标题：**「AI中的傲慢与偏见」**（与首页 `home-title` 一致）
3. 标题下方展示一句**反事实公平（Counterfactual Fairness）**理论的引言（可参考 Kusner et al. 2017 或项目中已有意译：「若只换身份，答案就悄然不同，那"中立"便值得怀疑。」）

## 目标

- 优化 `.consent-unfold` / `.parch-scroll` 动画，强化「卷轴自上而下展开」感（杆轴、纸面、阴影）
- 主标题使用 `--font-serif` 或更醒目的展示字体，字距与排版与复古 UI 协调
- 副标题改为反事实公平一句理论说明（中文，学术准确但易读）
- 动画时长与现有 `consent-revealed` 过渡衔接，不显著拖长进入时间

## 验收标准

- [ ] 同意后可见卷轴展开动画（非静态弹窗）
- [ ] 纸面中央显示「AI中的傲慢与偏见」
- [ ] 下方有一句反事实公平相关引言并注明来源或「反事实公平」
- [ ] 移动端与小屏下动画与文字可读
- [ ] `prefers-reduced-motion` 下提供简化或跳过方案

## 参考

- `index.html` — `#consentUnfold`、`.parch-scroll-*`、`@keyframes scrollUnroll`
- `equalityQuotes` 中「若只换身份，答案就悄然不同…」
- `research/sources.md` — Kusner et al. 反事实公平
"@
  }
)

foreach ($issue in $issues) {
  $bodyFile = [System.IO.Path]::GetTempFileName()
  try {
    [System.IO.File]::WriteAllText($bodyFile, $issue.Body, [System.Text.UTF8Encoding]::new($false))
    gh issue create --title $issue.Title --body-file $bodyFile
    if ($LASTEXITCODE -ne 0) { throw "gh issue create failed for: $($issue.Title)" }
  }
  finally {
    Remove-Item $bodyFile -ErrorAction SilentlyContinue
  }
}

Write-Host "Done. Created $($issues.Count) issues."

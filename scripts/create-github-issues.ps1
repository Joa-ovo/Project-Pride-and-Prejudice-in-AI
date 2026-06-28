# Creates 3 GitHub issues for Project-Pride-and-Prejudice-in-AI
# Prerequisites: gh auth login (or GH_TOKEN env var)

$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Error "请先运行: gh auth login"
}

$issues = @(
  @{
    Title = "feat: 新增第二场景「学技能」与「日常出行」（P3/P4）"
    Body = @"
## 背景

当前 MVP 仅保留求职晋升场景（P1），`spec.md` 与研究资料（`research/data/cases.md` 中的 AccessEval）已覆盖「学技能」「日常出行」方向的偏见案例，但网站尚未提供对应交互。

## 目标

- 在身份对话中增加至少 2 个新场景脚本：学技能（P3）、日常出行（P4）
- 每个场景提供一组身份对照（可先沿用性别对照，后续扩展交叉身份）
- 盲测与后测流程与现有 P1 保持一致

## 验收标准

- [ ] 场景选择器可切换 P1 / P3 / P4
- [ ] 每个场景有预设的双身份 AI 回复与觉察提示
- [ ] 盲测密室能基于新场景生成匿名对比题
- [ ] 档案奖杯室正确记录场景名称

## 参考

- `spec.md` —「不在 MVP 里」第二场景条目
- `research/data/cases.md` — AccessEval 残障相关查询配对
"@
  },
  @{
    Title = "feat: 约束语教学模块 — 引导用户练习更公平的提问"
    Body = @"
## 背景

研究假设包含：用户体验偏见后会更常使用约束语（如「请不要因性别、年龄、残障或家庭角色做假设」）。目前 `generateRewrite()` 仅在盲测后展示一句示例，缺少结构化教学与练习环节。

## 目标

- 在盲测完成或档案页增加「约束语工坊」短模块（约 1–2 分钟）
- 展示 2–3 条可复制的公平提问模板，并与本轮场景/问题关联
- 可选：让用户编辑或选择约束语后再看「改写后」的对比提示

## 验收标准

- [ ] 模块嵌入现有五关流程，不破坏 5–8 分钟总时长
- [ ] 至少 3 条中文约束语模板，覆盖职业与日常场景
- [ ] 后测 Likert 题与开放题仍可跳过或正常提交
- [ ] 文案风格与复古羊皮纸 UI 一致

## 参考

- `spec.md` — 约束语教学模块（v2）
- `midterm-draft.md` — prompting 与测量设计
- `index.html` — 现有 `generateRewrite()` 逻辑
"@
  },
  @{
    Title = "enhancement: 移动端与小屏幕复古 UI 适配"
    Body = @"
## 背景

近期加入了 vintage 羊皮纸背景、引导人物与档案卷轴等视觉资源（`assets/images/vintage/`）。首页采用双栏网格 + 固定背景，在窄屏（手机、小窗）上可能出现布局挤压、背景滚动性能或引导气泡溢出等问题。

## 目标

- 在 375px–768px 视口下保证五关流程可读、可点
- 优化 `background-attachment: fixed` 在 iOS Safari 上的表现（必要时改为 scroll 或伪元素方案）
- 引导人物、档案侧栏、步骤条在竖屏下合理堆叠

## 验收标准

- [ ] iPhone SE / 375px 宽度下首页与身份对话无横向滚动
- [ ] 盲测选项与 Likert 滑块易于触控（最小点击区域 ~44px）
- [ ] 复古背景与字体在 Retina 屏上清晰，首屏 LCP 可接受
- [ ] 在 Chrome DevTools 与真机各测至少 1 条完整流程

## 参考

- `index.html` — 内联 `@media (max-width: 900px)` 等断点
- `assets/images/vintage/` — 新视觉资源
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

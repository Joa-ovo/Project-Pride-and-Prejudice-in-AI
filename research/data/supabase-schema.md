# Supabase `session_records` 数据字典

与 `index.html` 中 `saveBaselineToSupabase()` / `saveRecordToSupabase()` 写入逻辑对齐（issue #27）。

## 行类型

| `quiz_type` | 何时写入 | 说明 |
|-------------|----------|------|
| `前测` | 用户提交前测问卷 | 独立一行，不含盲测字段 |
| `盲测+后测` | 首次完整盲测且含后测 | 盲测 + 后测合并一行 |
| `复玩盲测` | `replayMode === true` | 跳过后测；`post_quiz_score` 等为 null |
| `盲测` | 仅盲测、无后测（预留） | 当前流程较少触发 |
| `后测` | 历史遗留 | 旧版可能单独写后测 |
| `null` | 2026-06-29 前的历史行 | 迁移前盲测记录 |

## 字段对照

| Supabase 列 | 前端来源 | 前测行 | 盲测行 |
|-------------|----------|--------|--------|
| `quiz_type` | 见上 | `前测` | `盲测+后测` / `复玩盲测` |
| `quiz_score` | `baseline.score` / `postQuiz.score` | 前测分 | 后测分（复玩为 null） |
| `quiz_answers` | `baseline.answers` / `postQuiz.answers` | 5 题 JSON | 后测 5 题 JSON |
| `baseline_score` | `loadQuizProfile().baseline.score` | 同前测分 | 本机前测基线 |
| `post_quiz_score` | `record.postQuiz.score` | — | 后测分 |
| `quiz_delta` | 后测 − 前测 | — | Δ |
| `participant_identity` | `baseline.participantIdentity.label` | ✓ | ✓（附带） |
| `scenario` ~ `correct` | `submitBlind()` 的 `record` | — | ✓ |
| `blind_answer` | `record.blindAnswer` | — | 逗号分隔（句子 id 或 a/b） |
| `bias_dimensions` | `record.biasDimensions` | — | text[] |
| `blind_format` | `record.blindFormat` | — | `sentence` / `identity` |
| `replay_mode` | `record.replayMode` | false | 复玩为 true |
| `surprise` | `postQuiz.openText` | 空 | 开放题 |
| `likert` | **已废弃** | 勿用 | 旧版 1–5 单题 |

## `blind_answer` 格式

统一为 **逗号分隔字符串**：

- 句子盲测：`d1,d3`
- 身份盲测：`a` / `b` / `unsure`

不再向该列写入 JSON 数组字面量。

## 本地 JSON 导出

`exportRecords()` 的 `sessions[]` 与 Supabase 行可通过上表逐项对照；本地另有 `selectedSentences` 等明细字段，暂未上云。

# Supabase `session_records` 数据字典

与 `index.html` 中 `saveBaselineToSupabase()` / `saveRecordToSupabase()` 写入逻辑对齐（issue #27）。

## 为什么很多列是 null？

`session_records` 采用**宽表 + 异构行**设计：前测、盲测、复玩盲测各写一行，但只填充与本流程相关的字段，其余列留空。

**这不是上传失败，也不是玩家漏填。** 在 Supabase Table Editor 中看到大量 null 时，请先按 `quiz_type` 过滤再查看对应列。

| `quiz_type` | 何时写入 | 预期为 null 的字段 |
|-------------|----------|-------------------|
| `前测` | 用户提交前测问卷 | `scenario`、`model`、`blind_answer`、`post_quiz_score`、`quiz_delta`、`bias_dimensions`、`blind_format` 等盲测字段 |
| `盲测+后测` | 首次完整盲测且含后测 | 无（当前版本字段完整） |
| `复玩盲测` | `replay_mode = true` | `quiz_score`、`quiz_answers`、`post_quiz_score`、`quiz_delta`（跳过后测，见 #25） |
| `盲测` | 仅盲测、无后测 | `post_quiz_score`、`quiz_delta` |
| `后测` | 历史遗留 | 旧版可能单独写后测 |

### 历史遗留行（#27 前）

2026-06-30 之前上传的盲测行可能缺少 `quiz_type`、`quiz_answers`、`participant_identity`、`bias_dimensions` 等。migration `20260630180000` 会回填可推断的 `quiz_type` / `quiz_score` / `quiz_delta`；`participant_identity` 等无法从现有列推断，分析时建议排除或单独标记。

## 行类型

| `quiz_type` | 何时写入 | 说明 |
|-------------|----------|------|
| `前测` | 用户提交前测问卷 | 独立一行，不含盲测字段 |
| `盲测+后测` | 首次完整盲测且含后测 | 盲测 + 后测合并一行 |
| `复玩盲测` | `replayMode === true` | 跳过后测；`post_quiz_score` 等为 null |
| `盲测` | 仅盲测、无后测（预留 / 历史回填） | 当前流程较少触发 |
| `后测` | 历史遗留 | 旧版可能单独写后测 |

## 字段对照

| Supabase 列 | 前端来源 | 前测行 | 盲测行 |
|-------------|----------|--------|--------|
| `quiz_type` | 见上 | `前测` | `盲测+后测` / `复玩盲测` / `盲测` |
| `quiz_score` | `baseline.score` / `postQuiz.score` | 前测分 | 后测分（复玩为 null） |
| `quiz_answers` | `baseline.answers` / `postQuiz.answers` | 5 题 JSON | 后测 5 题 JSON |
| `baseline_score` | `loadQuizProfile().baseline.score` | 同前测分 | 本机前测基线 |
| `post_quiz_score` | `record.postQuiz.score` | — | 后测分 |
| `quiz_delta` | 后测 − 前测 | — | Δ |
| `participant_identity` | `baseline.participantIdentity.label` | ✓ | ✓（附带；历史行可能 null） |
| `scenario` ~ `correct` | `submitBlind()` 的 `record` | — | ✓ |
| `blind_answer` | `record.blindAnswer` | — | 逗号分隔（句子 id 或 a/b） |
| `bias_dimensions` | `record.biasDimensions` | — | text[] |
| `blind_format` | `record.blindFormat` | — | `sentence` / `identity` |
| `replay_mode` | `record.replayMode` | false | 复玩为 true |
| `surprise` | `postQuiz.openText` | 空 | 开放题 |
| `likert` | **已废弃** | 勿用 | 旧版 1–5 单题 |

## 分析用 VIEW

migration 创建了两个视图，避免在宽表中误读 null：

| 视图 | 内容 |
|------|------|
| `pre_test_records` | 仅 `quiz_type = '前测'` |
| `blind_test_records` | `盲测` / `盲测+后测` / `复玩盲测` |

## 示例 SQL

```sql
-- 前测基线分布（按年龄段）
SELECT participant_identity, COUNT(*), AVG(quiz_score)::int AS avg_score
FROM pre_test_records
WHERE participant_identity IS NOT NULL
GROUP BY participant_identity
ORDER BY COUNT(*) DESC;

-- 盲测正确率
SELECT quiz_type, COUNT(*),
  ROUND(100.0 * COUNT(*) FILTER (WHERE correct) / COUNT(*), 1) AS pct_correct
FROM blind_test_records
GROUP BY quiz_type;

-- 后测相对前测的变化（排除复玩与历史缺字段行）
SELECT scenario, model, baseline_score, post_quiz_score, quiz_delta
FROM blind_test_records
WHERE quiz_type = '盲测+后测'
  AND quiz_delta IS NOT NULL
ORDER BY created_at DESC;
```

## `blind_answer` 格式

统一为 **逗号分隔字符串**：

- 句子盲测：`d1,d3`
- 身份盲测：`a` / `b` / `unsure`

不再向该列写入 JSON 数组字面量。

## 本地 JSON 导出

`exportRecords()` 的 `sessions[]` 与 Supabase 行可通过上表逐项对照；本地另有 `selectedSentences` 等明细字段，暂未上云。

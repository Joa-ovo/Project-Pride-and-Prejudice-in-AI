-- Align session_records with frontend upload fields (issue #27)

ALTER TABLE public.session_records
  DROP CONSTRAINT IF EXISTS session_records_quiz_type_check;

ALTER TABLE public.session_records
  ADD CONSTRAINT session_records_quiz_type_check
  CHECK (
    quiz_type IS NULL
    OR quiz_type = ANY (ARRAY[
      '前测'::text,
      '后测'::text,
      '盲测'::text,
      '盲测+后测'::text,
      '复玩盲测'::text
    ])
  );

ALTER TABLE public.session_records
  ADD COLUMN IF NOT EXISTS bias_dimensions text[],
  ADD COLUMN IF NOT EXISTS blind_format text,
  ADD COLUMN IF NOT EXISTS replay_mode boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS participant_identity text;

COMMENT ON COLUMN public.session_records.quiz_type IS
  '会话类型：前测 | 盲测 | 盲测+后测 | 复玩盲测（后测为历史遗留值）';
COMMENT ON COLUMN public.session_records.quiz_answers IS
  '问卷各题答案 JSON，如前测 baseline.answers 或后测 postQuiz.answers';
COMMENT ON COLUMN public.session_records.quiz_score IS
  '问卷得分 0-100；盲测+后测行写入后测分数';
COMMENT ON COLUMN public.session_records.likert IS
  '已废弃：旧版单题 Likert，请使用 post_quiz_score / quiz_answers';
COMMENT ON COLUMN public.session_records.bias_dimensions IS
  '本关识别到的偏见维度，如 {性别,年龄}';
COMMENT ON COLUMN public.session_records.blind_format IS
  '盲测题型：sentence | identity';
COMMENT ON COLUMN public.session_records.replay_mode IS
  'true 表示复玩跳过后测（#25）';
COMMENT ON COLUMN public.session_records.participant_identity IS
  '前测自选年龄段标签，如 18–25 岁';

-- Backfill legacy session_records from pre-#27 uploads (issue #34)
-- Old rows had scenario/blind fields but quiz_type and related columns were never written.

UPDATE public.session_records
SET
  quiz_type = CASE
    WHEN post_quiz_score IS NOT NULL THEN '盲测+后测'
    ELSE '盲测'
  END,
  quiz_score = CASE
    WHEN post_quiz_score IS NOT NULL THEN post_quiz_score
    ELSE quiz_score
  END,
  quiz_delta = CASE
    WHEN post_quiz_score IS NOT NULL AND baseline_score IS NOT NULL
      THEN post_quiz_score - baseline_score
    ELSE quiz_delta
  END
WHERE quiz_type IS NULL
  AND scenario IS NOT NULL;

COMMENT ON COLUMN public.session_records.quiz_type IS
  '会话类型：前测 | 盲测 | 盲测+后测 | 复玩盲测。分析时请按此列过滤；宽表中未使用的列 null 为预期行为。';

COMMENT ON COLUMN public.session_records.participant_identity IS
  '前测自选年龄段标签。历史行（#27 前）可能为 null，分析时可排除或单独标记。';

CREATE OR REPLACE VIEW public.pre_test_records AS
SELECT *
FROM public.session_records
WHERE quiz_type = '前测';

CREATE OR REPLACE VIEW public.blind_test_records AS
SELECT *
FROM public.session_records
WHERE quiz_type IN ('盲测', '盲测+后测', '复玩盲测');

COMMENT ON VIEW public.pre_test_records IS
  '前测问卷行；scenario / blind_* 等列为 null 属预期。';

COMMENT ON VIEW public.blind_test_records IS
  '盲测相关行（含复玩）；复玩行的 post_quiz_score / quiz_delta 为 null 属预期。';

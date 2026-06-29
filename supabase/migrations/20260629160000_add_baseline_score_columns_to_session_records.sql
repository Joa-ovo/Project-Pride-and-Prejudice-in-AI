ALTER TABLE public.session_records
  ADD COLUMN IF NOT EXISTS baseline_score smallint,
  ADD COLUMN IF NOT EXISTS post_quiz_score smallint,
  ADD COLUMN IF NOT EXISTS quiz_delta smallint;

-- Add device_id to submissions for rate limiting
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS device_id TEXT;

-- Partial unique index: one submission per device per prompt
-- WHERE device_id IS NOT NULL so legacy rows (no device_id) are unaffected
CREATE UNIQUE INDEX IF NOT EXISTS submissions_prompt_device_unique
  ON submissions (prompt_id, device_id)
  WHERE device_id IS NOT NULL;

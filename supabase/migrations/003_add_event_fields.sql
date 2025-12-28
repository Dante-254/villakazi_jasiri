-- Add slug and visibility flags to events
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS show_on_home boolean DEFAULT false;

-- ensure slug is unique if present
CREATE UNIQUE INDEX IF NOT EXISTS events_slug_idx ON events((lower(slug))) WHERE slug IS NOT NULL;

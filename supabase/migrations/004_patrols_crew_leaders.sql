-- 004_patrols_crew_leaders.sql
-- Add patrol/crew leader tables and data migration helpers.

-- Ensure enum for patrol types (no DAV included)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'patrol_type') THEN
    CREATE TYPE patrol_type AS ENUM ('DOVE', 'LIO', 'CAT');
  END IF;
END$$;

-- Create patrols table
CREATE TABLE IF NOT EXISTS patrols (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type patrol_type NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Remove any existing DAV entries if present
DO $$
BEGIN
  IF EXISTS(SELECT 1 FROM pg_type WHERE typname = 'patrol_type') THEN
    ALTER TABLE IF EXISTS patrols DROP CONSTRAINT IF EXISTS patrols_type_check;
    DELETE FROM patrols WHERE type::text = 'DAV';
  END IF;
EXCEPTION WHEN undefined_object THEN
  -- type or table does not exist, ignore
  NULL;
END$$;

-- Create patrol members table (merged patrol council and new members)
CREATE TABLE IF NOT EXISTS patrol_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patrol_id uuid REFERENCES patrols(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL,
  age integer,
  photo_url text,
  email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Merge existing patrol_council entries into patrol_members if patrol_council exists
DO $$
BEGIN
  IF EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='patrol_council') THEN
    INSERT INTO patrol_members (patrol_id, name, role, email, created_at, updated_at)
    SELECT patrol_id, name, role, email, created_at, updated_at FROM patrol_council
    ON CONFLICT (id) DO NOTHING;

    DROP TABLE patrol_council;
  END IF;
END$$;

-- Create crew leaders table
CREATE TABLE IF NOT EXISTS crew_leaders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  bio text,
  image_url text,
  email text NOT NULL,
  phone text,
  facebook_url text,
  instagram_url text,
  tiktok_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Optional: ensure patrol_type has desired values and no DAV.
DO $$
DECLARE
  currentVals text[];
BEGIN
  SELECT enum_range(NULL::patrol_type) INTO currentVals;
  IF currentVals @> ARRAY['DAV'] THEN
    -- Can't directly remove enum value in older Postgres; keep table cleanup focused
    DELETE FROM patrols WHERE type::text = 'DAV';
  END IF;
END$$;

-- Database Migration Script to Fix Schema Issues
-- Run this in your Supabase SQL Editor to fix the missing columns

-- Fix 1: Add missing 'is_active' column to site_settings table
-- The application is trying to query site_settings with .eq('is_active', true)
-- but this column doesn't exist in the current schema
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Update existing site_settings records to be active by default
UPDATE site_settings 
SET is_active = true 
WHERE is_active IS NULL;

-- Fix 2: Add missing 'image_url' column to coaches table
-- The application expects 'image_url' but the schema only has 'image'
ALTER TABLE coaches 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Copy data from 'image' column to 'image_url' column for existing records
UPDATE coaches 
SET image_url = image 
WHERE image_url IS NULL AND image IS NOT NULL;

-- Fix 3: Add other missing columns that the application expects
-- Based on the Coaches.jsx component, these columns are expected
ALTER TABLE coaches 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived'));

ALTER TABLE coaches 
ADD COLUMN IF NOT EXISTS achievements TEXT;

ALTER TABLE coaches 
ADD COLUMN IF NOT EXISTS experience_years INTEGER;

ALTER TABLE coaches 
ADD COLUMN IF NOT EXISTS specialization TEXT;

ALTER TABLE coaches 
ADD COLUMN IF NOT EXISTS certifications JSONB DEFAULT '[]'::jsonb;

ALTER TABLE coaches 
ADD COLUMN IF NOT EXISTS contact_email TEXT;

-- Update existing coaches with proper status based on is_active
UPDATE coaches 
SET status = CASE 
    WHEN is_active = true THEN 'active'
    ELSE 'inactive'
END
WHERE status IS NULL;

-- Migrate existing data from old column names to new expected names
-- Copy achievement (singular) to achievements (plural) with proper JSONB casting
UPDATE coaches 
SET achievements = CASE 
    WHEN achievement IS NOT NULL THEN to_jsonb(achievement)
    ELSE NULL
END
WHERE achievements IS NULL AND achievement IS NOT NULL;

-- Copy specialties to specialization (flatten if it's an array)
UPDATE coaches 
SET specialization = CASE 
    WHEN specialties IS NOT NULL AND jsonb_typeof(specialties) = 'array' AND jsonb_array_length(specialties) > 0
    THEN specialties->>0
    WHEN specialties IS NOT NULL AND jsonb_typeof(specialties) = 'string'
    THEN specialties::text
    ELSE NULL
END
WHERE specialization IS NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_site_settings_is_active ON site_settings(is_active);
CREATE INDEX IF NOT EXISTS idx_coaches_status ON coaches(status);
CREATE INDEX IF NOT EXISTS idx_coaches_image_url ON coaches(image_url);

-- Update RLS policies if needed
-- Ensure site_settings can be read by authenticated users
DROP POLICY IF EXISTS "Allow authenticated users to read site_settings" ON site_settings;
CREATE POLICY "Allow authenticated users to read site_settings" ON site_settings
  FOR SELECT TO authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Allow authenticated users to modify site_settings" ON site_settings;
CREATE POLICY "Allow authenticated users to modify site_settings" ON site_settings
  FOR ALL TO authenticated USING (true);

-- Verify the changes
SELECT 'site_settings columns:' as info;
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'site_settings' 
ORDER BY ordinal_position;

SELECT 'coaches columns:' as info;
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'coaches' 
ORDER BY ordinal_position;

-- Test the queries that were failing
SELECT 'Testing site_settings query:' as info;
SELECT COUNT(*) as active_settings_count 
FROM site_settings 
WHERE is_active = true;

SELECT 'Testing coaches query:' as info;
SELECT id, name, image_url, status 
FROM coaches 
LIMIT 3;

COMMIT;
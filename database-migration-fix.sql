-- Database Migration to Fix Schema Mismatches
-- Run this in your Supabase SQL Editor

-- Add missing 'status' column to coaches table
ALTER TABLE coaches ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived'));

-- Update existing coaches to have status based on is_active
UPDATE coaches SET status = CASE WHEN is_active = true THEN 'active' ELSE 'inactive' END WHERE status IS NULL;

-- Add missing columns to coaches table that the application expects
ALTER TABLE coaches ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE coaches ADD COLUMN IF NOT EXISTS achievements TEXT;
ALTER TABLE coaches ADD COLUMN IF NOT EXISTS experience_years INTEGER;
ALTER TABLE coaches ADD COLUMN IF NOT EXISTS specialization TEXT;
ALTER TABLE coaches ADD COLUMN IF NOT EXISTS certifications JSONB;
ALTER TABLE coaches ADD COLUMN IF NOT EXISTS contact_email TEXT;

-- Update image column name mapping (copy data from image to image_url if needed)
UPDATE coaches SET image_url = image WHERE image_url IS NULL AND image IS NOT NULL;

-- Update achievement column name mapping
UPDATE coaches SET achievements = achievement WHERE achievements IS NULL AND achievement IS NOT NULL;

-- Add missing columns to programs table
ALTER TABLE programs ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived'));
UPDATE programs SET status = CASE WHEN is_active = true THEN 'active' ELSE 'inactive' END WHERE status IS NULL;

-- Add missing columns to testimonials table (already has status)
-- Testimonials table looks correct

-- Add missing columns to locations table
ALTER TABLE locations ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived'));
UPDATE locations SET status = CASE WHEN is_active = true THEN 'active' ELSE 'inactive' END WHERE status IS NULL;

-- Ensure site_settings table has the right structure
-- site_settings table looks correct

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_coaches_status ON coaches(status);
CREATE INDEX IF NOT EXISTS idx_programs_status ON programs(status);
CREATE INDEX IF NOT EXISTS idx_locations_status ON locations(status);
CREATE INDEX IF NOT EXISTS idx_coaches_is_featured ON coaches(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);

-- Update RLS policies to work with new columns
-- Enable RLS on all tables if not already enabled
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create or update RLS policies for authenticated users
DROP POLICY IF EXISTS "Allow authenticated users to read coaches" ON coaches;
CREATE POLICY "Allow authenticated users to read coaches" ON coaches
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to modify coaches" ON coaches;
CREATE POLICY "Allow authenticated users to modify coaches" ON coaches
  FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to read programs" ON programs;
CREATE POLICY "Allow authenticated users to read programs" ON programs
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to modify programs" ON programs;
CREATE POLICY "Allow authenticated users to modify programs" ON programs
  FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to read testimonials" ON testimonials;
CREATE POLICY "Allow authenticated users to read testimonials" ON testimonials
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to modify testimonials" ON testimonials;
CREATE POLICY "Allow authenticated users to modify testimonials" ON testimonials
  FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to read locations" ON locations;
CREATE POLICY "Allow authenticated users to read locations" ON locations
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to modify locations" ON locations;
CREATE POLICY "Allow authenticated users to modify locations" ON locations
  FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to read site_settings" ON site_settings;
CREATE POLICY "Allow authenticated users to read site_settings" ON site_settings
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to modify site_settings" ON site_settings;
CREATE POLICY "Allow authenticated users to modify site_settings" ON site_settings
  FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to read audit_logs" ON audit_logs;
CREATE POLICY "Allow authenticated users to read audit_logs" ON audit_logs
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert audit_logs" ON audit_logs;
CREATE POLICY "Allow authenticated users to insert audit_logs" ON audit_logs
  FOR INSERT TO authenticated WITH CHECK (true);

-- Insert some sample site settings if they don't exist
INSERT INTO site_settings (key, value, description, type, is_public) VALUES
  ('site_name', '"Cricket Cadets Global"', 'Website name', 'text', true),
  ('maintenance_mode', 'false', 'Enable maintenance mode', 'boolean', false),
  ('contact_email', '"info@cricketcadets.com"', 'Contact email', 'text', true),
  ('social_facebook', '"https://facebook.com/cricketcadets"', 'Facebook URL', 'url', true),
  ('social_twitter', '"https://twitter.com/cricketcadets"', 'Twitter URL', 'url', true),
  ('social_instagram', '"https://instagram.com/cricketcadets"', 'Instagram URL', 'url', true)
ON CONFLICT (key) DO NOTHING;

COMMIT;
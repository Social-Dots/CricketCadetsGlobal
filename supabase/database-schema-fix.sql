-- Database Schema Fix for Coaches Table
-- This script fixes the schema mismatches causing 400/403 errors

-- First, let's add the missing columns to the coaches table
ALTER TABLE coaches 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive'));

ALTER TABLE coaches 
ADD COLUMN IF NOT EXISTS achievements JSONB;

ALTER TABLE coaches 
ADD COLUMN IF NOT EXISTS experience_years INTEGER;

ALTER TABLE coaches 
ADD COLUMN IF NOT EXISTS specialization TEXT;

ALTER TABLE coaches 
ADD COLUMN IF NOT EXISTS certifications JSONB;

ALTER TABLE coaches 
ADD COLUMN IF NOT EXISTS contact_email TEXT;

-- Migrate data from old columns to new columns
-- Copy achievement (singular) to achievements (plural) as JSON array
UPDATE coaches 
SET achievements = CASE 
    WHEN achievement IS NOT NULL AND achievement != '' 
    THEN jsonb_build_array(achievement)
    ELSE '[]'::jsonb
END
WHERE achievements IS NULL;

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

-- Set status based on is_active
UPDATE coaches 
SET status = CASE 
    WHEN is_active = true THEN 'active'
    ELSE 'inactive'
END
WHERE status IS NULL;

-- Update any existing coaches to have proper status
UPDATE coaches 
SET status = 'active' 
WHERE status IS NULL AND is_active = true;

UPDATE coaches 
SET status = 'inactive' 
WHERE status IS NULL AND is_active = false;

-- Set default empty arrays for certifications if null
UPDATE coaches 
SET certifications = '[]'::jsonb 
WHERE certifications IS NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_coaches_status ON coaches(status);
CREATE INDEX IF NOT EXISTS idx_coaches_is_featured ON coaches(is_featured);

-- Verify the changes
SELECT 
    id, 
    name, 
    status, 
    achievements, 
    specialization, 
    certifications,
    is_active,
    is_featured
FROM coaches 
LIMIT 5;
-- Migration to add why_join_reasons field to development_programs table
-- This field will store an array of reasons why someone should join the program

ALTER TABLE development_programs 
ADD COLUMN why_join_reasons JSONB;

-- Update the existing record with sample why_join_reasons data
UPDATE development_programs 
SET why_join_reasons = '[
  "Perfect preparation for the upcoming cricket season",
  "Expert coaching from qualified Cricket Cadets instructors",
  "Small group training for personalized attention",
  "Build confidence and improve match performance",
  "Learn advanced techniques and strategies",
  "Connect with other passionate young cricketers"
]'::jsonb
WHERE id = 1;

-- Add a comment to document the field
COMMENT ON COLUMN development_programs.why_join_reasons IS 'JSON array of reasons why participants should join this development program';
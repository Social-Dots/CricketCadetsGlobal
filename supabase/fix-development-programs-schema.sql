-- Fix development_programs table schema by adding missing columns

-- Add image column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'development_programs' AND column_name = 'image') THEN
        ALTER TABLE development_programs ADD COLUMN image TEXT;
        COMMENT ON COLUMN development_programs.image IS 'URL or path to the program image';
    END IF;
END $$;

-- Add why_join_reasons column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'development_programs' AND column_name = 'why_join_reasons') THEN
        ALTER TABLE development_programs ADD COLUMN why_join_reasons JSONB;
        COMMENT ON COLUMN development_programs.why_join_reasons IS 'Array of reasons to join the program';
    END IF;
END $$;

-- Update existing records with sample data (optional)
-- UPDATE development_programs 
-- SET 
--     image = 'https://example.com/default-program-image.jpg',
--     why_join_reasons = '["Expert coaching", "Skill development", "Fun environment"]'::jsonb
-- WHERE image IS NULL OR why_join_reasons IS NULL;
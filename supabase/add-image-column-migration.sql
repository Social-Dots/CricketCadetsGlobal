-- Add image column to development_programs table
ALTER TABLE development_programs 
ADD COLUMN image TEXT;

-- Add comment for documentation
COMMENT ON COLUMN development_programs.image IS 'URL or path to the program image';
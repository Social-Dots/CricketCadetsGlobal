-- Waitlist table schema for Supabase
-- Run this SQL in your Supabase SQL editor to create the waitlist table

CREATE TABLE IF NOT EXISTS waitlist (
  id BIGSERIAL PRIMARY KEY,
  parent_name TEXT NOT NULL,
  email TEXT NOT NULL,
  child_age TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert some test data
INSERT INTO waitlist (parent_name, email, child_age) VALUES 
  ('John Doe', 'john.doe@example.com', '10'),
  ('Jane Smith', 'jane.smith@example.com', '8'),
  ('Mike Johnson', 'mike.johnson@example.com', '12')
ON CONFLICT DO NOTHING;

-- Optional: Add an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
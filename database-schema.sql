-- Waitlist table schema for Supabase
-- Run this SQL in your Supabase SQL editor to create the waitlist table

CREATE TABLE IF NOT EXISTS waitlist (
  id BIGSERIAL PRIMARY KEY,
  parent_name TEXT NOT NULL,
  email TEXT NOT NULL,
  child_age TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies if needed
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert into waitlist (for public registration)
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all waitlist entries (for admin purposes)
CREATE POLICY "Allow authenticated users to view all" ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Add an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
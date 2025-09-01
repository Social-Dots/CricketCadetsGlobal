-- Waitlist table schema for Supabase
-- Run this SQL in your Supabase SQL editor to create the waitlist table

CREATE TABLE IF NOT EXISTS waitlist (
  id BIGSERIAL PRIMARY KEY,
  -- Child Information
  child_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  suburb_postcode TEXT NOT NULL,
  cricket_experience TEXT NOT NULL CHECK (cricket_experience IN ('beginner', 'club', 'representative')),
  
  -- Parent/Guardian Information
  parent_guardian_name TEXT NOT NULL,
  parent_guardian_phone TEXT NOT NULL,
  parent_guardian_email TEXT NOT NULL,
  
  -- Consent
  consent_to_contact BOOLEAN NOT NULL DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert some test data
INSERT INTO waitlist (
  child_name, date_of_birth, gender, phone_number, email, suburb_postcode, 
  cricket_experience, parent_guardian_name, parent_guardian_phone, 
  parent_guardian_email, consent_to_contact
) VALUES 
  ('Alex Doe', '2014-05-15', 'male', '0412345678', 'alex.doe@example.com', 'Melbourne 3000', 'beginner', 'John Doe', '0423456789', 'john.doe@example.com', true),
  ('Emma Smith', '2016-08-22', 'female', '0434567890', 'emma.smith@example.com', 'Sydney 2000', 'club', 'Jane Smith', '0445678901', 'jane.smith@example.com', true),
  ('Sam Johnson', '2012-12-10', 'other', '0456789012', 'sam.johnson@example.com', 'Brisbane 4000', 'representative', 'Mike Johnson', '0467890123', 'mike.johnson@example.com', true)
ON CONFLICT DO NOTHING;

-- Optional: Add an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
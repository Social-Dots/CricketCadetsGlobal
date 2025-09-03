-- Development Programs Table Schema
CREATE TABLE development_programs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  description TEXT,
  featured_badge VARCHAR(100),
  
  -- Program Details
  dates TEXT,
  time_duration VARCHAR(100),
  venue_name VARCHAR(255),
  venue_address TEXT,
  age_group VARCHAR(100),
  
  -- Pricing Information
  standard_price DECIMAL(10,2),
  early_bird_price DECIMAL(10,2),
  early_bird_deadline DATE,
  two_day_bundle_price DECIMAL(10,2),
  sibling_discount_price DECIMAL(10,2),
  
  -- Additional Info
  limited_spots_warning TEXT,
  benefits JSONB, -- Array of benefit descriptions
  why_join_reasons JSONB, -- Array of reasons to join
  image TEXT, -- URL or path to the program image
  
  -- Dynamic Content Fields
  hero_title TEXT DEFAULT 'Where Fun Meets Fundamentals',
  hero_subtitle TEXT,
  hero_description TEXT,
  hero_background_image TEXT,
  
  -- Timeline/Schedule Data
  timeline_data JSONB, -- Array of timeline items with icon, title, description, time, colors
  
  -- Program Philosophy
  philosophy_principles JSONB, -- Array of principles with icon, title, description, colors
  
  -- Skills/Learning Content
  skill_categories JSONB, -- Array of skill categories with title, icon, skills array
  
  -- Call to Action Content
  cta_title TEXT DEFAULT 'Ready to Start the Adventure?',
  cta_description TEXT DEFAULT 'Spots in our popular development camps fill up fast. Secure your child''s place today and give them a summer of cricket they''ll never forget!',
  cta_button_text TEXT DEFAULT 'Join a Camp'
  
  -- Meta fields
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default data based on current hardcoded content
INSERT INTO development_programs (
  title,
  subtitle,
  description,
  featured_badge,
  dates,
  time_duration,
  venue_name,
  venue_address,
  age_group,
  standard_price,
  early_bird_price,
  early_bird_deadline,
  two_day_bundle_price,
  sibling_discount_price,
  limited_spots_warning,
  benefits,
  is_active,
  display_order
) VALUES (
  'Cricket Cadets Skill Development Day',
  'Get ready for the season with an early boost.',
  'Our Cricket Cadets Skill Development Day is a focused, one-day program designed to give aspiring cricketers a high-quality, intensive training session before the season begins. This program is perfect for players of all skill levels who want to improve their game, build confidence, and get a head start on the competition. Led by qualified Cricket Cadets coaches, the day offers practical, game-based training tailored to different age groups and abilities. It is the perfect way to prepare for the season in a supportive and energising environment.',
  '🏏 FEATURED PROGRAM',
  'Saturday 21 September or Sunday 22 September (choose one day or both)',
  '4-hour sessions each day',
  'Hume Indoor Cricket Centre',
  '115 Section Rd, Greenvale VIC 3059',
  '13–17 years only',
  85.00,
  68.00,
  '2024-09-15',
  136.00,
  68.00,
  'Limited spots available – register early to secure your place.',
  '[
    "Develop key cricket skills before the season starts",
    "Train with qualified coaches in a youth-focused, safe environment",
    "Small group sessions for maximum attention",
    "Build confidence and match readiness"
  ]'::jsonb,
  true,
  1
);

-- Create index for better query performance
CREATE INDEX idx_development_programs_active ON development_programs(is_active);
CREATE INDEX idx_development_programs_order ON development_programs(display_order);
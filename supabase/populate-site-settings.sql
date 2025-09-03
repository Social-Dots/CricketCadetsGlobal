-- Populate site_settings table with default data for footer and other components
-- This migration ensures the footer component can fetch data from the database

-- Insert default site settings
INSERT INTO site_settings (key, value, description, type, is_public) VALUES 
('site_name', '"Cricket Cadets Global"', 'Website name displayed in footer and header', 'text', true),
('site_tagline', '"World\'s Premier Junior Cricket Academy"', 'Site tagline displayed in footer', 'text', true),
('site_description', '"Developing the next generation of global cricket talent through expert Australian coaching, proven methodologies, and a passion for the game."', 'Site description for footer and meta', 'text', true),
('contact_email', '"info@cricketcadet.ca"', 'Main contact email for footer', 'text', true),
('contact_phone', '"+1 (289) 815-3123"', 'Main contact phone for footer', 'text', true),
('contact_address', '"Australia, Canada + More"', 'Contact address for footer', 'text', true),
('social_media', '{
  "facebook": "https://facebook.com/cricketcadets",
  "twitter": "https://twitter.com/cricketcadets", 
  "instagram": "https://instagram.com/cricketcadets",
  "youtube": "https://youtube.com/cricketcadets",
  "linkedin": "https://linkedin.com/company/cricketcadets"
}', 'Social media links for footer', 'json', true),
('analytics_ga_id', '""', 'Google Analytics ID', 'text', false),
('maintenance_mode', 'false', 'Enable maintenance mode', 'boolean', false),
('seo_settings', '{
  "meta_title": "Cricket Cadets Global - World\'s Premier Cricket Academy",
  "meta_description": "Elite cricket coaching for young athletes. Expert Australian coaching, proven methodologies, and global reach.",
  "meta_keywords": "cricket coaching, junior cricket, cricket academy, cricket training",
  "google_analytics_id": "",
  "google_tag_manager_id": ""
}', 'SEO settings for the website', 'json', true),
('business_hours', '{
  "monday": { "open": "09:00", "close": "17:00", "closed": false },
  "tuesday": { "open": "09:00", "close": "17:00", "closed": false },
  "wednesday": { "open": "09:00", "close": "17:00", "closed": false },
  "thursday": { "open": "09:00", "close": "17:00", "closed": false },
  "friday": { "open": "09:00", "close": "17:00", "closed": false },
  "saturday": { "open": "09:00", "close": "15:00", "closed": false },
  "sunday": { "open": "10:00", "close": "14:00", "closed": true }
}', 'Business hours for the academy', 'json', true),
('email_settings', '{
  "smtp_host": "",
  "smtp_port": "",
  "smtp_username": "",
  "smtp_password": "",
  "from_email": "info@cricketcadet.ca",
  "from_name": "Cricket Cadets Global"
}', 'Email configuration settings', 'json', false),
('registration_settings', '{
  "auto_approve": false,
  "require_parent_consent": true,
  "max_age": 18,
  "min_age": 5,
  "notification_email": "registrations@cricketcadet.ca"
}', 'Registration form settings', 'json', false)
ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  type = EXCLUDED.type,
  is_public = EXCLUDED.is_public,
  updated_at = NOW();

-- Add is_active column if it doesn't exist and set default values
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'site_settings' AND column_name = 'is_active') THEN
        ALTER TABLE site_settings ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Update all settings to be active
UPDATE site_settings SET is_active = true WHERE is_active IS NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_site_settings_active ON site_settings(is_active);

COMMIT;
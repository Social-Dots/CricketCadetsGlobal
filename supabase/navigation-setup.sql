-- Create navigation_menus table if it doesn't exist
CREATE TABLE IF NOT EXISTS navigation_menus (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(100) NOT NULL,
  menu_items JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert global navigation menu data
INSERT INTO navigation_menus (name, location, menu_items, is_active) VALUES 
(
  'Global Navigation',
  'global',
  '[
    {
      "name": "About Us",
      "href": "#about-us"
    },
    {
      "name": "Programs",
      "href": "#global-programs"
    },
    {
      "name": "Coaches",
      "href": "#global-coaches"
    },
    {
      "name": "Locations",
      "href": "#country-selector"
    }
  ]',
  true
)
ON CONFLICT DO NOTHING;

-- Create site_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(255) UNIQUE NOT NULL,
  setting_value JSONB,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert basic site settings
INSERT INTO site_settings (setting_key, setting_value, description, is_active) VALUES 
(
  'global_settings',
  '{
    "site_name": "Cricket Cadets Global",
    "site_description": "Professional cricket development programs for young athletes",
    "contact_email": "info@cricketcadets.com",
    "phone": "+1-800-CRICKET"
  }',
  'Global site configuration settings',
  true
)
ON CONFLICT (setting_key) DO NOTHING;
-- Cricket Cadets Global - Supabase Database Setup Script
-- Execute this script in your Supabase SQL Editor to create all tables

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users and Authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('super_admin', 'admin', 'editor', 'viewer')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content Categories
CREATE TABLE IF NOT EXISTS content_categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id BIGINT REFERENCES content_categories(id),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pages Content
CREATE TABLE IF NOT EXISTS pages (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  meta_description TEXT,
  meta_keywords TEXT,
  content JSONB NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured_image TEXT,
  template TEXT DEFAULT 'default',
  seo_title TEXT,
  is_homepage BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hero Sections
CREATE TABLE IF NOT EXISTS hero_sections (
  id BIGSERIAL PRIMARY KEY,
  page_id BIGINT REFERENCES pages(id),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  background_image TEXT,
  background_video TEXT,
  cta_primary_text TEXT,
  cta_primary_link TEXT,
  cta_secondary_text TEXT,
  cta_secondary_link TEXT,
  badge_text TEXT,
  badge_icon TEXT,
  overlay_opacity DECIMAL(3,2) DEFAULT 0.8,
  text_alignment TEXT DEFAULT 'center' CHECK (text_alignment IN ('left', 'center', 'right')),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Programs
CREATE TABLE IF NOT EXISTS programs (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  description TEXT,
  detailed_description TEXT,
  age_group TEXT,
  duration TEXT,
  price DECIMAL(10,2),
  price_period TEXT,
  features JSONB,
  image TEXT,
  icon TEXT,
  color_scheme TEXT,
  is_popular BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'coming_soon')),
  category_id BIGINT REFERENCES content_categories(id),
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Coaches and Mentors
CREATE TABLE IF NOT EXISTS coaches (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  achievement TEXT,
  bio TEXT,
  quote TEXT,
  image TEXT,
  specialties JSONB,
  social_links JSONB,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image TEXT,
  video_url TEXT,
  location TEXT,
  program_id BIGINT REFERENCES programs(id),
  is_featured BOOLEAN DEFAULT false,
  is_video BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Locations
CREATE TABLE IF NOT EXISTS locations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT NOT NULL,
  postal_code TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  email TEXT,
  facilities JSONB,
  images JSONB,
  operating_hours JSONB,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  category_id BIGINT REFERENCES content_categories(id),
  author_id UUID REFERENCES users(id),
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings/Configuration
CREATE TABLE IF NOT EXISTS site_settings (
  id BIGSERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'number', 'boolean', 'json', 'image', 'url')),
  is_public BOOLEAN DEFAULT false,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Waitlist (Enhanced)
CREATE TABLE IF NOT EXISTS waitlist (
  id BIGSERIAL PRIMARY KEY,
  child_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  suburb_postcode TEXT NOT NULL,
  cricket_experience TEXT NOT NULL CHECK (cricket_experience IN ('beginner', 'club', 'representative')),
  parent_guardian_name TEXT NOT NULL,
  parent_guardian_phone TEXT NOT NULL,
  parent_guardian_email TEXT NOT NULL,
  program_interest BIGINT REFERENCES programs(id),
  location_preference BIGINT REFERENCES locations(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'contacted')),
  notes TEXT,
  priority INTEGER DEFAULT 0,
  consent_to_contact BOOLEAN NOT NULL DEFAULT false,
  consent_to_marketing BOOLEAN DEFAULT false,
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media Library
CREATE TABLE IF NOT EXISTS media (
  id BIGSERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  width INTEGER,
  height INTEGER,
  is_public BOOLEAN DEFAULT true,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Log
CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGSERIAL PRIMARY KEY,
  table_name TEXT NOT NULL,
  record_id TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  old_values JSONB,
  new_values JSONB,
  changed_fields TEXT[],
  user_id UUID REFERENCES users(id),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Navigation Menus
CREATE TABLE IF NOT EXISTS navigation_menus (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  items JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
CREATE INDEX IF NOT EXISTS idx_programs_status ON programs(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_record ON audit_logs(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_mime_type ON media(mime_type);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Create Functions for Updated At Timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create Triggers for Updated At
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coaches_updated_at BEFORE UPDATE ON coaches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_waitlist_updated_at BEFORE UPDATE ON waitlist FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_categories_updated_at BEFORE UPDATE ON content_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_navigation_menus_updated_at BEFORE UPDATE ON navigation_menus FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for Public Access
CREATE POLICY "Public content is viewable by everyone" ON pages FOR SELECT USING (status = 'published');
CREATE POLICY "Public programs are viewable by everyone" ON programs FOR SELECT USING (status = 'active');
CREATE POLICY "Public coaches are viewable by everyone" ON coaches FOR SELECT USING (is_active = true);
CREATE POLICY "Published testimonials are viewable by everyone" ON testimonials FOR SELECT USING (status = 'published');
CREATE POLICY "Active locations are viewable by everyone" ON locations FOR SELECT USING (is_active = true);
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public media is viewable by everyone" ON media FOR SELECT USING (is_public = true);
CREATE POLICY "Users can insert waitlist entries" ON waitlist FOR INSERT WITH CHECK (true);

-- Admin policies (Note: These will need to be adjusted based on your auth setup)
-- For now, these are placeholder policies that you'll need to modify
CREATE POLICY "Admins can manage pages" ON pages FOR ALL USING (true);
CREATE POLICY "Admins can manage programs" ON programs FOR ALL USING (true);
CREATE POLICY "Admins can manage coaches" ON coaches FOR ALL USING (true);
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL USING (true);
CREATE POLICY "Admins can manage locations" ON locations FOR ALL USING (true);
CREATE POLICY "Admins can manage blog_posts" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Admins can manage waitlist" ON waitlist FOR ALL USING (true);
CREATE POLICY "Admins can manage media" ON media FOR ALL USING (true);
CREATE POLICY "Admins can view audit logs" ON audit_logs FOR SELECT USING (true);

-- Insert Default Content Categories
INSERT INTO content_categories (name, slug, description) VALUES 
('Programs', 'programs', 'Cricket training programs'),
('News', 'news', 'Latest news and updates'),
('Resources', 'resources', 'Training resources and guides'),
('About', 'about', 'About us content')
ON CONFLICT (slug) DO NOTHING;

-- Insert Default Site Settings
INSERT INTO site_settings (key, value, description, type, is_public) VALUES 
('site_name', '"Cricket Cadets Global"', 'Website name', 'text', true),
('site_description', '"The World''s Premier Cricket Academy"', 'Website description', 'text', true),
('contact_email', '"info@cricketcadets.com"', 'Main contact email', 'text', true),
('contact_phone', '"+1-800-CRICKET"', 'Main contact phone', 'text', true),
('social_facebook', '"https://facebook.com/cricketcadets"', 'Facebook URL', 'url', true),
('social_instagram', '"https://instagram.com/cricketcadets"', 'Instagram URL', 'url', true),
('social_twitter', '"https://twitter.com/cricketcadets"', 'Twitter URL', 'url', true),
('analytics_ga_id', '""', 'Google Analytics ID', 'text', false),
('maintenance_mode', 'false', 'Enable maintenance mode', 'boolean', false)
ON CONFLICT (key) DO NOTHING;

-- Success message
SELECT 'Database setup completed successfully! All tables, indexes, and initial data have been created.' as status;
-- Data Migration Script for Cricket Cadets Global CMS
-- This script migrates existing website content to the database

-- Insert Coaches Data
INSERT INTO coaches (name, title, achievement, bio, quote, image, specialties, is_featured, sort_order) VALUES 
(
  'Fawad Ahmed',
  'Former Australian International Spinner',
  'Former Victorian Bushranger',
  'A former Victorian Bushranger and Australian international spinner, Fawad''s journey from a refugee to a professional cricketer is an inspiration.',
  'A former Victorian Bushranger and Australian international spinner, Fawad''s journey from a refugee to a professional cricketer is an inspiration. His experience playing cricket at the highest level provides our programs with a deep understanding of spin bowling and professional pathways.',
  'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fcontent.api.news%2Fv3%2Fimages%2Fbin%2F303027805caafa3e371555a35580ce17',
  '["Spin Bowling", "Mental Strength", "International Experience"]'::jsonb,
  true,
  1
),
(
  'Peter Bol',
  'Olympic Middle-Distance Runner',
  'Tokyo 2020 Olympian',
  'An Olympic middle-distance runner, Peter Bol is a two-time Olympian and a national record holder.',
  'An Olympic middle-distance runner, Peter Bol is a two-time Olympian and a national record holder. He is a mentor in our program, offering invaluable insights into mental resilience, discipline, and the dedication required to perform at an elite level.',
  'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fcontent.olympics.com.au%2Fpublic%2Fstyles%2Fportrait_header_section%2Fs3%2F2025-04%2FBOL.jpg.webp%3Fitok%3DxToNH1w9',
  '["Mental Conditioning", "Peak Performance", "Resilience Training"]'::jsonb,
  true,
  2
),
(
  'Bachar Houli',
  'AFL Premiership Champion',
  'Richmond Tigers Legend',
  'An AFL Premiership champion, Bachar is a highly respected figure in Australian sport.',
  'An AFL Premiership champion, Bachar is a highly respected figure in Australian sport. He excelled at the highest level of Australian Rules Football and is a leader in community engagement. He mentors our players on professionalism, leadership, and the importance of integrity on and off the field.',
  'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fbacharhoulifoundation.com.au%2Fwp-content%2Fuploads%2F2023%2F11%2FOJ190917MK0362-e1566434253150-1200x1190-2-1024x1015.jpg',
  '["Leadership", "Team Building", "Community Engagement"]'::jsonb,
  true,
  3
),
(
  'Peter Hatzoglou',
  'Right-arm Leg-spin Bowler',
  'Big Bash League Short-form Specialist',
  'A Big Bash League short-form specialist, Peter Hatzoglou is known for his idiosyncratic bowling action.',
  'A Big Bash League short-form specialist, Peter Hatzoglou is known for his idiosyncratic bowling action, ability to bowl topspinners, sliders and googlies as well as the ability to bowl from a high release point at high pace. He provides our program with specific expertise on the tactics and skills required to succeed in the modern game.',
  'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVSZiMOMOUJQZtNBe_697OsYlgRhNRHhe02q3A8pS1Jxls1mE0Gphx96qKZiiA9Y669Q-VIkSB3_DmyAZwGFmxlw',
  '["Right-arm Leg-spin Bowling", "googlies", "pressure handling"]'::jsonb,
  true,
  4
),
(
  'Mohamed Irfan',
  'Former Hockey Australia Captain',
  'International Hockey Star',
  'Pakistani field hockey defender and captain with international experience.',
  'Pakistani field hockey defender and captain with international experience, offering mentorship in team dynamics, discipline, and elite sport professionalism.',
  'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fwww.mediastorehouse.com.au%2Fp%2F773%2Fmuhammad-irfan-25108724.jpg.webp',
  '["Strategy & Tactics", "Captaincy", "International Experience"]'::jsonb,
  true,
  5
)
ON CONFLICT DO NOTHING;

-- Insert Programs Data
INSERT INTO programs (name, slug, subtitle, description, detailed_description, age_group, duration, price, price_period, features, image, color_scheme, is_popular, is_featured, status, sort_order) VALUES 
(
  'Development Programs',
  'development-programs',
  'Ages 8-12',
  'Building fundamentals through fun and engaging cricket experiences',
  'Our Development Programs are designed for young cricketers aged 8-12, focusing on building strong fundamentals through fun and engaging cricket experiences. We emphasize skill foundation, team spirit, confidence building, and play-based learning.',
  '8-12 years',
  'Various formats available',
  NULL,
  NULL,
  '["Skill Foundation", "Team Spirit", "Confidence Building", "Play-Based Learning"]'::jsonb,
  'https://images.icc-cricket.com/image/upload/t_ratio16_9-size30-webp/prd/ekplqm9uptgbtauwpqm7',
  'blue',
  false,
  true,
  'active',
  1
),
(
  'Performance Programs',
  'performance-programs',
  'Ages 13-17',
  'Elite pathway preparation with advanced techniques and mental conditioning',
  'Our Performance Programs cater to serious young cricketers aged 13-17, providing elite pathway preparation with advanced techniques and mental conditioning. Focus areas include advanced skills, mental training, elite pathways, and performance analytics.',
  '13-17 years',
  'Various formats available',
  NULL,
  NULL,
  '["Advanced Skills", "Mental Training", "Elite Pathways", "Performance Analytics"]'::jsonb,
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKgobzE44G-w_KnxHVRpfaSxtlk3DnY6uKiNdxrPLrArDAB2JqDX5KQdtlKUl8GZTYaKA&usqp=CAU',
  'emerald',
  false,
  true,
  'active',
  2
),
(
  'Cricket Cadets Skill Development Day',
  'skill-development-day',
  'Featured Program',
  'Comprehensive skill development in a single intensive day',
  'Our flagship Cricket Cadets Skill Development Day offers comprehensive skill development in a single intensive day. Perfect for players looking to enhance their cricket abilities through focused, high-quality coaching.',
  'All ages',
  '1 day intensive',
  NULL,
  NULL,
  '["Intensive Training", "All Skill Levels", "Expert Coaching", "Comprehensive Development"]'::jsonb,
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'green',
  true,
  true,
  'active',
  0
),
(
  'Rookie Bootcamp',
  'rookie-bootcamp',
  'Perfect Start',
  'Ideal for beginners aged 6-10. Focus on fun, fundamentals, and building confidence.',
  'Our Rookie Bootcamp is perfect for beginners aged 6-10, focusing on fun, fundamentals, and building confidence. This program includes 2 sessions per week with basic batting & bowling, fun games & activities, and small group training.',
  '6-10 years',
  '1.5 hours per session',
  149.00,
  'monthly',
  '["2 sessions per week", "Basic batting & bowling", "Fun games & activities", "Small group training (8 kids max)", "Parent progress updates", "Equipment provided", "Certificate of completion"]'::jsonb,
  'https://images.icc-cricket.com/image/upload/t_ratio16_9-size30-webp/prd/ekplqm9uptgbtauwpqm7',
  'emerald',
  false,
  false,
  'active',
  3
),
(
  'Champion Development',
  'champion-development',
  'Most Popular',
  'Comprehensive program for ages 11-15. Advanced skills, strategy, and competitive preparation.',
  'Our Champion Development program is comprehensive training for ages 11-15, featuring advanced skills, strategy, and competitive preparation. Includes 3 sessions per week with advanced technique training, match simulation & strategy, and video analysis.',
  '11-15 years',
  '2 hours per session',
  199.00,
  'monthly',
  '["3 sessions per week", "Advanced technique training", "Match simulation & strategy", "Video analysis included", "Fitness & conditioning", "Mental game coaching", "Tournament preparation", "Performance tracking"]'::jsonb,
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKgobzE44G-w_KnxHVRpfaSxtlk3DnY6uKiNdxrPLrArDAB2JqDX5KQdtlKUl8GZTYaKA&usqp=CAU',
  'blue',
  true,
  false,
  'active',
  4
),
(
  'Elite Academy',
  'elite-academy',
  'Premium Training',
  'High-performance program for serious players aged 16-18. Professional-level training.',
  'Our Elite Academy offers high-performance training for serious players aged 16-18, providing professional-level training. Features 4 sessions per week, 1-on-1 coaching sessions, professional match analysis, and scholarship opportunities.',
  '16-18 years',
  '2.5 hours per session',
  299.00,
  'monthly',
  '["4 sessions per week", "1-on-1 coaching sessions", "Professional match analysis", "Strength & conditioning program", "Mental performance coaching", "College/professional pathway guidance", "Tournament travel opportunities", "Scholarship opportunities"]'::jsonb,
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'purple',
  false,
  false,
  'active',
  5
)
ON CONFLICT (slug) DO NOTHING;

-- Insert Locations Data
INSERT INTO locations (name, address, city, state, country, postal_code, phone, email, facilities, operating_hours, is_active, sort_order) VALUES 
(
  'Melbourne Cricket Academy',
  '123 Cricket Street',
  'Melbourne',
  'Victoria',
  'Australia',
  '3000',
  '+61 3 9000 0000',
  'melbourne@cricketcadets.com',
  '["Indoor Nets", "Outdoor Pitches", "Video Analysis Room", "Fitness Center", "Equipment Storage"]'::jsonb,
  '{"monday": "9:00 AM - 9:00 PM", "tuesday": "9:00 AM - 9:00 PM", "wednesday": "9:00 AM - 9:00 PM", "thursday": "9:00 AM - 9:00 PM", "friday": "9:00 AM - 9:00 PM", "saturday": "8:00 AM - 6:00 PM", "sunday": "8:00 AM - 6:00 PM"}'::jsonb,
  true,
  1
),
(
  'Sydney Cricket Center',
  '456 Sports Avenue',
  'Sydney',
  'New South Wales',
  'Australia',
  '2000',
  '+61 2 9000 0000',
  'sydney@cricketcadets.com',
  '["Indoor Nets", "Outdoor Pitches", "Video Analysis Room", "Fitness Center", "Cafe"]'::jsonb,
  '{"monday": "9:00 AM - 9:00 PM", "tuesday": "9:00 AM - 9:00 PM", "wednesday": "9:00 AM - 9:00 PM", "thursday": "9:00 AM - 9:00 PM", "friday": "9:00 AM - 9:00 PM", "saturday": "8:00 AM - 6:00 PM", "sunday": "8:00 AM - 6:00 PM"}'::jsonb,
  true,
  2
),
(
  'Brisbane Cricket Hub',
  '789 Cricket Road',
  'Brisbane',
  'Queensland',
  'Australia',
  '4000',
  '+61 7 9000 0000',
  'brisbane@cricketcadets.com',
  '["Indoor Nets", "Outdoor Pitches", "Video Analysis Room", "Fitness Center", "Pro Shop"]'::jsonb,
  '{"monday": "9:00 AM - 9:00 PM", "tuesday": "9:00 AM - 9:00 PM", "wednesday": "9:00 AM - 9:00 PM", "thursday": "9:00 AM - 9:00 PM", "friday": "9:00 AM - 9:00 PM", "saturday": "8:00 AM - 6:00 PM", "sunday": "8:00 AM - 6:00 PM"}'::jsonb,
  true,
  3
),
(
  'Toronto Cricket Academy',
  '321 Maple Street',
  'Toronto',
  'Ontario',
  'Canada',
  'M5V 3A8',
  '+1 416 000 0000',
  'toronto@cricketcadets.com',
  '["Indoor Nets", "Outdoor Pitches", "Video Analysis Room", "Fitness Center", "Heated Facilities"]'::jsonb,
  '{"monday": "9:00 AM - 9:00 PM", "tuesday": "9:00 AM - 9:00 PM", "wednesday": "9:00 AM - 9:00 PM", "thursday": "9:00 AM - 9:00 PM", "friday": "9:00 AM - 9:00 PM", "saturday": "8:00 AM - 6:00 PM", "sunday": "8:00 AM - 6:00 PM"}'::jsonb,
  true,
  4
)
ON CONFLICT DO NOTHING;

-- Insert Pages Data
INSERT INTO pages (title, slug, meta_description, content, status, featured_image, template, seo_title, is_homepage, sort_order) VALUES 
(
  'Cricket Cadets Global - Home',
  'home',
  'The World''s Premier Cricket Academy - Elite coaching anywhere. From Australia to the world.',
  '{
    "hero": {
      "title": "Cricket Cadets",
      "subtitle": "From Australia to the world • Elite coaching anywhere",
      "description": "Be the part of a next-gen cricket academy shaping future stars through innovation and technology.",
      "background_image": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "cta_primary_text": "Start Your Journey",
      "cta_secondary_text": "Watch Stories",
      "badge_text": "The World''s Premier Cricket Academy"
    },
    "sections": [
      {
        "type": "our_story",
        "title": "Australian Excellence, Global Opportunity",
        "content": "To be the leading cricket academy legacy connecting players, coaches, and the communities worldwide—shaping confident athletes and leaders on and off the field."
      },
      {
        "type": "programs_overview",
        "title": "Your Cricket Pathway",
        "description": "Tailored programs for every stage of your cricket journey"
      },
      {
        "type": "coaches",
        "title": "Our Elite Coaching Panel - Your Global Mentors",
        "description": "Cricket Cadets is proud to be supported by a select panel of internationally experienced, elite coaches and sporting mentors."
      }
    ]
  }'::jsonb,
  'published',
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'home',
  'Cricket Cadets Global - The World''s Premier Cricket Academy',
  true,
  0
),
(
  'Development Programs',
  'development-programs',
  'Cricket development programs for all ages and skill levels. Expert coaching and comprehensive training.',
  '{
    "hero": {
      "title": "Development Programs",
      "subtitle": "Comprehensive Cricket Training",
      "description": "Expert coaching programs designed to develop cricket skills at every level",
      "background_image": "https://images.icc-cricket.com/image/upload/t_ratio16_9-size30-webp/prd/ekplqm9uptgbtauwpqm7"
    },
    "sections": [
      {
        "type": "featured_program",
        "title": "Cricket Cadets Skill Development Day",
        "description": "Comprehensive skill development in a single intensive day"
      },
      {
        "type": "program_philosophy",
        "title": "Our Training Philosophy",
        "content": "We believe in developing not just cricket skills, but character, confidence, and leadership qualities."
      }
    ]
  }'::jsonb,
  'published',
  'https://images.icc-cricket.com/image/upload/t_ratio16_9-size30-webp/prd/ekplqm9uptgbtauwpqm7',
  'programs',
  'Development Programs - Cricket Cadets Global',
  false,
  1
),
(
  'Canada Programs',
  'canada',
  'Cricket Cadets Canada - Premium cricket training programs in Toronto and across Canada.',
  '{
    "hero": {
      "title": "Cricket Cadets Canada",
      "subtitle": "Premium Cricket Training in Canada",
      "description": "Bringing world-class cricket coaching to Canada with programs designed for Canadian players",
      "background_image": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    "sections": [
      {
        "type": "bootcamp_intro",
        "title": "Canadian Cricket Bootcamp",
        "description": "Intensive training programs adapted for Canadian conditions and players"
      },
      {
        "type": "plans",
        "title": "Training Plans",
        "description": "Choose the perfect program for your cricket journey"
      },
      {
        "type": "ai_performance",
        "title": "AI Performance Analysis",
        "description": "Cutting-edge technology to enhance your game"
      }
    ]
  }'::jsonb,
  'published',
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'canada',
  'Cricket Cadets Canada - Premium Cricket Training',
  false,
  2
)
ON CONFLICT (slug) DO NOTHING;

-- Insert Hero Sections
INSERT INTO hero_sections (page_id, title, subtitle, description, background_image, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, badge_text, badge_icon, is_active, sort_order) VALUES 
(
  (SELECT id FROM pages WHERE slug = 'home'),
  'Cricket Cadets',
  'From Australia to the world • Elite coaching anywhere',
  'Be the part of a next-gen cricket academy shaping future stars through innovation and technology.',
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Start Your Journey',
  '#register',
  'Watch Stories',
  '#testimonials',
  'The World''s Premier Cricket Academy',
  'Globe',
  true,
  1
),
(
  (SELECT id FROM pages WHERE slug = 'development-programs'),
  'Cricket Cadets Skill Development Day',
  'FEATURED PROGRAM',
  'Comprehensive skill development in a single intensive day',
  'https://images.icc-cricket.com/image/upload/t_ratio16_9-size30-webp/prd/ekplqm9uptgbtauwpqm7',
  'Register Now',
  '#register',
  'Learn More',
  '#about',
  '🏏 FEATURED PROGRAM',
  'Trophy',
  true,
  1
),
(
  (SELECT id FROM pages WHERE slug = 'canada'),
  'Cricket Cadets Canada',
  'Premium Cricket Training in Canada',
  'Bringing world-class cricket coaching to Canada with programs designed for Canadian players',
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Join Bootcamp',
  '#register',
  'View Programs',
  '#programs',
  'Now in Canada',
  'MapPin',
  true,
  1
)
ON CONFLICT DO NOTHING;

-- Insert Navigation Menu
INSERT INTO navigation_menus (name, location, items, is_active) VALUES 
(
  'Main Navigation',
  'header',
  '[
    {
      "label": "Home",
      "url": "/",
      "type": "internal"
    },
    {
      "label": "Programs",
      "url": "/development-programs",
      "type": "internal",
      "children": [
        {
          "label": "Development Programs",
          "url": "/development-programs",
          "type": "internal"
        },
        {
          "label": "Canada Programs",
          "url": "/canada",
          "type": "internal"
        }
      ]
    },
    {
      "label": "About",
      "url": "/#about-us",
      "type": "internal"
    },
    {
      "label": "Coaches",
      "url": "/#global-coaches",
      "type": "internal"
    },
    {
      "label": "Contact",
      "url": "/#contact",
      "type": "internal"
    }
  ]'::jsonb,
  true
),
(
  'Footer Navigation',
  'footer',
  '[
    {
      "label": "Programs",
      "children": [
        {
          "label": "Development Programs",
          "url": "/development-programs",
          "type": "internal"
        },
        {
          "label": "Canada Programs",
          "url": "/canada",
          "type": "internal"
        }
      ]
    },
    {
      "label": "Company",
      "children": [
        {
          "label": "About Us",
          "url": "/#about-us",
          "type": "internal"
        },
        {
          "label": "Our Coaches",
          "url": "/#global-coaches",
          "type": "internal"
        },
        {
          "label": "Contact",
          "url": "/#contact",
          "type": "internal"
        }
      ]
    }
  ]'::jsonb,
  true
)
ON CONFLICT DO NOTHING;

-- Insert some sample testimonials
INSERT INTO testimonials (name, title, content, rating, image, location, is_featured, status, sort_order) VALUES 
(
  'Sarah Johnson',
  'Parent',
  'My daughter has been attending Cricket Cadets for 6 months now and the improvement in her skills and confidence has been remarkable. The coaches are fantastic and really know how to engage with kids.',
  5,
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
  'Melbourne, Australia',
  true,
  'published',
  1
),
(
  'Michael Chen',
  'Parent',
  'The Cricket Cadets program has been amazing for my son. Not only has his cricket improved dramatically, but he''s also developed leadership skills and made great friends.',
  5,
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
  'Sydney, Australia',
  true,
  'published',
  2
),
(
  'Emma Thompson',
  'Player (Age 14)',
  'Cricket Cadets has helped me take my game to the next level. The coaching is world-class and I''ve learned so much about both technique and mental preparation.',
  5,
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
  'Toronto, Canada',
  true,
  'published',
  3
)
ON CONFLICT DO NOTHING;

-- Insert some sample waitlist entries with new status
INSERT INTO waitlist (
  child_name, date_of_birth, gender, phone_number, email, suburb_postcode, 
  cricket_experience, parent_guardian_name, parent_guardian_phone, 
  parent_guardian_email, consent_to_contact, status, program_interest, source
) VALUES 
  ('Alex Doe', '2014-05-15', 'male', '0412345678', 'alex.doe@example.com', 'Melbourne 3000', 'beginner', 'John Doe', '0423456789', 'john.doe@example.com', true, 'pending', (SELECT id FROM programs WHERE slug = 'rookie-bootcamp'), 'Website'),
  ('Emma Smith', '2016-08-22', 'female', '0434567890', 'emma.smith@example.com', 'Sydney 2000', 'club', 'Jane Smith', '0445678901', 'jane.smith@example.com', true, 'approved', (SELECT id FROM programs WHERE slug = 'champion-development'), 'Social Media'),
  ('Sam Johnson', '2012-12-10', 'other', '0456789012', 'sam.johnson@example.com', 'Brisbane 4000', 'representative', 'Mike Johnson', '0467890123', 'mike.johnson@example.com', true, 'contacted', (SELECT id FROM programs WHERE slug = 'elite-academy'), 'Referral')
ON CONFLICT DO NOTHING;

COMMIT;
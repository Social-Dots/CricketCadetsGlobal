-- Add dynamic content fields to development_programs table

-- Add hero section fields
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'development_programs' AND column_name = 'hero_title') THEN
        ALTER TABLE development_programs ADD COLUMN hero_title TEXT DEFAULT 'Where Fun Meets Fundamentals';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'development_programs' AND column_name = 'hero_subtitle') THEN
        ALTER TABLE development_programs ADD COLUMN hero_subtitle TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'development_programs' AND column_name = 'hero_description') THEN
        ALTER TABLE development_programs ADD COLUMN hero_description TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'development_programs' AND column_name = 'hero_background_image') THEN
        ALTER TABLE development_programs ADD COLUMN hero_background_image TEXT;
    END IF;
END $$;

-- Add timeline data field
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'development_programs' AND column_name = 'timeline_data') THEN
        ALTER TABLE development_programs ADD COLUMN timeline_data JSONB;
        COMMENT ON COLUMN development_programs.timeline_data IS 'Array of timeline items with icon, title, description, time, colors';
    END IF;
END $$;

-- Add philosophy principles field
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'development_programs' AND column_name = 'philosophy_principles') THEN
        ALTER TABLE development_programs ADD COLUMN philosophy_principles JSONB;
        COMMENT ON COLUMN development_programs.philosophy_principles IS 'Array of principles with icon, title, description, colors';
    END IF;
END $$;

-- Add skill categories field
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'development_programs' AND column_name = 'skill_categories') THEN
        ALTER TABLE development_programs ADD COLUMN skill_categories JSONB;
        COMMENT ON COLUMN development_programs.skill_categories IS 'Array of skill categories with title, icon, skills array';
    END IF;
END $$;

-- Add call to action fields
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'development_programs' AND column_name = 'cta_title') THEN
        ALTER TABLE development_programs ADD COLUMN cta_title TEXT DEFAULT 'Ready to Start the Adventure?';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'development_programs' AND column_name = 'cta_description') THEN
        ALTER TABLE development_programs ADD COLUMN cta_description TEXT DEFAULT 'Spots in our popular development camps fill up fast. Secure your child''s place today and give them a summer of cricket they''ll never forget!';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'development_programs' AND column_name = 'cta_button_text') THEN
        ALTER TABLE development_programs ADD COLUMN cta_button_text TEXT DEFAULT 'Join a Camp';
    END IF;
END $$;

-- Sample data for timeline (based on AWeekInTheLife component)
UPDATE development_programs 
SET timeline_data = '[
  {
    "icon": "Sun",
    "title": "Dynamic Warm-Up Sessions",
    "description": "Energizing start with cricket-specific movements, agility drills, and team-building activities to prepare body and mind for training.",
    "time": "9:00 AM - 9:30 AM",
    "color": "from-orange-400 to-yellow-500",
    "bgColor": "bg-orange-50"
  },
  {
    "icon": "Target",
    "title": "Technical Skill Development",
    "description": "Focused coaching on batting technique, bowling accuracy, and fielding fundamentals through progressive skill-building exercises.",
    "time": "9:30 AM - 11:00 AM",
    "color": "from-blue-400 to-indigo-500",
    "bgColor": "bg-blue-50"
  },
  {
    "icon": "Shield",
    "title": "Tactical Training Stations",
    "description": "Rotating through specialized stations covering match scenarios, strategic thinking, and position-specific skills development.",
    "time": "11:15 AM - 12:30 PM",
    "color": "from-green-400 to-emerald-500",
    "bgColor": "bg-green-50"
  },
  {
    "icon": "Users",
    "title": "Competitive Match Play",
    "description": "Applying learned skills in structured mini-matches with real-time coaching feedback and tactical guidance.",
    "time": "1:30 PM - 2:45 PM",
    "color": "from-purple-400 to-pink-500",
    "bgColor": "bg-purple-50"
  },
  {
    "icon": "Clock",
    "title": "Mental Skills & Recovery",
    "description": "Focus on concentration techniques, match psychology, and proper cool-down routines for peak performance.",
    "time": "2:45 PM - 3:15 PM",
    "color": "from-teal-400 to-cyan-500",
    "bgColor": "bg-teal-50"
  },
  {
    "icon": "Trophy",
    "title": "Achievement Recognition",
    "description": "Celebrating individual progress, team achievements, and setting goals for continued development beyond the program.",
    "time": "3:15 PM - 3:30 PM",
    "color": "from-amber-400 to-orange-500",
    "bgColor": "bg-amber-50"
  }
]'::jsonb
WHERE timeline_data IS NULL;

-- Sample data for philosophy principles (based on ProgramPhilosophy component)
UPDATE development_programs 
SET philosophy_principles = '[
  {
    "icon": "Heart",
    "title": "Fun First",
    "description": "Creating positive memories is our top priority. We foster joy in every drill and game, ensuring cricket becomes a lifelong passion.",
    "color": "text-red-500",
    "bgGradient": "from-red-400 to-pink-500",
    "bgColor": "bg-red-50",
    "borderColor": "border-red-200"
  },
  {
    "icon": "Users",
    "title": "Team Spirit",
    "description": "Learning to be a great teammate is as important as learning to bat or bowl. We build friendships that last beyond the field.",
    "color": "text-blue-500",
    "bgGradient": "from-blue-400 to-indigo-500",
    "bgColor": "bg-blue-50",
    "borderColor": "border-blue-200"
  },
  {
    "icon": "Shield",
    "title": "Build Confidence",
    "description": "A safe, supportive space where every child is encouraged to try their best and grow. Mistakes are learning opportunities.",
    "color": "text-emerald-500",
    "bgGradient": "from-emerald-400 to-green-500",
    "bgColor": "bg-emerald-50",
    "borderColor": "border-emerald-200"
  },
  {
    "icon": "Trophy",
    "title": "Celebrate Effort",
    "description": "We recognize hard work and personal progress, not just winning. Every improvement deserves recognition and celebration.",
    "color": "text-amber-500",
    "bgGradient": "from-amber-400 to-orange-500",
    "bgColor": "bg-amber-50",
    "borderColor": "border-amber-200"
  }
]'::jsonb
WHERE philosophy_principles IS NULL;

-- Sample data for skill categories (based on WhatTheyLearn component)
UPDATE development_programs 
SET skill_categories = '[
  {
    "title": "Cricket Fundamentals",
    "icon": "Target",
    "color": "text-emerald-600",
    "bgColor": "bg-emerald-50",
    "borderColor": "border-emerald-200",
    "gradientFrom": "from-emerald-400",
    "gradientTo": "to-green-500",
    "skills": [
      "Proper grip & stance techniques",
      "Basic batting strokes & footwork",
      "Introduction to bowling actions",
      "Safe catching & fielding techniques",
      "Understanding cricket equipment"
    ]
  },
  {
    "title": "Game Sense & Strategy",
    "icon": "Users",
    "color": "text-blue-600",
    "bgColor": "bg-blue-50",
    "borderColor": "border-blue-200",
    "gradientFrom": "from-blue-400",
    "gradientTo": "to-indigo-500",
    "skills": [
      "Understanding field positions",
      "Running between wickets safely",
      "Basics of scoring & match awareness",
      "Rules of the game & fair play",
      "Team communication & signals"
    ]
  },
  {
    "title": "Physical Development",
    "icon": "Activity",
    "color": "text-purple-600",
    "bgColor": "bg-purple-50",
    "borderColor": "border-purple-200",
    "gradientFrom": "from-purple-400",
    "gradientTo": "to-pink-500",
    "skills": [
      "Agility & coordination drills",
      "Balance & speed development",
      "Throwing & catching accuracy",
      "Hand-eye coordination exercises",
      "Flexibility & injury prevention"
    ]
  },
  {
    "title": "Character Building",
    "icon": "Star",
    "color": "text-amber-600",
    "bgColor": "bg-amber-50",
    "borderColor": "border-amber-200",
    "gradientFrom": "from-amber-400",
    "gradientTo": "to-yellow-500",
    "skills": [
      "Sportsmanship & respect",
      "Leadership & responsibility",
      "Perseverance & resilience",
      "Goal setting & achievement",
      "Positive attitude & mindset"
    ]
  }
]'::jsonb
WHERE skill_categories IS NULL;
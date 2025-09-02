# Cricket Cadets Global - Supabase Database Setup Guide

## Overview
This guide will help you set up the complete database structure for Cricket Cadets Global in Supabase, including all tables, sample data, and admin access.

## Prerequisites
- A Supabase account (sign up at https://supabase.com)
- Access to your Supabase project dashboard

## Step-by-Step Setup Instructions

### Step 1: Create a New Supabase Project
1. Log in to your Supabase dashboard
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `cricket-cadets-global`
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
5. Click "Create new project"
6. Wait for the project to be created (this may take a few minutes)

### Step 2: Execute Database Schema
1. In your Supabase project dashboard, navigate to the **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-setup.sql` file
4. Paste it into the SQL editor
5. Click "Run" to execute the script
6. You should see a success message: "Database setup completed successfully!"

### Step 3: Insert Sample Data
1. In the SQL Editor, create another new query
2. Copy the entire contents of `sample-data.sql` file
3. Paste it into the SQL editor
4. Click "Run" to execute the script
5. You should see a success message: "Sample data inserted successfully!"

### Step 4: Configure Row Level Security (RLS)
The database setup includes basic RLS policies. For production use, you may want to:
1. Review and customize the RLS policies based on your specific needs
2. Set up proper authentication integration
3. Configure API keys and permissions

### Step 5: Get Your Database Connection Details
1. Go to **Settings** > **Database**
2. Note down the following details:
   - **Host**: `db.[your-project-ref].supabase.co`
   - **Database name**: `postgres`
   - **Port**: `5432`
   - **User**: `postgres`
   - **Password**: The password you set when creating the project

### Step 6: Get Your API Keys
1. Go to **Settings** > **API**
2. Note down:
   - **Project URL**: `https://[your-project-ref].supabase.co`
   - **anon public key**: For client-side access
   - **service_role secret key**: For server-side access (keep this secure!)

### Step 7: Update Your Application Configuration
Update your `.env.local` file with the Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```

## Admin Login Credentials

After running the sample data script, you'll have the following admin accounts available:

### Super Admin Account
- **Email**: `admin@cricketcadets.com`
- **Password**: `admin123`
- **Role**: `super_admin`
- **Access**: Full system access

### Editor Account
- **Email**: `editor@cricketcadets.com`
- **Password**: `admin123`
- **Role**: `editor`
- **Access**: Content management access

### Viewer Account
- **Email**: `viewer@cricketcadets.com`
- **Password**: `admin123`
- **Role**: `viewer`
- **Access**: Read-only access

> **⚠️ IMPORTANT SECURITY NOTE**: 
> These are default credentials for development/testing purposes only. 
> **IMMEDIATELY CHANGE THESE PASSWORDS** before deploying to production!

## Database Tables Created

The setup script creates the following tables:

### Core Content Tables
- `users` - User accounts and authentication
- `pages` - Website pages and content
- `hero_sections` - Homepage hero sections
- `programs` - Cricket training programs
- `coaches` - Coach profiles and information
- `testimonials` - Customer testimonials and reviews
- `locations` - Training facility locations
- `blog_posts` - Blog articles and news

### Management Tables
- `content_categories` - Content categorization
- `site_settings` - Website configuration
- `waitlist` - Student registration waitlist
- `media` - Media file management
- `audit_logs` - System activity tracking
- `navigation_menus` - Website navigation structure

## Sample Data Included

The sample data script populates your database with:
- 3 sample programs (Junior Cricketers, Elite Training, Holiday Camps)
- 3 featured coaches with profiles
- 3 customer testimonials
- 2 training locations
- 3 waitlist entries
- 2 blog posts
- 1 homepage hero section
- Default site settings and categories

## Verification Steps

### 1. Check Tables Were Created
1. Go to **Table Editor** in your Supabase dashboard
2. You should see all the tables listed in the sidebar
3. Click on any table to view its structure and data

### 2. Verify Sample Data
1. Click on the `programs` table
2. You should see 3 sample programs
3. Check other tables like `coaches`, `testimonials`, etc.

### 3. Test API Access
1. Go to **API Docs** in your Supabase dashboard
2. Try the auto-generated API endpoints
3. Test with your anon key to ensure RLS is working

## Troubleshooting

### Common Issues

**Error: "relation already exists"**
- This means tables already exist. You can either:
  - Drop existing tables first, or
  - Skip the error if you're re-running the script

**Error: "permission denied"**
- Make sure you're using the correct database password
- Ensure you have the right permissions in your Supabase project

**RLS Policies Not Working**
- Check that RLS is enabled on tables
- Verify your API keys are correct
- Review the policy conditions

### Getting Help

If you encounter issues:
1. Check the Supabase documentation: https://supabase.com/docs
2. Review the SQL error messages in the Supabase dashboard
3. Ensure all prerequisites are met

## Next Steps

After completing the database setup:
1. Test your application with the new database
2. Customize the sample data for your needs
3. Set up proper authentication flows
4. Configure production security settings
5. Set up database backups

## Security Recommendations

### For Production Deployment
1. **Change all default passwords immediately**
2. **Review and tighten RLS policies**
3. **Use environment variables for all secrets**
4. **Enable database backups**
5. **Set up monitoring and alerts**
6. **Use strong, unique API keys**
7. **Implement proper user authentication**

---

**Congratulations!** Your Cricket Cadets Global database is now set up and ready to use. The website should now display dynamic content from your Supabase database instead of static content.
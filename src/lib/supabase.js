import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// ============ WAITLIST FUNCTIONS ============
// Add a new entry to the waitlist
export const addToWaitlist = async (data) => {
  // Map camelCase form fields to snake_case database columns
  const mappedData = {
    child_name: data.childName,
    date_of_birth: data.dateOfBirth,
    gender: data.gender,
    phone_number: data.phoneNumber,
    email: data.email,
    suburb_postcode: data.suburbPostcode,
    cricket_experience: data.cricketExperience,
    parent_guardian_name: data.parentGuardianName,
    parent_guardian_phone: data.parentGuardianPhone,
    parent_guardian_email: data.parentGuardianEmail,
    consent_to_contact: data.consentToContact,
    consent_to_marketing: data.consentToMarketing || false,
    source: 'Website'
  }

  const { error } = await supabase
    .from('waitlist')
    .insert([mappedData])
  
  if (error) {
    console.error('Error adding to waitlist:', error)
    throw error
  }
}

// Get all waitlist entries
export const getWaitlistEntries = async () => {
  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching waitlist entries:', error)
    throw error
  }
  
  return data
}

// Update waitlist entry status
export const updateWaitlistStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('waitlist')
    .update({ status })
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating waitlist status:', error)
    throw error
  }
  
  return data
}

// ============ PAGES FUNCTIONS ============
// Get page by slug
export const getPageBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  
  if (error) {
    console.error('Error fetching page:', error)
    throw error
  }
  
  return data
}

// Get all pages
export const getPages = async () => {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching pages:', error)
    throw error
  }
  
  return data
}

// ============ PROGRAMS FUNCTIONS ============
// Get all programs
export const getPrograms = async () => {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('status', 'active')
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching programs:', error)
    throw error
  }
  
  return data
}

// Get featured programs
export const getFeaturedPrograms = async () => {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('status', 'active')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching featured programs:', error)
    throw error
  }
  
  return data
}

// Get program by slug
export const getProgramBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()
  
  if (error) {
    console.error('Error fetching program:', error)
    throw error
  }
  
  return data
}

// ============ COACHES FUNCTIONS ============
// Get all coaches
export const getCoaches = async () => {
  const { data, error } = await supabase
    .from('coaches')
    .select('*')
    .eq('status', 'active')
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching coaches:', error)
    throw error
  }
  
  return data
}

// Get featured coaches
export const getFeaturedCoaches = async () => {
  const { data, error } = await supabase
    .from('coaches')
    .select('*')
    .eq('status', 'active')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching featured coaches:', error)
    throw error
  }
  
  return data
}

// ============ HERO SECTIONS FUNCTIONS ============
// Get hero sections for a page
export const getHeroSectionsByPage = async (pageId) => {
  const { data, error } = await supabase
    .from('hero_sections')
    .select('*')
    .eq('page_id', pageId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching hero sections:', error)
    throw error
  }
  
  return data
}

// Get homepage hero section
export const getHomepageHeroSection = async () => {
  const { data, error } = await supabase
    .from('hero_sections')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(1)
  
  if (error) {
    console.error('Error fetching homepage hero section:', error)
    return null
  }
  
  return data && data.length > 0 ? data[0] : null
}

// Get development programs hero section
export const getDevelopmentHeroSection = async () => {
  const { data, error } = await supabase
    .from('development_programs')
    .select('hero_title, hero_subtitle, hero_description, hero_background_image, title, subtitle, description')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
  
  if (error) {
    console.error('Error fetching development hero section:', error)
    return null
  }
  
  if (data && data.length > 0) {
    const program = data[0]
    return {
      title: program.hero_title || program.title || 'Where Fun Meets Fundamentals',
      subtitle: program.hero_subtitle || program.subtitle || '',
      description: program.hero_description || program.description || '',
      background_image: program.hero_background_image || ''
    }
  }
  
  return null
}

// Get development program timeline data
export const getDevelopmentTimeline = async () => {
  const { data, error } = await supabase
    .from('development_programs')
    .select('timeline_data')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
  
  if (error) {
    console.error('Error fetching development timeline:', error)
    return null
  }
  
  return data && data.length > 0 ? data[0].timeline_data : null
}

// Get development program philosophy
export const getDevelopmentPhilosophy = async () => {
  const { data, error } = await supabase
    .from('development_programs')
    .select('philosophy_principles')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
  
  if (error) {
    console.error('Error fetching development philosophy:', error)
    return null
  }
  
  return data && data.length > 0 ? data[0].philosophy_principles : null
}

// Get development program skill categories
export const getDevelopmentSkillCategories = async () => {
  const { data, error } = await supabase
    .from('development_programs')
    .select('skill_categories')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
  
  if (error) {
    console.error('Error fetching development skill categories:', error)
    return null
  }
  
  return data && data.length > 0 ? data[0].skill_categories : null
}

// Get development program CTA content
export const getDevelopmentCTA = async () => {
  const { data, error } = await supabase
    .from('development_programs')
    .select('cta_title, cta_description, cta_button_text')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
  
  if (error) {
    console.error('Error fetching development CTA:', error)
    return null
  }
  
  if (data && data.length > 0) {
    const program = data[0]
    return {
      title: program.cta_title || 'Ready to Start the Adventure?',
      description: program.cta_description || 'Spots in our popular development camps fill up fast...',
      button_text: program.cta_button_text || 'Join a Camp'
    }
  }
  
  return null
}

// Get Canada hero section
export const getCanadaHeroSection = async () => {
  const { data, error } = await supabase
    .from('hero_sections')
    .select('*')
    .eq('is_active', true)
    .ilike('title', '%canada%')
    .order('sort_order', { ascending: true })
    .limit(1)
  
  if (error) {
    console.error('Error fetching Canada hero section:', error)
    return null
  }
  
  return data && data.length > 0 ? data[0] : null
}

// Get all hero sections
export const getHeroSections = async () => {
  const { data, error } = await supabase
    .from('hero_sections')
    .select('*')
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching hero sections:', error)
    throw error
  }
  
  return data
}

// Create hero section
export const createHeroSection = async (heroData) => {
  const { data, error } = await supabase
    .from('hero_sections')
    .insert([heroData])
    .select()
  
  if (error) {
    console.error('Error creating hero section:', error)
    throw error
  }
  
  return data[0]
}

// Update hero section
export const updateHeroSection = async (id, heroData) => {
  const { data, error } = await supabase
    .from('hero_sections')
    .update(heroData)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating hero section:', error)
    throw error
  }
  
  return data[0]
}

// Delete hero section
export const deleteHeroSection = async (id) => {
  const { error } = await supabase
    .from('hero_sections')
    .delete()
    .eq('id', id)
  
  return { error }
}

// ============ TESTIMONIALS FUNCTIONS ============
// Get all testimonials
export const getTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching testimonials:', error)
    throw error
  }
  
  return data
}

// Get featured testimonials
export const getFeaturedTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching featured testimonials:', error)
    throw error
  }
  
  return data
}

// ============ LOCATIONS FUNCTIONS ============
// Get all locations
export const getLocations = async () => {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching locations:', error)
    throw error
  }
  
  return data
}

// ============ NAVIGATION FUNCTIONS ============
// Get navigation menu by location
export const getNavigationMenu = async (location) => {
  const { data, error } = await supabase
    .from('navigation_menus')
    .select('*')
    .eq('location', location)
    .eq('is_active', true)
    .single()
  
  if (error) {
    console.error('Error fetching navigation menu:', error)
    throw error
  }
  
  return data
}

// ============ DEVELOPMENT PROGRAMS FUNCTIONS ============
// Get all development programs
export const getDevelopmentPrograms = async () => {
  const { data, error } = await supabase
    .from('development_programs')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching development programs:', error)
    throw error
  }
  
  return data
}

// Add a new development program
export const addDevelopmentProgram = async (programData) => {
  const { data, error } = await supabase
    .from('development_programs')
    .insert([programData])
    .select()
  
  if (error) {
    console.error('Error adding development program:', error)
    throw error
  }
  
  return data[0]
}

// Update a development program
export const updateDevelopmentProgram = async (id, programData) => {
  const { data, error } = await supabase
    .from('development_programs')
    .update({ ...programData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating development program:', error)
    throw error
  }
  
  return data[0]
}

// Delete a development program
export const deleteDevelopmentProgram = async (id) => {
  const { error } = await supabase
    .from('development_programs')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting development program:', error)
    throw error
  }
}

// ============ SITE SETTINGS FUNCTIONS ============
// Get site settings
export const getSiteSettings = async () => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('is_active', true)
  
  if (error) {
    console.error('Error fetching site settings:', error)
    throw error
  }
  
  // Convert array to object for easier access
  const settings = {}
  data?.forEach(setting => {
    settings[setting.key] = setting.value
  })
  
  return settings
}

// ============ BLOG FUNCTIONS ============
// Get all blog posts
export const getBlogPosts = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:users(name, email),
      category:content_categories(name, slug)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }
  
  return data
}

// Get blog post by slug
export const getBlogPostBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:users(name, email),
      category:content_categories(name, slug)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  
  if (error) {
    console.error('Error fetching blog post:', error)
    throw error
  }
  
  return data
}

// ============ CRUD FUNCTIONS FOR PAGES ============
// Create a new page
export const createPage = async (pageData) => {
  const { data, error } = await supabase
    .from('pages')
    .insert([pageData])
    .select()
  
  if (error) {
    console.error('Error creating page:', error)
    throw error
  }
  
  return data[0]
}

// Update a page
export const updatePage = async (id, pageData) => {
  const { data, error } = await supabase
    .from('pages')
    .update(pageData)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating page:', error)
    throw error
  }
  
  return data[0]
}

// Delete a page
export const deletePage = async (id) => {
  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting page:', error)
    throw error
  }
}

// ============ CRUD FUNCTIONS FOR PROGRAMS ============
// Create a new program
export const createProgram = async (programData) => {
  const { data, error } = await supabase
    .from('programs')
    .insert([programData])
    .select()
  
  if (error) {
    console.error('Error creating program:', error)
    throw error
  }
  
  return data[0]
}

// Update a program
export const updateProgram = async (id, programData) => {
  const { data, error } = await supabase
    .from('programs')
    .update(programData)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating program:', error)
    throw error
  }
  
  return data[0]
}

// Delete a program
export const deleteProgram = async (id) => {
  const { error } = await supabase
    .from('programs')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting program:', error)
    throw error
  }
}

// ============ CRUD FUNCTIONS FOR COACHES ============
// Create a new coach
export const createCoach = async (coachData) => {
  const { data, error } = await supabase
    .from('coaches')
    .insert([coachData])
    .select()
  
  if (error) {
    console.error('Error creating coach:', error)
    throw error
  }
  
  return data[0]
}

// Update a coach
export const updateCoach = async (id, coachData) => {
  const { data, error } = await supabase
    .from('coaches')
    .update(coachData)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating coach:', error)
    throw error
  }
  
  return data[0]
}

// Delete a coach
export const deleteCoach = async (id) => {
  const { error } = await supabase
    .from('coaches')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting coach:', error)
    throw error
  }
}

// ============ ANALYTICS FUNCTIONS ============
// Get waitlist analytics
export const getWaitlistAnalytics = async () => {
  const { data, error } = await supabase
    .from('waitlist')
    .select('status, created_at, program_interest')
  
  if (error) {
    console.error('Error fetching waitlist analytics:', error)
    throw error
  }
  
  return data
}

// Get content analytics
export const getContentAnalytics = async () => {
  const [pages, programs, coaches, testimonials] = await Promise.all([
    supabase.from('pages').select('id, status, created_at'),
    supabase.from('programs').select('id, status, created_at'),
    supabase.from('coaches').select('id, status, created_at'),
    supabase.from('testimonials').select('id, status, created_at')
  ])
  
  return {
    pages: pages.data || [],
    programs: programs.data || [],
    coaches: coaches.data || [],
    testimonials: testimonials.data || []
  }
}

// ============ CRUD FUNCTIONS FOR TESTIMONIALS ============
// Create a new testimonial
export const createTestimonial = async (testimonialData) => {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonialData])
    .select()
  
  if (error) {
    console.error('Error creating testimonial:', error)
    throw error
  }
  
  return data[0]
}

// Update a testimonial
export const updateTestimonial = async (id, testimonialData) => {
  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonialData)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating testimonial:', error)
    throw error
  }
  
  return data[0]
}

// Delete a testimonial
export const deleteTestimonial = async (id) => {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting testimonial:', error)
    throw error
  }
}

// ============ CRUD FUNCTIONS FOR LOCATIONS ============
// Create a new location
export const createLocation = async (locationData) => {
  const { data, error } = await supabase
    .from('locations')
    .insert([locationData])
    .select()
  
  if (error) {
    console.error('Error creating location:', error)
    throw error
  }
  
  return data[0]
}

// Update a location
export const updateLocation = async (id, locationData) => {
  const { data, error } = await supabase
    .from('locations')
    .update(locationData)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating location:', error)
    throw error
  }
  
  return data[0]
}

// Delete a location
export const deleteLocation = async (id) => {
  const { error } = await supabase
    .from('locations')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting location:', error)
    throw error
  }
}

// ============ SITE SETTINGS FUNCTIONS ============
export const updateSiteSettings = async (settingsData) => {
  try {
    // Convert settings object to key-value pairs for upsert
    const settingsArray = Object.entries(settingsData).map(([key, value]) => ({
      key,
      value: typeof value === 'object' ? JSON.stringify(value) : value,
      is_active: true
    }))
    
    const { data, error } = await supabase
      .from('site_settings')
      .upsert(settingsArray, { onConflict: 'key' })
      .select()
    
    if (error) {
      console.error('Error updating site settings:', error)
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Error in updateSiteSettings:', error)
    throw error
  }
}

// ============ AUDIT LOG FUNCTIONS ============
// Add audit log entry
export const addAuditLog = async (action, tableName, recordId, oldValues = null, newValues = null) => {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { error } = await supabase
    .from('audit_logs')
    .insert([{
      user_id: user?.id,
      action,
      table_name: tableName,
      record_id: recordId,
      old_values: oldValues,
      new_values: newValues
    }])
  
  if (error) {
    console.error('Error adding audit log:', error)
    throw error
  }
}

// Get audit logs
export const getAuditLogs = async (limit = 100) => {
  const { data, error } = await supabase
    .from('audit_logs')
    .select(`
      *,
      user:users(name, email)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching audit logs:', error)
    throw error
  }
  
  return data
}
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Waitlist functions
export const addToWaitlist = async (waitlistData) => {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          parent_name: waitlistData.parentName,
          email: waitlistData.email,
          child_age: waitlistData.childAge,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error adding to waitlist:', error)
    return { data: null, error }
  }
}

export const getWaitlistEntries = async () => {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching waitlist entries:', error)
    return { data: null, error }
  }
}
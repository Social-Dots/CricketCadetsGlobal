import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to add a new entry to the waitlist
export const addToWaitlist = async (waitlistData) => {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          child_name: waitlistData.childName,
          date_of_birth: waitlistData.dateOfBirth,
          gender: waitlistData.gender,
          phone_number: waitlistData.phoneNumber,
          email: waitlistData.email,
          suburb_postcode: waitlistData.suburbPostcode,
          cricket_experience: waitlistData.cricketExperience,
          parent_guardian_name: waitlistData.parentGuardianName,
          parent_guardian_phone: waitlistData.parentGuardianPhone,
          parent_guardian_email: waitlistData.parentGuardianEmail,
          consent_to_contact: waitlistData.consentToContact,
        }
      ])
      .select();

    if (error) {
      console.error('Error adding to waitlist:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Supabase error:', error);
    throw error;
  }
};

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
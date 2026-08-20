/**
 * STORIES BY GSB — SUPABASE CONFIGURATION
 * 
 * Connected Project: https://vytnchfmjnawjmiubblr.supabase.co
 */

const SUPABASE_URL = 'https://vytnchfmjnawjmiubblr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_xTddIUeOH-SyEYOCwCAU9w_m5dD9VOO';

// Initialize Supabase Client if SDK is loaded
let supabaseClient = null;

if (typeof supabase !== 'undefined' && SUPABASE_URL) {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("⚡ Supabase Client initialized successfully!");
  } catch (e) {
    console.warn("Supabase init warning:", e);
  }
}

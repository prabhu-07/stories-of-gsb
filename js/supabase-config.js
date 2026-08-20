/**
 * STORIES BY GSB — SUPABASE CONFIGURATION
 * 
 * 1. Create a free account at https://supabase.com
 * 2. Create a project and run this SQL query in SQL Editor:
 * 
 *    create table public.events (
 *      id uuid default gen_random_uuid() primary key,
 *      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
 *      month text not null,
 *      date text not null,
 *      tithi text,
 *      title text not null,
 *      category text not null,
 *      location text not null,
 *      description text not null,
 *      image text,
 *      is_approved boolean default true
 *    );
 * 
 *    -- Enable RLS & public read/write policy:
 *    alter table public.events enable row level security;
 *    create policy "Allow public read" on public.events for select using (true);
 *    create policy "Allow public insert" on public.events for insert with check (true);
 * 
 * 3. Copy your Project URL & Anon Key from Settings -> API and paste below:
 */

const SUPABASE_URL = "https://YOUR_SUPABASE_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

// Initialize Supabase Client if SDK is loaded and keys are set
let supabaseClient = null;

if (typeof supabase !== 'undefined' && SUPABASE_URL && !SUPABASE_URL.includes("YOUR_SUPABASE_PROJECT_ID")) {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("⚡ Supabase Client initialized successfully!");
  } catch (e) {
    console.warn("Supabase init warning:", e);
  }
}

/* 
This folder holds the base supabase code.
It initialized the connection between front-end-db for the whole application.

The main thing about this is that it allows you to call supabase from a client component...
*/

// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Load from environment variables (safe for browser)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment variables'
  )
}

// Create a single instance for the browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey)


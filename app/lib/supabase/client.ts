/* 
This folder holds the base supabase code.
It initialized the connection between front-end-db for the whole application.

The main thing about this is that it allows you to call supabase from a client component...
*/

// lib/supabaseClient.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}


import { createClient } from "@supabase/supabase-js";

// Should add these to a .env file in actual production
const supabaseURL = "https://chhljphoxqkterdnxdcr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoaGxqcGhveHFrdGVyZG54ZGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY1MzY2NzgsImV4cCI6MjAxMjExMjY3OH0.Nlgw8Wne_FLcoTGgwvLXOAfQyGVklxFdGqxKfT2gBT8";

export const supabase = createClient(supabaseURL, supabaseAnonKey)
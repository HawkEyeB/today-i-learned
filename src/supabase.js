import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xshybwehbclncjtvhamt.supabase.co";

const supabaseKey =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzaHlid2VoYmNsbmNqdHZoYW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzExMzAzNDQsImV4cCI6MTk4NjcwNjM0NH0.vvZijW8WlQZPrKA_YwfBO3UqCohkGF8NWhAWviA7GOE";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

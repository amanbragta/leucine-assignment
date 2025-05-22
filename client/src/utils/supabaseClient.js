import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://yldkyrkfrmnadfdhyybv.supabase.co";
const supabaseKey = import.meta.env.VITE_SB_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

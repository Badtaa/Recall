import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

/* No keys set? The app still runs — it just saves to this browser only. */
export const supabase = url && anon ? createClient(url, anon) : null;
export const cloudEnabled = Boolean(supabase);

import { createClient } from "@supabase/supabase-js";
import { getSupabaseServiceRoleKey, getSupabaseUrl } from "@/lib/env";

export function getSupabaseServer() {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceRoleKey();
  return createClient(url, key, { auth: { persistSession: false } });
}

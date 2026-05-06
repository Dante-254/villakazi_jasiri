import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";

export const createClient = () =>
  createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey());
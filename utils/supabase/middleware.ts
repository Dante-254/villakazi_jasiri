import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = (request: NextRequest) => {
  return createSupabaseClient(supabaseUrl!, supabaseKey!, {
    auth: {
      persistSession: false,
    },
  });
};

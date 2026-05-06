import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminUser } from "@/lib/adminClaims";
import { getAdminEmails, getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";

export async function requireAdminRequest(request: NextRequest): Promise<NextResponse | null> {
  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: () => {
        // Route handlers cannot reliably mutate request cookies directly.
      },
    },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAdminUser(user, getAdminEmails())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}

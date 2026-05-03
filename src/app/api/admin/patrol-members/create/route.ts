import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabaseServer";

function hasAdminCookie(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  return cookieHeader.includes("sb_admin_token");
}

export async function POST(req: Request) {
  if (!hasAdminCookie(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { patrol_id, name, role, age, photo_url, email } = body || {};

    if (!name || !role) {
      return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    const { data, error } = await supabase.from("patrol_members").insert([
      { patrol_id, name, role, age: age || null, photo_url: photo_url || null, email: email || null },
    ]).select().single();

    if (error) {
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, member: data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}

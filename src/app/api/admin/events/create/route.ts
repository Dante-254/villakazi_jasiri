import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabaseServer";

function hasAdminCookie(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  return cookieHeader.includes("sb_admin_token");
}

export async function POST(req: Request) {
  try {
    if (!hasAdminCookie(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, description, date, image_url, is_featured, show_on_home } = body || {};
    if (!title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    const { data, error } = await supabase.from("events").insert([{
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
      description,
      date: date || null,
      image_url: image_url || null,
      is_featured: !!is_featured,
      show_on_home: !!show_on_home,
    }]).select().single();

    if (error) {
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, event: data });
  } catch (err: any) {
    console.error("Create event error", err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}

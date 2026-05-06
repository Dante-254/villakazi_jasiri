import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdminRequest } from "@/lib/adminAuth";
import { getSupabaseServer } from "@/lib/supabaseServer";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdminRequest(req);
  if (authError) {
    return authError;
  }

  const { id } = await context.params;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const body = await req.json();
    const { name, position, bio, image_url, email, phone, facebook_url, instagram_url, tiktok_url } = body || {};

    if (!name || !position || !email) {
      return NextResponse.json({ error: "Name, position and email are required" }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    const { data, error } = await supabase.from("crew_leaders").update({
      name,
      position,
      bio: bio || null,
      image_url: image_url || null,
      email,
      phone: phone || null,
      facebook_url: facebook_url || null,
      instagram_url: instagram_url || null,
      tiktok_url: tiktok_url || null,
      updated_at: new Date().toISOString(),
    }).eq("id", id).select().single();

    if (error) {
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, leader: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdminRequest(req);
  if (authError) {
    return authError;
  }

  const { id } = await context.params;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const supabase = getSupabaseServer();
    const { error } = await supabase.from("crew_leaders").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

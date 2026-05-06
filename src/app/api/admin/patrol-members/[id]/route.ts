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
    const { patrol_id, name, role, age, photo_url, email } = body || {};

    if (!name || !role) {
      return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    const { data, error } = await supabase.from("patrol_members").update({
      patrol_id,
      name,
      role,
      age: age || null,
      photo_url: photo_url || null,
      email: email || null,
      updated_at: new Date().toISOString(),
    }).eq("id", id).select().single();

    if (error) {
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, member: data });
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
    const { error } = await supabase.from("patrol_members").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

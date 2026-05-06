import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdminRequest } from "@/lib/adminAuth";
import { getSupabaseServer } from "@/lib/supabaseServer";

export async function PUT(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const authError = await requireAdminRequest(req);
    if (authError) {
      return authError;
    }

    const { slug } = await context.params;
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

    const body = await req.json();
    const { title, description, date, image_url, is_featured, show_on_home } = body || {};

    if (!title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("events")
      .update({
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        description,
        date: date || null,
        image_url: image_url || null,
        is_featured: !!is_featured,
        show_on_home: !!show_on_home,
      })
      .eq("slug", slug)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, event: data });
  } catch (err: unknown) {
    console.error("Update event error", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const authError = await requireAdminRequest(req);
    if (authError) {
      return authError;
    }
    const { slug } = await context.params;
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

    const supabase = getSupabaseServer();
    const { error } = await supabase.from("events").delete().eq("slug", slug);
    if (error) return NextResponse.json({ error: error.message || error }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("Delete event error", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

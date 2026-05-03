import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const supabase = getSupabaseServer();
    const { data: patrols, error } = await supabase.from("patrols").select("*").order("name", { ascending: true });
    if (error) return NextResponse.json({ error: error.message || "Error loading patrols" }, { status: 500 });
    return NextResponse.json(patrols || []);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}

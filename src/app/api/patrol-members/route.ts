import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const supabase = getSupabaseServer();
    const { data: members, error } = await supabase.from("patrol_members").select("*, patrols(name, type)").order("name", { ascending: true });
    if (error) return NextResponse.json({ error: error.message || "Error loading patrol members" }, { status: 500 });
    return NextResponse.json(members || []);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const supabase = getSupabaseServer();
    const { data: leaders, error } = await supabase.from("crew_leaders").select("*").order("name", { ascending: true });
    if (error) return NextResponse.json({ error: error.message || "Error loading crew leaders" }, { status: 500 });
    return NextResponse.json(leaders || []);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}

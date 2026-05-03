import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabaseServer";

export default async function CrewLeadersPage() {
  const supabase = getSupabaseServer();
  const { data: leaders, error } = await supabase.from("crew_leaders").select("*").order("name", { ascending: true });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Crew Leaders</h1>
        <Link href="/admin/leaders" className="px-4 py-2 bg-green-600 text-white rounded">Manage Leaders</Link>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-600 rounded">Error loading crew leaders: {error.message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {leaders && leaders.length ? leaders.map((leader: any) => (
          <div key={leader.id} className="border rounded p-4">
            <div className="flex items-center gap-3">
              {leader.image_url ? <img src={leader.image_url} alt={leader.name} className="w-16 h-16 rounded-full object-cover" /> : <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center text-xl">{leader.name?.charAt(0)}</div>}
              <div>
                <h2 className="font-bold">{leader.name}</h2>
                <div className="text-sm text-neutral-500">{leader.position}</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-neutral-700">{leader.bio}</p>
            <div className="mt-2 text-xs text-neutral-600">{leader.email}</div>
            <div className="mt-1 text-xs text-neutral-600">{leader.phone}</div>
          </div>
        )) : (
          <div className="p-4 border rounded">No crew leaders found.</div>
        )}
      </div>
    </div>
  );
}

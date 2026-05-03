import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabaseServer";

export default async function AdminLeadersPage() {
  const supabase = getSupabaseServer();
  const { data: leaders, error } = await supabase.from("crew_leaders").select("*").order("name", { ascending: true });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Crew Leaders</h1>
        <Link href="/admin/leaders/add" className="px-4 py-2 bg-green-600 text-white rounded">Add Leader</Link>
      </div>

      <div className="space-y-3">
        {error && <div className="p-4 bg-red-100 text-red-700 rounded">Error loading crew leaders: {error.message}</div>}
        {leaders && leaders.length ? (
          leaders.map((leader: any) => (
            <div key={leader.id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <div className="font-medium">{leader.name}</div>
                <div className="text-xs text-neutral-500">{leader.position} • {leader.email}</div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/leaders/${leader.id}/edit`} className="px-3 py-1 border rounded">Edit</Link>
                <button
                  onClick={async () => {
                    if (!confirm('Delete this leader?')) return;
                    await fetch(`/api/admin/crew-leaders/${leader.id}`, { method: 'DELETE' });
                    location.reload();
                  }}
                  className="px-3 py-1 border rounded text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 border rounded">No crew leaders yet.</div>
        )}
      </div>
    </div>
  );
}

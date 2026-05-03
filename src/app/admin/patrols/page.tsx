import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabaseServer";

export default async function AdminPatrolsPage() {
  const supabase = getSupabaseServer();
  const { data: members, error } = await supabase
    .from("patrol_members")
    .select("id,name,role,age,photo_url,email,patrols(name,type)")
    .order("name", { ascending: true });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Patrol Member Management</h1>
        <Link href="/admin/patrols/add" className="px-4 py-2 bg-green-600 text-white rounded">Add Member</Link>
      </div>

      <div className="space-y-3">
        {error && <div className="p-4 bg-red-100 text-red-700 rounded">Error loading patrol members: {error.message}</div>}
        {members && members.length ? (
          members.map((m: any) => (
            <div key={m.id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <div className="font-medium">{m.name} ({m.role})</div>
                <div className="text-xs text-neutral-500">Patrol: {m.patrols?.name ?? "Unassigned"}</div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/patrols/${m.id}/edit`} className="px-3 py-1 border rounded">Edit</Link>
                <button
                  onClick={async () => {
                    if (!confirm('Delete this patrol member?')) return;
                    await fetch(`/api/admin/patrol-members/${m.id}`, { method: 'DELETE' });
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
          <div className="p-4 border rounded">No patrol members have been added yet.</div>
        )}
      </div>
    </div>
  );
}

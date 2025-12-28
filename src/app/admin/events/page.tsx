import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabaseServer";

export default async function AdminEventsPage() {
  const supabase = getSupabaseServer();
  const { data: events, error } = await supabase.from("events").select("id,title,slug,date").order("date", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Events</h1>
        <Link href="/admin/events/add" className="px-4 py-2 bg-green-600 text-white rounded">Add Event</Link>
      </div>

      <div className="space-y-3">
        {events && events.length ? (
          events.map((e: any) => (
            <div key={e.id} className="p-4 border rounded flex items-center justify-between">
              <div>
                <div className="font-medium">{e.title}</div>
                <div className="text-xs text-neutral-500">{e.slug} • {e.date ? new Date(e.date).toLocaleDateString() : ""}</div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/events/${e.slug}/edit`} className="px-3 py-1 border rounded">Edit</Link>
                <Link href={`/admin/events/${e.slug}/upload`} className="px-3 py-1 border rounded">Upload</Link>
                <Link href={`/events/${e.slug}`} className="px-3 py-1 border rounded">View</Link>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 border rounded">No events yet</div>
        )}
      </div>
    </div>
  );
}

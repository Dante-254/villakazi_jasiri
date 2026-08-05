import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabaseServer";

export default async function AdminEventsPage() {
  const supabase = getSupabaseServer();
  const { data: events } = await supabase
    .from("events")
    .select("id,title,slug,date")
    .order("date", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-700 dark:text-green-400">
            Admin tools
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Events</h1>
        </div>
        <Link href="/admin/events/add" className="btn-primary">
          Create new event
        </Link>
      </div>

      <div className="space-y-3">
        {events && events.length ? (
          events.map((e: any) => (
            <div
              key={e.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] border border-neutral-200 p-4 dark:border-neutral-800"
            >
              <div>
                <div className="font-medium">{e.title}</div>
                <div className="text-xs text-neutral-500">
                  {e.slug} •{" "}
                  {e.date ? new Date(e.date).toLocaleDateString() : ""}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/events/${e.slug}/edit`}
                  className="btn-ghost"
                >
                  Edit
                </Link>
                <Link
                  href={`/admin/events/${e.slug}/upload`}
                  className="btn-secondary"
                >
                  Upload
                </Link>
                <Link href={`/events/${e.slug}`} className="btn-secondary">
                  View
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[1.25rem] border border-dashed border-neutral-300 p-4 text-sm text-neutral-600 dark:border-neutral-700">
            No events yet
          </div>
        )}
      </div>
    </div>
  );
}

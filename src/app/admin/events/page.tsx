import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabaseServer";

function getEventStatus(eventDate?: string | null) {
  if (!eventDate) return "undated";
  const now = new Date();
  const date = new Date(eventDate);
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);

  if (date >= now) return "upcoming";
  if (date < now && date >= sixMonthsAgo) return "recent";
  return "past";
}

function statusClass(status: string) {
  switch (status) {
    case "upcoming":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "recent":
      return "bg-sky-100 text-sky-800 border-sky-200";
    case "past":
      return "bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-800";
    default:
      return "bg-orange-100 text-orange-800 border-orange-200";
  }
}

function statusLabel(status: string) {
  switch (status) {
    case "upcoming":
      return "Upcoming";
    case "recent":
      return "Recent";
    case "past":
      return "Past";
    default:
      return "Undated";
  }
}

export default async function AdminEventsPage() {
  const supabase = getSupabaseServer();
  const { data: events, error } = await supabase
    .from("events")
    .select("id,title,slug,date,is_featured,show_on_home")
    .order("date", { ascending: false });

  const buckets: Record<string, any[]> = {
    upcoming: [],
    recent: [],
    undated: [],
    past: [],
  };

  (events || []).forEach((event: any) => {
    buckets[getEventStatus(event.date)].push(event);
  });

  const bucketOrder = ["upcoming", "recent", "undated", "past"];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-10 rounded-[2rem] border border-slate-200/60 bg-white/90 p-8 shadow-2xl shadow-slate-900/5 dark:border-slate-700/60 dark:bg-slate-950/80">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.35em] text-xs text-slate-500">
              Admin / Events
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Manage events with clarity
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Organize uploads, edit details, and see event status buckets for
              upcoming, recent, undated, and archived experiences.
            </p>
          </div>
          <Link
            href="/admin/events/add"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-500"
          >
            + Add event
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {bucketOrder.map((bucket) => (
            <span
              key={bucket}
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              {statusLabel(bucket)}: {buckets[bucket].length}
            </span>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
          Failed to load events. Refresh or check your database connection.
        </div>
      )}

      {events && events.length ? (
        <div className="space-y-8">
          {bucketOrder.map((bucket) => {
            const bucketEvents = buckets[bucket];
            if (!bucketEvents.length) return null;
            return (
              <section
                key={bucket}
                className="rounded-[2rem] border border-slate-200/60 bg-white/90 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950/80"
              >
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                      {statusLabel(bucket)}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {bucketEvents.length} event
                      {bucketEvents.length === 1 ? "" : "s"} in this section.
                    </p>
                  </div>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(bucket)}`}
                  >
                    {statusLabel(bucket)} status
                  </span>
                </div>

                <div className="grid gap-4">
                  {bucketEvents.map((e: any) => {
                    const dateLabel = e.date
                      ? new Date(e.date).toLocaleDateString()
                      : "No date";
                    return (
                      <div
                        key={e.id}
                        className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-3">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                              <div>
                                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                                  {e.title}
                                </h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                  {e.slug} · {dateLabel}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <span
                                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(bucket)}`}
                                >
                                  {statusLabel(bucket)}
                                </span>
                                {e.is_featured && (
                                  <span className="inline-flex items-center rounded-full border border-fuchsia-200 bg-fuchsia-100 px-3 py-1 text-xs font-semibold text-fuchsia-800">
                                    Featured
                                  </span>
                                )}
                                {e.show_on_home && (
                                  <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                                    Home
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                              {!e.date && (
                                <p>
                                  This event has not been dated yet. Add a date
                                  to move it into upcoming/recent logic.
                                </p>
                              )}
                              {e.date && bucket === "past" && (
                                <p>
                                  Past events remain visible on the public
                                  events page under the all-events section.
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              href={`/admin/events/${e.slug}/upload`}
                              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-emerald-400 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-emerald-950/70"
                            >
                              Upload media
                            </Link>
                            <Link
                              href={`/admin/events/${e.slug}/edit`}
                              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-950"
                            >
                              Edit
                            </Link>
                            <Link
                              href={`/events/${e.slug}`}
                              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-blue-950/70"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
          <h2 className="text-lg font-semibold">No events found yet.</h2>
          <p className="mt-2 text-sm">
            Create your first event and then upload device media for a richer
            gallery experience.
          </p>
        </div>
      )}
    </div>
  );
}

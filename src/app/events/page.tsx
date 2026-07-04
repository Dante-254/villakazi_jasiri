import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabaseServer";

type EventRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string | null;
  image_url: string | null;
};

export default async function EventsPage() {
  const supabase = getSupabaseServer();
  const { data: events } = await supabase
    .from("events")
    .select("id,title,slug,description,date,image_url")
    .order("date", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">Events</h1>
      <p className="mt-2 text-gray-600">
        Upcoming events, camps, hikes and service projects.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {events && events.length ? (
          events.map((event: EventRow) => (
            <article key={event.id} className="p-4 border rounded-md bg-white dark:bg-neutral-900">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-neutral-300">
                {event.description?.slice(0, 140)}
                {event.description && event.description.length > 140 ? "..." : ""}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <Link href={`/events/${event.slug}`} className="text-blue-600 text-sm font-medium">
                  Read more
                </Link>
                <span className="text-xs text-neutral-500">
                  {event.date ? new Date(event.date).toLocaleDateString() : ""}
                </span>
              </div>
            </article>
          ))
        ) : (
          <div className="p-4 border rounded-md">No events have been published yet.</div>
        )}
      </div>
    </div>
  );
}

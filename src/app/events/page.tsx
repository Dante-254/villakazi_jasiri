import { getSupabaseServer } from "@/lib/supabaseServer";
import EventCard from "@/components/events/EventCard";

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
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">Events</h1>
      <p className="mt-2 text-gray-600 dark:text-neutral-300">
        Upcoming events, camps, hikes and service projects.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events && events.length ? (
          events.map((event: EventRow) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="p-4 border rounded-md">No events have been published yet.</div>
        )}
      </div>
    </div>
  );
}

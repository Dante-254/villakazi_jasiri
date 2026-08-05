import Link from "next/link";
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

function isPastEvent(value: string | null) {
  if (!value) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(`${value}T00:00:00`);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate < today;
}

export default async function EventsPage() {
  const supabase = getSupabaseServer();
  const { data: events } = await supabase
    .from("events")
    .select("id,title,slug,description,date,image_url")
    .order("date", { ascending: false });

  const upcomingEvents = (events || []).filter(
    (event: EventRow) => !isPastEvent(event.date),
  );
  const pastEvents = (events || []).filter((event: EventRow) =>
    isPastEvent(event.date),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-700 dark:text-green-400">
            Crew calendar
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-neutral-900 dark:text-white">
            Events
          </h1>
          <p className="mt-2 max-w-2xl text-gray-600 dark:text-neutral-300">
            From service projects to camps and hikes, this is where the crew
            shares what is next and what has already shaped our journey.
          </p>
        </div>
        <Link href="/gallery" className="btn-secondary">
          Browse gallery
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Upcoming events
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.length ? (
            upcomingEvents.map((event: EventRow) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-neutral-300 bg-neutral-50 p-8 text-sm text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
              There are no upcoming events scheduled at the moment.
            </div>
          )}
        </div>
      </section>

      {pastEvents.length ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Past events
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event: EventRow) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

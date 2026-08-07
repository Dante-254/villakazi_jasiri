import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabaseServer";
import EventCard from "./EventCard";
import EventHero from "./EventHero";

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

export default async function EventsShowcase() {
  const supabase = getSupabaseServer();
  const { data: allEvents } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  const events = (allEvents || []).filter(
    (event: EventRow) => event.title && event.description,
  );
  const upcomingEvents = events
    .filter((event: EventRow) => !isPastEvent(event.date))
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  const pastEvents = events
    .filter((event: EventRow) => isPastEvent(event.date))
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const hero = upcomingEvents[0] || events[0] || null;

  return (
    <>
      {hero && <EventHero event={hero} />}

      <section className="flex min-h-screen flex-col justify-center px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-700 dark:text-green-400">
                Upcoming adventures
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
                Fresh plans, camps and service days for the crew
              </h3>
            </div>
            <Link href="/events" className="btn-ghost">
              See all events <span className="ml-1">→</span>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.length ? (
              upcomingEvents.map((event: EventRow) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-neutral-300 bg-neutral-50 p-8 text-sm text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                No upcoming events are scheduled yet. Please check back soon.
              </div>
            )}
          </div>
        </div>
      </section>

      {pastEvents.length ? (
        <section className="px-6 pb-16 sm:px-8 lg:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8 border-t border-neutral-200 pt-10 dark:border-neutral-800">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                The archive
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
                Past events · {pastEvents.length}
              </h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event: EventRow) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

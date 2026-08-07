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

function formatSpotlightDate(value: string | null) {
  if (!value) return "TBD";
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function EventsPage() {
  const supabase = getSupabaseServer();
  const { data: events } = await supabase
    .from("events")
    .select("id,title,slug,description,date,image_url")
    .order("date", { ascending: false });

  const upcomingEvents = (events || [])
    .filter((event: EventRow) => !isPastEvent(event.date))
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  const pastEvents = (events || [])
    .filter((event: EventRow) => isPastEvent(event.date))
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const nextUp = upcomingEvents[0] || null;
  const remainingUpcoming = upcomingEvents.slice(1);

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

      {nextUp && (
        <section className="relative mt-10 overflow-hidden rounded-[2rem] border border-neutral-200 shadow-sm dark:border-neutral-800">
          <div className="relative min-h-[420px] sm:min-h-[460px]">
            {nextUp.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={nextUp.image_url}
                alt={nextUp.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-900 to-neutral-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="relative flex min-h-[420px] items-end p-6 sm:min-h-[460px] sm:p-10">
              <div className="w-full max-w-2xl">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-green-700/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white">
                    Next up
                  </span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur-sm">
                    {formatSpotlightDate(nextUp.date)}
                  </span>
                </div>
                <h2 className="mt-5 text-3xl font-bold leading-tight text-white md:text-5xl">
                  {nextUp.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/90 md:text-lg">
                  {nextUp.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={`/events/${nextUp.slug || nextUp.id}`}
                    className="btn-primary"
                  >
                    View details <span className="ml-1">→</span>
                  </Link>
                  <Link
                    href={`/gallery?event=${nextUp.slug || nextUp.id}`}
                    className="btn-secondary"
                  >
                    View gallery
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            {nextUp ? "More upcoming events" : "Upcoming events"}
          </h2>
          {upcomingEvents.length ? (
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {upcomingEvents.length} upcoming
            </span>
          ) : null}
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.length ? (
            (nextUp ? remainingUpcoming : upcomingEvents).map(
              (event: EventRow) => (
                <EventCard key={event.id} event={event} />
              ),
            )
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-neutral-300 bg-neutral-50 p-8 text-sm text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
              There are no upcoming events scheduled at the moment.
            </div>
          )}
        </div>
      </section>

      {pastEvents.length ? (
        <section className="mt-16 border-t border-neutral-200 pt-10 dark:border-neutral-800">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                The archive
              </p>
              <h2 className="mt-1 text-xl font-semibold text-neutral-900 dark:text-white">
                Past events
              </h2>
            </div>
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {pastEvents.length} completed
            </span>
          </div>
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

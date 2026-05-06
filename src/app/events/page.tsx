import { getSupabaseServer } from "@/lib/supabaseServer";
import EventCard from "@/components/events/EventCard";
import EventHero from "@/components/events/EventHero";

type EventRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string | null;
  image_url: string | null;
  is_featured: boolean;
  show_on_home: boolean;
};

function parseDate(value?: string | null) {
  return value ? new Date(value) : null;
}

function getStatus(eventDate?: string | null) {
  const now = new Date();
  const date = parseDate(eventDate);
  if (!date) return "undated";
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  if (date >= now) return "upcoming";
  if (date >= sixMonthsAgo) return "recent";
  return "past";
}

export default async function EventsPage() {
  const supabase = getSupabaseServer();
  const { data } = await supabase
    .from("events")
    .select("id,title,slug,description,date,image_url,is_featured,show_on_home")
    .order("date", { ascending: false });

  const events = data ?? [];

  const upcoming = events
    .filter((event: EventRow) => {
      const date = parseDate(event.date);
      return date !== null && date >= new Date();
    })
    .sort(
      (a: EventRow, b: EventRow) =>
        parseDate(a.date)!.getTime() - parseDate(b.date)!.getTime(),
    );

  const recent = events.filter((event: EventRow) => {
    const date = parseDate(event.date);
    if (!date) return false;
    const now = new Date();
    const sixMonthsAgo = new Date(now);
    sixMonthsAgo.setMonth(now.getMonth() - 6);
    return date < now && date >= sixMonthsAgo;
  });

  const other = events.filter((event: EventRow) => {
    const date = parseDate(event.date);
    if (!date) return true;
    const now = new Date();
    const sixMonthsAgo = new Date(now);
    sixMonthsAgo.setMonth(now.getMonth() - 6);
    return date < sixMonthsAgo;
  });

  const hero =
    events.find((event: EventRow) => event.is_featured) ||
    upcoming[0] ||
    recent[0] ||
    events[0] ||
    null;

  return (
    <div className="snap-start max-w-6xl mx-auto px-6 py-16">
      <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-neutral-800 dark:bg-slate-950/80">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200">
              <span>✨</span> Intelligent event flow
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Events that feel alive, sorted by now.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
              Browse upcoming adventures first, recent experiences next, and the
              full archive afterward. The featured hero highlights the freshest
              event or your chosen spotlight.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-xl">
            <h2 className="text-xl font-semibold">Event buckets</h2>
            <ul className="mt-4 space-y-4 text-sm leading-7">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-emerald-400" />{" "}
                Upcoming: events later than today
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-sky-400" />{" "}
                Recent: events within the last 6 months
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-neutral-400" />{" "}
                Archive: older events and undated listings
              </li>
            </ul>
          </div>
        </div>
      </div>

      {hero && (
        <div className="mt-10">
          <EventHero event={hero} />
        </div>
      )}

      <section className="mt-14 space-y-14">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200">
              Upcoming
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Events later than now
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {upcoming.length ? (
              upcoming.map((event: EventRow) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600 dark:border-neutral-700 dark:bg-slate-950 dark:text-slate-300">
                No upcoming events right now. Check back soon.
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-full bg-sky-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-800 dark:bg-sky-900/20 dark:text-sky-200">
              Recent
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Events from the last six months
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {recent.length ? (
              recent.map((event: EventRow) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600 dark:border-neutral-700 dark:bg-slate-950 dark:text-slate-300">
                No recent events available yet.
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-full bg-neutral-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
              Legacy
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Past events and undated stories
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {other.length ? (
              other.map((event: EventRow) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600 dark:border-neutral-700 dark:bg-slate-950 dark:text-slate-300">
                No archived events yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

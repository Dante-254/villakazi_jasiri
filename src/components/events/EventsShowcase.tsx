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
  is_featured: boolean;
  show_on_home: boolean;
};

export default async function EventsShowcase() {
  const supabase = getSupabaseServer();

  const { data: featuredEvents } = await supabase
    .from("events")
    .select("*")
    .eq("is_featured", true)
    .order("date", { ascending: false })
    .limit(1);

  const { data: homeEvents } = await supabase
    .from("events")
    .select("*")
    .eq("show_on_home", true)
    .order("date", { ascending: false })
    .limit(6);

  const { data: latestEvents } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false })
    .limit(6);

  const hero = (featuredEvents && featuredEvents[0]) || (latestEvents && latestEvents[0]) || null;
  const cards = (homeEvents && homeEvents.length ? homeEvents : latestEvents) || [];

  return (
    <>
      {hero && <EventHero event={hero} />}

      <section className="snap-start min-h-screen flex flex-col justify-center py-16 px-6">
        <div className="max-w-6xl w-full mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <h3 className="text-xl font-semibold">Upcoming & Recent Events</h3>
            <Link
              href="/events"
              className="text-sm font-medium text-green-700 hover:underline dark:text-green-400"
            >
              See all events →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cards.length ? (
              cards.map((e: EventRow) => <EventCard key={e.id} event={e} />)
            ) : (
              <div>No events to show</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

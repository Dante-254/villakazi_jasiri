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
    <section className="space-y-8">
      {hero && (
        <div>
          <EventHero event={hero} />
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-4">Upcoming & Recent Events</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.length ? cards.map((e: EventRow) => <EventCard key={e.id} event={e} />) : <div>No events to show</div>}
        </div>
      </div>
    </section>
  );
}

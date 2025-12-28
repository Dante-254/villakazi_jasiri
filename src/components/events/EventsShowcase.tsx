import { getSupabaseServer } from "@/lib/supabaseServer";
import EventCard from "./EventCard";
import EventHero from "./EventHero";

export default async function EventsShowcase() {
  const supabase = getSupabaseServer();

  const { data: featuredEvents } = await supabase.from("events").select("*").eq("is_featured", true).limit(1);
  const { data: homeEvents } = await supabase.from("events").select("*").eq("show_on_home", true).order("date", { ascending: false }).limit(6);

  const hero = (featuredEvents && featuredEvents[0]) || null;

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
          {homeEvents && homeEvents.length ? homeEvents.map((e: any) => <EventCard key={e.id} event={e} />) : <div>No events to show</div>}
        </div>
      </div>
    </section>
  );
}

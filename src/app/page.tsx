import Image from "next/image";
import Link from "next/link";
import PATROLS from "../data/patrols";
import HeroClient from "../components/ui/HeroClient";
import EventsShowcase from "../components/events/EventsShowcase";

export default function Home() {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      <HeroClient />

      {/* Events showcase (server-side rendered) */}
      <section className="snap-start py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <EventsShowcase />
        </div>
      </section>

      {/* Mission & Patrols */}
      <section className="snap-start h-screen flex flex-col items-center justify-center py-16 px-6">
        <div className="max-w-5xl w-full">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Our Mission</h2>
            <p className="mt-3 text-gray-600 dark:text-neutral-300">
              We cultivate young leaders through service, adventure and
              disciplined learning following the Kenya Scouts Association
              values.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PATROLS.map((p) => (
              <div
                key={p.id}
                className="rounded-lg p-6 shadow-md"
                style={{ borderTop: `4px solid ${p.color}` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      {p.status}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                    {p.name.charAt(0)}
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-700 dark:text-neutral-300">
                  {p.description}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/patrols/${p.id}`}
                    className="text-sm font-medium text-green-700"
                  >
                    View Patrol →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we are & Events preview */}
      <section className="snap-start h-screen flex items-center justify-center py-16 px-6 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-4xl text-center">
          <h2 className="text-2xl font-semibold">Who We Are</h2>
          <p className="mt-3 text-gray-600 dark:text-neutral-300">
            Villakazi Jasiri Scouts is a Rover Crew under Kasarani Local
            Association. We serve our community, explore the outdoors, and
            practice leadership.
          </p>
        </div>
      </section>

    </div>
  );
}

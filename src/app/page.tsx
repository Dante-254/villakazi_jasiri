import Link from "next/link";
import HeroClient from "../components/ui/HeroClient";
import EventsShowcase from "../components/events/EventsShowcase";

export default function Home() {
  return (
    <div className="snap-y snap-mandatory min-h-screen overflow-y-scroll bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),transparent_28%)]">
      <HeroClient />

      <section className="snap-start py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 rounded-[2rem] border border-slate-200/60 bg-white/85 p-10 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/75">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="uppercase tracking-[0.35em] text-xs text-slate-500">
                  Featured explorer feed
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  A lively snapshot of our latest scouts adventures
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Discover the newest events, hero highlights, and patrol
                  stories from Villakazi Jasiri.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/events"
                  className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-500"
                >
                  See all events
                </Link>
                <Link
                  href="/gallery"
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  Browse gallery
                </Link>
              </div>
            </div>
          </div>
          <EventsShowcase />
        </div>
      </section>

      <section className="snap-start py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200/60 bg-white/90 p-8 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/75">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">
                Our mission
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
                Service, adventure, leadership
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                We cultivate young leaders through community service, outdoor
                adventure and disciplined learning rooted in Kenyan scouting
                values.
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-200/60 bg-white/90 p-8 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/75">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-600">
                Our patrols
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
                A crew built around teamwork
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Each patrol brings a unique flavor of community support,
                training and outdoor fun. Explore their stories and strengths
                below.
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-200/60 bg-white/90 p-8 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/75">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-600">
                Get involved
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
                Join a movement that matters
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Whether you're scouting, volunteering or supporting, every
                contribution helps shape a brighter future for Nairobi youth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="snap-start py-24 px-6 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[2rem] border border-slate-200/60 bg-white/85 p-10 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/75">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                Who we are
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">
                A modern crew with bold roots in scouting tradition
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                Villakazi Jasiri Scouts blends disciplined training, community
                service and joyful adventure into a fresh Rover Crew experience
                for young leaders across Nairobi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

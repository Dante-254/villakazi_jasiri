import Link from "next/link";
import PATROLS from "../data/patrols";
import HeroClient from "../components/ui/HeroClient";
import EventsShowcase from "../components/events/EventsShowcase";

const PILLARS = [
  {
    title: "Service",
    text: "Community projects that turn the Scout Law into visible, useful action in Kasarani and beyond.",
  },
  {
    title: "Adventure",
    text: "Camps, hikes and expeditions that build resilience, skill and confidence in the outdoors.",
  },
  {
    title: "Leadership",
    text: "Youth-led planning and decision-making that grow responsible young adults.",
  },
];

export default function Home() {
  return (
    <div className="snap-y snap-proximity h-screen overflow-y-scroll">
      <HeroClient />

      {/* Events showcase (featured event + upcoming, each snaps) */}
      <EventsShowcase />

      {/* Mission & Patrols */}
      <section className="flex min-h-screen snap-start flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-700 dark:text-green-400">
              Our mission
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-white sm:text-4xl">
              Young leaders, built on service
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-neutral-600 dark:text-neutral-300">
              We cultivate young leaders through service, adventure and
              disciplined learning, following the values of the Kenya Scouts
              Association.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {PATROLS.map((p) => (
              <div
                key={p.id}
                className="group rounded-[1.5rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
                style={{ borderTop: `4px solid ${p.color}` }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {p.name}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {p.status}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 font-semibold text-green-700 dark:bg-neutral-800 dark:text-green-400">
                    {p.name.charAt(0)}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                  {p.description}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/patrols/${p.id}`}
                    className="inline-flex items-center text-sm font-semibold text-green-700 transition hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                  >
                    View patrol <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="flex min-h-screen snap-start items-center justify-center bg-neutral-50 px-6 py-16 dark:bg-neutral-900">
        <div className="w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-green-900 bg-gradient-to-br from-green-700 via-green-800 to-green-950 p-8 text-white shadow-sm sm:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-green-400/20 blur-3xl" />
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-200">
              Who we are
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold sm:text-4xl">
              A Rover Crew under Kasarani Local Association
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-green-50">
              Villakazi Jasiri Scouts is a Rover Crew for young adults aged 18
              to 26. We serve our community, explore the outdoors, and practice
              leadership — grounded in the Promise and Law of the Kenya Scouts
              Association.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">
                Read our story
              </Link>
              <Link href="/contact" className="btn-secondary">
                Join the crew <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

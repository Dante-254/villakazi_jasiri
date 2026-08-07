import Link from "next/link";

const CATEGORIES = [
  {
    title: "Announcements",
    text: "New events, deadlines, meetings and urgent crew notices — the place to check first.",
  },
  {
    title: "Field reports",
    text: "Write-ups from camps, hikes and service days: what we did, what we learned, what comes next.",
  },
  {
    title: "Leadership reflections",
    text: "Short pieces from rovers and advisors on lessons from Scouting, service and community life.",
  },
];

const UPCOMING = [
  {
    title: "Crew service day — how to prepare",
    category: "Announcements",
    date: "Coming soon",
    text: "Uniform, kit list, meet-up time and what each patrol should bring to the next service project.",
  },
  {
    title: "Camp report from the last outing",
    category: "Field reports",
    date: "Coming soon",
    text: "Photos, fire-side stories and the small lessons that make every camp worth it.",
  },
  {
    title: "Why we lead with service",
    category: "Leadership reflections",
    date: "Coming soon",
    text: "A rover's view on how the Scout Law shapes the way we carry ourselves in the community.",
  },
];

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-green-900 bg-gradient-to-br from-green-700 via-green-800 to-green-950 p-8 text-white shadow-sm sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-200">
          Updates & announcements
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold sm:text-5xl">
          The crew&apos;s living journal
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-green-50">
          News, field updates and lessons from the road. This is where the
          Villakazi Jasiri story gets written — one camp, service day and
          conversation at a time.
        </p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {CATEGORIES.map((item) => (
          <div
            key={item.title}
            className="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
              {item.text}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            What lands here
          </h2>
          <Link href="/events" className="btn-ghost">
            Follow the calendar <span className="ml-1">→</span>
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {UPCOMING.map((post) => (
            <article
              key={post.title}
              className="flex flex-col rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-green-700 dark:bg-green-950/40 dark:text-green-300">
                  {post.category}
                </span>
                <span className="text-xs font-medium text-neutral-400">
                  {post.date}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                {post.text}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-7 text-neutral-500 dark:text-neutral-400">
          Posts appear as the crew records them. To see the moments behind the
          stories, visit the{" "}
          <Link
            href="/gallery"
            className="font-semibold text-green-700 hover:underline dark:text-green-400"
          >
            gallery
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

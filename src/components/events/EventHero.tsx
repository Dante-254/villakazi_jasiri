import Link from "next/link";

export default function EventHero({ event }: { event: any }) {
  const status = event.date
    ? new Date(event.date) >= new Date()
      ? "Upcoming"
      : "Recent"
    : "Undated";
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-slate-100 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.08)] dark:border-neutral-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-200/70 blur-3xl dark:bg-sky-500/20" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-40 w-40 rounded-full bg-sky-200/70 blur-3xl dark:bg-emerald-500/20" />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="relative z-10">
          <span className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white dark:bg-white dark:text-slate-950">
            {event.is_featured ? "Featured" : status}
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
            {event.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-700 dark:text-slate-300">
            {event.description ||
              "A playful highlight from Villakazi Jasiri — open the details or explore the event gallery."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/events/${event.slug || event.id}`}
              className="inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              View details
            </Link>
            <Link
              href={`/gallery?event=${event.slug || event.id}`}
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 dark:border-neutral-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
            >
              Open gallery
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-inner dark:border-neutral-800 dark:bg-slate-950">
          {event.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.image_url}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[320px] items-center justify-center px-8 py-10 text-center text-slate-600 dark:text-slate-400">
              <div>
                <div className="mb-4 text-4xl">🎒</div>
                <div className="text-lg font-semibold">No photo yet</div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Upload event media from the admin page to give this hero the
                  spotlight it deserves.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

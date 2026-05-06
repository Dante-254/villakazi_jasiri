import Link from "next/link";

type EventRow = {
  title: string;
  slug: string;
  description: string;
  date: string | null;
  image_url: string | null;
  is_featured: boolean;
  show_on_home: boolean;
};

function getStatus(eventDate?: string | null) {
  const now = new Date();
  const date = eventDate ? new Date(eventDate) : null;
  if (!date) return "Undated";
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  if (date >= now) return "Upcoming";
  if (date >= sixMonthsAgo) return "Recent";
  return "Archive";
}

export default function EventCard({ event }: { event: EventRow }) {
  const status = getStatus(event.date);
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-slate-950">
      <div className="mb-4 overflow-hidden rounded-[1.5rem] bg-slate-100 text-center text-slate-500 dark:bg-neutral-900 dark:text-neutral-400">
        {event.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.image_url}
            alt={event.title}
            className="h-52 w-full object-cover"
          />
        ) : (
          <div className="flex h-52 items-center justify-center px-5 text-sm font-semibold">
            No image yet — upload from admin
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
            {event.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {event.description?.slice(0, 110)}
            {event.description && event.description.length > 110 ? "..." : ""}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {status}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 text-sm">
        <Link
          href={`/events/${event.slug}`}
          className="font-semibold text-emerald-700 transition hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100"
        >
          Read more →
        </Link>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {event.date ? new Date(event.date).toLocaleDateString() : "No date"}
        </span>
      </div>
    </article>
  );
}

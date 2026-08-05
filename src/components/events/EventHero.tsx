import Link from "next/link";

type EventRow = {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  date: string | null;
  image_url: string | null;
};

function formatEventDate(value: string | null) {
  if (!value) return "TBD";
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isPastEvent(value: string | null) {
  if (!value) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(`${value}T00:00:00`);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate < today;
}

export default function EventHero({ event }: { event: EventRow }) {
  const eventDate = formatEventDate(event.date);
  const past = isPastEvent(event.date);

  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative min-h-[74vh] overflow-hidden">
        {event.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.image_url}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-900 to-neutral-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="relative mx-auto flex min-h-[74vh] max-w-7xl items-end px-6 py-10 sm:px-8 lg:px-10">
          <div className="w-full max-w-3xl rounded-[2rem] border border-white/20 bg-black/25 p-6 backdrop-blur-md sm:p-8">
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] ${past ? "bg-neutral-900/80 text-white" : "bg-green-700/90 text-white"}`}
              >
                {past ? "Past event" : "Upcoming event"}
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90">
                {eventDate}
              </span>
            </div>
            <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
              {event.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/90 md:text-lg">
              {event.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/events/${event.slug || event.id}`}
                className="btn-primary"
              >
                View details
              </Link>
              <Link
                href={`/gallery?event=${event.slug || event.id}`}
                className="btn-secondary"
              >
                View gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

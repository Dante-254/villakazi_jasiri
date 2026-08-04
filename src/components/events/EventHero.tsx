import Link from "next/link";

type EventRow = {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  date: string | null;
  image_url: string | null;
};

export default function EventHero({ event }: { event: EventRow }) {
  return (
    <section className="snap-start relative min-h-screen flex items-center overflow-hidden">
      {event.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={event.image_url}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-900 to-neutral-900" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

      <div className="relative w-full max-w-4xl mx-auto px-6 py-24 text-white">
        <p className="inline-block rounded-full bg-green-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em]">
          Featured event
        </p>
        <h2 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
          {event.title}
        </h2>
        {event.date && (
          <p className="mt-4 text-sm font-medium text-green-200">
            {new Date(event.date).toLocaleDateString()}
          </p>
        )}
        <p className="mt-4 max-w-2xl text-base md:text-lg leading-8 text-white/90">
          {event.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/events/${event.slug || event.id}`}
            className="px-6 py-3 rounded-lg bg-white text-green-800 font-semibold hover:bg-green-50 transition"
          >
            View details
          </Link>
          <Link
            href={`/gallery?event=${event.slug || event.id}`}
            className="px-6 py-3 rounded-lg border border-white/70 font-semibold text-white hover:bg-white/10 transition"
          >
            View gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

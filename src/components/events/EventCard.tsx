import Link from "next/link";

export default function EventCard({ event }: { event: any }) {
  return (
    <article className="bg-white dark:bg-neutral-800 rounded-lg shadow p-4">
      <div className="h-48 w-full bg-neutral-100 dark:bg-neutral-900 rounded overflow-hidden mb-3">
        {event.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.image_url} alt={event.title} className="object-cover w-full h-full" />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-500">No image</div>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">{event.description?.slice(0, 120)}{event.description && event.description.length > 120 ? '...' : ''}</p>
      <div className="flex justify-between items-center">
        <Link href={`/events/${event.slug || event.id}`} className="text-sm text-blue-600">Read more</Link>
        <span className="text-xs text-neutral-500">{event.date ? new Date(event.date).toLocaleDateString() : ''}</span>
      </div>
    </article>
  );
}

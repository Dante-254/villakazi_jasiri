import Link from "next/link";

export default function EventHero({ event }: { event: any }) {
  return (
    <section className="w-full rounded-lg overflow-hidden bg-gradient-to-br from-green-50 to-white dark:from-neutral-900 dark:to-neutral-800 p-6 md:p-12 grid md:grid-cols-2 gap-6 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{event.title}</h2>
        <p className="text-neutral-700 dark:text-neutral-300 mb-4">{event.description}</p>
        <div className="flex items-center gap-4">
          <Link href={`/events/${event.slug || event.id}`} className="px-4 py-2 bg-blue-600 text-white rounded">View details</Link>
          <Link href={`/gallery?event=${event.slug || event.id}`} className="px-4 py-2 border rounded">View gallery</Link>
        </div>
      </div>
      <div className="h-64 md:h-80 w-full bg-neutral-100 dark:bg-neutral-900 rounded overflow-hidden">
        {event.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.image_url} alt={event.title} className="object-cover w-full h-full" />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-500">No image</div>
        )}
      </div>
    </section>
  );
}

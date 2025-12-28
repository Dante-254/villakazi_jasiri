import { getSupabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";

export default async function EventDetail({ params }: { params: { slug: string } }) {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from("events").select("*").eq("slug", params.slug).limit(1).single();
  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold">Event not found</h1>
        <p className="mt-4 text-gray-600">We couldn't find the event you requested.</p>
      </div>
    );
  }

  const event = data;
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-neutral-700 dark:text-neutral-300 mb-6">{event.description}</p>
      {event.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={event.image_url} alt={event.title} className="w-full h-80 object-cover rounded mb-6" />
      )}

      <div className="flex gap-3">
        <Link href="/gallery?event=" + event.slug className="px-4 py-2 border rounded">Open gallery</Link>
        <Link href="/events" className="px-4 py-2 bg-neutral-100 rounded">Back to events</Link>
      </div>
    </div>
  );
}

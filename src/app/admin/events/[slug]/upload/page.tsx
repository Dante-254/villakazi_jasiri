import { getSupabaseServer } from "@/lib/supabaseServer";
import EventGalleryUploadClient from "@/components/admin/EventGalleryUploadClient";

function buildEventQuery(
  supabase: ReturnType<typeof getSupabaseServer>,
  slug: string,
) {
  const idValue = Number(slug);
  if (Number.isInteger(idValue)) {
    return supabase
      .from("events")
      .select("id,title,slug")
      .or(`slug.eq.${slug},id.eq.${idValue}`)
      .limit(1)
      .single();
  }
  return supabase
    .from("events")
    .select("id,title,slug")
    .eq("slug", slug)
    .limit(1)
    .single();
}

export default async function UploadPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = getSupabaseServer();
  const { data, error } = await buildEventQuery(supabase, params.slug);
  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold">Event not found</h1>
        <p className="mt-3 text-neutral-600">
          The event could not be found by slug. Confirm the event exists and try
          again.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <EventGalleryUploadClient slug={data.slug} title={data.title} />
    </div>
  );
}

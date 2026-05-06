import { getSupabaseServer } from "@/lib/supabaseServer";
import EventForm from "@/components/admin/EventForm";

function buildEventQuery(
  supabase: ReturnType<typeof getSupabaseServer>,
  slug: string,
) {
  const idValue = Number(slug);
  if (Number.isInteger(idValue)) {
    return supabase
      .from("events")
      .select("*")
      .or(`slug.eq.${slug},id.eq.${idValue}`)
      .limit(1)
      .single();
  }
  return supabase.from("events").select("*").eq("slug", slug).limit(1).single();
}

export default async function EditEventPage({
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
          Check the event slug or choose another event from the admin list.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <EventForm initialData={data} eventId={data.slug} />
    </div>
  );
}

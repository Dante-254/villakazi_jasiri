import { getSupabaseServer } from "@/lib/supabaseServer";
import EventForm from "@/components/admin/EventForm";

export default async function EditEventPage({ params }: { params: { slug: string } }) {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from("events").select("*").eq("slug", params.slug).limit(1).single();
  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold">Event not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* @ts-expect-error Server -> Client */}
      <EventForm initialData={data} eventId={data.slug} />
    </div>
  );
}

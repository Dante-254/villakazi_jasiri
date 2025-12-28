import { getSupabaseServer } from "@/lib/supabaseServer";
import EventGalleryUploadClient from "@/components/admin/EventGalleryUploadClient";

export default async function UploadPage({ params }: { params: { slug: string } }) {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from("events").select("id,title,slug").eq("slug", params.slug).limit(1).single();
  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold">Event not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* @ts-expect-error Server component passing props to a client component */}
      <EventGalleryUploadClient slug={data.slug} title={data.title} />
    </div>
  );
}

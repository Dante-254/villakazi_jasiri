import MasonryGallery from "../../components/ui/MasonryGallery";
import { getSupabaseServer } from "@/lib/supabaseServer";
import GalleryClient from "../../components/gallery/GalleryClient";

export default async function GalleryPage() {
  // Fetch events list to show as filter buttons (use title as tag name)
  const supabase = getSupabaseServer();
  const { data: events, error } = await supabase.from("events").select("id, title, slug").order("date", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">Gallery</h1>
      <p className="mt-3 text-gray-600 dark:text-neutral-300">Select an event to view its media.</p>

      <div className="mt-6">
        {/* Keep MasonryGallery for fallback/legacy content */}
        <MasonryGallery images={[]} />

        {/* Our client-side gallery filter + results */}
        <div className="mt-6">
          <GalleryClient events={events || []} />
        </div>
      </div>
    </div>
  );
}

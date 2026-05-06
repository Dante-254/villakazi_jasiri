import { Suspense } from "react";
import MasonryGallery from "../../components/ui/MasonryGallery";
import { getSupabaseServer } from "@/lib/supabaseServer";
import GalleryClient from "../../components/gallery/GalleryClient";

export default async function GalleryPage() {
  // Fetch events list to show as filter buttons (use title as tag name)
  const supabase = getSupabaseServer();
  const { data: events, error } = await supabase
    .from("events")
    .select("id, title, slug")
    .order("date", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">Gallery</h1>
      <p className="mt-3 text-gray-600 dark:text-neutral-300">
        Select an event to view its media.
      </p>

      <div className="mt-6">
        {/* Keep MasonryGallery for fallback/legacy content */}
        <MasonryGallery images={[]} />

        {/* Our client-side gallery filter + results */}
        <div className="mt-6">
          <Suspense
            fallback={
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600 dark:border-neutral-700 dark:bg-neutral-950 dark:text-slate-300">
                Loading gallery...
              </div>
            }
          >
            <GalleryClient events={events || []} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

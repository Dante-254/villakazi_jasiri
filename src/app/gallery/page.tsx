import MasonryGallery from "../../components/ui/MasonryGallery";
import { getSupabaseServer } from "@/lib/supabaseServer";
import GalleryClient from "../../components/gallery/GalleryClient";

export default async function GalleryPage() {
  const supabase = getSupabaseServer();
  const { data: events } = await supabase
    .from("events")
    .select("id, title, slug")
    .order("date", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-700 dark:text-green-400">
          Crew photo journal
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-white">
          Gallery
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-600 dark:text-neutral-300">
          Camps, service days and crew moments — captured and organized by
          event. Pick an event to browse its photos and videos.
        </p>
      </section>

      <div className="mt-8">
        <div className="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <GalleryClient events={events || []} />
        </div>

        <div className="mt-6">
          <MasonryGallery images={[]} />
        </div>
      </div>
    </div>
  );
}

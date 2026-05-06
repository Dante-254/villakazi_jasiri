"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function GalleryClient({ events }: { events: any[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const initialEvent = searchParams?.get("event") || null;

  useEffect(() => {
    if (initialEvent && !activeSlug) {
      loadEvent(initialEvent, initialEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialEvent]);

  async function loadEvent(slug: string, label?: string) {
    setError(null);
    setItems([]);
    setActiveSlug(slug);
    setActiveLabel(label ? String(label) : slug);
    setLoading(true);
    try {
      const r = await fetch(`/api/events/${encodeURIComponent(slug)}`);
      const data = await r.json();
      if (!r.ok) {
        setError(data?.error || "Failed to load gallery");
        return;
      }
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (err: any) {
      setError(err?.message || "Error fetching gallery");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {events.map((e) => {
          const label = String(e.title || e.slug || "Event");
          const slug = String(e.slug || label);
          return (
            <button
              key={e.id ?? slug}
              onClick={() => loadEvent(slug, label)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeSlug === slug ? "bg-green-600 text-white border-green-600" : "bg-white text-neutral-900 hover:border-green-400 dark:bg-neutral-800 dark:text-neutral-100"}`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-950">
        {loading && (
          <div className="text-sm text-neutral-500">Loading gallery…</div>
        )}
        {error && <div className="text-sm text-red-600">{error}</div>}

        {!activeSlug && !loading && !error && (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-6 text-center text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
            <p className="text-lg font-semibold">
              Pick an event to browse its photos and videos.
            </p>
            <p className="mt-2 text-sm">
              No event selected yet. Use the buttons above to open the gallery.
            </p>
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.public_id}
              className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
            >
              {it.resource_type === "video" ? (
                <video
                  controls
                  width="100%"
                  src={it.url}
                  className="h-72 w-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  loading="lazy"
                  src={it.url}
                  alt={it.public_id}
                  className="h-72 w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {!loading && activeSlug && items.length === 0 && !error && (
          <div className="mt-6 rounded-3xl border border-dashed border-neutral-300 bg-white p-6 text-center text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
            <p className="text-lg font-semibold">
              No media yet for {activeLabel || activeSlug}
            </p>
            <p className="mt-2 text-sm">
              This event has no uploaded assets. Upload device media from the
              admin event upload page to bring it to life.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

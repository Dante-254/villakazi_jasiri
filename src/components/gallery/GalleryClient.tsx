"use client";
import { useState } from "react";

type GalleryEvent = {
  id: string;
  title: string;
  slug: string | null;
};

type GalleryItem = {
  public_id: string;
  url: string;
  resource_type: string;
};

export default function GalleryClient({ events }: { events: GalleryEvent[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadEvent(slug: string, label?: string) {
    setError(null);
    setItems([]);
    setActive(label || slug);
    setLoading(true);
    try {
      const r = await fetch(`/api/events/${encodeURIComponent(slug)}`);
      const data = await r.json();
      if (!r.ok) {
        setError(data?.error || "Failed to load gallery");
        setLoading(false);
        return;
      }
      setItems(data.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching gallery");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex gap-3 flex-wrap">
        {events.map((e) => (
          <button
            key={e.id}
            onClick={() => loadEvent(e.slug || e.title, e.title)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              active === e.title
                ? "border-green-700 bg-green-700 text-white"
                : "border-neutral-200 bg-white text-neutral-700 hover:border-green-700 hover:text-green-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-green-500 dark:hover:text-green-300"
            }`}
          >
            {e.title}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading && <div className="text-neutral-500">Loading gallery…</div>}
        {error && <div className="text-red-600">{error}</div>}

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((it) => (
            <div key={it.public_id} className="group rounded-[1.25rem] overflow-hidden border border-neutral-200 dark:border-neutral-700">
              {it.resource_type === "video" ? (
                <video controls width="100%" src={it.url} className="max-h-80 w-full" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" src={it.url} alt={it.public_id} className="w-full h-48 object-cover transform transition-transform group-hover:scale-105" />
              )}
            </div>
          ))}
        </div>

        {!loading && items.length === 0 && active && <div className="mt-4 text-gray-600">No media for {active}</div>}
      </div>
    </div>
  );
}

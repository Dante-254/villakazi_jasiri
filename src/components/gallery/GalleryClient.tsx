"use client";
import { useState } from "react";

export default function GalleryClient({ events }: { events: any[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
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
    } catch (err: any) {
      setError(err.message || "Error fetching gallery");
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
            className={`px-3 py-1 rounded-md border ${active === e.title ? "bg-green-600 text-white" : "bg-white dark:bg-neutral-800"}`}
          >
            {e.title}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading && <div>Loading gallery…</div>}
        {error && <div className="text-red-600">{error}</div>}

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((it) => (
            <div key={it.public_id} className="rounded overflow-hidden border">
              {it.resource_type === "video" ? (
                <video controls width="100%" src={it.url} className="max-h-80 w-full" />
              ) : (
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

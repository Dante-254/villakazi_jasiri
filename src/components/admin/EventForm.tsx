"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = { initialData?: any; eventId?: string | null };

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function EventForm({ initialData, eventId }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [date, setDate] = useState(
    initialData?.date ? initialData.date.split("T")[0] : "",
  );
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");
  const [isFeatured, setIsFeatured] = useState(!!initialData?.is_featured);
  const [showOnHome, setShowOnHome] = useState(!!initialData?.show_on_home);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!slug && title) {
      setSlug(slugify(title));
    }
  }, [title, slug]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setSlug(initialData.slug || "");
      setDescription(initialData.description || "");
      setDate(initialData.date ? initialData.date.split("T")[0] : "");
      setImageUrl(initialData.image_url || "");
      setIsFeatured(!!initialData.is_featured);
      setShowOnHome(!!initialData.show_on_home);
    }
  }, [initialData]);

  async function submit(e: any) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (!title || !description) {
      setError("Please fill in required fields");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        title,
        slug,
        description,
        date,
        image_url: imageUrl,
        is_featured: isFeatured,
        show_on_home: showOnHome,
      };
      let res: Response;
      if (eventId) {
        res = await fetch(`/api/admin/events/${eventId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/admin/events/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      let data: any = null;
      try {
        data = await res.json();
      } catch (e) {
        const text = await res.text().catch(() => "");
        setError(text || "Server returned an unexpected response");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(data?.error || "Failed to save event");
        setLoading(false);
        return;
      }

      router.push("/admin/events");
    } catch (err: any) {
      setError(err.message || "Error saving event");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-neutral-950 rounded-3xl border border-neutral-200/80 p-8 shadow-xl ring-1 ring-black/5 dark:border-neutral-800 dark:ring-white/5">
        <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">
          {eventId ? "Edit Event" : "Create an Event"}
        </h1>
        {error && (
          <div className="mb-5 rounded-3xl bg-red-100 px-4 py-3 text-sm text-red-800 dark:bg-red-900 dark:text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Event Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-green-400 dark:focus:ring-green-900/30"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold mb-2">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-green-400 dark:focus:ring-green-900/30"
              />
              <p className="mt-2 text-xs text-neutral-500">
                Used in URLs and upload tags. Auto-generated from the title if
                left blank.
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-green-400 dark:focus:ring-green-900/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-green-400 dark:focus:ring-green-900/30"
            />
          </div>

          {imageUrl ? (
            <div className="rounded-3xl border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-950/30">
              <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                Current featured visual
              </p>
              <div className="mt-4 overflow-hidden rounded-3xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="featured preview"
                  className="h-56 w-full object-cover"
                />
              </div>
            </div>
          ) : null}

          <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-5 text-sm text-neutral-700 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-300">
            <p className="font-semibold">Device-first uploads only</p>
            <p className="mt-2">
              Avoid manual image URLs. Upload event images and videos from your
              device using the upload page after saving your event.
            </p>
            {eventId ? (
              <Link
                href={`/admin/events/${eventId}/upload`}
                className="mt-4 inline-flex rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-500"
              >
                Open upload page
              </Link>
            ) : (
              <p className="mt-4 text-xs text-neutral-500">
                Create the event first, then upload assets from the admin event
                upload page.
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex items-center gap-3 rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-500"
              />
              <span>Feature as hero</span>
            </label>
            <label className="flex items-center gap-3 rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
              <input
                type="checkbox"
                checked={showOnHome}
                onChange={(e) => setShowOnHome(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-500"
              />
              <span>Show on home</span>
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-3xl border border-neutral-300 px-6 py-3 text-sm font-semibold transition hover:border-neutral-400 dark:border-neutral-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-3xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-green-400"
            >
              {loading
                ? eventId
                  ? "Saving..."
                  : "Creating..."
                : eventId
                  ? "Save event"
                  : "Create event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

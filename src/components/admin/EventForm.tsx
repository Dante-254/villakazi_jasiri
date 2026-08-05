"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";

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
  const [image_url, setImageUrl] = useState(initialData?.image_url || "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!slug && title) {
      setSlug(slugify(title));
    }
  }, [title]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setSlug(initialData.slug || "");
      setDescription(initialData.description || "");
      setDate(initialData.date ? initialData.date.split("T")[0] : "");
      setImageUrl(initialData.image_url || "");
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
      const payload = { title, slug, description, date, image_url };
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
    <div className="mx-auto max-w-2xl">
      <div className="rounded-[2rem] bg-white p-8 shadow-lg dark:bg-neutral-800">
        <h1 className="mb-4 text-center text-2xl font-bold">
          {eventId ? "Edit Event" : "Create New Event"}
        </h1>
        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-800 dark:bg-red-900 dark:text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Event Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <ImageUploader
              label="Event image"
              value={image_url}
              onChange={setImageUrl}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading
                ? eventId
                  ? "Saving..."
                  : "Creating..."
                : eventId
                  ? "Save"
                  : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

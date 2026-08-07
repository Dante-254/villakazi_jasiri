"use client";
import { useState } from "react";

export default function EventGalleryUploadClient({ slug, title }: { slug: string; title: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  function setPickedFile(f: File | null) {
    setMessage(null);
    setError(null);
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = () => setPreview(String(reader.result));
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0] || null;
    if (f) setPickedFile(f);
  }

  async function upload() {
    if (!file) return setMessage("Pick a file first");
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const reader = await new Promise<string | null>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = () => reject(new Error("Failed to read file"));
        r.readAsDataURL(file);
      });

      const payload = { filename: file.name, data: reader };
      const res = await fetch(`/api/admin/events/${encodeURIComponent(slug)}/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "Upload failed");
      } else {
        setMessage("Upload successful");
        setFile(null);
        setPreview(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error uploading");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-neutral-800 rounded p-6">
        <h2 className="text-xl font-semibold mb-3">Upload media for: {title}</h2>
        <p className="text-sm text-neutral-600 mb-4">Files will be uploaded to Cloudinary and tagged with <code>{slug}</code>.</p>

        <div className="space-y-3">
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload media"
            onClick={() => document.getElementById("gallery-file-input")?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") document.getElementById("gallery-file-input")?.click();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`w-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 text-center p-8 cursor-pointer transition ${
              dragging
                ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                : "border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800/50"
            }`}
          >
            <svg
              className="w-8 h-8 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {dragging ? "Drop the file here" : "Drag & drop an image or video here"}
            </span>
            <span className="text-xs text-neutral-500">or click to browse from your computer</span>
            <input
              id="gallery-file-input"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => setPickedFile(e.target.files?.[0] || null)}
            />
          </div>

          {preview && (
            <div className="mt-3">
              {file?.type.startsWith("video/") ? (
                <video src={preview} controls className="max-h-64 w-full rounded" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="preview" className="max-h-64 w-full object-cover rounded" />
              )}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={upload} disabled={loading} className="btn-primary">
              {loading ? "Uploading…" : "Upload"}
            </button>
            <button onClick={() => { setFile(null); setPreview(null); setMessage(null); setError(null); }} className="btn-ghost">Clear</button>
          </div>

          {message && <div className="mt-3 text-sm text-green-600">{message}</div>}
          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        </div>
      </div>
    </div>
  );
}

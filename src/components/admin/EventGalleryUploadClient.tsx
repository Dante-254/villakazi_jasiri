"use client";
import { useState } from "react";

export default function EventGalleryUploadClient({ slug, title }: { slug: string; title: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(null);
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = () => setPreview(String(reader.result));
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  }

  async function upload() {
    if (!file) return setMessage("Pick a file first");
    setLoading(true);
    setMessage(null);
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
        setMessage(json?.error || "Upload failed");
      } else {
        setMessage("Upload successful");
        setFile(null);
        setPreview(null);
      }
    } catch (err: any) {
      setMessage(err?.message || "Error uploading");
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
          <input type="file" accept="image/*,video/*" onChange={onFileChange} />

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
            <button onClick={upload} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">
              {loading ? "Uploading…" : "Upload"}
            </button>
            <button onClick={() => { setFile(null); setPreview(null); setMessage(null); }} className="px-4 py-2 border rounded">Clear</button>
          </div>

          {message && <div className="mt-3 text-sm">{message}</div>}
        </div>
      </div>
    </div>
  );
}

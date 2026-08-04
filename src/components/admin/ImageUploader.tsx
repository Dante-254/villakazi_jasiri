"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_IMAGE_MB = 8;

type Props = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
};

type Mode = "upload" | "url";

export default function ImageUploader({ label = "Image", value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<string | null>(null);
  const [mode, setMode] = useState<Mode>("upload");
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlDraft, setUrlDraft] = useState(value);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  function clearPreview() {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = null;
    setPreview(null);
  }

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_IMAGE_MB}MB`);
      return;
    }

    clearPreview();
    const objectUrl = URL.createObjectURL(file);
    previewRef.current = objectUrl;
    setPreview(objectUrl);
    setUploading(true);

    try {
      const reader = await new Promise<string | null>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = () => reject(new Error("Failed to read file"));
        r.readAsDataURL(file);
      });

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, data: reader }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Upload failed");

      clearPreview();
      onChange(json.url);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Upload failed");
      clearPreview();
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function onBrowse(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  const showImage = value || preview;

  return (
    <div>
      <span className="block text-sm font-medium mb-1">{label}</span>

      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            mode === "upload"
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : "border text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
          }`}
        >
          Upload from device
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            mode === "url"
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : "border text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
          }`}
        >
          Paste a link
        </button>
      </div>

      {showImage ? (
        <div className="relative rounded-lg overflow-hidden border">
          {uploading ? (
            <div className="w-full aspect-video bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <span className="text-sm text-neutral-500">Uploading…</span>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={showImage} alt={label} className="w-full aspect-video object-cover" />
          )}
          <button
            type="button"
            onClick={() => {
              clearPreview();
              onChange("");
              setUrlDraft("");
            }}
            className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ) : (
        mode === "upload" && (
          <div
            role="button"
            tabIndex={0}
            aria-label={`Upload ${label}`}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`w-full aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 text-center p-6 cursor-pointer transition ${
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
              {dragging ? "Drop the image here" : "Drag & drop an image here"}
            </span>
            <span className="text-xs text-neutral-500">or click to browse from your computer</span>
            <span className="text-xs text-neutral-400">PNG, JPG, WebP, GIF • up to {MAX_IMAGE_MB}MB</span>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onBrowse}
            />
          </div>
        )
      )}

      {mode === "url" && (
        <input
          type="url"
          value={urlDraft}
          onChange={(e) => {
            setUrlDraft(e.target.value);
            onChange(e.target.value);
          }}
          placeholder="https://…"
          className="w-full px-4 py-2 border rounded-lg bg-transparent"
        />
      )}

      {error && <div className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</div>}
    </div>
  );
}

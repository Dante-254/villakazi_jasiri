"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = { initialData?: any; leaderId?: string | null };

export default function CrewLeaderForm({ initialData, leaderId }: Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [position, setPosition] = useState(initialData?.position || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [facebookUrl, setFacebookUrl] = useState(initialData?.facebook_url || "");
  const [instagramUrl, setInstagramUrl] = useState(initialData?.instagram_url || "");
  const [tiktokUrl, setTiktokUrl] = useState(initialData?.tiktok_url || "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setPosition(initialData.position || "");
      setBio(initialData.bio || "");
      setImageUrl(initialData.image_url || "");
      setEmail(initialData.email || "");
      setPhone(initialData.phone || "");
      setFacebookUrl(initialData.facebook_url || "");
      setInstagramUrl(initialData.instagram_url || "");
      setTiktokUrl(initialData.tiktok_url || "");
    }
  }, [initialData]);

  async function submit(e: any) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name || !position || !email) {
      setError("Name, position and email are required");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name,
        position,
        bio,
        image_url: imageUrl,
        email,
        phone,
        facebook_url: facebookUrl,
        instagram_url: instagramUrl,
        tiktok_url: tiktokUrl,
      };

      let res: Response;
      if (leaderId) {
        res = await fetch(`/api/admin/crew-leaders/${leaderId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/admin/crew-leaders/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      let data: any;
      try {
        data = await res.json();
      } catch {
        const text = await res.text().catch(() => "");
        setError(text || "Unexpected server response");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(data?.error || "Error saving crew leader");
        setLoading(false);
        return;
      }

      router.push("/admin/leaders");
    } catch (err: any) {
      setError(err.message || "Error saving crew leader");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">{leaderId ? "Edit Crew Leader" : "Add Crew Leader"}</h1>
        {error && <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded">{error}</div>}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input className="w-full px-4 py-2 border rounded-lg" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Position *</label>
            <input className="w-full px-4 py-2 border rounded-lg" type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input className="w-full px-4 py-2 border rounded-lg" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea className="w-full px-4 py-2 border rounded-lg" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input className="w-full px-4 py-2 border rounded-lg" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input className="w-full px-4 py-2 border rounded-lg" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Facebook URL</label>
              <input className="w-full px-4 py-2 border rounded-lg" type="url" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Instagram URL</label>
              <input className="w-full px-4 py-2 border rounded-lg" type="url" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">TikTok URL</label>
              <input className="w-full px-4 py-2 border rounded-lg" type="url" value={tiktokUrl} onChange={(e) => setTiktokUrl(e.target.value)} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => router.back()} className="px-6 py-2 border rounded-lg">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg">{loading ? (leaderId ? "Saving..." : "Creating...") : (leaderId ? "Save" : "Create Leader")}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

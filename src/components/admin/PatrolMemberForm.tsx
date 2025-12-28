"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = { initialData?: any; memberId?: string | null };

export default function PatrolMemberForm({ initialData, memberId }: Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [role, setRole] = useState(initialData?.role || "");
  const [age, setAge] = useState(initialData?.age || "");
  const [photo, setPhoto] = useState(initialData?.photo || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(()=>{
    if (initialData) {
      setName(initialData.name || "");
      setRole(initialData.role || "");
      setAge(initialData.age ? String(initialData.age) : "");
      setPhoto(initialData.photo || "");
    }
  }, [initialData]);

  async function submit(e: any) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (!name) {
      setError("Name is required");
      setLoading(false);
      return;
    }
    try {
      const payload = { name, role, age: age ? Number(age) : null, photo };
      let res: Response;
      if (memberId) {
        res = await fetch(`/api/admin/patrols/${memberId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/admin/patrols/create`, {
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
        setError(data?.error || "Failed to save member");
        setLoading(false);
        return;
      }
      router.push("/admin/patrols");
    } catch (err: any) {
      setError(err.message || "Error saving member");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">{memberId ? "Edit Member" : "Add Patrol Member"}</h1>
        {error && <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded">{error}</div>}
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input type="text" value={role} onChange={(e)=>setRole(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input type="url" value={photo} onChange={(e)=>setPhoto(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={()=>router.back()} className="px-6 py-2 border rounded-lg">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg">{loading ? (memberId ? "Saving..." : "Adding...") : (memberId ? "Save" : "Add Member")}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function AdminIndex() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold mb-4">Admin</h1>
      <p className="text-sm text-neutral-600 mb-6">Admin dashboard — restricted area (requires admin login).</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/events" className="p-4 border rounded hover:shadow">Events</Link>
        <Link href="/admin/patrols" className="p-4 border rounded hover:shadow">Patrols</Link>
        <Link href="/admin/leaders" className="p-4 border rounded hover:shadow">Leaders</Link>
      </div>
    </div>
  );
}

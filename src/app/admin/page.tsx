import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/adminClaims";
import { getAdminEmails } from "@/lib/env";

export default async function AdminIndex() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (!isAdminUser(user, getAdminEmails())) {
    redirect("/auth/login");
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold mb-4">Admin</h1>
      <p className="text-sm text-neutral-600 mb-6">
        Signed in as {user.email}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/events" className="p-4 border rounded hover:shadow">Events</Link>
        <Link href="/admin/patrols" className="p-4 border rounded hover:shadow">Patrols</Link>
        <Link href="/admin/leaders" className="p-4 border rounded hover:shadow">Leaders</Link>
      </div>

      <Link
        href="/auth/logout"
        className="mt-8 inline-block px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
      >
        Logout
      </Link>
    </div>
  );
}
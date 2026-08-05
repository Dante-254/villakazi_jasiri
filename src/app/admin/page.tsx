import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/adminClaims";
import { getAdminEmails } from "@/lib/env";

export default async function AdminIndex() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminUser(user, getAdminEmails())) {
    redirect("/auth/login");
  }

  redirect("/admin/events");
}

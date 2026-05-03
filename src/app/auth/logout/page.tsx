"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function signOut() {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.replace("/");
    }
    signOut();
  }, [router]);

  return <div className="max-w-md mx-auto px-6 py-16">Signing out...</div>;
}

import Link from "next/link";
import PATROLS from "../../data/patrols";
import { getSupabaseServer } from "@/lib/supabaseServer";

export default async function PatrolsIndex() {
  const supabase = getSupabaseServer();
  const { data: patrolsData, error } = await supabase
    .from("patrols")
    .select("*")
    .order("name", { ascending: true });

  const patrols = Array.isArray(patrolsData) && patrolsData.length ? patrolsData : PATROLS;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">Patrols</h1>
      <p className="mt-2 text-gray-600 dark:text-neutral-300">
        Explore our patrols and their roles within the crew.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {PATROLS.map((p) => (
          <div
            key={p.id}
            className="rounded-lg p-4 shadow-sm"
            style={{ borderTop: `4px solid ${p.color}` }}
          >
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm mt-1">{p.description}</p>
            <div className="mt-3">
              <Link
                href={`/patrols/${p.id}`}
                className="text-green-700 font-medium"
              >
                Open patrol →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

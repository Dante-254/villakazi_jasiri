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
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-700 dark:text-green-400">Patrol life</p>
        <h1 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-white">Our patrols are the heartbeat of the crew</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-600 dark:text-neutral-300">
          Patrols give every rover a smaller circle of responsibility, a stronger sense of belonging, and a practical place to learn leadership through doing.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {patrols.map((patrol: any) => (
          <div key={patrol.id} className="rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900" style={{ borderTop: `4px solid ${patrol.color || "#16a34a"}` }}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{patrol.name}</h3>
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-green-700 dark:bg-green-950/40 dark:text-green-300">
                {patrol.status || "Active"}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-neutral-600 dark:text-neutral-300">{patrol.description || patrol.bio || "A dedicated patrol focused on service, growth and responsibility."}</p>
            <div className="mt-5">
              <Link href={`/patrols/${patrol.id}`} className="btn-ghost">
                Open patrol <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

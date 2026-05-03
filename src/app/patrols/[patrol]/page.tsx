import Link from "next/link";
import PATROLS from "../../../data/patrols";
import { getSupabaseServer } from "@/lib/supabaseServer";

interface Props {
  params: { patrol: string } | Promise<{ patrol: string }>;
}

export default async function PatrolPage({ params }: Props) {
  const resolved = await params;
  const id = resolved.patrol;
  const supabase = getSupabaseServer();

  const { data: patrols, error } = await supabase
    .from("patrols")
    .select("*")
    .eq("id", id)
    .single();

  const patrol = patrols || PATROLS.find((p) => p.id === id);
  if (!patrol)
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold">Patrol not found</h1>
        <p className="mt-2 text-gray-600">
          We couldn't find a patrol named "{id}".
        </p>
        <div className="mt-4">
          <Link href="/patrols" className="text-green-700 underline">
            Back to Patrols
          </Link>
        </div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center"
          style={{ border: `4px solid ${patrol.color}` }}
        >
          {patrol.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{patrol.name}</h1>
          <div className="text-sm text-gray-600 dark:text-neutral-400">
            {patrol.status}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">About this patrol</h2>
        <p className="mt-2 text-gray-700 dark:text-neutral-300">
          {patrol.description}
        </p>
      </div>
    </div>
  );
}

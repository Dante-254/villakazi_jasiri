import { getSupabaseServer } from "@/lib/supabaseServer";
import CrewLeaderForm from "@/components/admin/CrewLeaderForm";

export default async function EditCrewLeaderPage({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from("crew_leaders").select("*").eq("id", params.id).single();

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold">Leader not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* @ts-expect-error Server -> Client */}
      <CrewLeaderForm initialData={data} leaderId={data.id} />
    </div>
  );
}

import { getSupabaseServer } from "@/lib/supabaseServer";
import PatrolMemberForm from "@/components/admin/PatrolMemberForm";

export default async function EditPatrolMemberPage({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from("patrol_members").select("*").eq("id", params.id).single();

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold">Patrol member not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* @ts-expect-error Server -> Client */}
      <PatrolMemberForm initialData={data} memberId={data.id} />
    </div>
  );
}
